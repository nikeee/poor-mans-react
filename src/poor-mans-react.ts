type HTMLTag = string;
type ReactChild<TProps> = (ReactElement<TProps> | string | number | boolean);
type ReactChildren = readonly ReactChild<unknown>[];

interface ReactElement<TProps> {
	tag: string;
	props: TProps & { children: ReactChildren };
}

type HtmlTagOrComponentFunction<TProps> = HTMLTag | ((props: TProps | null) => ReactElement<TProps & { children: ReactChildren }>)

export function createElement<TProps>(
	tag: HtmlTagOrComponentFunction<TProps>,
	props: TProps | null,
	...children: ReactChildren
): ReactElement<(TProps | {}) & { children: ReactChildren }> {

	if (typeof tag === "function") {
		// If the "tag" is a function, the user actually created an instance of a functional component
		// We just call it with its props and expect that it returns a react element
		return tag(props);
	}

	const element = {
		tag,
		props: { ...props, children },
	};

	return element;
}

export function render<TProps>(reactElement: ReactChild<TProps>, container: HTMLElement) {

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

	const domElement = document.createElement(reactElement.tag) as HTMLElement;

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


const globalState: unknown[] = [];
// Hack to make re-rendering work somehow for now
(window as any).nextStateIndex = 0;

export function useState<T>(initialValue: T | (() => T)) {
	const stateIndex = (window as any).nextStateIndex;

	if (globalState[stateIndex] === undefined) {
		globalState[stateIndex] = typeof initialValue === "function"
			? (initialValue as () => T)()
			: initialValue;
	}

	function setState(newState: T) {
		const currentState = globalState[stateIndex];

		if (!Object.is(currentState, newState)) {
			globalState[stateIndex] = newState;
			(window as any).reRender();
		}
	}

	++(window as any).nextStateIndex;

	return [globalState[stateIndex] as T, setState] as const;
}
