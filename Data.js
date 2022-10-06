import * as THREE from "three";
import { Scene } from "three";
import { Cube } from "./cube";

export class Data {
  constructor() {
    // const Longueur = 9;
    // const Hauteur = ;
    this.HAUTEUR = 20;
    this.LONGEUR = 9;
    this.tableau = this.createBaseTableau();
  }

  HighwayToHell() {
    for (let y = this.HAUTEUR - 1; y >= 0; y--) {
      for (let x = this.LONGEUR - 1; x >= 0; x--) {
        if (y != this.HAUTEUR - 1) {
          if (this.tableau[y][x][0] == "i") {
            if (this.tableau[y + 1][x][0] == "v") {
              // camera, the position is changed, but the camera is not updated?
              // let char = this.tableau[y][x][0];
              // let cube = this.tableau[y][x][1];
              // debugger;
              this.tableau[y][x][1].position.y =
                this.TransformerPosition(x, y, true)[1] - 2.5;

              this.tableau[y + 1][x][0] = "i";
              this.tableau[y + 1][x][1] = this.tableau[y][x][1];
              // debugger;

              this.tableau[y][x][0] = "v";
              this.tableau[y][x][1] = null;
            }
          }
        } else if (this.tableau[y][x][0] == "i") {
          for (let y = this.HAUTEUR - 1; y >= 0; y--) {
            for (let x = this.LONGEUR - 1; x >= 0; x--) {
              if (this.tableau[y][x][0] == "i") {
                this.tableau[y][x][0] = "x";
              }
            }
          }
        }
      }
    }
  }

  Deplacement(dir) {
    let mouv_2D = 0;
    let mouv_3D = 0;
    // let canMouve = false;
    switch (dir) {
      case "g":
        mouv_2D = -1;
        mouv_3D = -2.5;
        break;
      case "d":
        mouv_2D = 1;
        mouv_3D = 2.5;
        break;
    }
    for (let y = this.HAUTEUR - 1; y >= 0; y--) {
      for (let x = this.LONGEUR - 1; x >= 0; x--) {
        if (this.tableau[y][x][0] == "i") {
          if (x != 0 && dir == "g") {
            this.mouveDirection(x, y, mouv_2D, mouv_3D);
          } else if (x != this.LONGEUR - 1 && dir == "d") {
            this.mouveDirection(x, y, mouv_2D, mouv_3D);
          }
        }
      }
    }
    for (let y = this.HAUTEUR - 1; y >= 0; y--) {
      for (let x = this.LONGEUR - 1; x >= 0; x--) {
        if (this.tableau[y][x][0] == "D") {
          this.tableau[y][x][0] = "i";
        }
      }
    }
  }

  mouveDirection(x, y, mouv_2D, mouv_3D) {
    if (this.tableau[y][x + mouv_2D][0] == "v") {
      let cube = this.tableau[y][x][1].position.x;
      this.tableau[y][x][1].position.x =
        this.TransformerPosition(x, y, true)[0] + mouv_3D;
      cube = this.tableau[y][x][1].position.x;
      this.tableau[y][x + mouv_2D][0] = "D";
      this.tableau[y][x + mouv_2D][1] = this.tableau[y][x][1];
      this.tableau[y][x][0] = "v";
      this.tableau[y][x][1] = null;
    }
  }
  AjouterCubesTableau(listeCube) {
    listeCube.forEach((cube) => {
      let pos = this.TransformerPosition(
        cube.position.x,
        cube.position.y,
        false
      );
      let x = pos[0];
      let y = pos[1];
      // let x = (cube.position.x/2.5) + 4;
      // let y = ((cube.position.y/2.5) - 10) / -1;
      // console.log(x,y)
      // this;

      this.tableau[y][x][1] = cube;
      this.tableau[y][x][0] = "i";
      // console.log(this.tableau[y][x])
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
    // console.log();
    for (let y = 0; y < this.HAUTEUR; y++) {
      let stringLigne = "";
      for (let x = 0; x < this.LONGEUR; x++) {
        stringLigne += this.tableau[y][x][0];
        //this.AfficherCube(this.tableau[y][x],x,y);
      }
      stringLigne += y;
      console.log(stringLigne);
    }
    //console.log(this.tableau);
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
