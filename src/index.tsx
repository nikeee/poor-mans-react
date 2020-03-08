import * as React from "./poor-mans-react.js";

function App() {
	const [name, setName] = React.useState(() => "");
	const [counter, setCounter] = React.useState(5);
	// We could use this, but we lose focus on every key press due to DOM nodes being re-created on every render
	// <input type="text" placeholder="Name" value={name} oninput={e => setName(e.target.value as string)} />

	return (
		<main className="lol">
			<h1>Poor Man's React</h1>

			{name && <h4>Hello {name}!</h4>}
			{!name && <h4>Please enter a name...</h4>}

			<label>
				Name (blur to trigger onchange): <br />
				<input type="text" placeholder="Poor Man" value={name} onchange={e => setName(e.target.value as string)} />
			</label>
			<hr />
			<section>
				<button onclick={() => setCounter(counter - 1)}>Decrement Counter</button>
				<button onclick={() => setCounter(counter + 1)}>Increment Counter</button>
			</section>
			<div>
				<CounterDisplay value={counter} />
			</div>
		</main>
	);
}

function CounterDisplay(props: { value: number }) {
	return (
		<span>Counter: {props.value}</span>
	);
}

React.render(<App />, document.body);

// Hack to make re-rendering work somehow for now
(window as any).reRender = () => {
	const container = document.body;
	container.firstChild?.remove();

	(window as any).nextStateIndex = 0;
	React.render(<App />, container);
}
