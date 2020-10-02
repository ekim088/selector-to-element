import makeNodeTree from './makeNodeTree';
import parseAttributes from './parseAttributes';
import parseClasses from './parseClasses';
import parseId from './parseId';
import parsePseudoClasses, { parsePseudoParam } from './parsePseudoClasses';
import parseTag from './parseTag';

/**
 * Transforms a single node selector to an element.
 *
 * @param {string} selector A selector containing a single node.
 * @returns {Element} A HTML Element representing the selector.
 */
export const makeNode = (selector: string): HTMLElement => {
	const el = document.createElement(parseTag(selector));
	const attributes = parseAttributes(selector);
	const id = parseId(selector);
	const classes = parseClasses(selector);
	const pseudoClasses = parsePseudoClasses(selector);
	const pseudoHas = pseudoClasses.find(pseudo => pseudo.indexOf('has') === 0);

	if (id) el.id = id;
	if (classes.length > 0) el.className = classes.join(' ');
	Object.entries(attributes).forEach(([name, value]: [string, string]) => {
		el.setAttribute(name, value);
	});

	// support :has() pseudo by appending nodes of value to current node
	if (pseudoHas) {
		const hasVal = parsePseudoParam(pseudoHas);

		// eslint-disable-next-line no-use-before-define
		if (hasVal) selectorToElement(hasVal, el);
	}

	return el;
};

/**
 * Transforms a selector into an HTML element.
 *
 * @param {string} selector A selector.
 * @param {Element} [rootElement] A root element to contain the DOM branch
 * 	specified by the selector. Defaults to a new `div`.
 * @returns {Element} A HTML Element representing the selector.
 */
const selectorToElement = (
	selector: string,
	rootElement?: HTMLElement
): HTMLElement => {
	let el: HTMLElement = rootElement || document.createElement('div');
	const nodeTree = makeNodeTree(selector);

	// traverse each level of the node tree and set deeper nodes as children of
	// the previous parent node
	for (let i = 0; i < nodeTree.length; i++) {
		let currentNode: HTMLElement | null = null;

		for (let j = 0; j < nodeTree[i].length; j++) {
			currentNode = makeNode(nodeTree[i][j]);
			el.append(currentNode);
		}

		if (currentNode) el = currentNode;
	}

	return el;
};

export default selectorToElement;
