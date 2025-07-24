// * Function Type Expressions

//The syntax (a: string) => void means “a function with one parameter, named a, of type string, that doesn’t have a return value”.
type GreetFunction = (a: string) => void;
// function greeter(fn: (a: string) => void) {
function greeter(fn: GreetFunction) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);

// * Call Signatures (callable objects)
type EmailValidatorFn ={
    description: string;
    (value: string): boolean;
}

const isEmail : EmailValidatorFn = (value: string) => value.includes('@');
isEmail.description = 'Email Validator';

function validate(fn:EmailValidatorFn){
    console.log(`Function name: ${fn.description}, Response: Is Email: ${fn('hello@')}`);
}

validate(isEmail);

// * Construct Signatures

class MyClass {
  constructor(public name: string) {}
}
type MyClassConstructor = {
  new (name: string): MyClass;
};

function createInstance(ctor: MyClassConstructor) {
  return new ctor("Hello!");
}

const instance = createInstance(MyClass); // ✅ Works!
console.log(instance.name, 'instance.name');

type DateLike = {
  (): string;    // Call signature: acts like a function
  new (): Date;  // Construct signature: acts like a constructor
};

function useDate(dateLike: DateLike) {
  const d1 = dateLike();      // Call like a function → returns string
  const d2 = new dateLike();  // Call as a constructor → returns Date

  console.log("Called as function:", d1);
  console.log("Called with new:", d2.toISOString());
}

// JavaScript's built-in Date fits this signature
useDate(Date);


interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}
 
function fn(ctor: CallOrConstruct) {
  // Passing an argument of type `number` to `ctor` matches it against
  // the first definition in the `CallOrConstruct` interface.
  console.log(ctor(10), 'ctor(10)');
               
 
  // Similarly, passing an argument of type `string` to `ctor` matches it
  // against the second definition in the `CallOrConstruct` interface.
  console.log(new ctor("10"), 'new ctor("10")');
                   
}
 
fn(Date);

// * Generic Functions

// ! HAS ANY FUNCTION PROBLEMATIC
// function firstElement(arr: any[]) {
//   return arr[0];
// }

//   correct
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
console.log(firstElement(["a", "b", "c", 1]));
// n is of type 'number'
console.log(firstElement([1, 2, 3]));
// u is of type undefined
console.log(firstElement([]));

// * Inference

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed, 'parsed');

// * Constraints

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray, 'longerArray');
// longerString is of type 'alice' | 'bob'
const longerString = longest('bob', "alice" );
console.log(longerString, 'longerString');
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);

// * Working with Constrained Values

// ! WRONG AS THE RETURN SHOULD BE TYPE OF THE PARAMETER WHICH IN THIS CASE IS AN ARRAY OF NUMBER
// function minimumLength<Type extends { length: number }>(
//   obj: Type,
//   minimum: number
// ): Type {
//   if (obj.length >= minimum) {
//     return obj;
//   } else {
//     return { length: minimum };
//   }
// }
// const arr = minimumLength([1, 2, 3], 6);

// * Specifying Type Arguments

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// ! ERROR AS THE RETURN SHOULD BE TYPE OF THE PARAMETER WHICH IN THIS CASE IS AN ARRAY OF NUMBER
// const arr = combine([1, 2, 3], ["hello"]);


// ? If you intended to do this, however, you could manually specify 
const arr = combine<string | number>([1, 2, 3], ["hello"]);
console.log(arr, 'arr');

// * Guidelines for Writing Good Generic Functions

// TODO  - Push Type Parameters Down
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
console.log(firstElement1([1, 2, 3]), 'firstElement1');

// TODO - Use Fewer Type Parameters
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

console.log(filter1([1, 2, 3], (n) => n > 1), 'filter2');

// TODO - Type Parameters Should Appear Twice
// ! INSTEAD
// function greet2<Str extends string>(s: Str) {
//   console.log("Hello, " + s);
// }

// ? DO
// function greet2(s: string) {
//   console.log("Hello, " + s);
// }


// * Optional Parameters
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK

// * Default Parameters
function g(x: number = 10) {
  // ...
}
g();
g(10);
g(undefined);


// TODO - Optional Parameters in Callbacks (BETTER TO DONT HAVE AN OPTIONAL PARAMETER)
function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i.toFixed()));


// * Function Overloads

function parse(input: string): string[];
function parse(input: string[]): string[];
function parse(input: string | string[]): string[] {
  if (typeof input === "string") {
    return input.split(",");
  } else {
    return input;
  }
}

console.log(parse("a,b,c"));      // ["a", "b", "c"]
console.log(parse(["x", "y"]));;   // ["x", "y"]

// --- Overload Signatures ---
function combine1(a: string, b: string): string;
function combine1(a: number, b: number): number;
// --- Implementation Signature ---
function combine1(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Invalid arguments");
}

// ✅ Valid usages
const result1 = combine1(1, 2);         // number (3)
const result2 = combine1("a", "b");     // string ("ab")
console.log(result1, 'result1');
console.log(result2, 'result2');

// TODO - Overload Signatures and the Implementation Signature

// ! ERROR  COMMON MISTAKE IN OVERLOAD 2 FUNCTION BDDIES
// ❌ This causes an error!
// function doStuff(x: number): number {
//   return x + 1;
// }
// function doStuff(x: string): string {
//   return x + "!";
// }

// ? CORRECT WAY
// --- Overload Signatures ---
function doStuff(x: number): number;
function doStuff(x: string): string;
// --- Implementation Signature ---
function doStuff(x: number | string): number | string {
  if (typeof x === "number") return x + 1;
  else return x + "!";
}

// ! ERROR TypeScript checks only the overloads when validating calls
// function fn1(x: string): void;
// function fn1() {
//   // ...
// }

// // ! ERROR Expected to be able to call with zero arguments
// fn1();

// ? CORRECT WAY
function fn1(): void;
function fn1(x: string): void;
function fn1(x?: string) {
  console.log("called", x);
}

fn1();         // ✅ OK
fn1("hello");  // ✅ OK

// * Writing Good Overloads
// In this case, TypeScript can't resolve the overload, because the argument is not a string or an any[].
// it's a union (string | any[]).
// fn3(Math.random() > 0.5 ? "hello" : [0]);

// UNION TYPE VS FUNCTION OVERLOADS

// ? UNION TYPE
function fn2(x: string | number) {
  // must check which type it is
  if (typeof x === "string") {
    console.log("string:", x.toUpperCase());
  } else {
    console.log("number:", x.toFixed(2));
  }
}

// ? FUNCTION OVERLOADS
function fn3(x: string): void;
function fn3(x: number): void;
function fn3(x: any) {
  // same logic inside, but separate "signatures"
}


// * Declaring this in a Function
interface User1 {
  id: number;
  admin: boolean;
}

interface DB {
  users: User1[];
  filterUsers(filter: (this: User1) => boolean): User1[];
}

const getDb = function(): DB{
  return {
    users: [
      {
        id: 1,
        admin: true
      },
      {
        id: 2,
        admin: false
      },
      {
        id: 3,
        admin: false
      }
    ],

    filterUsers(callback){
      return this.users.filter(user => {
        return callback.call(user);
      })
    }
  }
}

const db = getDb();
const admins = db.filterUsers(function(this: User1){
  return this.admin;
})

console.log(admins, 'admins');

// * Other Types to Know About

// void
function noop() {
  return;
}

// unknown - The unknown type represents any value.
// This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value:

function safeParse(s: string): unknown {
  return JSON.parse(s);
}
 
// Need to be careful with 'obj'!
const someRandomString = '{"x": 10, "y": 20}';
const obj1 = safeParse(someRandomString);

console.log(obj1, 'obj1');

// never
function fn5(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}


// * Rest Parameters and Arguments
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

console.log(multiply(2, 1, 2, 3));
// Rest Arguments
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// * Parameter Destructuring
type ABC = { a: number; b: number; c: number };
// function sum({ a, b, c}: { a: number, b: number, c: number }) {
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });

// * Assignability of Functions 
// ! () => void  = "I don’t care what it returns; just don't use it"
// ! (): void    = "I promise this returns nothing, ever"
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true; // ✅ allowed
};

const f2: voidFunc = () => true; // ✅ allowed

const f3: voidFunc = function () {
  return true; // ✅ allowed
};

// const f5 = function (): void {
//   return true; // ❌ Error
// };


console.log(f1(),'TF');// TypeScript says: result is of type `void`
