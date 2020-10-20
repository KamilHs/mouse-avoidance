class Particle {
    static multForMouse = -1;
    constructor(x, y, r, color, mx, my) {
        this.pos = createVector(random(mx), random(my));
        this.target = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.r = r;
        this.color = color;
        this.maxSpeed = 20;
        this.maxForce = 1;
    }

    draw() {
        fill(this.color, 100, 100);
        ellipse(this.pos.x, this.pos.y, this.r);
    }

    behaviors() {
        this.applyForce(this.arrive(this.target));
        this.applyForce(this.arrive(createVector(mouseX, mouseY), true).mult(5));
    }

    arrive(target, mouse = false) {
        let targeted = p5.Vector.sub(target, this.pos);

        if (mouseIsPressed) targeted.mult(-1);
        else if (mouse) targeted.mult(Particle.multForMouse);

        let d = targeted.mag();
        if (mouse && d > 200) return createVector(0, 0);
        let speed = this.maxSpeed;
        if (d < 70)
            speed = map(d, 0, 200, 0, this.maxSpeed);


        targeted.setMag(speed);

        return p5.Vector.sub(targeted, this.vel).limit(this.maxForce);
    }

    applyForce(seek) {
        this.acc.add(seek);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
}

function keyPressed() {
    if (keyCode == 32)
        Particle.multForMouse = 1 - Particle.multForMouse;
}