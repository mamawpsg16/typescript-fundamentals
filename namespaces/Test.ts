/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
// Some samples to try
let stringsV3 = ["Hello", "98052", "101"];
// Validators to use
let validatorsV2: { [s: string]: Validation.StringValidator } = {};
validatorsV2["ZIP code"] = new Validation.ZipCodeValidator();
validatorsV2["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of stringsV3) {
  for (let name in validatorsV2) {
    console.log(
      `"${s}" - ${
        validatorsV2[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}