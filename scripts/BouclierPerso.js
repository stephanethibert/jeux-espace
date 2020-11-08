export class BouclierPerso extends createjs.Sprite {

    constructor(atlas) {
        super(atlas);

        this.addEventListener("added", this.animer.bind(this));
    }

    animer() {
        this.gotoAndPlay("bouclier");
        this.animation = createjs.Tween
            .get(this, {loop: -1, bounce: true})
            .to({y: this.stage.canvas.height - 200}, 500, createjs.Ease.cubicInOut);
    }

    detruire() {
        window.removeEventListener("keydown", this.ecouteurs);
        createjs.Tween.removeTweens(this);
    }
}