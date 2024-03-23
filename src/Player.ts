import {Game, Vector2} from "./Game";

export class Player {
  public body: Vector2[];
  public speed: number;
  public velocity: Vector2;
  public initialBody: Vector2[];

  constructor(public game: Game) {
    this.initialBody = [
      {x: 4, y: 0},
      {x: 3, y: 0},
      {x: 2, y: 0},
      {x: 1, y: 0},
    ];
    this.body = [...this.initialBody];
    this.speed = 1;
    this.velocity = {x: 0, y: 0};
  }

  update() {
    switch (this.game.stateMachine.currentState.name) {
      case "right":
        this.velocity.x = this.speed;
        this.velocity.y = 0;
        break;
      case "left":
        this.velocity.x = -this.speed;
        this.velocity.y = 0;
        break;
      case "up":
        this.velocity.x = 0;
        this.velocity.y = -this.speed;
        break;
      case "down":
        this.velocity.x = 0;
        this.velocity.y = this.speed;
        break;
    }

    const currentHead = this.body[0];
    const newHead = {x: currentHead.x + this.velocity.x, y: currentHead.y + this.velocity.y};

    if (this.checkCollisionWithFruit()) {
      this.body.unshift(newHead);
      this.game.fruit.changeFruitPosition();

      this.game.score += 10;
      this.game.scoreText.innerHTML = `Score: ${this.game.score}`;
    } else {
      this.body.unshift(newHead);
      this.body.pop();
    }

    if (this.isOutOfBounds() || this.checkCollisionWithSelf()) {
      this.game.isGameOver = true;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "green";

    this.body.forEach((part) => {
      context.fillRect(
        part.x * this.game.cellSize,
        part.y * this.game.cellSize,
        this.game.cellSize,
        this.game.cellSize
      );
    });
  }

  checkCollisionWithFruit() {
    const head = this.body[0];
    if (head.x === this.game.fruit.position.x && head.y === this.game.fruit.position.y) {
      return true;
    } else {
      return false;
    }
  }

  isOutOfBounds() {
    const head = this.body[0];
    if (
      head.x < 0 ||
      head.x > this.game.cellsCount ||
      head.y < 0 ||
      head.y > this.game.cellsCount
    ) {
      return true;
    }
    return false;
  }

  checkCollisionWithSelf() {
    const head = this.body[0];
    const otherParts = this.body.slice(1);

    if (otherParts.find((part) => part.x === head.x && part.y === head.y)) {
      return true;
    }
    return false;
  }
}
