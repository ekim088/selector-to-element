import { parseClasses } from '../src/makeNode';

describe('makeNode', () => {
	describe('parseClasses', () => {
		it('should return a list of classes in a selector', () => {
			expect(parseClasses('.a.b.c')).toEqual(['a', 'b', 'c']);
			expect(parseClasses('.alpha.beta')).toEqual(['alpha', 'beta']);
			expect(parseClasses('.with-hyphen.a')).toEqual([
				'with-hyphen',
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
	});
});
