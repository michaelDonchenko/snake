import {Game} from "./Game";

const states = {
  left: {name: "left", nextPossibleStates: ["up", "down"]},
  right: {name: "right", nextPossibleStates: ["up", "down"]},
  up: {name: "up", nextPossibleStates: ["left", "right"]},
  down: {name: "down", nextPossibleStates: ["left", "right"]},
};

const mapKeysToState = {
  w: "up",
  d: "right",
  s: "down",
  a: "left",
} as const;

const validKeys = ["w", "d", "s", "a"] as const;

export type ValidKey = (typeof validKeys)[number];
export type StateKey = keyof typeof states;

export class StateMachine {
  public currentState;
  public game: Game;

  constructor(game: Game, defaultState: StateKey) {
    this.currentState = states[defaultState];
    this.game = game;

    window.addEventListener("keydown", (event) => {
      if (validKeys.includes(event.key as ValidKey)) {
        this.changeState(event.key as ValidKey);
      }
    });
  }

  changeState(key: ValidKey) {
    const nextState = mapKeysToState[key];
    if (this.currentState.nextPossibleStates.includes(nextState)) {
      this.currentState = states[nextState];
    }
  }
}
