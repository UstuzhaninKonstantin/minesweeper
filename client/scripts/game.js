class Game {
    constructor() {
        this.entities = [];
        this.fps = 60;
        this.keys = {};
        this.click = {};
        this.mousePos = {x: 0, y: 0};
        this.camera = {x: 0, y: 0};

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textAlign = 'center';

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

    }

    run() { // game cycle
        setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.fps)
    }

    update() {
        this.entities = this.entities.filter(entity => !entity.toDelete);
        for (let entity of this.entities) {
            try {
                entity.update();
            } catch (err) {
                if (err.message !== 'entity.update is not a function') throw err;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let entity of this.entities) {
            try {
                entity.draw();
            } catch (err) {
                if (err.message !== 'entity.draw is not a function') throw err;
            }
        }
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    drawRect(entity) {
        entity.color ? this.ctx.fillStyle = entity.color : this.ctx.fillStyle = '#000';
        this.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        this.ctx.strokeRect(entity.x, entity.y, entity.w, entity.h);
    }

    drawCircle(entity) {
        entity.color ? this.ctx.fillStyle = entity.color : this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(entity.x, entity.y, entity.radius, Math.PI * 2, 0);
        this.ctx.fill();
        this.ctx.arc(entity.x, entity.y, entity.radius, Math.PI * 2, 0);
        this.ctx.stroke();
    }

    drawText(text, x, y, size, color) {
        this.ctx.font = `${size}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    changeColor(col, amt) {
        let usePound = false;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
        let num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
        let g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }

    randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// ---------------------------------------------------LISTENERS---------------------------------------------------------

        mouseDown(event) {
            this.click[event.button] = true;
        }

        mouseUp(event) {
            this.click[event.button] = false;
        }

        mouseMove(event) {
            this.mousePos.x = event.clientX;
            this.mousePos.y = event.clientY;
        }

        keyDown(event) {
            this.keys[event.code] = true;
        }

        keyUp(event) {
            this.keys[event.code] = false;
        }
}

export const game = new Game();