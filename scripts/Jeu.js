import {Personnage} from './Personnage.js';
import {Ennemi} from './Ennemi.js';
import {Compteur} from './Compteur.js';
import {BouclierPerso} from "./BouclierPerso.js";
import {BouclierEnnemi} from "./BouclierEnnemi.js";
import {Projectible} from "./Projectible.js ";
import {ProjectileEnnemi} from "./ProjectileEnnemi.js ";
import {Explosion} from "./Explosion.js ";


export default class Jeu {
    constructor() {
        this.ecouteurs = this.tirer.bind(this);

        this.canvas = document.querySelector("canvas");

        this.parametres = {
            cadence: 60,
            textes: {
                format: "60px 'Pixel'",
                couleur: '#bd7b0b'
            }
        };


        document.fonts.load(this.parametres.textes.format).then(this.chargerRessource.bind(this));


    }

    chargerRessource() {
        this.chargeur = new createjs.LoadQueue();
        this.chargeur.installPlugin(createjs.Sound);
        this.chargeur.addEventListener('complete', this.debuter.bind(this));
        this.chargeur.loadManifest("ressources/manifest.json");
    }


    debuter() {
        createjs.Ticker.framerate = this.parametres.cadence;
        this.canvas.height = 800;
        this.canvas.width = 1280;
        this.stage = new createjs.StageGL(this.canvas);

        this.fond = new createjs.Bitmap(this.chargeur.getResult("background"));

        this.stage.addChild(this.fond);

        setTimeout(this.enleverMenu.bind(this), 1000);
        this.pointage = 0;

        createjs.Ticker.addEventListener('tick', e => this.stage.update(e));
        this.menuintro = new createjs.Bitmap(this.chargeur.getResult("menu"));

        this.stage.addChild(this.menuintro);

        this.quelleFonctionEcouteur = (this.detecter.bind(this));
        createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur);
    }

    enleverMenu() {
        this.stage.removeChild(this.menuintro);
        window.addEventListener("keydown", this.ecouteurs);

        this.ajouterEnnemi();
        this.ajouterPersonnage();

        this.texteDebut = new createjs.Text('Battez-vous!', this.parametres.textes.format, "white");
        this.texteDebut.cache(0, 0, this.texteDebut.getBounds().width, this.texteDebut.getBounds().height);
        this.texteDebut.regX = this.texteDebut.getMeasuredWidth() / 2;
        this.texteDebut.regY = this.texteDebut.getMeasuredHeight() / 2;
        this.texteDebut.x = this.stage.canvas.width / 2 ;
        this.texteDebut.y = this.stage.canvas.height / 2 ;
        this.texteDebut.scale = 0;

        this.stage.addChild(this.texteDebut);

        setTimeout(this.animDebut.bind(this), 1500);



    }

    animDebut(){
        this.animationDebut = createjs.Tween
            .get(this.texteDebut)
            .to({scale:1}, 500, createjs.Ease.cubicInOut)
            .wait(500)
            .to({scale:0}, 500, createjs.Ease.cubicInOut);

        setTimeout(this.commencerJeu.bind(this), 1000);



    }

    commencerJeu(){
        this.ajouterinterface();
        this.ajouterBouclier();

        createjs.Sound.play("trame", {"loop": 1, "volume": 0.1});
    }

    ajouterPersonnage() {
        this.personnage = new Personnage(this.chargeur.getResult('personnage'));
        this.personnage.x = 125;
        this.personnage.y = -300;
        this.personnage.scale = 0.6;

        this.stage.addChild(this.personnage);
    }


    ajouterEnnemi() {

        this.ennemi = new Ennemi(this.chargeur.getResult('ennemi'), this.chargeur.getResult('projectible'), this.bouclierEnnemi, this.chargeur, this.personnage, this);
        this.ennemi.x = this.stage.canvas.width - 300;
        this.ennemi.y = this.stage.canvas.height + 300;
        this.ennemi.scale = 0.6;

        this.stage.addChild(this.ennemi);
    }


    ajouterBouclier() {
        this.bouclierEnnemi = new BouclierEnnemi(this.chargeur.getResult('bouclier'));

        this.bouclierPerso = new BouclierPerso(this.chargeur.getResult('bouclier'));

        this.bouclierPerso.x = 350;
        this.bouclierPerso.y = 0;

        this.bouclierPerso.scale = 0.3;

        this.bouclierEnnemi.x = 775;
        this.bouclierEnnemi.y = this.stage.canvas.height - (this.bouclierEnnemi.getBounds().height / 2);

        this.bouclierEnnemi.scale = 0.3;

        this.stage.addChild(this.bouclierEnnemi, this.bouclierPerso);
    }

    ajouterinterface() {
        this.interface = new createjs.Container();
        this.interface.width = 200;

        this.compteur = new Compteur(this, this.chargeur.getResult(Compteur));


        this.pointagePerso = new createjs.Text(this.pointage, this.parametres.textes.format, "#5fb2ce");
        this.pointagePerso.cache(0, 0, 200, this.pointagePerso.getBounds().height);
        this.pointagePerso.x = 200;
        this.pointagePerso.y = 25;

        this.pointageEnnemi = new createjs.Text(this.pointage, this.parametres.textes.format, "#9d6287");
        this.pointageEnnemi.cache(0, 0, 200, this.pointageEnnemi.getBounds().height);
        this.pointageEnnemi.x = 1030;
        this.pointageEnnemi.y = 25;

        this.interface.addChild(this.pointagePerso, this.pointageEnnemi, this.compteur);
        this.interface.x = this.canvas.width / 2 - this.interface / 2;

        this.stage.addChild(this.interface);
    }

    ajusterPointagePerso(points) {
        this.pointagePerso.text = parseInt(this.pointagePerso.text) + points;
        this.pointagePerso.updateCache();
    }

    ajusterPointageEnnemi(points) {
        this.pointageEnnemi.text = parseInt(this.pointageEnnemi.text) + points;
        this.pointageEnnemi.updateCache();
    }

    tirer(e) {
        if (e.key === "ArrowLeft") {
            this.projectileEnnemi();
            createjs.Sound.play("music", {"loop": 0, "volume": 0.8});

        } else if (e.key === "ArrowDown") {


            this.projectilePerso();
            createjs.Sound.play("music", {"loop": 0, "volume": 0.8});

        }
    }

    projectileEnnemi() {
        this.balleEnnemi = new ProjectileEnnemi(this.chargeur.getResult("projectible"));
        this.balleEnnemi.x = this.ennemi.x + 100;
        this.balleEnnemi.y = this.ennemi.y + 100;
        this.balleEnnemi.scale = 0.3;
        this.balleEnnemi.rotation = 180;

        this.stage.addChild(this.balleEnnemi);
    }

    projectilePerso() {
        this.ballePerso = new Projectible(this.chargeur.getResult("projectible"),);
        this.ballePerso.x = this.personnage.x + 100;
        this.ballePerso.y = this.personnage.y + 100;
        this.ballePerso.scale = 0.3;

        this.stage.addChild(this.ballePerso);
    }

    detecter() {
        // Filtrage de la liste d'affichage pour ne retenir que les éléments qui nous intéressent
        let projectiles = this.stage.children.filter(item => item instanceof Projectible);
        let projectilesEnnemis = this.stage.children.filter(item => item instanceof ProjectileEnnemi);
        let boucliers = this.stage.children.filter(item => item instanceof BouclierPerso);

        projectiles.forEach(projectile => {

            // Vérification d'une collision entre un projectile et le défenseur
            let point = this.ennemi.globalToLocal(projectile.x, projectile.y);
            if (this.ennemi.hitTest(point.x, point.y)) {
                projectile.detruire();
                const explosion = new Explosion(this.chargeur.getResult('explosion'));
                explosion.x = this.ennemi.x;
                explosion.y = this.ennemi.y;
                this.stage.addChild(explosion);

                createjs.Sound.play("explotionsons", {"loop": 0, "volume": 1});

                this.ajusterPointagePerso(20);
            }

            // Vérification d'une collision entre un projectile et un bloc
            boucliers.forEach(bouclier => {

                let point = bouclier.globalToLocal(projectile.x, projectile.y);

                if (this.bouclierPerso.hitTest(point.x, point.y)) {

                    this.explosion = new Explosion(this.chargeur.getResult('explosion'));
                    this.explosion.x = this.bouclierPerso.x;
                    this.explosion.y = this.bouclierPerso.y;
                    this.stage.addChild(this.explosion);
                    projectile.detruire();

                    createjs.Sound.play("explotionsons", {"loop": 0, "volume": 1});
                }
            });
        });

        projectilesEnnemis.forEach(projectileEnnemi => {

            // Vérification d'une collision entre un projectile et le défenseur
            let point = this.personnage.globalToLocal(projectileEnnemi.x, projectileEnnemi.y);
            if (this.personnage.hitTest(point.x, point.y)) {
                projectileEnnemi.detruire();
                const explosion = new Explosion(this.chargeur.getResult('explosion'));
                explosion.x = this.personnage.x;
                explosion.y = this.personnage.y;
                this.stage.addChild(explosion);

                createjs.Sound.play("explotionsons", {"loop": 0, "volume": 1});

                this.ajusterPointageEnnemi(20);
            }


            // Vérification d'une collision entre un projectile et un bloc
            boucliers.forEach(bouclier => {

                let point = bouclier.globalToLocal(projectileEnnemi.x, projectileEnnemi.y);

                if (this.bouclierEnnemi.hitTest(point.x, point.y)) {

                    this.explosion = new Explosion(this.chargeur.getResult('explosion'));
                    this.explosion.x = this.bouclierEnnemi.x;
                    this.explosion.y = this.bouclierEnnemi.y;
                    this.stage.addChild(this.explosion);
                    projectileEnnemi.detruire();

                    createjs.Sound.play("explotionsons", {"loop": 0, "volume": 1});
                }
            });
        });
    }


    terminer() {
        this.stage.removeChild(this.compteur);

        this.texteFin = new createjs.Text('Victoire du joueur 2!', this.parametres.textes.format, this.parametres.textes.couleur);
        this.texteFin.cache(0, 0, this.texteFin.getBounds().width, this.texteFin.getBounds().height);
        this.texteFin.x = (this.stage.canvas.width / 2) - (this.texteFin.getMeasuredWidth() / 2);
        this.texteFin.y = (this.stage.canvas.height / 2) - (this.texteFin.getMeasuredHeight() / 2);

        this.stage.addChild(this.texteFin);

        if (this.pointageEnnemi.text > this.pointagePerso.text) {
            this.texteFin.text = "Victoire du joueur 2!";
            this.texteFin.updateCache();
        } else if (this.pointageEnnemi.text < this.pointagePerso.text) {
            this.texteFin.text = "Victoire du joueur 1!";
            this.texteFin.updateCache();
        } else {
            this.texteFin.text = "Égalité!";
            this.texteFin.updateCache();
        }

        let meilleurTemps = JSON.parse(localStorage.getItem('meilleurTemps'));


        if (!meilleurTemps) {


            meilleurTemps = {
                attaquant: {
                    nom: this.personnage.nom,
                    pointage: parseInt(this.pointage.text)
                },
                defenseur: {
                    nom: this.ennemi.nom,
                    pointage: parseInt(this.compteur.temps.text)
                }
            };

        }

        if (parseInt(this.pointage.text) < meilleurTemps.attaquant.pointage) {

            meilleurTemps.attaquant.pointage = parseInt(this.pointage.text);
            meilleurTemps.attaquant.nom = this.personnage.nom;
        }

        if (parseInt(this.compteur.temps.text) > meilleurTemps.defenseur.pointage) {

            meilleurTemps.defenseur.pointage = parseInt(this.compteur.temps.text);
            meilleurTemps.defenseur.nom = this.ennemi.nom;
        }


        localStorage.setItem("records", JSON.stringify(meilleurTemps));

        window.removeEventListener("keydown", this.ecouteurs);


        this.personnage.detruire();

        this.bouclierEnnemi.detruire();
        this.bouclierPerso.detruire();

        this.ennemi.detruire();

        this.compteur.detruire();

        this.stage.removeChild(this.pointagetext);


    }


}
