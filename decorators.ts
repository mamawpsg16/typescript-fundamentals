function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

// *  Decorator Factories
function LoggerV2(prefix: string) {
  return function (target: any) {
    console.log(`${prefix} - ${target.name}`);
  };
}

@LoggerV2("INIT")
class MyService {}
