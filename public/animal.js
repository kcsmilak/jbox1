class Animal {
    constructor() {
        
    }
    
    speak() {
        console.log("I'm mute!")
    }
}

if (typeof(module) !== 'undefined') { module.exports = Animal; }
