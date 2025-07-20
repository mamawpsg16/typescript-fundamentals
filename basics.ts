/**
 * * STATIC TYPE-CHECKING
*/

const user4 = {
    name: "Daniel",
    age: 26,
  };
// console.log(user4.location); // returns undefined

const announcement = "Hello World!";
 
// How quickly can you spot the typos?
/** 
 * ! ERRORS
 */
// announcement.toLocaleLowercase();
// announcement.toLocalLowerCase();
 
// We probably meant to write this...
console.log(announcement.toLocaleLowerCase());


/** 
 * ! ERRORS
 */
// function flipCoin() {
// // Meant to be Math.random()
// return Math.random < 0.5;
// Operator '<' cannot be applied to types '() => number' and 'number'.
// }


// const value = Math.random() < 0.5 ? "a" : "b";
// if (value !== "a") {
//   // ...
// } else if (value === "b") {
// // This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
//   // Oops, unreachable
// }


// This is an industrial-grade general-purpose greeter function:
function greet(person : string, date: Date) {
console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Brendan", new Date());