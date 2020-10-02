import selectorToElement from '..';

describe('selectorToElement', () => {
	it('should make an HTML element matching the selector', () => {
		const selectors = [
			'a .b .c',
			'div .a[b=c] ul.list',
			'ol.a li.b.c#test div a article#art1.test[data-test="testing"]',
			'div + span',
			'div ~ span',
			'.test a + #myId.class1 ul.test',
			'article#myId a.linkClass[target="_blank"] img'
		];
		selectors.forEach(selector => {
			expect(selectorToElement(selector).matches(selector)).toBeTruthy();
		});
	});
});
