import {Game, Vector2} from "./Game";

export class Fruit {
  public position: Vector2;
  public game: Game;

  constructor(game: Game, firstPosition: Vector2) {
    this.position = firstPosition;
    this.game = game;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "red";
    context.fillRect(
      this.position.x * this.game.cellSize,
      this.position.y * this.game.cellSize,
      this.game.cellSize,
      this.game.cellSize
    );
  }

  changeFruitPosition(): void {
    const randomPosition = {
      x: Math.floor(Math.random() * this.game.cellsCount),
      y: Math.floor(Math.random() * this.game.cellsCount),
    };

    if (
      this.game.player.body.find(
        (bodyPart) => bodyPart.x === randomPosition.x && bodyPart.y === randomPosition.y
      )
    ) {
      return this.changeFruitPosition();
    }

    this.position = randomPosition;
  }
}
