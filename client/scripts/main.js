import {game} from "./game.js";
import {Board} from "./classes.js";

game.addEntity(new Board(420, 50, 13, 13, 40));

document.addEventListener('mousemove', game.mouseMove.bind(game));
document.addEventListener('mousedown', game.mouseDown.bind(game));
document.addEventListener('mouseup', game.mouseUp.bind(game));
document.addEventListener('keydown', game.keyDown.bind(game));
document.addEventListener('keyup', game.keyUp.bind(game));
game.run();