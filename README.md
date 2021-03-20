# selector-to-element

Transforms a selector into a matching HTML element.

## Installation

Install via [npm](https://www.npmjs.com/package/selector-to-element):

```
npm install selector-to-element --save-dev
```

## Usage

Quickly mock a specific DOM branch to assist in unit testing. Helpful for testing event listeners that rely on a specific DOM structure. Be sure to run tests in the [`jsdom`](https://www.npmjs.com/package/jsdom) environment or something comparable if running in Node. Supports type, ID, class, attribute, and sibling selectors. The `:has`, `:nth-child`, `:nth-of-type` pseudo-classes are supported, in addition to input-based pseudo-classes such as `:checked` and `:invalid` on the appropriate element type. Unless specified, each descending node will not contain siblings so pseudo-classes such as `:first-child` and `:last-child` will be supported by default. The final node in the selector will be returned. Nodes without a specified element type will default to `div`.

```
import selectorToElement from 'selector-to-element';

const imgEl = selectorToElement('article#myId a.linkClass[target="_blank"] img');
```

### Params

| Param      | Type      | Description                                                                                              |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------- |
| selector   | `string`  | A selector.                                                                                              |
| _appendTo_ | `Element` | _(Optional)_ A root element to append the DOM branch specified by the selector. Defaults to a new `div`. |
