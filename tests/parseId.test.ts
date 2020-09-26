import parseId from '../src/parseId';

describe('parseId', () => {
	it('should parse an ID', () => {
		expect(parseId('#myId')).toEqual('myId');
		expect(parseId('#my-id-with-hyphen')).toEqual('my-id-with-hyphen');
	});

	it('should parse an ID attached to a tag', () => {
		expect(parseId('div#myId')).toEqual('myId');
	});

	it('should parse an ID attached to a class', () => {
		expect(parseId('.a#myId')).toEqual('myId');
		expect(parseId('#myId.a')).toEqual('myId');
	});

	it('should parse an ID attached to an attribute', () => {
		expect(parseId('[someAttr="someValue"]#myId')).toEqual('myId');
		expect(parseId('#myId[someAttr="someValue"]')).toEqual('myId');
		expect(parseId('#myId[someAttr="someValue"].a')).toEqual('myId');
	});

	it('should parse an ID attached to a pseudo-class', () => {
		expect(parseId('#myId:not(p)')).toEqual('myId');
	});

	it('should parse an ID attached to a pseudo-element', () => {
		expect(parseId('#myId::after')).toEqual('myId');
	});

	it('should return the first class found if a selector contains multiple classes', () => {
		expect(parseId('div#firstId#secondId')).toEqual('firstId');
		expect(parseId('div #parentId #childId')).toEqual('parentId');
	});
});
