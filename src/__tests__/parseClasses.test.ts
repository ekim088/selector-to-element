import parseClasses from '../parseClasses';

describe('parseClasses', () => {
	it('should parse a list of classes', () => {
		expect(parseClasses('.a.b.c')).toEqual(['a', 'b', 'c']);
		expect(parseClasses('.alpha.beta')).toEqual(['alpha', 'beta']);
		expect(parseClasses('.with-hyphen.a')).toEqual(['with-hyphen', 'a']);
		expect(parseClasses('.with_underscore.a')).toEqual([
			'with_underscore',
			'a'
		]);
		expect(parseClasses('.a.b.c p.d.e .f')).toEqual([
			'a',
			'b',
			'c',
			'd',
			'e',
			'f'
		]);
	});

	it('should parse a class attached to a tag', () => {
		expect(parseClasses('div.a.b')).toEqual(['a', 'b']);
	});

	it('should parse a class attached to an ID', () => {
		expect(parseClasses('#myId.a.b')).toEqual(['a', 'b']);
		expect(parseClasses('.a#myId.b')).toEqual(['a', 'b']);
		expect(parseClasses('.a.b#myId')).toEqual(['a', 'b']);
	});

	it('should parse a class attached to an attribute', () => {
		expect(parseClasses('[someAttr].a.b')).toEqual(['a', 'b']);
		expect(parseClasses('.a[someAttr].b')).toEqual(['a', 'b']);
		expect(parseClasses('.a.b[someAttr]')).toEqual(['a', 'b']);
	});

	it('should parse a class attached to a pseudo-class', () => {
		expect(parseClasses('.a.b:not(p)')).toEqual(['a', 'b']);
	});

	it('should parse a class attached to a pseudo-element', () => {
		expect(parseClasses('.a.b::after')).toEqual(['a', 'b']);
	});

	it('should support colons in class names', () => {
		expect(parseClasses('.a\\:with-colon.b')).toEqual([
			'a:with-colon',
			'b'
		]);
		expect(parseClasses('.a\\:with-colon.b:not(p)')).toEqual([
			'a:with-colon',
			'b'
		]);
	});
});
