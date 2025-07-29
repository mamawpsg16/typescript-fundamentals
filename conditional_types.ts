type IsString<T> = T extends string ? "Yes" : "No";

type Test1 = IsString<string>;  // "Yes"
type Test2 = IsString<number>;  // "No"
 
function getUserZZ1() {
  return { id: 1, name: "Alice" };
}

type UserZZ1 = ReturnType<typeof getUserZZ1>;
// User = { id: number; name: string }
const userZZ1: UserZZ1 = {
    id: 1,
    name: "Alice"
};


type NonNullableV<T> = T extends null | undefined ? never : T;

type Test21 = NonNullable<string | null>;     // string
type Test22 = NonNullable<number | undefined>; // number

// *  Example with Generics

type HasId1<T> = T extends { id: infer U } ? U : never;

type WithId = { id: number; name: string };
type WithoutId = { name: string };

type A = HasId1<WithId>;    // number
type B = HasId1<WithoutId>; // never


type Example<T> = T extends string ? "YES" : "NO";

type AB = Example<string>;  // "YES"  ✅ because string extends string
type BC = Example<number>;  // "NO"   ❌ because number does not extend string

const ab1: AB = "YES";  // Valid
const bc1: BC = "NO";    // Valid

interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

type A1 = NameOrId<1>; // IdLabel
type B1 = NameOrId<"1">; // NameLabel
const a1: A1 = { id: 123 }; // Valid
const b1: B1 = { name: "Alice" }; // Valid

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

const aa = createLabel("typescript");  // NameLabel
const bb = createLabel(42);            // IdLabel
const cc1 = createLabel(Math.random() ? "hello" : 42); // NameLabel | IdLabel


// * Conditional Type Constraints

type MessageOf1<T extends { message: unknown }> = T["message"];
 
interface Emailv1{
  message: string;
}
 
type EmailMessageContentsV1 = MessageOf1<Emailv1>;


type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
 
interface Email {
  message: string;
}
 
interface DogVV{
  bark(): void;
}
 
type EmailMessageContents = MessageOf<Email>;
              
 
type DogMessageContents = MessageOf<Dog>;
// ? When T is an array type, T[number] is a way to extract the type of the elements of that array.
// type Flatten<T> = T extends any[] ? T[number] : T;

// ? infer U tells TypeScript: "figure out what type the array elements are and call it U"
type Flatten<T> = T extends (infer U)[] ? U : T; // an array of some type

 
// Extracts out the element type.
type StrV1 = Flatten<string[]>;
     
// Leaves the type alone.
type NumV1 = Flatten<number>;
     

// * Inferring Within Conditional Types
type FlattenV1<Type> = Type extends Array<infer Item> ? Item : Type;

type StrV2 = FlattenV1<string>;
type NumV2 = FlattenV1<number>;
type StrArr = Array<string>; // string

const strText: StrV2 = "Hello"; // Valid
const strArr: StrArr = ["Hello", "World"]; // Valid


// ? "If Type is a function type that takes any number of arguments and returns something, then extract its return type."
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num11 = GetReturnType<() => number>; // ✅ number
type Str11 = GetReturnType<(x: string) => string>; // ✅ string
type Bools11 = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // ✅ boolean[]

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
 
type T1 = ReturnType<typeof stringOrNum>;

// * Distributive Conditional Types
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;

// ? When Distribution Happen
// 1. The conditional type uses a naked type parameter (Type extends ...)
// 2. You pass in a union type
// 3. The type parameter appears directly on the left side of extends

// ? Preventing Distribution with Brackets The square brackets [Type] and [any] prevent distribution because:
// Type is no longer "naked" - it's wrapped in a tuple
// TypeScript treats the entire union as a single entity

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type ArrOfStrOrNum = ToArrayNonDist<string | number>;
// Result: (string | number)[] - NOT string[] | number[]