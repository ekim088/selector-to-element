# selector-to-element

Transforms a selector into a matching HTML element.

## Installation

Install via [NPM](https://www.npmjs.com/package/selector-to-element):

```
npm install selector-to-element
```

## Usage

Quickly mock a specific DOM branch to assist in unit testing. Helpful for testing tracking events that rely on an element's surrounding elements. Supports type, ID, class, attribute, and sibling selectors. _Pseudo classes are not yet supported._ The final node in the selector will be returned. Nodes without a specified type will default to `div`.

```
import selectorToElement from 'selector-to-element';

const imgEl = selectorToElement('article#myId a.linkClass[target="_blank"] img');
```
