/**
 * * ANY
 */
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
// obj.foo(); //ERROR
// obj(); // ERROR
obj.bar = 100;
console.log(obj,'obj');

obj = "hello";
console.log(obj,'obj 1');
const n: number = obj;

console.log(n ,'obj 2');

/*
* * TYPE ANNOTATIONS ON VARIABLES
*/
let myName: string = "Alice";

// No type annotation needed -- 'myName' inferred as type 'string'
let myName2 = "Alice";


/**
 * * FUNCTIONS
 */

/**
 * TODO Parameter Type Annotations
 */
// 
function greet2(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
}
greet2("Kevin");

/**
 * TODO Return Type Annotations
*/

function getFavoriteNumber(): number {
return 26;
}

async function getFavoriteNumber2(): Promise<number> {
    return 26;
}


/**
 * TODO Anonymous Function
*/

const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});


/**
 * TODO Object Types
 */
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// Optional Properties
function printName(obj: { first: string; last?: string }) {
    if (obj.last !== undefined) {
        // OK
        console.log(obj.last.toUpperCase());
    }
    const lastName = obj?.last ?? '';
    console.log(`Hello Im ${obj.first} ${lastName}`);
  }
  // Both OK
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });

/**
 * * UNION TYPES
 */

/**
 * TODO Defining a Union Type
 */
function printId(id: | number | string | { myID   :number}) {
 console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });


function printId1(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
}

// Another example is to use a function like Array.isArray:

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

// Sometimes you’ll have a union where all the members have something in common.
//  For example, both arrays and strings have a slice method. If every member in a union has a property in common, you can use that property without narrowing:
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

/** 
 * * TYPE ALIASES
 */

type ID = number | string;

type Point1 = {
    x: number;
    y: number;
  };
   
  // Exactly the same as the earlier example
function printCoord1(pt: Point1) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord1({ x: 100, y: 100 });


/**
 * * INTERFACES
*/
interface Point3 {
    x: number;
    y: number;
  }
   
function printCoord3(pt: Point) {
console.log("The coordinate's x value is " + pt.x);
console.log("The coordinate's y value is " + pt.y);
}
   
printCoord3({ x: 100, y: 100 });


/**
 * * LITERAL TYPES
 */

let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
      
/**
 * ! LITERAL TYPE 
 */
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation

function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
}
//OK
printText("Hello, world", "left");
//ERROR centre is not available in the alignment literal types
// printText("G'day, mate", "centre");

// Of course, you can combine these with non-literal types:
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
//OK
configure({ width: 100 });
configure("auto");
//ERROR
// configure("automatic");


/**
 * TODO Literal Inference
 */

// declare function handleRequest(url: string, method: "GET" | "POST"): void;

//ERROR AS method get is getting infered as string instead of Literal "GET"
// const req = { url: "https://example.com", method: "GET" };

// Solution 1: Use as const tells TypeScript: “This object and its values are literal and readonly.”
// const req = {
//     url: "https://example.com",
//     method: "GET",
// } as const;

//Solution 2: Annotate the object
const req: { url: string; method: "GET" | "POST" } = {
    url: "https://example.com",
    method: "GET",
  };
// handleRequest(req.url, req.method);

/**
 * * Non-null Assertion Operator (Postfix!)
 */
function getLength1(str?: string) {
    if (!str) return 0;
return str!.length; // ✅ OK — we just checked that str exists
}


console.log('ABC');

//  * TUPPLE = “An array where I know exactly how many items there are, and what type each item should be.”

let personV25: [string, number];

personV25 = ["Kevin", 25]; // ✅ OK
console.log(personV25, 'personV25');
// personV25 = [25, "Kevin"]; // ❌ Error: wrong types in wrong positions

// ? With Function Returns
function getUserNow(): [string, number] {
  return ["Alice", 30];
}

const [returnedName, returnedAge] = getUserNow(); // name: string, age: number
console.log(returnedName, returnedAge, 'returnedName, returnedAge');


// ? 🔄 Optional Elements in Tuples
type OptionalTuple = [string, number?];

let t1: OptionalTuple = ["foo"];         // ✅ OK
let t2: OptionalTuple = ["foo", 123];    // ✅ OK


type NewPoint = [x: number, y: number];

function logPointNew(p: NewPoint) {
  console.log(p[0], p[1]); // 10 20
}

logPointNew([10, 20]);

let arrNew: number[] = [1, 2, 3];
let tup: [string, number] = ["id", 42];
