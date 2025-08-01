// * Iterable interface
function toArray<X>(xs: Iterable<X>): X[] {
  return [...xs]
}

const abcdefg = toArray([1,"2","4"]);
console.log(abcdefg); // [1, "2", "4"]

// * for..of statements 
let someArray = [1, "string", false];
for (let entry of someArray) {
  console.log(entry); // 1, "string", false
}

// * for..of vs. for..in statements
console.log('for in someArray');
for (let i in someArray) {
  console.log(i); // "0", "1", "2",
}
console.log('for of someArray');
for (let i of someArray) {
  console.log(i); // 1,"2","4"
}

type PetCollection = {
  species: string;
  values: Set<string>;
};

const pets: PetCollection = {
  species: "mammals",
  values: new Set(["Cat", "Dog", "Hamster"]),
};

for (const pet of pets.values) {
  console.log(pet);
}

// * Type Annotations
function processItems<T>(items: Iterable<T>): T[] {
  return Array.from(items);
}

// Works with any iterable
processItems([1, 2, 3]);           // Array
processItems(new Set([1, 2, 3]));  // Set
processItems("hello");             // String