# TypeScript none standard JSDOC Import syntax
```js
// 1.Normal Case
/**
 * @param {import('./user').User} user
 */



// typescript
// 1. normal
/**
 * @param p { import("./a").Pet }
 */
function walk(p) {
    console.log(`Walking ${p.name}...`);
}

// 2.Alias Type
/**
 * @typedef { import("./a").Pet } Pet
 */

/**
 * @type {Pet}
 */
var myPet;
myPet.name;

// 3.Refer Inferred Type
/**
 * @type {typeof import("./a").x }
 */
var x = require("./a").x;
```