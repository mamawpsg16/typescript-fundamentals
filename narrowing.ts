//ERROR AS REPEAT PARAMETER SHOULD BE INTEGER
// function padLeft(padding: number | string, input: string): string {
//     return " ".repeat(padding) + input;
// }

function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

console.log('padLeft', padLeft(3, "Hello"));

/**
 * * TYPEOF TYPE GUARDS
 */

// "string"
// "number"
// "bigint"
// "boolean"
// "symbol"
// "undefined"
// "object"
// "function"

/**
 * * TRUTHINESS NARROWING
*/

function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

console.log('getUsersOnlineMessage', getUsersOnlineMessage(3));

// Boolean("hello"); // type: boolean, value: true
// !!"world";


function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}


function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}

console.log('multiplyAll', multiplyAll([1, 2, 3], 3));
console.log('multiplyAll Undefined/Null', multiplyAll([], 3));
console.log('multiplyAll Undefined/Null', multiplyAll(undefined, 3));

// * EQUALITY NARROWING
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    console.log('TO UPPERCASE', x.toUpperCase());
          
    console.log('TO LOWERCASE', y.toLowerCase());
          
  } else {
    console.log(x);
               
    console.log(y);
  }
}

example('hello', 'hello');
example(1, true);

function printAllV1(strs: string | string[] | null) {
  if (typeof strs === "string") {
    console.log(strs);
  } else if (Array.isArray(strs)) {
    for (const s of strs) {
      console.log(s);
    }
  }
}

console.log('printAllV1', printAllV1('hello'));

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
                           
    // Now we can safely multiply 'container.value'.
    container.value *= factor;

    return container.value;
  }
}

console.log('multiplyValue', multiplyValue({ value: 3 }, 3));


// * THE IN OPERATOR NARROWING

type Fish = { swim: () => void, name?: string };
type Bird = { fly: () => void, name?: string};
type Human = { swim?: () => void; fly?: () => void, name?: string};

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }else{
    return animal.fly();
  }
}

const Tuna : Fish = {
    swim: () => console.log('swim swim swim Tuna')
};
move(Tuna);

const Eagle : Bird = {
    fly: () => console.log('Swish Fly Eagle')
};
move(Eagle);

function move1(animal: Fish | Bird| Human) {
  if ("swim" in animal) {
    return animal;
  }else{
    return animal;
  }
}



// * INSTANCEOF NARROWING
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
               
  } else {
    console.log(x.toUpperCase());
  }
}

logValue(new Date());
logValue('hello');  

// * ASSIGNMENTS
// x started with - is string | number, and assignability is always checked against the declared type.
let x = Math.random() < 0.5 ? 10 : "hello world!";
   
x = 1;
 
console.log(x);
           
x = "goodbye!";
 
console.log(x);
           
// !ERROR
// x = true; // Type 'boolean' is not assignable to type 'string | number'.


// * CONTROL FLOW ANALYSIS
function example1() {
  let z: string | number | boolean;
 
  z = Math.random() < 0.5;
 
  console.log('example boolean', z);
             
 
  if (Math.random() < 0.5) {
    z = "hello";
    console.log('example string', z);
  } else {
    z = 100;
    console.log('example number', z);
  }
 
  return z;
}

example1()


// * USING TYPE PREDICATES

// isFish(pet): pet is Fish	Predicate for function arguments
// isFish(): this is Fish	Predicate for the current instance inside a class (this)

// pet is Fish (parameterName is Type) is our type predicate in this example
// pet is Fish - Type predicate: “If this function returns true, pet is a Fish”
function isFish(pet: Fish | Bird): pet is Fish {
    //type assertion as Fish 
    //Temporarily treat pet as a Fish so I can access .swim and check if it exists.
    //Use as inside the function body (to peek at properties).
  return (pet as Fish).swim !== undefined;
}

// Union-returning factory
function getSmallPet(): Fish | Bird {
  // For example purposes, randomly return one
  return Math.random() > 0.5
    ? { swim: () => console.log("Swimming fish"), name:'sharkey' }
    : { fly: () => console.log("Flying bird"), name:'birdey' };
}

// Usage
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim(); // ✅ TypeScript knows this is a Fish
} else {
  pet.fly();  // ✅ TypeScript knows this is a Bird
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
console.log('zoo', zoo);
console.log('underWater1', underWater1);
console.log('underWater2', underWater2);

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name !== "crocodile") return false;
  return isFish(pet);
});
console.log('underWater3', underWater3);


// ? Classes can use this is Type to narrow their type
class Animal3 {
  move() {
    console.log("Moving");
  }
}

class Fish1 extends Animal3 {
  swim() {
    console.log("Swimming");
  }

  isFish(): this is Fish {
    return true;
  }
}

class Bird1 extends Animal3 {
  fly() {
    console.log("Flying");
  }

  isBird(): this is Bird {
    return true;
  }
}

const pet1: Animal3 = Math.random() > 0.5 ? new Fish1() : new Bird1();

if (pet1 instanceof Fish1 && pet1.isFish()) {
  pet1.swim(); // ✅ TypeScript now knows pet1 is Fish
} else if (pet1 instanceof Bird1 && pet1.isBird()) {
  pet1.fly();
}

// * DISCRIMINATED UNIONS
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function handleShape(shape: Shape) {
  // !ERROR as there are no declared rect in the kind of Shape interface
//   if (shape.kind === "rect") {
    // ...
//   }
}


function getArea(shape: Shape) {
  // !ERROR 'shape.radius' is possibly 'undefined'. as the radius is optional as Shape can be circle or square
//   return Math.PI * shape.radius ** 2;
}

function getArea1(shape: Shape) {
  if (shape.kind === "circle") {
    // ? 'shape.radius' is possibly 'undefined' AS radius is optional.
    // return Math.PI * shape.radius ** 2;
  }
}
function getArea2(shape: Shape) {
  if (shape.kind === "circle") {
    // ?  (a ! after shape.radius) to say that radius is definitely present.
    return Math.PI * shape.radius! ** 2;
  }
}

interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type ShapeV1 = Circle | Square;

function getArea3(shape: ShapeV1) {
    // !ERROR AS it still not narrowing about the kind of shape
    // return Math.PI * shape.radius ** 2;
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
                        
    case "square":
      return shape.sideLength ** 2;
  }
}


// * THE NEVER TYPE WITH EXHAUSTIVENESS CHECKING
type Pet4 = 
  | { kind: "fish"; swim: () => void }
  | { kind: "bird"; fly: () => void }
  | { kind: "lizard"; crawl: () => void };

function move4(pet: Pet4) {
  switch (pet.kind) {
    case "fish":
      pet.swim();
      break;
    case "bird":
      pet.fly();
      break;
    case "lizard":
      pet.crawl();
      break;
    default:
      // EXHAUSTIVE CHECK
      const _never: never = pet;
      return _never;
  }
}

move4({ kind: "lizard", crawl: () => console.log('Crawl Crawl Lizard') })
