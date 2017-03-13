/** @jsx wtf */

function wtf(nodeName, attributes, ...children) {
    return {nodeName, attributes, children};
}

let vdom = (
    <div style="font-weight: bold;">
        <span>WTF virtual dom is so</span>
        <strong>is so cool!</strong>
    </div>
);

console.log(vdom);