//* Validators in a single file
// Define a contract that all string validators must follow
// Any class implementing this interface must have an isAcceptable method
interface StringValidator {
  isAcceptable(s: string): boolean;
}

// Regular expression to match strings with only letters (A-Z, a-z)
// ^ means start of string, $ means end of string
let lettersRegexp = /^[A-Za-z]+$/;

// Regular expression to match strings with only numbers (0-9)
let numberRegexp = /^[0-9]+$/;

// Validator class that only accepts strings containing letters
// implements StringValidator means this class must provide the isAcceptable method
class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    // Use the letters regex to test if the string contains only letters
    return lettersRegexp.test(s);
  }
}

// Validator class that only accepts 5-digit ZIP codes
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    // Check two conditions: exactly 5 characters AND only numbers
    return s.length === 5 && numberRegexp.test(s);
  }
}

// Test data - array of strings to validate
let stringsV1 = ["Hello", "98052", "101"];

// Create an object to store our validators
// Key: string (validator name), Value: StringValidator (validator instance)
let validators: { [s: string]: StringValidator } = {};

// Add validator instances to our collection with descriptive names
// works because both classes implement StringValidator
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

console.log('Non-namespaced Validators');

// Test each string against each validator
// Outer loop: iterate through each test string
for (let s of stringsV1) {
  // Inner loop: iterate through each validator in our collection
  for (let name in validators) {
    // Call the isAcceptable method on the current validator with current string
    let isMatch = validators[name].isAcceptable(s);
    
    // Print the result using template literals and ternary operator
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
  }
}

// * Namespacing implement in Validators
// namespace Validation {
//   export interface StringValidator {
//     isAcceptable(s: string): boolean;
//   }
//   const lettersRegexp = /^[A-Za-z]+$/;
//   const numberRegexp = /^[0-9]+$/;
//   export class LettersOnlyValidator implements StringValidator {
//     isAcceptable(s: string) {
//       return lettersRegexp.test(s);
//     }
//   }
//   export class ZipCodeValidator implements StringValidator {
//     isAcceptable(s: string) {
//       return s.length === 5 && numberRegexp.test(s);
//     }
//   }
// }
// console.log('Namespaced Validators');
// // Some samples to try
// let stringsV2 = ["Hello", "98052", "101"];
// // Validators to use
// let validatorsV1: { [s: string]: Validation.StringValidator } = {};
// validatorsV1["ZIP code"] = new Validation.ZipCodeValidator();
// validatorsV1["Letters only"] = new Validation.LettersOnlyValidator();
// // Show whether each string passed each validator
// for (let s of stringsV2) {
//   for (let name in validatorsV1) {
//     console.log(
//       `"${s}" - ${
//         validatorsV1[name].isAcceptable(s) ? "matches" : "does not match"
//       } ${name}`
//     );
//   }
// }

// * Multi-file namespaces
