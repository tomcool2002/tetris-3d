import * as THREE from "three";
import { Scene } from "three";
import { Cube } from "./cube";
import { Piece } from "./piece";
import { Score } from './score';

export class Data {
  constructor() {
    this.HAUTEUR = 20;
    this.LONGEUR = 9;
    this.tableau = this.createBaseTableau();

    this.positionPiece = [];
    this.piecePrincipale;
    this.score = new Score();

    this.memoirePiece;
    this.memoireblock = [];

    this.scene;
  }
  HighwayToHell() {
    this.Deplacement("b");
  }

  startGame(scene) {
    this.scene = scene;
    // if(this.tableau[0][4][0] == 'v'){
    //   let pieceInit = new Piece();
    //   // pieceInit.listeCube[3].name = 'hello';
    //   this.AjouterCubesTableau(pieceInit.listeCube);
    //   for (let i = 0; i < pieceInit.listeCube.length; i++) {
    //     scene.add(pieceInit.listeCube[i]);
    //   }
    // }
    let pieceInit = new Piece();
    // pieceInit.listeCube[3].name = 'hello';
    this.AjouterCubesTableau(pieceInit.listeCube);
    for (let i = 0; i < pieceInit.listeCube.length; i++) {
      scene.add(pieceInit.listeCube[i]);
    }
    
  }

  Deplacement(dir) {
    let mouv_2D = 0;
    let mouv_3D = 0;
    let peutDeplacer = true;

    switch (dir) {
      case "g": // gauche
        mouv_2D = -1;
        mouv_3D = -2.5;
        if (this.piecePrincipale[1] != 0) {
          // regarde si n'est pas au max
          for (let i = 0; i < this.positionPiece.length; i++) {
            peutDeplacer = this.isValid(
              this.piecePrincipale[0] + this.positionPiece[i][0],
              this.piecePrincipale[1] - 1 + this.positionPiece[i][1]
            );

            if (!peutDeplacer) {
              break;
            }
          }

          if (peutDeplacer) {
            this.Deconstruction();
            this.piecePrincipale[1]--; // modifie position piece "D" dans le tableau 2d
            this.MoveBlock();
            this.Reconstruction(
              this.piecePrincipale[0],
              this.piecePrincipale[1]
            );
          }
        }
        break;
      case "d": // droite
        mouv_2D = 1;
        mouv_3D = 2.5;
        if (this.piecePrincipale[1] != this.LONGEUR - 1) {
          // regarde si n'est pas au max
          for (let i = 0; i < this.positionPiece.length; i++) {
            peutDeplacer = this.isValid(
              this.piecePrincipale[0] + this.positionPiece[i][0],
              this.piecePrincipale[1] + 1 + this.positionPiece[i][1]
            );

            if (!peutDeplacer) {
              break;
            }
          }

          if (peutDeplacer) {
            this.Deconstruction();
            this.piecePrincipale[1]++; // modifie position piece "D" dans le tableau 2d
            this.MoveBlock();
            this.Reconstruction(
              this.piecePrincipale[0],
              this.piecePrincipale[1]
            );
          }
        }
        break;
      case "b": // bas
        mouv_2D = 1;
        mouv_3D = 2.5;
        if (this.piecePrincipale[0] != this.HAUTEUR - 1) {
          // regarde si n'est pas au max

          for (let i = 0; i < this.positionPiece.length; i++) {
            peutDeplacer = this.isValid(
              this.piecePrincipale[0] + 1 + this.positionPiece[i][0],
              this.piecePrincipale[1] + this.positionPiece[i][1]
            );

            if (!peutDeplacer) {
              break;
            }
          }

          if (peutDeplacer) {
            this.Deconstruction();
            this.piecePrincipale[0]++; // modifie position piece "D" dans le tableau 2d
            this.MoveBlock();
            this.Reconstruction(
              this.piecePrincipale[0],
              this.piecePrincipale[1]
            );
          } else {
            this.PlaceBlock();
          }
        }
        break;
    }
  }

  PlaceBlock() {
    let compteur = 0;
    for (let y = this.HAUTEUR - 1; y >= 0; y--) {
      for (let x = this.LONGEUR - 1; x >= 0; x--) {
        if (this.tableau[y][x][0] == "i" || this.tableau[y][x][0] == "D") {
          this.tableau[y][x][0] = "x";
          this.tableau[y][x][1] = this.memoireblock[compteur]
          compteur++;
        }
      }
    }

    console.log()

    this.positionPiece.length = 0;
    this.memoireblock.length = 0;
    //this.startGame(this.scene);




  }

  MoveBlock() {
    this.memoirePiece.position.y = this.TransformerPosition(
      this.piecePrincipale[1],
      this.piecePrincipale[0],
      true
    )[1];

    this.memoirePiece.position.x = this.TransformerPosition(
      this.piecePrincipale[1],
      this.piecePrincipale[0],
      true
    )[0];

    this.tableau[this.piecePrincipale[0]][this.piecePrincipale[1]][0] = "D";
  }

  Reconstruction(y, x) {
    let compteur = 0;
    this.positionPiece.forEach((block) => {
      this.tableau[y + block[0]][x + block[1]][0] = "i";

      this.memoireblock[compteur].position.x = this.TransformerPosition(
        x + block[1],
        y + block[0],
        true
      )[0];

      this.memoireblock[compteur].position.y = this.TransformerPosition(
        x + block[1],
        y + block[0],
        true
      )[1];
      compteur++;
    });
  }

  Deconstruction() {
    for (let y = this.HAUTEUR - 1; y >= 0; y--) {
      for (let x = this.LONGEUR - 1; x >= 0; x--) {
        if (this.tableau[y][x][0] == "i" || this.tableau[y][x][0] == "D") {
          this.tableau[y][x][0] = "v";
          this.tableau[y][x][1] = null;
        }
      }
    }
  }

  AjouterCubesTableau(listeCube) {
    let compteur = 0;
    listeCube.forEach((cube) => {
      let pos = this.TransformerPosition(
        cube.position.x,
        cube.position.y,
        false
      );

      let x = pos[0];
      let y = pos[1];

      if (compteur == 1) {
        this.piecePrincipale = [y, x];
        this.memoirePiece = cube;
        this.tableau[y][x][0] = "D";
      } else {
        this.positionPiece.push([y, x]);
        this.memoireblock.push(cube);
        this.tableau[y][x][0] = "i";
      }
      compteur++;
    });

    this.positionPiece.forEach((piece) => {
      piece[0] -= this.piecePrincipale[0];
      piece[1] -= this.piecePrincipale[1];
    });
  }

  TransformerPosition(x, y, duTableau) {
    let x_transformer;
    let y_transformer;
    if (duTableau == false) {
      x_transformer = x / 2.5 + 4;
      y_transformer = (y / 2.5 - 10) / -1;
    } else {
      x_transformer = (x - 4) * 2.5;
      y_transformer = (y * -1 + 10) * 2.5;
    }

    return [x_transformer, y_transformer];
  }

  AfficherTableau2D() {
    console.clear();
    // console.log(this.positionPiece);
    //console.log(this.piecePrincipale);
    for (let y = 0; y < this.HAUTEUR; y++) {
      let stringLigne = "";
      for (let x = 0; x < this.LONGEUR; x++) {
        stringLigne += this.tableau[y][x][0];
      }
      stringLigne += y;
      console.log(stringLigne);
    }
  }

  CheckLine() {
    let TableauligneComplete = [];

    for (let y = 0; y < this.tableau.length; y++) {
      let complete = true;
      for (let x = 0; x < this.tableau[y].length; x++) {
        if (this.tableau[y][x][0] != "x") {
          complete = false;
        }
      }
      if (complete) {
        TableauligneComplete.push(y);
      }
    }
    //console.log(TableauligneComplete);
    return TableauligneComplete;
  }

  isValid(y, x) {
    if (x < 0 || x >= this.LONGEUR) return false;
    if (y < 0 || y >= this.HAUTEUR) return false;
    if(this.tableau[y][x][0] == 'x') return false;
    return true;
  }

  createBaseTableau() {
    let Tableau = new Array(this.HAUTEUR);

    for (let i = 0; i < this.HAUTEUR; i++) {
      Tableau[i] = new Array(this.LONGEUR);
    }

    for (let i = 0; i < this.HAUTEUR; i++) {
      for (let j = 0; j < this.LONGEUR; j++) {
        Tableau[i][j] = ["v", null]; // tuple (char represantant la case, l'objet cube)
      }
    }
    return Tableau;
  }
}
