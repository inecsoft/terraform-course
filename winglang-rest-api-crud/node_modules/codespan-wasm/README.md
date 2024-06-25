# codespan-wasm

An unnofficial set of Node.js bindings for [codespan-reporting](https://crates.io/crates/codespan-reporting) - a library for generating beautiful diagnostics for text-based programming languages.

![Example preview](https://github.com/brendanzab/codespan/raw/master/codespan-reporting/assets/readme_preview.svg?sanitize=true)

## Usage

```ts
const diagnostic = emitDiagnostic([{
  name: "FizzBuzz.fun",
  source: `module FizzBuzz where

fizz₁ : Nat → String
fizz₁ num = case (mod num 5) (mod num 3) of
    0 0 => "FizzBuzz"
    0 _ => "Fizz"
    _ 0 => "Buzz"
    _ _ => num

fizz₂ : Nat → String
fizz₂ num =
    case (mod num 5) (mod num 3) of
        0 0 => "FizzBuzz"
        0 _ => "Fizz"
        _ 0 => "Buzz"
        _ _ => num`,
}], {
  severity: "error",
  message: "`case` clauses have incompatible types",
  code: "E0308",
  labels: [
    {
      style: "primary",
      fileId: "FizzBuzz.fun",
      rangeStart: 328,
      rangeEnd: 331,
      message: "expected `String`, found `Nat`",
    },
    {
      style: "secondary",
      fileId: "FizzBuzz.fun",
      rangeStart: 211,
      rangeEnd: 331,
      message: "`case` clauses have incompatible types",
    },
    {
      style: "secondary",
      fileId: "FizzBuzz.fun",
      rangeStart: 258,
      rangeEnd: 268,
      message: "this is found to be of type `String`",
    },
    {
      style: "secondary",
      fileId: "FizzBuzz.fun",
      rangeStart: 284,
      rangeEnd: 290,
      message: "this is found to be of type `String`",
    },
    {
      style: "secondary",
      fileId: "FizzBuzz.fun",
      rangeStart: 306,
      rangeEnd: 312,
      message: "this is found to be of type `String`",
    },
    {
      style: "secondary",
      fileId: "FizzBuzz.fun",
      rangeStart: 186,
      rangeEnd: 182,
      message: "expected type `String` found here",
    },
  ],
  notes: [`expected type \`String\`
    found type \`Nat\``],
}, {
  displayStyle: "rich",
  chars: CHARS_ASCII,
});
console.log(diagnostic);
```

## Future work

Add a cleaner API for emitting diagnostics, using the builder pattern.

## Contributing

Contributions are welcome.

Building the project requires [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) to be installed.
