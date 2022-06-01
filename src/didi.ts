import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Didi extends PIXI.Sprite {
  private xspeed = 0;
  private yspeed = 0;
  private mygame: Game;

  constructor(mygame: Game, texture: PIXI.Texture) {
    super(texture);
    this.xspeed = 0;
    this.yspeed = 0;
    this.x = 100;
    this.y = 330;
;
    this.scale.set(0.3);
    this.mygame = mygame;
    console.log(this.mygame);

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
  }

  public swim() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  private shoot() {
    this.mygame.shootBubble(this.x, this.y);
  }

  private onKeyDown(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case "F":
        this.shoot();
        break;
      case "A":
      case "ARROWLEFT":
        this.xspeed = -7;
        break;
      case "D":
      case "ARROWRIGHT":
        this.xspeed = 7;
        break;
      case "W":
      case "ARROWUP":
        this.yspeed = -7;
        break;
      case "S":
      case "ARROWDOWN":
        this.yspeed = 7;
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        break;
      case "A":
      case "D":
      case "ARROWLEFT":
      case "ARROWRIGHT":
        this.xspeed = 0;
        break;
      case "W":
      case "S":
      case "ARROWUP":
      case "ARROWDOWN":
        this.yspeed = 0;
        break;
    }
  }
}
