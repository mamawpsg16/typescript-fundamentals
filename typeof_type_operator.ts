console.log(typeof "Hello world");
let s = "hello";
let n1: typeof s;


const user12 = {
  name: "Kevin",
  age: 30,
};

// Use typeof to extract the type of `user`
type UserTypeV1 = typeof user12;

const anotherUser: UserTypeV1 = {
  name: "Alice",
  age: 25,
};


const PI = 3.14;

type PiType = typeof PI; // number

// *  Getting function types
function greetV5(name: string): string {
  return `Hello, ${name}`;
}

type GreetFunctionV1 = typeof greetV5;

const sayHi: GreetFunctionV1 = (name) => `Hi ${name}`;

console.log(sayHi("Alice"),'sayHi("Alice");');

// *  Safer dynamic object access
const COLORS = {
  primary: "#000",
  secondary: "#fff",
};

type ColorKeys = keyof typeof COLORS;

function getColor(color: ColorKeys) {
  return COLORS[color];
}

console.log(getColor("primary"),'getColor("primary");');


function faa() {
  return { x: 10, y: 3 };
}
type PV2 = ReturnType<typeof faa>;

function doSomethingAA(flag: boolean): number {
  return flag ? 1 : 0;
}

type Args = Parameters<typeof doSomethingAA>; // [flag: boolean]
type Ret = ReturnType<typeof doSomethingAA>;  // number
