import {Game} from "./Game";
import "./style.css";

window.addEventListener("load", init);

function init() {
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 400;
  canvas.height = 400;
  canvas.style.width = "500px";
  canvas.style.height = "500px";
  canvas.style.imageRendering = "pixelated";

  const game = new Game(canvas, context);

  game.start();
}
