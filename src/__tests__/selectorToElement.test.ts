import selectorToElement from '../selectorToElement';

describe('selectorToElement', () => {
	const testSelectors = [
		'a .b .c',
		'div .a[b=c] ul.list',
		'ol.a li.b.c#test div a article#art1.test[data-test="testing"]',
		'div + span',
		'div ~ span',
		'.test a + #myId.class1 ul.test',
		'article#myId a.linkClass[target="_blank"] img',
		'div .a:first-child .b',
		'div .a:last-child .b',
		'div .a:nth-child(6)',
		'div [a=b] #c:nth-child(5n + 2)',
		'a#t+article.r img.cl2na span[a="b"]~aside>table',
		'div[a~="sdad"] div[b*=lsd] div[c|=fd][d^=sdu]',
		'fieldset option:checked',
		'fieldset select:disabled',
		'fieldset input:invalid',
		'fieldset input:optional',
		'fieldset input:required',
		'fieldset textarea:valid'
	];

	it('should append branch to a specified root', () => {
		const rootEl = document.createElement('span');
		const selector = 'div + span .a[b=c] ul.list';
		selectorToElement(selector, rootEl);
		expect(rootEl.querySelector(selector)).not.toBeNull();
		expect(rootEl).toMatchSnapshot();
	});

	it('should support the :has pseudo class', () => {
		const rootEl = document.createElement('article');
		const selector =
			'div + span .a[b=c] #oi.test:has(div ul.list li[data-item="testing"]) button.sa.fsd';
		const el = selectorToElement(selector, rootEl);
		expect(el.tagName).toEqual('BUTTON');

		const hasEl = el.closest('.test');
		expect(
			hasEl && hasEl.querySelector('div ul.list li[data-item="testing"]')
		).not.toBeNull();
		expect(rootEl).toMatchSnapshot();
	});

	testSelectors.forEach(selector => {
		it(`should make an HTML element matching "${selector}"`, () => {
			expect(selectorToElement(selector).matches(selector)).toBeTruthy();
		});
	});

	// perform snapshot tests of test selectors because why not
	testSelectors.forEach(selector => {
		it(`should append "${selector}" to the root element`, () => {
			const rootEl = document.createElement('div');
			rootEl.id = 'root';
			selectorToElement(selector, rootEl);
			expect(rootEl).toMatchSnapshot();
		});
	});
});
