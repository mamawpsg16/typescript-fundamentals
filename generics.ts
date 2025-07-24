// * GENERICS
function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>("myString");
let output1 = identity("myString");

/** Working with Generic Type Variables */

function identity2<Type>(arg: Type[]): Type[] {
  return arg;
}

let output3 = identity2<string>(["myString", "myString"]);
console.log(output3, 'output3');

// * Generic Types

// ? Defining a generic function type:
type TransformerV1 = <T>(input: T) => T;

// ?   Using it to constrain the transform parameter: saying: "transform must be a function that conforms to TransformerV1".
function run<T>(value: T, transform: TransformerV1): T {
  return transform(value);
}
run("hello", identity); // Type-safe
run(42, identity);      // Type-safe

function identityV5<Type>(arg: Type): Type {
  return arg;
}
 
// ? Example usages of assigning a function to a variable for the same generic type
// let myIdentity: <Input>(arg: Input) => Input = identityV5;
let myIdentity: { <Type>(arg: Type): Type } = identityV5;


console.log(myIdentity("arigato")); // infers as string
console.log(myIdentity(555));     // infers as number

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

let myIdentityV1: GenericIdentityFn = identityV5;
console.log(myIdentityV1("bonjour")); // infers as string
console.log(myIdentityV1(777));     // infers as number

interface GenericIdentityFnV1<Type> {
  (arg: Type): Type;
}
 
function identityV2<Type>(arg: Type): Type {
  return arg;
}
//  ?  we now will also need to specify the corresponding type argument (here: number),
// ?  effectively locking in what the underlying call signature will use
let myIdentityV2: GenericIdentityFnV1<number> = identityV5
console.log(myIdentityV2(99));     // infers as number
// ! Error;
// console.log(myIdentityV2("hello")); // infers as string

// * GENERIC CLASSES
class BoxV2<T> {
  content: T;

  constructor(value: T) {
    this.content = value;
  }

  getContent(): T {
    return this.content;
  }
}

const stringBoxV1 = new BoxV2<string>("Hello");
console.log(stringBoxV1.getContent()); // "Hello"

const numberBoxV1 = new BoxV2<number>(123);
console.log(numberBoxV1.getContent()); // 123


// * Generic Constraints
function printLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

printLength("hello");         // string has .length
printLength([1, 2, 3]);       // array has .length
printLength({ length: 10 });  // object with length property
// printLength(42); // ❌ Error: number doesn't have .length

interface HasId {
  id: number;
}

function getId<T extends HasId>(item: T): number {
  return item.id;
}

const userV1 = { id: 101, name: "Alice" };
console.log(getId(userV1)); // ✅ OK


// K must be a valid key of object T
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const userV2 = { name: "John", age: 30 };
getProperty(userV2, "name"); // ✅ OK
// getProperty(userV2, "email"); // ❌ Error: "email" not a key of user

// * Using Class Types in Generics

class PersonV3 {
  name = "Alice";
}

class Car {
  model = "Tesla";
}

// c: new () => T means: a constructor that returns a T when called with new
function createInstanceV1<T>(c: new () => T): T {
  return new c();
}

const personV3 = createInstanceV1(PersonV3);
console.log(personV3.name); // "Alice"

const car = createInstanceV1(Car);
console.log(car.model);   // "Tesla"

function createInstanceV2<T>(c: new (...args: any[]) => T, ...args: any[]): T {
  return new c(...args);
}

class UserV3 {
  constructor(public username: string, public id: number, public active: boolean) {}
}

const u = createInstanceV2(UserV3, "Kevin", 2, true);
console.log(u); // "Kevin"

// * Generic Parameter Defaults

// ? Function with Default Generic Type
function printValue<T = string>(value: T): void {
  console.log(value);
}

printValue("Hello"); // T is inferred as string (default)
printValue<number>(42); // Explicitly overrides T to be number

// ? Interface with Default Generic
interface BoxV3<T = string> {
  content: T;
}

const stringBoxV2: BoxV3 = { content: "hello" };      // T is string
const numberBoxV2: BoxV3<number> = { content: 123 };  // T is number
console.log(stringBoxV2, numberBoxV2);

// ? Class with Generic Default
class ResponseV1<T = string> {
  constructor(public data: T) {}
}

const defaultResponse = new ResponseV1("Success");       // T = string
const jsonResponse = new ResponseV1<{ ok: boolean }>({ ok: true }); // T = { ok: boolean }


// * Variance Annotations
// ? Covariance
class AnimalV1 {}
class DogV1 extends AnimalV1 {}

function makeDog(): DogV1 {
  return new DogV1();
}

let makerV1: () => AnimalV1 = makeDog; // ✅ Allowed (Dog is subtype of Animal)

// ? Contravariance
function handleAnimal(animal: AnimalV1) {}

// let handler: (dog: Dog) => void = handleAnimal; // ❌ Error in strict mode
let handler: (animal: AnimalV1) => void = (dog: DogV1) => { }; // ✅ This is safe


// ? Invariance

interface BoxV4<T> {
  value: T;
}

let dogBox: BoxV4<DogV1> = { value: new DogV1() };
// let animalBox: BoxV4<AnimalV1> = dogBox; // ❌ Error — Box is invariant


// ? Bivariance

type Handler<T> = (value: T) => void;

let dogHandler: Handler<DogV1> = (d) => console.log(d);
let animalHandlerV1: Handler<AnimalV1> = dogHandler; // ✅ Allowed in default mode (bivariant)

animalHandlerV1(new AnimalV1()); // Runtime issue if Dog logic is assumed
