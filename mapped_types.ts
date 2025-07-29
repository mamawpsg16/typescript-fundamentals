// Define a Horse interface
interface Horse {
  name: string;
  speed: number;
}

// Define a type that only allows string keys,
// and values must be either boolean or a Horse object
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

// ✅ This object conforms to the OnlyBoolsAndHorses type
const conforms: OnlyBoolsAndHorses = {
  del: true, // boolean
  rodney: false, // boolean
  spirit: { name: "Spirit", speed: 55 }, // Horse
};

// ! ❌ This object would throw an error
// const wrong: OnlyBoolsAndHorses = {
//   cat: "meow", // ❌ string is not allowed
//   sparky: 123, // ❌ number is not allowed
// };


type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean; // Transform all properties to boolean
};

// Remove readonly
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

// Remove optional
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<Features>;
        

// * Mapping Modifiers

// ? Removes 'readonly' attributes from a type's properties
type CreateMutableV1<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
 
type UnlockedAccount = CreateMutableV1<LockedAccount>;

// ? Removes 'optional' attributes from a type's properties
type ConcreteV1<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
 
type User123 = ConcreteV1<MaybeUser>;

// * Key Remapping via as

// ? “Instead of using the original key (Properties), compute a new key called NewKeyType, and use that as the key in the new object type.”
type GettersVV<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person88 {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = GettersVV<Person88>;

// ? Remove the 'kind' property
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
 
interface Circlev2 {
    kind: "circle";
    radius: number;
}
 
type KindlessCircle = RemoveKindField<Circlev2>;