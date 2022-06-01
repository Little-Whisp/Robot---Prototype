import * as PIXI from 'pixi.js'
import { Didi } from './didi'
import { Shark } from "./shark";
import { Bubble } from './bubble'
import didiImage from "./images/didi.1.png"
import sharkImage from "./images/shark.png"
import bubbleImage from "./images/bubble.png"
import groundImage from "./images/ground.png"
import backgroundImage from "./images/background.png"
// import bgMusic from "url:./images/theme.mp3"



export class Game {

    private pixi: PIXI.Application;
    private loader: PIXI.Loader;
    private sharks: Shark[] = [];
    private bubbles: Bubble[] = [];
    private didi: Didi;

    //
    // STAP 1 - make a pixi canvas
    //
    constructor() {

        // let theme = this.loader.resources["music"].data!
        // theme.play()


        this.pixi = new PIXI.Application({
            width: 1920,
            height: 450
        });
        document.body.appendChild(this.pixi.view);

        console.log("starting .. ?");
        //
        // STAP 2 - preload all images
        //
        this.loader = new PIXI.Loader()
        this.loader
            .add('sharkTexture', sharkImage)
            .add('didiTexture', didiImage)
            .add('bubbleTexture', bubbleImage)
            .add('backgroundTexture', backgroundImage)
            .add('groundTexture', groundImage)
            // .add("music", bgMusic)


        this.loader.onProgress.add((loader) => this.showProgress(loader));
        this.loader.onError.add((arg) => {
            console.error(arg);
        });
        this.loader.load(() => this.startGame());
    }

    private showProgress(p: PIXI.Loader) {
        console.log(p.progress);
    }

    private startGame() {
        let bg = new PIXI.TilingSprite(
            this.loader.resources["backgroundTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height
        );
        this.pixi.stage.addChild(bg);

        let g = new PIXI.TilingSprite(
            this.loader.resources["groundTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height

        );
        this.pixi.stage.addChild(g);

        for (let i = 0; i < 14; i++) {
            let shark = new Shark(this.loader.resources["sharkTexture"].texture!);
            this.pixi.stage.addChild(shark);
            this.sharks.push(shark);
        }

        this.didi = new Didi(
            this,
            this.loader.resources["didiTexture"].texture!
        );
        this.pixi.stage.addChild(this.didi);

        this.pixi.ticker.add(() => this.update());
    }

    public shootBubble(bx: number, by: number) {
        let bubble = new Bubble(
            bx,
            by,
            this,
            this.loader.resources["bubbleTexture"].texture!
        );
        this.pixi.stage.addChild(bubble);
        this.bubbles.push(bubble);
    }

    public removeBubble(bubble: Bubble) {
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
    }

    private update() {
        for (let shark of this.sharks) {
            shark.swim();
            for (let b of this.bubbles) {
                if (this.collision(b, shark)) {
                    b.hit();
                    shark.hit();
                }
            }
        }
        for (let bubble of this.bubbles) {
            bubble.update();
        }

        this.didi.swim();
    }

    private collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds();
        const bounds2 = sprite2.getBounds();

        return (
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y
        );
    }
}

let mygame = new Game()
