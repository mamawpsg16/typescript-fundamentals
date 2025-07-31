// * Class Members

// ! this will just work with stritct disabled in tsconfig.json
// class Point {
//   x: number;
//   y: number;
// }
// const pt = new Point();
// pt.x = 0;
// pt.y = 0;
 
// ? Fields
// * SHORTHAND VERSION
class Point {
  x = 3;
  y = 4;
}
// * VERBOSE VERSION
// class Point {
//   x:number;
//   y:number;

//   constructor() {
//     this.x = 0;
//     this.y = 0;
//   }
// }
const pt = new Point();
// Prints 0, 0
console.log(`${pt.x}, ${pt.y}`);
// pt.x = 'ABC'; // Error: Type 'string' is not assignable to type 'number'.

class GoodGreeter {
  name: string;
 
  constructor() {
    this.name = "hello";
  }
}

// ?  definite assignment assertion (!) = 	I promise to assign this later (don't check)
class GreeterV2 {
    name!: string; // ✅ No error now
    // name: string; // ❌ Error: Property 'name' has no initializer and is not definitely assigned in the constructor.
}

// * readonly - can be assigned At the declaration (like name = "world"), or Inside the constructor of the same class.
class Greeter {
  readonly name: string = "world";
 
  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
 
//   err() {
//     this.name = "not ok";
//   }
}

const g1 = new Greeter("AYAYAY");
console.log(g1.name);
// g1.name = "also not ok";

// * Constructors

class PointV3 {
  x: number;
  y: number;
 
  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

const p1 = new PointV3();

class PointV4 {
  x: number = 0;
  y: number = 0;
 
  // Constructor overloads
  constructor();
  constructor(x: number, y: number);
  constructor(xy: string);
  constructor(x: string | number = 0, y: number = 0) {
    if (typeof x === "string") {
      const xy = x.split(",");
      this.x = Number(xy[0]);
      this.y = Number(xy[1]);
    } else {
      this.x = x;
      this.y = y;
    }
  }
}

const p2 = new PointV4();

// * Super Calls
class Base {
  k = 4;
}
 
class Derived extends Base {
  constructor() {
      super();
    // Prints a wrong value in ES5; throws exception in ES6
    console.log(this.k);
  }
}

const d1 = new Derived();

// * Methods
class PointV5 {
  x = 10;
  y = 5;
 
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

const p3 = new PointV5();
p3.scale(2);
console.log(`${p3.x}, ${p3.y}`);

class C {
  x: string = "hello";
 
  m() {
    // This is trying to modify 'x' from line 1, not the class property
    this.x = "world";
  }
}

const c1 = new C();
c1.m();
console.log(c1.x);


// * Getters / Setters

class CV1 {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}

const cv1 = new CV1();
cv1.length = 10;
console.log(cv1.length);

class Thing {
  _size = 0;
 
  get size(): number {
    return this._size;
  }
 
  set size(value: string | number | boolean) {
    let num = Number(value);
    // Don't allow NaN, Infinity, etc
 
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
 
    this._size = num;
  }
}

const thing = new Thing();
thing.size = 25;
console.log(thing.size); // 20


// * Index Signatures

// ? Any string-named property on MyClassV1 must be either a boolean or a function like (x: string) => boolean.
class MyClassV1 {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string): boolean {
    const value = this[s];
    if (typeof value === "function") {
      return value(s); // Call the function with `s`
    }
    return value;
  }
}

const obj2 = new MyClassV1();
obj2["isReady"] = true;
obj2["checkName"] = (name) => name.length > 0;

function checkName(name: string): boolean {
    return name.length > 0;
}
obj2["checkNameV2"] = checkName;

console.log(obj2["isReady"]); // true
console.log(obj2["checkName"]("a"), "checkName"); // true
console.log(obj2.check("isReady"), "check");      
console.log(obj2["checkNameV2"]("John"), "checkNameV2"); // true

// * Class Heritage
interface Pingable {
  ping(): void;
}
interface isCool {
  isCool: boolean;
  check(name: string): boolean;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
 
class Ball implements Pingable, isCool {
  check(name: string): boolean {
      return name.length > 0;
  }
  isCool = true;
  ping() {
    console.log("ping!");
  }
  pong() {
    console.log("pong!");
  }
}

// * Cautions
interface Checkable {
  check(name: string): boolean;
}
 
// class NameChecker implements Checkable {
//   check(s) { // ! Error: Property 's' implicitly has an 'any' type.
//     // Notice no error here
//     return s.toLowerCase() === "ok";
                 
//   }
// }

// interface AA {
//   x: number;
//   y?: number;
// }
// class CC implements AA {
//   x = 0;
// }
// const cc12 = new CC();
// // cc12.y = 10; // ! Error: Property 'y' is optional in type 'AA' but required in type 'CC'.

// * extends Clauses
class AnimalZ1 {
  move() {
    console.log("Moving along!");
  }
}
 
class DogZ1 extends AnimalZ1 {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
const d = new DogZ1();
// Base class method
d.move();
// Derived class method
d.woof(3);

// * Overriding Methods
class BaseZ1 {
  greet() {
    console.log("Hello, world!");
  }
}
 
class DerivedZ1 extends BaseZ1{
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const dZ1 = new DerivedZ1();
dZ1.greet();
dZ1.greet("reader");
const bZ1 : BaseZ1 = dZ1;
bZ1.greet(); // Calls the overridden method in DerivedZ1

// * Type-only Field Declarations

interface AnimalZ2 {
  dateOfBirth: any;
}
 
interface DogZ2 extends AnimalZ2 {
  breed: any;
}
 
// class AnimalHouse {
//   resident: AnimalZ2;
//   constructor(animal: AnimalZ2) {
//     this.resident = animal;
//   }
// }
 
// class DogHouse extends AnimalHouse {
//  declare resident: DogZ2;
//   constructor(dog: DogZ2) {
//     super(dog);
//   }
// }

class AnimalHouse<T extends AnimalZ2> {
  resident: T;
  constructor(animal: T) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse<DogZ2> {
  constructor(dog: DogZ2) {
    super(dog);
  }
}

const dogHouse = new DogHouse({
  dateOfBirth: new Date(),
  breed: "Labrador"
});
console.log(dogHouse.resident.breed); // Labrador

// * Initialization Order
class BaseZZZ {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
 
class DerivedZZZ extends BaseZZZ {
  name = "derived";
  constructor() {
    super();
    console.log("My name is " + this.name);}
}
 
const dZZZ = new DerivedZZZ();

// * Inheriting Built-in Types
// ❌ Without prototype fix - methods may be undefined, instanceof breaks
class ValidationError extends Error {
  constructor(field: string) {
    super(`Invalid ${field}`);
  }
  
  getField(): string {
    return this.message.replace('Invalid ', '');
  }
}

// ✅ With prototype fix - works correctly
class FixedValidationError extends Error {
  constructor(field: string) {
    super(`Invalid ${field}`);
    Object.setPrototypeOf(this, FixedValidationError.prototype);
  }
  
  getField(): string {
    return this.message.replace('Invalid ', '');
  }
}

// Test the difference
const broken = new ValidationError('email');
const fixed = new FixedValidationError('email');

console.log('Broken instanceof:', broken instanceof ValidationError); // might be false
console.log('Fixed instanceof:', fixed instanceof FixedValidationError); // true

// These method calls might fail without the prototype fix
console.log('Fixed getField():', fixed.getField()); // "email"

// * Member Visibility

// ? public (Default visibility no need to put)
class GreeterHAHA {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
const gG = new GreeterHAHA();
gG.greet();

// ? protected =  members are only visible to subclasses of the class they’re declared in.

class SpecialGreeter extends GreeterHAHA {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const gg1 = new SpecialGreeter();
gg1.greet(); // OK
// gg1.getName(); // ! Error: Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.

// * Exposure of protected members

// ? 1. Returning a protected member through a public method
class MyClassV2 {
  protected secret = "shhh";

  // This method is public and leaks the protected field
  getSecret() {
    return this.secret;
  }
}

const inst = new MyClassV2();
console.log(inst.getSecret()); // "shhh" - ❗ exposure of protected

//  ? 2. Subclass exposes protected member via public access
class A11 {
  protected x = 100;
}
class B12 extends A11 {
  x = 200; // ❗ This is allowed, but it exposes the protected member
  get exposedX() {
    return this.x; // ❗ this publicly exposes a protected member
  }
}

const b12 = new B12();
console.log(b12.exposedX); // 100

// ? private = private is like protected, but doesn’t allow access to the member even from subclasses:
// ? private members aren’t visible to derived classes, a derived class can’t increase their visibility to protected/public:

class Baseae {
  private x = 0;
}
const bae = new Baseae();
// console.log(bae.x); // ! Error: Can't access from outside the class

class DerivedAAE extends Baseae {
  showX() {
    // console.log(this.x);// ! Error: Can't access in subclasses
  }
}

// * Cross-hierarchy protected access
class BaseVVM {
  protected x: number = 1;
}
class Derived12 extends BaseVVM {
  protected x: number = 5;
}
class Derived22 extends BaseVVM {
  f1(other: Derived22) {
    other.x = 10;
  }
  f2(other: Derived12) {
    // other.x = 10; // ❗ Error: Can't access protected member from a different derived class
  }
}

// * Cross-instance private access
// class BankAccount {
//   private balance: number;

//   constructor(initialAmount: number) {
//     this.balance = initialAmount;
//   }

//   isEqualTo(other: BankAccount): boolean {
//     // ✅ Accessing another instance's private member
//     return this.balance === other.balance;
//   }
// }

class BankAccount {
  #balance: number;

  constructor(initialAmount: number) {
    this.#balance = initialAmount;
  }

  isEqualTo(other: BankAccount): boolean {
    return this.#balance === other.#balance; 
  }
}

const accountA = new BankAccount(1000);
const accountB = new BankAccount(1000);
const accountC = new BankAccount(500);

console.log(accountA.isEqualTo(accountB)); // true
console.log(accountA.isEqualTo(accountC)); // false

// * Caveats (private in typescritp is not the really private use # for real privacy)
class MySafe {
  private secretKey = 12345;
}

// In a JavaScript file...
const s12 = new MySafe();
// console.log(s12.secretKey);
// Will print 12345
// console.log(s12["secretKey"]);

// * Static Members
// ? Static members can also use the same public, protected, and private visibility modifiers
// ? Static members are also inherited
class MyClassXX {
  static x = 0;
  static printX() {
    console.log(this.x);
  }
}

MyClassXX.x++;
MyClassXX.printX();

class MyClassXXDerived extends MyClassXX {
    myPrint = MyClassXXDerived.printX();
}
MyClassXXDerived.x++; // creates or modifies MyClassXXDerived.x

const dd = new MyClassXXDerived();
dd.myPrint;

// * Special Static Names
class S {
//   static name = "S!"; // ! Error : Cannot assign to 'name' because it is built-in property in a class.
}

class WeakSafe {
  private secret = "12345";

  getSecret() {
    return this.secret;
  }
}

const a4 = new WeakSafe();

// ✅ Works: within class
console.log(a4.getSecret());         // "12345"

// ❌ Compile-time error
// console.log(a4.secret);           // Property 'secret' is private

// ❗️But this still works!
console.log(a4["secret"]);           // "12345" — YIKES!

class StrongSafe {
  #secret = "67890";

  getSecret() {
    return this.#secret;
  }
}

const b4 = new StrongSafe();

// ✅ OK: within class
console.log(b4.getSecret());         // "67890"

// ❌ Syntax error: not even TypeScript allows this
// console.log(b4.#secret);          // SyntaxError

// ❌ Also doesn't work
// console.log(b4["#secret"]);          // undefined

// * static Blocks in Classes
class MyClassNew {
  static staticValue: number;

  static {
    // Runs once when class is loaded (not per instance)
    MyClassNew.staticValue = Math.random() * 100;
    console.log("Static block ran.");
  }
}

const myNewClass = new MyClassNew();
console.log(MyClassNew.staticValue); // Prints the random value set in the static block

class MathUtils {
  static squareTable: number[] = [];

  static {
    // Fill in square values from 1 to 10
    for (let i = 1; i <= 10; i++) {
      MathUtils.squareTable.push(i * i);
    }
    console.log("Square table initialized!");
  }

  static getSquare(n: number): number | undefined {
    return this.squareTable[n - 1]; // 0-based index
  }
}

// Usage:
console.log(MathUtils.getSquare(2)); // 9
console.log(MathUtils.getSquare(9)); // 100
console.log(MathUtils.squareTable); // [1, 4, 9, ..., 100]


// * Generic Classes
class BoxBox<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
 
const box1 = new BoxBox("hello!");
const box2 = new BoxBox<string>("world!");

// * Type Parameters in Static Members

class Box23<Type> {
//   static defaultValue: Type; // ! ERROR: Type parameters can't be used in static members
}

class Box24<T> {
  content: T;

  constructor(value: T) {
    this.content = value;
  }

  static getDefaultValue<InputType>(value: InputType): Box24<InputType> {
    return new Box24<InputType>(value);
  }
}

const defaultStringBox = Box24.getDefaultValue("hello");
const defaultNumberBox = Box24.getDefaultValue(123);

// * this at Runtime in Classes
class MyClassThis {
  name = "MyClass";

  getName = () => this.name; // Arrow function binds `this` to the instance
//   getName() { return this.name; } // ❗️ Regular method would lose this context when called on an instance
}

const c12 = new MyClassThis();

const obj24 = {
  name: "obj",
  getName: c12.getName, // Detached method
};

console.log(obj24.getName()); // ➡️ "obj"


// * Arrow Functions = f you have a function that will often be called in a way that loses its this context, 
// * - it can make sense to use an arrow function property instead of a method definition:

class MyClassV3 {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c123 = new MyClassV3();
const g123 = c123.getName;
// Prints "MyClass" instead of crashing
console.log(g123());

// * this parameters
interface MyObject {
  name: string;
  greet(this: MyObject): string;
}

const objVVV: MyObject = {
  name: "Kevin",
  greet() {
    return `Hello, ${this.name}`;
  }
};

console.log(objVVV.greet(),'objVVV.greet()'); // ✅ Works

const fnVVV = objVVV.greet;
// fn(); // ❌ Error: 'this' is not assignable to 'MyObject'

// ? sayHelloVVV is called as a method of userVVV. 
// ? So this inside the function points to userVVV.
// ? Since userVVV has a name: string, the function is valid.

function sayHelloVVV(this: { name: string }) {
  console.log("Hello, " + this.name);
}

const userVVV = {
  name: "Alice",
  sayHelloVVV,
};

userVVV.sayHelloVVV(); // ✅ "Hello, Alice"

class MyClassHAHA {
  name = "MyClass";
  getName(this: MyClassHAHA) {
    return this.name;
  }
}
const cVVV = new MyClassHAHA();
// OK
cVVV.getName();
 
// Error, would crash
const gVV = cVVV.getName.call({name: "kevin"} as MyClassHAHA);
console.log(gVV);

// * this Types
class BoxV25 {
  contents: string = "";

  
// ? Use of this in method signature	Means…
// ? other: this	Must be exactly same type as the calling object
// ? other: BoxV25	Accepts base or derived types
// ? other: T extends BoxV25	Accepts compatible subtypes — more flexible

  sameAs(other: BoxV25): boolean {
    return other.contents === this.contents;
  }
  set(value: string): this {
    this.contents = value;
    return this;
  }
}

class ClearableBoxV25 extends BoxV25 {
  clear() : this{
    this.contents = "";
    return this;
  }
}

const a25 = new ClearableBoxV25()
.set("hello")
.clear();              // ✅ Works
console.log(a25.contents, 'a25.contents');


const b123 = new ClearableBoxV25();
const b234 = new ClearableBoxV25();

const isSameContent = b123.sameAs(b234); // ✅ OK
console.log(isSameContent, 'isSameContent'); // false
const b345 = new BoxV25();
b123.sameAs(b345);

// * this -based type guards
class UserVVV {
  role: string;

  constructor(role: string) {
    this.role = role;
  }

  isAdmin(this: this): this is Admin {
    return this.role === "admin";
  }
}

class Admin extends UserVVV {
  accessAdminPanel() {
    console.log("Welcome to admin panel");
  }
}

function handleUser(user: UserVVV) {
  if (user.isAdmin()) {
    // 🧠 TypeScript now knows `user` is an Admin
    user.accessAdminPanel();
  } else {
    console.log("Access denied");
  }
}

const u1 = new Admin("admin");
const u2 = new UserVVV("user");
const u3 = new Admin("admin");

handleUser(u1); // ✅ Access allowed
handleUser(u2); // ❌ Access denied

// * Parameter Properties
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a23 = new Params(1, 2, 3);
console.log(a23.x);
             
// console.log(a23.z); // ! Error: Property 'z' is private and only accessible within class 'Params'.

// ...is identical to writing this longer version:

// class Params {
//   public readonly x: number;
//   protected y: number;
//   private z: number;

//   constructor(x: number, y: number, z: number) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }
// }

class Logger {
  constructor(private readonly prefix: string) {}

  log(message: string) {
    console.log(`${this.prefix}: ${message}`);
  }
}

const logger = new Logger("[App]");
logger.log("Started"); // [App]: Started


// * Class Expressions
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};
 
const m = new someClass("Hello, world");
console.log(m.content);

// * Constructor Signatures & InstanceType
class PointVVV {
  constructor(public x: number, public y: number) {}
}

// type PointInstance = InstanceType<typeof PointVVV>;
function moveRight(point: PointVVV) {
  point.x += 5;
}
const pointInstance = new PointVVV(10, 20);
moveRight(pointInstance);
console.log(pointInstance.x); // 15

// * Abstract Classes and Members
// ? Abstract class: can’t be instantiated directly.
// ? Abstract method: must be implemented in subclasses.

abstract class BaseAbstract {
  abstract getName(): string;
  printName() {
    console.log("Hello, " + this.getName());
  }
}

class DerivedAbstract extends BaseAbstract {
  getName() {
    return "junjun";
  }
}
// Now Derived is concrete (no abstract methods), so we can do:
const d23 = new DerivedAbstract();
d23.printName(); // "Hello, world"

// * Abstract Construct Signatures (Abstract Constructor Functions)
// function greetV25(ctor: typeof BaseAbstract) {
// ctor must be a class or function that can be instantiated with new and no arguments (())
function greetV25(ctor: new () => BaseAbstract) {
//   const instance = new ctor(); // ❌ error Can't instantiate an abstract class
  const instance = new ctor(); // ✅

  return instance;
}

const newInstance = greetV25(DerivedAbstract);
newInstance.printName(); // "Hello, junjun"

// * Relationships Between Classes ( Structural Typing )
class PointA { x = 0; y = 0; }
class PointB { x = 0; y = 0; }

const p5: PointA = new PointB(); // ✅ OK

class Person { name!: string; age!: number; }
class Employee { name!: string; age!: number; salary!: number; }

const p6: Person = new Employee(); // ✅ OK
