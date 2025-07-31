// *  Awaited<Type>
async function fetchUser() {
  return {
    id: 1,
    name: "Kevin",
  };
}
type AW = Awaited<Promise<string>>;
 
type BW = Awaited<Promise<Promise<number>>>;
 
type CW = Awaited<boolean | Promise<number>>;

type fetchedUser = Awaited<ReturnType<typeof fetchUser>>;
// Same as:
// type User = { id: number; name: string };


function greetMeBro(user: fetchedUser) {
  console.log(`Hello, ${user.name}`);
}

greetMeBro({
  id: 1,
  name: "Kevin",
})

async function getData() {
  return Promise.all([Promise.resolve(42), Promise.resolve("hello")]);
}

type Data = Awaited<ReturnType<typeof getData>>;
// type Data = [number, string]


// * Partial<Type> = makes all properties of Type optional
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
console.log(todo2, 'todo2' );

// * Required<Type>
interface Props {
  a?: number;
  b?: string;
}
 
const obj55: Props = { a: 5 };
 
// const qwerty : Required<Props> = { a: 5 };  // ! Error: Property 'b' is missing in type '{}' but required in type 'Required<Props>'.

// *  Readonly<Type>
const todov1: Readonly<Todo> = {
  title: "Delete inactive users",
  description: "Remove users who haven't logged in for a year",
};
// todov1.title = "Hello"; // ! Error: Cannot assign to 'title' because it is a read-only property.

const obj25 = {
  prop: 42,
};

Object.freeze(obj25);

// obj25.prop = 33;
// Throws an error in strict mode

// console.log(obj25.prop);
// Expected output: 42

// * Record<Keys, Type> = constructs an object type whose property keys are Keys and property values are Type
type CatName = "miffy" | "boris" | "mordred";
 
interface CatInfo {
  age: number;
  breed: string;
}
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

console.log(cats, 'cats');

// * Pick<Type, Keys> = constructs a type by picking the set of properties Keys from Type
interface TodoV1 {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<TodoV1, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 

// * Omit<Type, Keys> = constructs a type by picking all properties from Type and then removing Keys
interface TodoV2 {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreviewV1 = Omit<TodoV2, "description">;
 
const todoV1: TodoPreviewV1 = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
 
type TodoInfo = Omit<TodoV2, "completed" | "createdAt">;
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

// * Exclude<UnionType, ExcludedMembers> = constructs a type by removing ExcludedMembers from UnionType
type ShapeV4 =
| { kind: "circle"; radius: number }
| { kind: "square"; x: number }
| { kind: "triangle"; x: number; y: number };

type T0 = Exclude<"a" | "b" | "c", "a">;
     
type T2 = Exclude<"a" | "b" | "c", "a" | "b">;
     
type T3 = Exclude<string | number | (() => void), Function>;

type T4= Exclude<ShapeV4, { kind: "circle" }>

const t4Val :T4 = {
  kind: "square",
  x: 1
}; 

// * Extract<Type, Union> = constructs a type by extracting from Type all union members that are assignable to Union
type T5 = Extract<"a" | "b" | "c", "a" | "f" | "c">;
type T6 = Extract<string | number | (() => void), Function>;
type ShapeV5 =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T7 = Extract<ShapeV5, { kind: "circle" }>

// * NonNullable<Type> = constructs a type by excluding null and undefined from Type
type T8 = NonNullable<string | number | null | undefined>;
type T9 = NonNullable<string[] | null | undefined>;

// * Parameters<Type> = constructs a tuple type from the types used in the parameters of a function type Type
function greetV7(name: string, age: number) {
  console.log(`Hello, my name is ${name} and I am ${age} years old.`);
}

type GreetParams = Parameters<typeof greetV7>;

const args: GreetParams = ["Kevin", 25];

greetV7(...args); // ✅ works

//  ? 1. T extends (...args: any[]) => anyWe're defining a generic type parameter T. T must be a function type that: Takes any number of arguments of any type, And returns any type.
//  ? 2. fn: T This is the first parameter to logAndCall. It must be a function (because T must be a function).
//  ? 3. ...args: Parameters<T> This is the rest of the parameters (the actual arguments to call fn with). Parameters<T> is a built-in utility type that extracts a tuple of argument types from the function T.
//  ? 4. : This is the return type of logAndCall. It will return whatever the function fn returns.
function logAndCall<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T> {
  console.log("Calling with:", args);
  return fn(...args);
}
logAndCall(greetV7, "Kevin", 25);

// * ConstructorParameters<Type>
class UserNan {
  constructor(public name: string, public age: number) {}
}

// Extract the constructor parameters:
type UserConstructorArgs = ConstructorParameters<typeof UserNan>;
// Result: [name: string, age: number]


function createNewUser(...args: ConstructorParameters<typeof UserNan>) {
  return new UserNan(...args);
}

const u11 = createNewUser("Kevin", 25); // ✅ Correct
// const u22 = createNewUser("Wrong");     // ❌ Error: missing age
abstract class NewAnimal {
  constructor(public name: string) {}
  abstract speak(): void;
}

class NewDog extends NewAnimal {
  speak() {
    console.log("Woof!");
  }
}

type ConcreteCtor<T> = new (...args: any[]) => T;

function makeAnimal<C extends ConcreteCtor<InstanceType<C>>>(Ctor: C,...args: ConstructorParameters<C>): InstanceType<C> {
  return new Ctor(...args);
}

const doggy = makeAnimal(NewDog, "Buddy");
doggy.speak(); // ✅ Woof!


// * ReturnType<Type> = constructs a type consisting of the return type of function Type
function getUserName(userId: number): string {
  return `User${userId}`;
}
const getUserByArrowFn = (userId: number): string => `User${userId}`;

type UserName = ReturnType<typeof getUserName>;

type UserNameByArrowFn = ReturnType<typeof getUserByArrowFn>;


type T10 = ReturnType<() => string>;

type T11 = ReturnType<(s: string) => void>;
// U extends number[]	U must be a kind of number[]
// T extends U	T must be compatible with U
type T13 = ReturnType<<T extends U, U extends number[]>() => T>;

const newlyCreatednumbersArray: T13 =   [1, 2, 3]; // ✅ Valid

// * InstanceType<Type>

class UserTF {
  name: string = "Kevin";
  greet() {
    console.log("Hello " + this.name);
  }
}

// Equivalent to: type UserInstance = { name: string; greet(): void }
type UserInstance = InstanceType<typeof UserTF>;

const uTF: UserInstance = new UserTF(); // ✅
uTF.greet();

//* NoInfer<Type>
function chooseOption<Options extends string>(
  options: Options[],
  defaultOption: NoInfer<Options>
) {
  // Must be a valid option
}

chooseOption(["small", "medium", "large"], "medium"); // ✅
// chooseOption(["small", "medium", "large"], "extra-large"); // ❌ Error : Argument of type '"extra-large"' is not assignable to parameter of type '"small" | "medium" | "large"'.

// * ThisParameterType<Type>
function greetParameterType(this: { name: string }) {
  console.log("Hello, " + this.name);
}

type GreetThis = ThisParameterType<typeof greetParameterType>; // => { name: string }

const objParameterType = { name: "Alice" };

// Type-safe binding
const boundGreet = greetParameterType.bind({ name: "Bob" } as ThisParameterType<typeof greetParameterType>);

function bindMethod<T extends (this: any, ...args: any[]) => any>(method: T, thisArg: ThisParameterType<T>): (...args: Parameters<T>) => ReturnType<T> {
  return method.bind(thisArg);
}


function greetBind(this: { name: string }, msg: string) {
  return `${msg}, ${this.name}`;
}

const personBind = { name: "Alice" };

// Bind greet with person — strongly typed
const boundedGreet = bindMethod(greetBind, personBind);

console.log(boundedGreet("Hello")); // "Hello, Alice"


// * OmitThisParameter<Type>
function greetOmitThisParameter(this: { name: string }, message: string): string {
  return `${message}, ${this.name}`;
}

const userb = {
  name: "Alice",
  greetOmitThisParameter
};

// ✅ Fix it by binding
userb.greetOmitThisParameter.call(userb, "Hello");

// ✅ Or remove `this` type with OmitThisParameter
const sayHello: OmitThisParameter<typeof greetOmitThisParameter> = greetOmitThisParameter.bind(userb);
sayHello("Hello"); // OK — now it's just (message: string) => string

// * ThisType<Type>
type MyObjectType = {
  name: string;
  greet(): void;
} ;

const obj265: MyObjectType = {
  name: "Kevin",
  greet() {
    console.log("Hello, " + this.name); // ✅ this.name is valid
  }
};

obj265.greet(); // Hello, Kevin
