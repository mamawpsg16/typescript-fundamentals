type PersonV5 = {
  name: string;
  age: number;
  alive: boolean;
};

type Name = PersonV5["name"]; // string
type Age = PersonV5["age"];   // number

// * unions
type P1 = PersonV5["age" | "name"];

type AllValues = PersonV5[keyof PersonV5]; // string | number | boolean

// * Custom Key Alias
type AliveOrName = "alive" | "name";
type Subset = PersonV5[AliveOrName]; // boolean | string
type Key = "age";
type AgeV2 = PersonV5[Key]; // ✅ number

// *  Extracting Array Element Types
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
];

type PersonVV = typeof MyArray[number]; // “Give me the type of any element of the array.”
// Equivalent to: { name: string; age: number }

type AgeVV1 = typeof MyArray[number]["age"]; // “Get the age property from each object in the array”

const usersZZ = [
  { id: 1, name: "Alice", email: "alice@example.com", isActive: true },
  { id: 2, name: "Bob", email: "bob@example.com", isActive: false },
];


type UserV1 = typeof usersZZ[number];

function sendWelcomeEmailV1(user: UserV1) {
  if (user.isActive) {
    console.log(`Welcome email sent to ${user.email}`);
  }
}

usersZZ.forEach(sendWelcomeEmailV1);
