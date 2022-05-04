

class Keyboard {
    // https://keycode.info/for/Space
    get a() { return keyIsDown(65) } //p5
    get d() { return keyIsDown(68) } //p5
    get s() { return keyIsDown(83) } //p5
    get w() { return keyIsDown(87) } //p5
    get t() { return keyIsDown(84) } //p5
    get f() { return keyIsDown(70) } //p5

    get q() { return keyIsDown(81) } //p5
    get e() { return keyIsDown(69) } //p5
    get g() { return keyIsDown(71) } //p5

    get k1() { return keyIsDown(49) } //p5
    get k2() { return keyIsDown(50) } //p5
    get k3() { return keyIsDown(51) } //p5
    get k4() { return keyIsDown(52) } //p5
    get k5() { return keyIsDown(53) } //p5



    get space() { return keyIsDown(32) || this.fireTouch() } //p5
    get shift() { return keyIsDown(16) } //p5 TODO: this is only left shift

    fireTouch() {
        let touched = false

        touches.forEach(touch => {
            if (touch.x > 100 && touch.y > 100) touched = true
            //touched = true
        })
        return touched
    }
}