export class Ennemi extends createjs.Sprite {

    constructor(leSprite) {

        super(leSprite);


        this.canvas = document.querySelector("canvas");

        this.parmetres = {
            x1: this.canvas.width - this.getBounds().width,
            x2: 200,
            y1: 100,
            y2: this.canvas.height - this.getBounds().height
        };

        this.ecouteurs = this.animationDebut.bind(this);

        this.on("added", this.animationDebut.bind(this), this, true);

        this.ecouteurTouchePesee1 = this.gererTouchePesee1.bind(this);
        this.ecouteurToucheRelachee1 = this.gererToucheRelachee1.bind(this);
        window.addEventListener("keydown", this.ecouteurTouchePesee1);
        window.addEventListener("keyup", this.ecouteurToucheRelachee1);
    }

    animationDebut(){
        this.gotoAndPlay("animeennemis");
        this.animationEntree = createjs.Tween
            .get(this)
            .to({y: 650}, 2000, createjs.Ease.cubicInOut)
            .call(this.joueuennmiesranime.bind(this));
    }

    joueuennmiesranime() {
        this.animation = createjs.Tween
            .get(this, {loop: -1, bounce: true})
            .to({y:  this.stage.canvas.height - this.getBounds(this).height}, 1500, createjs.Ease.cubicInOut)
    }

    gererTouchePesee1(e) {

        if (e.key === "ArrowUp") {
            this.animation.paused = true;
            console.log("hello")
        }

    }

    gererToucheRelachee1(e) {
        if (e.key === "ArrowUp") {

            this.animation.paused = false;
            console.log("hello34")

        }

    }


    detruire() {


        window.removeEventListener("keydown", this.ecouteurs);
        window.removeEventListener("keydown", this.ecouteurTouchePesee1);
        window.removeEventListener("keyup", this.ecouteurToucheRelachee1);
        createjs.Tween.removeTweens(this);


        console.log("bye")


    }
}