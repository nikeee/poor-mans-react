import * as React from "./poor-mans-react.js";
function App() {
    const [name, setName] = React.useState(() => "");
    const [counter, setCounter] = React.useState(5);
    // We could use this, but we lose focus on every key press due to DOM nodes being re-created on every render
    // <input type="text" placeholder="Name" value={name} oninput={e => setName(e.target.value as string)} />
    return (React.createElement("main", { className: "lol" },
        React.createElement("h1", null, "Poor Man's React"),
        name && React.createElement("h4", null,
            "Hello ",
            name,
            "!"),
        !name && React.createElement("h4", null, "Please enter a name..."),
        React.createElement("label", null,
            "Name (blur to trigger onchange): ",
            React.createElement("br", null),
            React.createElement("input", { type: "text", placeholder: "Poor Man", value: name, onchange: e => setName(e.target.value) })),
        React.createElement("hr", null),
        React.createElement("section", null,
            React.createElement("button", { onclick: () => setCounter(counter - 1) }, "Decrement Counter"),
            React.createElement("button", { onclick: () => setCounter(counter + 1) }, "Increment Counter")),
        React.createElement("div", null,
            React.createElement(CounterDisplay, { value: counter }))));
}
function CounterDisplay(props) {
    return (React.createElement("span", null,
        "Counter: ",
        props.value));
}
React.render(React.createElement(App, null), document.body);
// Hack to make re-rendering work somehow for now
window.reRender = () => {
    var _a;
    const container = document.body;
    (_a = container.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
    window.nextStateIndex = 0;
    React.render(React.createElement(App, null), container);
};
//# sourceMappingURL=index.js.map