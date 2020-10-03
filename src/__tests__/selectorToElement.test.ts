import selectorToElement from '../selectorToElement';

describe('selectorToElement', () => {
	it('should make an HTML element matching the selector', () => {
		const selectors = [
			'a .b .c',
			'div .a[b=c] ul.list',
			'ol.a li.b.c#test div a article#art1.test[data-test="testing"]',
			'div + span',
			'div ~ span',
			'.test a + #myId.class1 ul.test',
			'article#myId a.linkClass[target="_blank"] img',
			'div .a:nth-child(6)',
			'div [a=b] #c:nth-child(5n + 2)',
			'a#t+article.r img.cl2na span[a="b"]~aside>table'
		];
		selectors.forEach(selector => {
			expect(selectorToElement(selector).matches(selector)).toBeTruthy();
		});
	});

	it('should append branch to a specified root', () => {
		const rootEl = document.createElement('span');
		const selector = 'div + span .a[b=c] ul.list';
		selectorToElement(selector, rootEl);
		expect(rootEl.querySelector(selector)).not.toBeNull();
	});

	it('should support the :has pseudo class', () => {
		const selector =
			'div + span .a[b=c] .test:has(div ul.list li[data-item="testing"]) button';
		const el = selectorToElement(selector);
		expect(el.tagName).toEqual('BUTTON');

		const hasEl = el.closest('.test');
		expect(
			hasEl && hasEl.querySelector('div ul.list li[data-item="testing"]')
		).not.toBeNull();
	});
});
