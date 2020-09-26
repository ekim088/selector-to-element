import parseTag from '../src/parseTag';

describe('parseTag', () => {
	it('should parse a tag name', () => {
		expect(parseTag('someTag')).toEqual('someTag');
	});

	it('should return div if a tag cannot be parsed', () => {
		expect(parseTag('.noTag')).toEqual('div');
	});

	it('should parse the first node if selector contains descendants', () => {
		expect(parseTag('span a')).toEqual('span');
		expect(parseTag('#myId span')).toEqual('div');
	});

	it('should parse a tag attached to an ID', () => {
		expect(parseTag('span#myId')).toEqual('span');
	});

	it('should parse a tag attached to a class', () => {
		expect(parseTag('span.a')).toEqual('span');
	});

	it('should parse a tag attached to an attribute', () => {
		expect(parseTag('span[a=b]')).toEqual('span');
	});

	it('should parse a tag attached to a pseudo-class', () => {
		expect(parseTag('span:hover')).toEqual('span');
	});

	it('should parse a tag attached to a pseudo-element', () => {
		expect(parseTag('span::after')).toEqual('span');
	});
});
