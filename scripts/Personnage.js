export class Personnage extends createjs.Sprite {

    constructor(quelSprite) {
        super(quelSprite);
        this.canvas = document.querySelector("canvas");
        this.ecouteurs = this.animationDebut.bind(this);
        this.on("added", this.animationDebut.bind(this), this, true);

        this.ecouteurTouchePesee = this.gererTouchePesee.bind(this);
        this.ecouteurToucheRelachee = this.gererToucheRelachee.bind(this);
        window.addEventListener("keydown", this.ecouteurTouchePesee);
        window.addEventListener("keyup", this.ecouteurToucheRelachee);
    }

    animationDebut(){
        this.gotoAndPlay("anime");
        this.animationEntree = createjs.Tween
            .get(this)
            .to({y: 75}, 2000, createjs.Ease.cubicInOut)
            .call(this.joueuranime.bind(this));
    }

    joueuranime(e) {

        // this.gotoAndPlay("anime");
        // this.animationEntree = createjs.Tween.get(this).to({y: 150}, 2000, createjs.Ease.cubicInOut).call(this.animation);
        this.animation = createjs.Tween
            .get(this, {loop: -1, bounce: true})
            .to({y: this.stage.canvas.height - this.getBounds(this).height}, 1500, createjs.Ease.cubicInOut);

    }

    gererTouchePesee(e) {

        if (e.key === "ArrowRight") {
            this.animation.paused = true;
        }

    }

    gererToucheRelachee(e) {
        if (e.key === "ArrowRight") this.animation.paused = false;
    }


    detruire() {


        window.removeEventListener("keydown", this.ecouteurs);
        window.removeEventListener("keydown", this.ecouteurTouchePesee);
        window.removeEventListener("keyup", this.ecouteurToucheRelachee);

        createjs.Tween.removeTweens(this);

        // this.stage.removeChild(this.projectible);

    }

}