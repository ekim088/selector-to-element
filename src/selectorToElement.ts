import makeNodeTree from './makeNodeTree';
import parseAttributes from './parseAttributes';
import parseClasses from './parseClasses';
import parseId from './parseId';
import parsePseudoClasses, {
	parsePseudoParam,
	removePseudoClasses
} from './parsePseudoClasses';
import parseTag from './parseTag';

// input element type guard
const inputTagNames = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
const isHTMLInputElement = (
	el: HTMLElement | HTMLInputElement
): el is HTMLInputElement => inputTagNames.indexOf(el.tagName) > -1;

// list of known pseudo classes targeting inputs
const inputPseudoClasses = [
	'checked',
	'disabled',
	'invalid',
	'optional',
	'required',
	'valid'
];

/**
 * Transforms a single node selector to an element.
 *
 * @param {string} selector A selector containing a single node.
 * @returns {Element} A HTML Element representing the selector.
 */
export const makeNode = (selector: string): HTMLElement => {
	// parse most attributes in selector with pseudo classes removed so
	// pseudo class param contents like :has() are not captured
	const selectorWithoutPseudos = removePseudoClasses(selector);
	const attributes = parseAttributes(selectorWithoutPseudos);
	const id = parseId(selectorWithoutPseudos);
	const classes = parseClasses(selectorWithoutPseudos);
	const pseudoClasses = parsePseudoClasses(selector);
	const pseudoHas = pseudoClasses.find(pseudo => pseudo.indexOf('has') === 0);
	const tagName = parseTag(selectorWithoutPseudos);

	// check if selector contains a known input-based pseudo class
	const hasInputPseudoClass = pseudoClasses.some(
		pseudoClass => inputPseudoClasses.indexOf(pseudoClass) > -1
	);

	// if selector has input pseudo class and element type has not been
	// specified, then create as input element
	const el = document.createElement(
		hasInputPseudoClass &&
			selector.toLowerCase().indexOf(tagName.toLowerCase()) !== 0
			? 'input'
			: tagName
	);

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

	// support input-based pseudo-classes
	if (hasInputPseudoClass && isHTMLInputElement(el)) {
		if (pseudoClasses.indexOf('checked') > -1) {
			if (el.tagName === 'INPUT') {
				el.setAttribute('type', 'checkbox');
				el.checked = true;
			} else if (el.tagName === 'OPTION') {
				el.checked = true;
			}
		}

		if (pseudoClasses.indexOf('disabled') > -1) el.disabled = true;
		if (pseudoClasses.indexOf('invalid') > -1)
			el.setCustomValidity('invalid');
		if (pseudoClasses.indexOf('required') > -1) el.required = true;
	}

	return el;
};

/**
 * Transforms a selector into an HTML element.
 *
 * @param {string} selector A selector.
 * @param {Element} [appendTo] A root element to append the DOM branch specified
 * 	by the selector. Defaults to a new `div`.
 * @returns {Element} A HTML Element representing the selector.
 */
const selectorToElement = (
	selector: string,
	appendTo?: HTMLElement
): HTMLElement => {
	let el: HTMLElement = appendTo || document.createElement('div');
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
