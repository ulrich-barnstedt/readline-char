## readline-char
`$ npm install readline-char`

Usage
```js
const Rlc = require("readline-char");

//create an instance
let input = new Rlc();

//add an listener
input.bind((key) => {console.log(key)});

//add an cleanup listener (on ctrl+c)
input.bindCleanup(() => {
    //cleanup code
})

//start listening for events
input.init();

//block all listeners
input.block();

//unblock all listeners
input.unblock();

//register a handler which is not effected by blocking
input.bindUnblocked((key) => {console.log(key)});
```