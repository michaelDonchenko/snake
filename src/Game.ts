import {StateMachine} from "./StateMachine";
import {Player} from "./Player";
import {Fruit} from "./Fruit";

export interface Vector2 {
  x: number;
  y: number;
}

export class Game {
  public lastTime: number;
  public player: Player;
  public stateMachine: StateMachine;
  public fruit: Fruit;
  public cellSize: number;
  public counter: number;
  public cellsCount: number;
  public score: number;
  public scoreText: HTMLHeadingElement;
  public button: HTMLButtonElement;
  public isGameOver: boolean;

  constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D) {
    this.lastTime = 0;
    this.counter = 0;
    this.cellSize = 20;
    this.cellsCount = canvas.width / this.cellSize;
    this.isGameOver = false;

    this.stateMachine = new StateMachine(this, "right");
    this.player = new Player(this);
    this.fruit = new Fruit(this, {x: 4, y: 4});
    this.score = 0;

    this.scoreText = document.querySelector("h3") as HTMLHeadingElement;
    this.scoreText.innerHTML = `Score: ${this.score}`;
    this.button = document.querySelector("button") as HTMLButtonElement;

    this.button.addEventListener("click", () => {
      this.restart();
    });
  }

  start() {
    this.animate();
  }

  animate() {
    this.counter++;

    if (this.isGameOver) {
      this.context.font = "30px serif";
      this.context.fillStyle = "black";
      this.context.textAlign = "center";
      this.context.fillText("Game over!", this.canvas.width / 2, this.canvas.height / 2);
      return;
    }

    requestAnimationFrame(this.animate.bind(this));

    if (this.counter === 12) {
      this.counter = 0;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.update();
      this.draw();
    }
  }

  update() {
    this.player.update();
  }

  draw() {
    this.setBackground();

    this.player.draw(this.context);
    this.fruit.draw(this.context);
  }

  setBackground() {
    this.context.fillStyle = "white";
    this.context.strokeStyle = "lightgray";

    this.context.fillRect(0, 0, this.canvas.height, this.canvas.width);
    this.context.strokeRect(0.5, 0.5, this.canvas.width - 1, this.canvas.height - 1);

    for (let x = 0.5; x < this.canvas.width; x += this.cellSize) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.height);
    }
    for (let y = 0.5; y < this.canvas.height; y += this.cellSize) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width, y);
    }

    this.context.stroke();
  }

  restart() {
    window.location.reload();
  }
}
