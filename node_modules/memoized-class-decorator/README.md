# Memoized Decorator

A fork of [memoized-decorator](https://github.com/VoiceNGO/memoized-decorator) that takes class properties into consideration by attaching the memoization cache at the object level rather than class level. 

Serializes arguments by `.toString()` or `JSON.strinigify` for objects literals
  & arrays.  `null` & `undefined` safe.

## Installation

```sh
npm install --save memoized-class-decorator
```

## Usage

```typescript
import memoize = require('memoized-class-decorator');

class Foo {

  constructor(private readonly num: number) { }

  @memoize
  public myMethod(add: number) {
    return this.num + add;
  }
}

const f1 = new Foo(5);

f1.myMethod(5);  //= 10 (method is invoked)
f1.myMethod(10); //= 15 (method is invoked)
f1.myMethod(5);  //= 10 (method is not invoked)

const f2 = new Foo(0);

f2.myMethod(5);  //= 5 (method is invoked, each object has it's own cache)

```

Note that if an object is passed to the method with an `id` property, the value of that propery will be used as the cache key. This is to reduce the time needed to serialize complex objects.
