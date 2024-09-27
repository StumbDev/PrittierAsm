# libAsm.js
this lib is for using PASM-like syntax in JS/TS

JavaScript example:
```javascript
// using .js
import { libAsm, extLib, pasmToJs } from './libAsm.js';

// Initialize the library
libAsm();

// Create an instance of extLib and load an external .pasm library
const myLib = new extLib('path/to/externalLib.pasm');
myLib.load().then(() => {
    // Execute a function from the loaded library
    const result = myLib.execute('myFunction', arg1, arg2);
    console.log(result);
});

// Example PASM code to convert
const pasmCode = `
func myFunc
  (print ("Hello from PASM!"))
  (returner !if(name == "johnny") {
    (returner print( := "Yes papa!"))
  })
`;

// Convert PASM to JS/TS syntax
const jsCode = pasmToJs(pasmCode);
console.log(jsCode); // Outputs the converted JavaScript code
```

TypeScript Example:
```typescript
import { libAsm, extLib, pasmToJs } from './libAsm.js';

// Initialize the library
libAsm();

// Create an instance of extLib and load an external .pasm library
const myLib: extLib = new extLib('path/to/externalLib.pasm');
myLib.load().then(() => {
    // Execute a function from the loaded library
    const result: any = myLib.execute('myFunction', arg1, arg2);
    console.log(result);
});

// Example PASM code to convert
const pasmCode: string = `
func myFunc
  (print ("Hello from PASM!"))
  (returner !if(name == "johnny") {
    (returner print( := "Yes papa!"))
  })
`;

// Convert PASM to JS/TS syntax
const jsCode: string = pasmToJs(pasmCode);
console.log(jsCode);
```