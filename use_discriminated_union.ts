// 1. Define types with a common discriminant field
type Fish4 = {
  kind: "fish";
  name: string;
  swim: () => void;
};

type Bird4 = {
  kind: "bird";
  name: string;
  fly: () => void;
};

type Pet5 = Fish4 | Bird4;

// 2. Function using discriminated union
function movePet(pet: Pet5) {
  switch (pet.kind) {
    case "fish":
      console.log(`${pet.name} is swimming`);
      pet.swim();
      break;
    case "bird":
      console.log(`${pet.name} is flying`);
      pet.fly();
      break;
    default:
      const _never: never = pet; // 🚨 Exhaustiveness check
      return _never;
  }
}

// ✅ Example usage
const goldie: Fish4 = { kind: "fish", name: "Goldie", swim: () => console.log("Swim swim") };
const tweety: Bird4 = { kind: "bird", name: "Tweety", fly: () => console.log("Flap flap") };

movePet(goldie);
movePet(tweety);

function movePet4(pet: Pet5) {
  if (pet.kind === "fish") {
    pet.swim();
  } else if (pet.kind === "bird") {
    pet.fly();
  } else {
    // 🧠 Exhaustive check in if-else
    const _exhaustive: never = pet;
    return _exhaustive;
  }
}
