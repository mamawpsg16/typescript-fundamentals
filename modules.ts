import helloWorld from "./modules/hello";
import { pi as pip, absolute } from './modules/math';
// import {createCatName}  from "./modules/animal";
// * import type
// import type { Cat, Dog } from "./modules/animal";

// * Inline type imports
import { createCatName, type Cat, type Dog } from "./modules/animal";
// import * as math from './modules/math';

helloWorld()
console.log(pip,'is the value of pi from the math module');
console.log(absolute(-5), 'is the absolute value of -5 from the math module');
type Animals = Cat | Dog;

const pomeranian: Dog = {
  breeds: ['Pomeranian'],
  yearOfBirth: 2018
};
console.log(pomeranian, 'is a Pomeranian dog');

const persian: Cat = {
  breed: 'Persian',
  yearOfBirth: 2017
};
console.log(persian, 'is a Persian cat');
console.log(createCatName());

// * ES Module Syntax with CommonJS Behavior
// import fs = require("fs");
// const code = fs.readFileSync("hello.ts", "utf8");