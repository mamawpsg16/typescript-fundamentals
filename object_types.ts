function greet10(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

interface Person {
  name: string;
  age: number;
}
 
// type Person = {
//   name: string;
//   age: number;
// };
 
function greet11(person: Person) {
  return "Hello " + person.name;
}

// * Property Modifiers

// Optional Properties
// Define the Shape interface
interface ShapeV2 {
  kind: string;
}

interface PaintOptions {
  shape: ShapeV2;
  xPos?: number;
  yPos?: number;
}
// Define the getShape function
function getShape(): ShapeV2 {
  return { kind: "circle" };
}

const shape = getShape();

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions): void {
//   const { shape, xPos = 0, yPos = 0 } = options;
  console.log(`Painting ${shape.kind} at (${xPos}, ${yPos})`);
}

paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });


// * readonly Porperties

interface SomeType {
  readonly prop: string;
}
 
function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);
 
  // ! ERROR But we can't re-assign it.
//   obj.prop = "hello";
}

interface Home {
  readonly resident: { name: string; age: number };
}
 
function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  home.resident.name = 'John Doe';
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}
const visitor = { resident: { name: "Alice", age: 12 } };
const visit =  visitForBirthday(visitor);

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
//   home.resident = {
//     name: "Victor the Evictor",
//     age: 42,
//   };
}

interface PersonV4 {
  name: string;
  age: number;
}
 
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
 
let writablePerson: PersonV4 = {
  name: "Person McPersonface",
  age: 42,
};
 
//CAN STILL BE WRITE AS READONLYPERSON WILL POINT TO THE WRITABLE PERSON IN MEMORY
let readonlyPerson: ReadonlyPerson = writablePerson;

// Now they are two separate objects, so changes to one don’t affect the other.
// let readonlyPerson: ReadonlyPerson = {...writablePerson};
 
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'


// * Index Signatures
interface Scores {
  Alice: number;     // required property
  [name: string]: number;
}

const scores: Scores = {
  Alice: 90,
  Bob: 85,     // OK — Bob is allowed because of the index signature
};


interface BadExample {
   // [key: string]: number;
  [key: string]: string | number;
  name: string; // ❌ Error: when value is just need to be type of number so we use union type for it to be allowed to be string or number
}

interface StringArray1 {
  [index: number]: string;
}
// WORKS WITH ARRAY OR STRING AS THEY HAVE INDICES OF KEY (NUMBER) AND VALUE AS STRING
const stringArray1: StringArray1 = ["a", "b", "c"];

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

// ? readonly in order to prevent assignment to their indices:
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Ann", "Bob", "Charlie"];
// ! ERROR Read Only 
// myArray[2] = "Mallory";


// * Excess Property Checks
interface SquareConfig {
  color?: string;
  width?: number;
  [property: string]: unknown; // to accept wrong properties and have no errors 
}
 
function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
 
let mySquare = createSquare({ colour: "BLUE", width: 100 });
console.log(mySquare, 'mySquare');

// * Extending Types
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
 
let address: AddressWithUnit = {
  name: "John Doe",
  street: "123 Main Street",
  city: "Anytown",
  country: "USA",
  postalCode: "12345",
  unit: "Apt 1",
};

interface Colorful {
  color: string;
}
 
interface CircleV1 {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, CircleV1 {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

// * Intersection Types
interface ColorfulV2 {
  color: string;
}
interface CircleV2 {
  radius: number;
}
 
type ColorfulCircleV2 = ColorfulV2 & CircleV2;
 
const ccc: ColorfulCircleV2 = {
  color: "red",
  radius: 42,
};

function drawV2(circle: ColorfulV2 & CircleV2) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
 
// okay
drawV2({ color: "blue", radius: 42 });
 
// ! ERROR WRONG KEY
// drawV2({ color: "red", raidus: 42 });

// * Generic Object Types
// interface Box<Type> {
//   contents: Type;
// }

type Box<Type> = {
  contents: Type;
};

const stringBox : Box<String> = {
    contents: "hello"
}

function setContents<Type>(box: Box<Type>, newContents: Type) {
    box.contents = newContents;
}
setContents(stringBox, "world")
console.log(stringBox.contents, 'contents');

// * GENERIC HELPER TYPES EXAMPLE
type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
 
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

// NOT GENERIC SO IF ITS USED THE VALUE ALWAYS NEED TO BE STRING, NULL OR STRING[]
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;


const orNullVar : OrNull<string> = "TYPE STRING";   // string | null
const oneOrMany : OneOrMany<string> = ["TYPE STRING"]; // string | string[]
const OneOrManyOrNullVar : OneOrManyOrNull<string> = 'STRING'; // string | string[] | null
const OneOrManyOrNullStrings : OneOrManyOrNullStrings = ['1', '2']; // string | string[] | null

// * The Array Type
function doSomethingV1(value: Array<string>) {
  return value.splice(1);
}
 
let myArrayV1: string[] = ["hello", "world"];
 
// either of these work!
const ex1 = doSomethingV1(myArrayV1);
console.log(ex1, 'ex1');
const ex2 = doSomethingV1(new Array("hello", "world"));
console.log(ex2, 'ex2');

interface ArrayV1<Type> {
  _internal: Type[];  
  values(): Type[];
  /**
   * Gets or sets the length of the array.
   */
  length: number;
 
  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;
 
  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: readonly Type[]): number;
 
  // ...
}

const numbers: ArrayV1<number> = {
    _internal: [],

    length: 0,

    values() {
        return this._internal;
    },

    pop() {
        const popped = this._internal.pop();
        this.length = this._internal.length;
        return popped;
    },

    push(...items: readonly number[]) {
        this._internal.push(...items);
        this.length = this._internal.length;
        return this.length;
    }
};

numbers.push(1, 2, 3);         // length becomes 3
const last = numbers.pop();   // still returns undefined because pop() is stubbed
console.log(numbers.length);

const strings: ArrayV1<string> = {
  _internal: [],

  length: 0,

  values() {
    return this._internal;
  },

  pop() {
    const popped = this._internal.pop();
    this.length = this._internal.length;
    return popped;
  },

  push(...items: readonly string[]) {
    this._internal.push(...items);
    this.length = this._internal.length;
    return this.length;
  }
};
strings.push("a", "b", "c");   // length = 3
const popped = strings.pop(); // returns "something"
console.log(popped, 'popped');
console.log(strings.values());


// * The ReadonlyArray Type
function doStuffV5(values: readonly string[]) {
// function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ! ERROR ...but we can't mutate 'values'.
//   values.push("hello!");
}

// * Tuple Types
type StringNumberPair = [string, number];
function doSomethingV3(pair: [string, number]) {
const [inputString, hash] = pair;
  const a = pair[0];
       
  const b = pair[1];
}
 
doSomethingV3(["hello", 42]);

function useData(): [string, number] {
  return ["Alice", 25];
}

// Optional Tuple Elements
type Either2dOr3d = [number, number, number?];
 
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
              
 
  console.log(`Provided coordinates had ${coord.length} dimensions`);
}

//  ? Tuples can also have rest elements, which have to be an array/tuple type.
// A tuple with a rest element has no set “length” - it only has a set of well-known elements in different positions.
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ["hello", 42, true, false];
const b: StringBooleansNumber = ["hello", true, false, 42];
const c: BooleansStringNumber = [true, false, "hello", 42];
console.log(a, 'a');
console.log(b, 'b');
console.log(c, 'c');

function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}

// * readonly Tuple Types
function doSomethingV6(pair: readonly [string, number]) {
//! ERROR as pair is readonly
// pair[0] = "hello!";
}

//make array readonly
const v1 = ["hello", 42] as const;