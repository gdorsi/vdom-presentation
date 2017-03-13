/** @jsx wtf */

function wtf(nodeName, attributes, ...children) {
    return {nodeName, attributes, children};
}

function render(vnode) {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    let node = document.createElement(vnode.nodeName);

    Object.keys(vnode.attributes || {}).forEach((name) => {
        name in node
            ? node[name] = vnode.attributes[name]
            : node.setAttribute(name, vnode.attributes[name]);
    });

    (vnode.children || []).forEach((child) => {
        node.appendChild(render(child));
    });

    return node;
}

let vdom = (
    <div style="font-size: 16px;">
        <span>WTF virtual dom</span>
        <strong> is so damn cool!</strong>
    </div>
);

document.body.appendChild(render(vdom));