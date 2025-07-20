/**
 * * Extending an interface
 */

interface Animal {
    name: string;
  }
  
  interface Bear extends Animal {
    honey: boolean;
  }
  const getBear = function() : Bear{
    return {
        name:'Bear',
        honey:true
    }
  }
  const bear = getBear();
  console.log(bear.name);
  console.log(bear.honey);


/**
 * * Extending a type via intersections
 */

type Animal1 = {
  name: string;
}

type Bear1 = Animal1 & { 
  honey: boolean;
}

const getBear1 = function() : Bear1{
    return {
        name:'Baby Bear',
        honey:false
    }
}
const bear1 = getBear1();
console.log(bear1.name);
console.log(bear1.honey);

/**
 * * INTERFACE DECLARATION MERGING
 */
interface Person { name: string; }
interface Person { age: number; }

type Status = "loading" | "success" | "error"; // ✅ type only

type Dog = { bark: () => void };
type Cat = { meow: () => void };
type Pet1 = Dog | Cat;
type Pet2 = Dog & Cat; // ✅ type only