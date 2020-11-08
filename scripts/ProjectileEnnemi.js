export class ProjectileEnnemi extends createjs.Bitmap {

    constructor(atlas) {
        super(atlas);
        this.vitesse = -30;
        this.quelleFonctionEcouteur = this.actualiser.bind(this);
        createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur);
    }

    actualiser() {
        this.x += this.vitesse;
    }

    detruire() {
        createjs.Tween.removeTweens(this);
        this.removeAllEventListeners();
        this.parent.removeChild(this);
        createjs.Ticker.removeEventListener("tick", this.quelleFonctionEcouteur);
    }


}