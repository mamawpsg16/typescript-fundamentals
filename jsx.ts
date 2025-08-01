// * The as operators = Recall how to write a type assertion
type Foo = { name: string};
const foo = { name:'Kevin' } as Foo;

// * JSX namespace

function createElement(tag: string, props: any, ...children: any[]) {
  return {
    tag,
    props: props || {},
    children: children.flat()
  };
}

