// * Template Literal Types
type Color = "red" | "blue";
type Size = "small" | "large";

type Shirt = `${Color}-${Size}`;
// Equivalent to: "red-small" | "red-large" | "blue-small" | "blue-large"

//string & keyof Type = "Give me only the string property names from this object type"
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

// declare means:
// ? "This function exists somewhere, but I'm not implementing it here - I'm just telling TypeScript what it looks like."
// ? here's a function that takes any object, and returns that same object BUT with an extra on() method for listening to property changes."
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
 
const personZZ1 = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});


personZZ1.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

personZZ1.on("lastNameChanged", () => {});

/// Create a "watched object" with an `on` method
/// so that you can watch for changes to properties.

// * Inference with Template Literals

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSourceV1<Type>;
 
const personZZ2 = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

//  ? Here we made on into a generic method.
type PropEventSourceV1<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};
 
// * Intrinsic String Manipulation Types

// ? Uppercase<StringType>
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">

// ? Lowercase<StringType>
type GreetingV1 = "Hello, world"
type QuietGreetingV1 = Lowercase<GreetingV1>
 
type ASCIICacheKeyV1<Str extends string> = `id-${Lowercase<Str>}`
type MainIDV1 = ASCIICacheKey<"MY_APP">

// ? Capitalize<StringType>
type LowercaseGreeting = "hello, world";
type GreetingV2 = Capitalize<LowercaseGreeting>;


// ? Uncapitalize<StringType>
type UppercaseGreeting = "HELLO, WORLD";
type GreetingV3 = Uncapitalize<UppercaseGreeting>;