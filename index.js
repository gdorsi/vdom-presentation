/** @jsx wtf */

function wtf(nodeName, attributes, ...children) {
    return {nodeName, attributes, children};
}

function render(vnode) {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    let {nodeName, attributes, children} = vnode;

    if (typeof nodeName === 'function') {
        return render(nodeName(attributes || {}, children));
    }

    let node = document.createElement(nodeName);

    Object.keys(attributes || {}).forEach((name) => {
        name in node
            ? node[name] = attributes[name]
            : node.setAttribute(name, attributes[name]);
    });

    (children || []).forEach((child) => {
        node.appendChild(render(child));
    });

    return node;
}

let AndComposable = ({makeItRed}) => (
    <span style={makeItRed ? 'color: red;' : ''}>
        and composable!
    </span>
);

let Main = () => (
    <div style="font-size: 16px;">
        <span>WTF virtual dom is </span>
        <strong>so damn cool </strong>
        <AndComposable makeItRed={true} />
    </div>
);

let node = render(<Main />);

document.body.appendChild(node);