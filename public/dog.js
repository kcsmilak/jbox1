if (typeof(module) !== 'undefined') { Animal = require('./animal'); }

class Dog extends Animal {
    constructor() {
        super()
    }
    
    speak() {
        console.log("bark!")
    }
}

if (typeof(module) !== 'undefined') { module.exports = Dog; }


