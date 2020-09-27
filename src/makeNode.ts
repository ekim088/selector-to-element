import parseAttributes from './parseAttributes';
import parseClasses from './parseClasses';
import parseId from './parseId';
import parseTag from './parseTag';

/**
 * @ignore
 * @param {string} selector A CSS selector containing a single node.
 * @returns {Element} A HTML Element representing the selector.
 */
const makeNode = (selector: string): HTMLElement => {
	const el = document.createElement(parseTag(selector));
	const attributes = parseAttributes(selector);
	const id = parseId(selector);
	const classes = parseClasses(selector);

	if (id) el.id = id;
	if (classes.length > 0) el.className = classes.join(' ');
	Object.entries(attributes).forEach(([name, value]: [string, string]) => {
		el.setAttribute(name, value);
	});
	return el;
};

export default makeNode;
