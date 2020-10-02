# selector-to-element

Transforms a selector into a matching HTML element.

## Installation

Install via [NPM](https://www.npmjs.com/package/selector-to-element):

```
npm install selector-to-element
```

## Usage

Quickly mock a specific DOM branch to assist in unit testing. Helpful for testing tracking events that rely on an element's surrounding elements. Supports type, ID, class, attribute, and sibling selectors. The following pseudo classes are supported: `:has`. The final node in the selector will be returned. Nodes without a specified type will default to `div`.

```
import selectorToElement from 'selector-to-element';

const imgEl = selectorToElement('article#myId a.linkClass[target="_blank"] img');
```

### Params

| Param         | Type      | Description                                                                                               |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| selector      | `string`  | A selector.                                                                                               |
| _rootElement_ | `Element` | _(Optional)_ A root element to contain the DOM branch specified by the selector. Defaults to a new `div`. |
