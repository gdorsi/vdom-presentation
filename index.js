/** @jsx wtf */

function wtf(nodeName, attributes, ...children) {
    return {nodeName, attributes, children};
}

function render(vnode, dom) {
    if (typeof vnode === 'string') {
        if (dom instanceof Text) {
            dom.nodeValue = vnode;
            return dom;
        }

        return document.createTextNode(vnode);
    }

    let {nodeName, attributes, children} = vnode;

    attributes = attributes || {};
    children = children || [];

    if (typeof nodeName === 'function') {
        return render(nodeName(attributes, children), dom);
    }

    let node;

    if (dom && dom.tagName && dom.tagName.toLowerCase() == nodeName) {
        node = dom;
    } else {
        node = document.createElement(nodeName);
    }

    Object.keys(attributes).forEach((name) => {
        name in node
            ? node[name] = attributes[name]
            : node.setAttribute(name, attributes[name]);
    });

    if (dom === node) {
        Object.keys(node.__attrs || node.attributes).forEach((name) => {
            if (!(name in attributes)) {
                name in node
                    ? node[name] = void(0)
                    : node.removeAttribute(name);
            }
        });
    }

    node.__attrs = attributes;

    children.forEach((child, i) => {
        let prev = node.childNodes[i];
        let next = render(child, prev);

        if (prev !== next) {
            if (prev) {
                node.replaceChild(next, prev);
            } else {
                node.appendChild(next);
            }
        }
    });

    Array.prototype.slice.call(node.childNodes, children.length).forEach(
        (child) => {
            child.parentNode.removeChild(child);
        }
    );

    return node;
}

let AndComposable = ({makeItRed}) => (
    <span style={makeItRed ? 'color: red;' : ''}>
        and composable!
    </span>
);

let Main = ({size}) => (
    <body>
        <div style={`font-size: ${size || 16}px;`}>
            <span>WTF virtual dom is </span>
            <strong>so damn cool </strong>
            <AndComposable makeItRed={true} />
        </div>
    </body>
);

render(<Main />, document.body);

setTimeout(() => {
    render(<Main size={20}/>, document.body);
}, 2000);
