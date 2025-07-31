// * Numeric enums

// ? Enums are a way to give more friendly names to sets of numeric values. default is 0, 1, 2, etc.
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// ? Set a numeric value for the first member, and the rest will auto-increment
enum DirectionV1 {
  Up = 1,
  Down,
  Left,
  Right,
}


enum UserResponse {
  No = 0,
  Yes = 1,
}
 
function respond(recipient: string, message: UserResponse): void {
  // ...
}
 
respond("Princess Caroline", UserResponse.Yes);

// * String enums
enum DirectionV2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// * Heterogeneous enums
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

// * Computed and constant members
enum MathValues {
  A = 2,
  B = A * 2  // Computed
}


// * Union Enums and Enum Member Types
enum DirectionV3 {
  Up,
  Down
}

function moveDirection(dir: DirectionV3) {}

enum ShapeKind {
  Circle,
  Square,
}
 
interface CircleV6 {
  kind: ShapeKind.Circle;
  radius: number;
}
 
interface SquareV2 {
  kind: ShapeKind.Square;
  sideLength: number;
}
 
let cv: CircleV6 = {
  kind: ShapeKind.Circle,
  radius: 100,
};

enum E {
  Foo,
  Bar,
}
 
function fa(x: E) {
//   if (x !== E.Foo || x !== E.Bar) { // Error - this condition is always true
    if (x !== E.Foo && x !== E.Bar) { // Correct - this condition is always false
    }
}

// * Enums at runtime

enum E1 {
  X,
  Y,
  Z,
}
 
function ff(obj: { X: number }) {
  return obj.X;
}
 
// Works, since 'E' has a property named 'X' which is a number.
console.log(ff(E1), 'f(E1)');

// * Enums at compile time
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}
 
/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;
 
function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  const prefix = `[${key}] - `;
  if (num <= LogLevel.WARN) {
    console.log(prefix +'Log level key is:', key);
    console.log(prefix +"Log level value is:", num);
    console.log(prefix +"Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");

// * Reverse mappings
let abc = LogLevel.ERROR;
console.log(abc, 'abc');
let nameOfA = LogLevel[abc]; 
console.log(nameOfA, 'nameOfA'); // "ERROR"
console.log(LogLevel[1]); // WARN

// *  const enums = Const enums do NOT generate JavaScript objects. They're inlined as plain numbers or strings.
const enum Enum {
  A = 1,
  B = A * 2,
}


const enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
}

function handleResponse(status: HttpStatus) {
  if (status === HttpStatus.OK) {
    console.log("Success!");
  }
}

// * Ambient enums = Instead of redefining this in TypeScript, you can declare it as an ambient enum:
// types.d.ts
// declare enum HttpStatus1 {
//   OK = 200,
//   NOT_FOUND = 404,
//   SERVER_ERROR = 500
// }

// // Now you can use it with full type safety
// function handleResponseV2(status: HttpStatus1) {
//   switch (status) {
//     case HttpStatus1.OK:
//       console.log("Success!");
//       break;
//     case HttpStatus1.NOT_FOUND:
//       console.log("Page not found");
//       break;
//     case HttpStatus1.SERVER_ERROR:
//       console.log("Server error");
//       break;
//   }
// }

// // TypeScript knows these are valid
// handleResponseV2(HttpStatus1.OK); // ✅
// handleResponseV2(200); // ✅ (because OK = 200)
// handleResponseV2(999); // ❌ TypeScript error

// * Objects vs Enums
enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
 
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
 
console.log(EDirection.Up, EDirection[0], 'EDirection.Up');
           
console.log(ODirection.Up,'ODirection.Up;');
 
// Using the enum as a parameter
function walk(dir: EDirection) {}
 
// It requires an extra line to pull out the values
type DirectionV5 = typeof ODirection[keyof typeof ODirection];
function runvv(dir: DirectionV5) {}
 
walk(EDirection.Left);
runvv(ODirection.Right);