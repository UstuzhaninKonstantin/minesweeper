import { game } from "./game.js";


export class BaseEntity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.game = game
        this.toDelete = false;
        this.type = undefined;
    }
}


export class ColorfulEntity extends BaseEntity {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }

}


export class RectEntity extends ColorfulEntity {
    constructor(x, y, color, w, h) {
        super(x, y, color);
        this.w = w;
        this.h = h;
    }

}


export class CircleEntity extends ColorfulEntity {
    constructor(x, y, color, radius) {
        super(x, y, color);
        this.radius = radius;
    }

}
