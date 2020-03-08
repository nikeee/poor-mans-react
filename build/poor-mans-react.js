export function createElement(tag, props, ...children) {
    if (typeof tag === "function") {
        // If the "tag" is a function, the user actually created an instance of a functional component
        // We just call it with its props and expect that it returns a react element
        return tag(props);
    }
    const element = {
        tag,
        props: Object.assign(Object.assign({}, props), { children }),
    };
    return element;
}
export function render(reactElement, container) {
    if (typeof reactElement === "string" || typeof reactElement === "number") {
        const domElement = document.createTextNode(String(reactElement));
        // text element do not have props or children. Handling these are easy.
        container.appendChild(domElement);
        return;
    }
    if (typeof reactElement === "boolean") {
        // We don't render booleans because they are used as conditional statements in JSX: "{variable && <span>{variable}</span>}"
        return;
    }
    const domElement = document.createElement(reactElement.tag);
    const props = reactElement.props;
    for (const [prop, value] of Object.entries(props)) {
        if (prop !== "children")
            domElement[prop] = value;
    }
    const children = props.children;
    for (const child of children) {
        render(child, domElement);
    }
    container.appendChild(domElement);
}
const globalState = [];
// Hack to make re-rendering work somehow for now
window.nextStateIndex = 0;
export function useState(initialValue) {
    const stateIndex = window.nextStateIndex;
    if (globalState[stateIndex] === undefined) {
        globalState[stateIndex] = typeof initialValue === "function"
            ? initialValue()
            : initialValue;
    }
    function setState(newState) {
        const currentState = globalState[stateIndex];
        if (!Object.is(currentState, newState)) {
            globalState[stateIndex] = newState;
            window.reRender();
        }
    }
    ++window.nextStateIndex;
    return [globalState[stateIndex], setState];
}
//# sourceMappingURL=poor-mans-react.js.map