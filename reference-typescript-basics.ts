/** 
 * * TYPE INFERENCE (AUTOMATIC TYPE BASED ON THE VALUE) -  “figure out base on the value”
 */

let age = 15
let helloWorld = "Hello World";

/**
 * * DEFINING TYPES
 */

//
/**
 * TODO INTERFACE
 */
interface User {
    name: string,
    id: number
}

const user : User = {
    name: "Hayes",
    id: 0,
};

console.log(user, 'user');

class UserAccount {
    name: string;
    id: number;
   
    constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
    }
  }

//USAGE
const user1 : User = new UserAccount("Murphy", 1);
console.log(user1, 'user1');

const sumFuncExpression = function(numbers: number[]) : number{
    return numbers.reduce((accu, num) => accu + num, 0)
}

const sumArrowFn = (numbers: number[]) : number => {
    return numbers.reduce((accu, num) => accu + num,0)
}

const sumIifeFn = ((numbers: number[]) : number => {
    return numbers.reduce((accu, num) => accu + num,0)
})([1, 3, 4]);

const sumFunctExp = sumFuncExpression([1, 2, 3]);
console.log(sumFunctExp, 'sumFunctExp');

const sumArrowFunct = sumArrowFn([4,5,6]);
console.log(sumArrowFunct, 'sumArrowFunct');

console.log(sumIifeFn, 'sumIifeFunct');

const user2 = { name: "Kevin", id: 1 };
type UserType = typeof user2;

/**
 * * COMPOSING TYPES
 */

//
/**
 * TODO UNIONS
 */
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

//USAGE
const isLocked:LockStates = "locked";
function getLength(obj: string | string[]) {
    return obj.length;
}

function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}

/**
 * * GENERICS
 */

//These are concrete (i.e., not generic) types.
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

//Real generics
// So, Type could be: string, number, User,{ name: string; age: number }, Anything you want.
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
/** 
 * ? Without generics, you'd need to write: 
 */ 
interface StringBackpack {
    add: (obj: string) => void;
    get: () => string;
}

interface NumberBackpack {
    add: (obj: number) => void;
    get: () => number;
}
// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
//"Assume this variable exists at runtime, and here's its type. Don’t worry about where it’s actually defined.
//declare const is for types only, not runtime.
//declare only works in typescript
/**
 * !ERROR declare const backpack: Backpack<string>; 
 * !ERROR declare only works in typescript
*/
const backpack: Backpack<string> = createBackpack("Initial string");

// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
 
// Since the backpack variable is a string, you can't pass a number to the add function.
// backpack.add(23);
function createBackpack<Type>(initial: Type): Backpack<Type> {
    let item = initial;
  
    return {
      add: (obj: Type) => { item = obj; },
      get: () => item
    };
  }
  
  const nameBackpack = createBackpack<{ name: string }>({ name: "Kevin" });
  nameBackpack.add({ name: "John" });      // ✅
  console.log(nameBackpack.get());

/**
 * 
 * * STRUCTURAL TYPE SYSTEM
 */

interface Point {
x: number;
y: number;
}

function logPoint(p: Point) {
console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

//The shape-matching only requires a subset of the object’s fields to match.
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
 
/**
 * !ERROR DONT HAVE A MATCHE SUBSET OF FIELDS TO MATCH
 *
*/
const color = { hex: "#187ABF" };
// logPoint(color);

// There is no difference between how classes and objects conform to shapes:
class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"