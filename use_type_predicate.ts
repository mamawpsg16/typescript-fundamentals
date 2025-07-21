// 1. Define types WITHOUT a discriminant field
type Fish3 = {
  name: string;
  swim: () => void;
};

type Bird3 = {
  name: string;
  fly: () => void;
};

type Pet3 = Fish3 | Bird3;

// 2. Define type guard functions
function isFish3(pet: Pet3): pet is Fish3 {
  return (pet as Fish3).swim !== undefined;
}

function isBird(pet: Pet3): pet is Bird3 {
  return (pet as Bird3).fly !== undefined;
}

// 3. Function using type predicates
function movePet2(pet: Pet3) {
  if (isFish3(pet)) {
    console.log(`${pet.name} is swimming`);
    pet.swim();
  } else if (isBird(pet)) {
    console.log(`${pet.name} is flying`);
    pet.fly();
  } else {
    const _never: never = pet; // still usable for exhaustiveness if needed
    return _never;
  }
}

// ✅ Example usage
const nemo: Fish3 = { name: "Nemo", swim: () => console.log("Swim swim") };
const eagle: Bird3 = { name: "Eagle", fly: () => console.log("Flap flap") };

movePet2(nemo);
movePet2(eagle);
