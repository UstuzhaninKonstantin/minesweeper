import { BaseEntity, RectEntity, CircleEntity } from "./entities.js";


export class Board extends BaseEntity {
    constructor(x, y, countX, countY, len) {
        super(x, y);
        this.cX = countX;
        this.cY = countY;
        this.len = len;
        this.matrix = [];
        let flag = true;
        let mineChance = 0.1;
        let mine = false;
        for (let i = 0; i < this.cX; i++) {
            this.matrix.push([]);
            for (let j = 0; j < this.cY; j++) {
                flag = !flag;
                mine = (Math.random() < mineChance)
                this.matrix[i].push(
                    {
                     'x': this.x + i * this.len,
                     'y': this.y + j * this.len,
                     'color': flag ? '#4ba94f' : '#328837',
                     'visible': false,
                     'mouseTouch': false,
                     'type': mine ? 'mine' : 'clear'
                    }
                );
            }
        }

        for (let i = 0; i < this.cX; i++) {
            for (let j = 0; j < this.cY; j++) {
                let currTile = this.matrix[i][j];
                if (currTile.type === 'mine') continue;
                let count = 0;
                let tiles = this.getTilesAround(i, j);
                for (let tile of tiles) { if (tile) { if (tile.type === 'mine') count += 1 }}
                if (count > 0) {
                    currTile.type = 'mineNear';
                    currTile.value = count;
                } else {
                    currTile.type = 'clear';
                }
            }
        }
    }

    draw() {
        for (let i = 0; i < this.cX; i++) {
            for (let j = 0; j < this.cY; j++) {
                let info = this.matrix[i][j];
                this.game.ctx.fillStyle = info.mouseTouch ? '#88c79d' : info.color;
                this.game.ctx.fillRect(info.x, info.y, this.len, this.len);

                if (info.visible) {
                    if (info.type === 'mine') {
                        this.game.drawText('M', info.x + this.len / 2, info.y + this.len / 2, 15, '#000');
                    } else if (info.type === 'mineNear') {
                        this.game.drawText(info.value, info.x + this.len / 2, info.y + this.len / 2, 15, '#000');
                    } else if (info.type === 'clear') {
                        this.game.drawText('C', info.x + this.len / 2, info.y + this.len / 2, 15, '#000');
                    }
                }

                this.game.ctx.strokeRect(info.x, info.y, this.len, this.len);
            }
        }
    }

    update() {
        this.tileTouched(this.game.mousePos.x, this.game.mousePos.y);
    }

    getTilesAround(i, j) {
        let tilesAround = [this.matrix[i][j - 1], this.matrix[i][j + 1]];
        if (this.matrix[i - 1]) {
            tilesAround.push(this.matrix[i - 1][j], this.matrix[i - 1][j - 1], this.matrix[i - 1][j - 1]);
        } if (this.matrix[i + 1]) {
            tilesAround.push(this.matrix[i + 1][j - 1], this.matrix[i + 1][j], this.matrix[i + 1][j + 1]);
        }
        return tilesAround;
    }

    tileTouched(x, y) {
        for (let i = 0; i < this.cX; i++) {
            for (let j = 0; j < this.cY; j++) {
                let info = this.matrix[i][j];
                if (info.x < x && info.x + this.len > x && info.y < y && info.y + this.len > y) {
                    info.mouseTouch = true;
                    if (this.game.click[0]) {
                        info.visible = true
                        this.click = false;
                    }
                } else info.mouseTouch = false;


            }
        }
    }

}