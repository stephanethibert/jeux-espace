export class Projectible extends createjs.Bitmap {

    constructor(quelleImage, direction) {
        super(quelleImage);

        this.vitesse = 30;
        this.direction = direction;
        this.quelleFonctionEcouteur = this.actualiser.bind(this);
        createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur);

    }

    actualiser() {

        this.x += this.vitesse;


        // if (this.x > this.parent.canvas.width || this.x < 0) {
        //
        //     this.parent.removeChild(this);
        //     createjs.Ticker.removeEventListener("tick", this.quelleFonctionEcouteur);
        //
        //
        //
        // } else {


        // if (this.direction === "gauche" || e.key === "ArrowLeft") {
        //
        //         this.vitesse = -50;
        //
        //         this.rotation = 180;
        //         this.x += this.vitesse;
        //
        //         console.log(this.vitesse)
        //     }
        //
        // else if (this.direction === "droite")
        //
        //
        //     this.x += this.vitesse;


        // }
        //
        // // Filtrage de la liste d'affichage pour ne retenir que les éléments qui nous intéressent
        // let projectiles = this.stage.children.filter(item => item instanceof Projectible);
        // let boucliers = this.stage.children.filter(item => item instanceof BouclierPerso);
        //
        // projectiles.forEach(projectile => {
        //
        //     // Vérification d'une collision entre un projectile et le défenseur
        //     let point = this.ennemis.globalToLocal(projectile.x, projectile.y);
        //     if (this.ennemis.hitTest(point.x, point.y)) {
        //         projectile.detruire();
        //         // this.ajusterPointage(-200);
        //         // this.ajusterPointsDef();
        //     }
        //
        //     // Vérification d'une collision entre un projectile et un bloc
        //     boucliers.forEach(bouclier => {
        //
        //         let point = bouclier.globalToLocal(projectile.x, projectile.y);
        //
        //         if (bouclier.hitTest(point.x, point.y)) {
        //             projectile.detruire();
        //             bouclier.detruire();
        //             this.ajusterPointage(1000);
        //             if (boucliers.length === 1) this.terminer();
        //         }
        //
        //     });
        //
        // });

        //
        //      let intersection = ndgmr.checkRectCollision(this.boucliers, this);
        //
        //
        //      if (intersection) {
        //          console.log(this.boucliers);
        //          const explosion = new Explosion(this.chargeur.getResult('explosion'));
        //          explosion.x = this.x;
        //          explosion.y = this.y;
        //          this.parent.addChild(explosion);
        //          createjs.Sound.play("explotionsons", {"loop": 0, "volume": 0.1});
        //
        //          this.parent.removeChild(this);
        //          createjs.Ticker.removeEventListener("tick", this.quelleFonctionEcouteur);
        //
        //
        //          console.log('supermen')
        //
        //
        //      }
        //
        //
        //     console.log(this.ennemis)
        //      let intersectionEnnmis = ndgmr.checkRectCollision(this.ennemis,this);
        //
        //
        //      if (intersectionEnnmis) {
        //
        //          const explosion = new Explosion(this.chargeur.getResult('explosion'));
        //          explosion.x = this.x;
        //          explosion.y = this.y;
        //          this.parent.addChild(explosion);
        //          createjs.Sound.play("explotionsons", {"loop": 0, "volume": 0.1});
        //          this.jeu.pointage++;
        //          this.jeu.misejourPoints();
        //
        //          this.parent.removeChild(this);
        //          createjs.Ticker.removeEventListener("tick", this.quelleFonctionEcouteur);
        //
        //
        //      }
        //
        //
        //     if (this.jeu.pointage >= 4) {
        //
        //         this.afficherBravo();
        //
        //         this.jeu.terminer();
        //
        //
        //     }
        //
        // }


    }

    detruire() {
        createjs.Tween.removeTweens(this);
        this.removeAllEventListeners();
        this.parent.removeChild(this);
        createjs.Ticker.removeEventListener("tick", this.quelleFonctionEcouteur);
    }


}