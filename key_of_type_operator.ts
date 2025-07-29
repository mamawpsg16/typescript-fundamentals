interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person;
// Equivalent to: "name" | "age"

// *  Real-World Usage: Key Constrained Function
function getPropertyV1<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };

const nameV1 = getPropertyV1(person, "name"); // OK
const ageV1 = getPropertyV1(person, "age");   // OK
// const invalid = getProperty(person, "invalidKey"); // Error: Argument of type '"invalidKey"' is not assignable to parameter of type '"name" | "age"'

type StringMap = {
  [key: string]: number;
};

type Keys = keyof StringMap; // Result: string | number (weird, but happens due to JS coercion rules)
const exampleMap: StringMap = { a: 1, b: 2, c: 3 };
const numberExample: Keys = 1; // OK

function logValueByKey(obj: StringMap, key: Keys) {
  console.log(obj[key]); // OK, but key might be string or number
}

logValueByKey(exampleMap, 'a'); // OK
// * With Mapped Types
type PersonV1 = {
  name: string;
  age: number;
};

// ? THIS CREATES
type ReadonlyPersonV1 = {
  readonly [K in keyof PersonV1]: PersonV1[K];
};
// ? = TO THIS
type ReadonlyPersonResult = {
  readonly name: string;
  readonly age: number;
}