import * as THREE from "three";
import { Vector3 } from "three";
import { Cube } from "./cube";

export class Piece  {
  constructor(ajouterCubeTableau) {
    // super();
    // this.orientation = orientation;
    // this.pos = pos;
    this.listeCube = [];
    this.ajouterCubeTableau = ajouterCubeTableau;
    this.Piece = this.createRandomPiece();
    this.isControlled = false;
  }

  getRandomColour() {

    let colors = [
      0x03fbf9,
      0xc4ff00,
      0xff0000,
      0x03ff00,
      0xc400ff,
      0xff00ee,
      0xe46000,
    ];
    let randomNum = Math.floor(Math.random() * 7)
    let couleur = colors[randomNum];
    return couleur;
  }


  createRandomPiece() {
    //random number 1-7
    // let rand = Math.floor(Math.random() * 7) + 1;
    let rand = 6;
    let piece = new THREE.Group();
    let color = this.getRandomColour();

    let arrayCube = this.SwitchCaseCreatePiece(rand,color);

    arrayCube.forEach(cube => {
        cube.Cube.position.y += 20;
        this.listeCube.push(cube.Cube)
    });

    return piece;
  }

  SwitchCaseCreatePiece(pieceNum,color){
    
    let cube1,cube2,cube3,cube4;
    switch (pieceNum) {
      case 1: // I Shape
        // let cube1 = new Cube(2.5,color,0,,-2.5);
        cube1 = new Cube(2.5, color, 0, 5, -2.5);
        cube2 = new Cube(2.5, color, 0, 2.5, -2.5);
        cube3 = new Cube(2.5, color, 0, 0, -2.5);
        cube4 = new Cube(2.5, color, 0, -2.5, -2.5);
        break;
      case 2: // j Shape
        cube1 = new Cube(2.5, color, 0, 0, -2.5);
        cube2 = new Cube(2.5, color, 2.5, 0, -2.5);
        cube3 = new Cube(2.5, color, 2.5, 2.5, -2.5);
        cube4 = new Cube(2.5, color, 2.5, 5, -2.5);
        break;
      case 3: // L Shape
        cube1 = new Cube(2.5, color, 0, 0, -2.5);
        cube2 = new Cube(2.5, color, -2.5, 0, -2.5);
        cube3 = new Cube(2.5, color, -2.5, 2.5, -2.5);
        cube4 = new Cube(2.5, color, -2.5, 5, -2.5);
        break;
      case 4: // O Shape
        cube1 = new Cube(2.5, color, 0, 0, -2.5);
        cube2 = new Cube(2.5, color, 2.5, 0, -2.5);
        cube3 = new Cube(2.5, color, 2.5, 2.5, -2.5);
        cube4 = new Cube(2.5, color, 0, 2.5, -2.5);
        break;
      case 5: // Z Shape
        cube1 = new Cube(2.5, color, 0, 0, -2.5);
        cube2 = new Cube(2.5, color, 2.5, 0, -2.5);
        cube3 = new Cube(2.5, color, 0, 2.5, -2.5);
        cube4 = new Cube(2.5, color, -2.5, 2.5, -2.5);
        break;
      case 6: // T Shape
        cube1 = new Cube(2.5, color, -2.5, 0, -2.5);
        cube2 = new Cube(2.5, color, 0, 0, -2.5);
        cube3 = new Cube(2.5, color, 2.5, 0, -2.5);
        cube4 = new Cube(2.5, color, 0, 2.5, -2.5);
        break;
      case 7: // S Shape
      cube1 = new Cube(2.5, color, 0, 0, -2.5);
      cube2 = new Cube(2.5, color, -2.5, 0, -2.5);
      cube3 = new Cube(2.5, color, 0, 2.5, -2.5);
      cube4 = new Cube(2.5, color, 2.5, 2.5, -2.5);
        break;
    }

    return [cube1,cube2,cube3,cube4];

  }

  createPiece(pieceNum) {
    //random number 1-7
    let piece = new THREE.Group();
    let color = this.getRandomColour();

    let arrayCube = this.SwitchCaseCreatePiece(pieceNum,color);


    arrayCube.forEach(cube => {
      cube.Cube.position.y += 17;
      cube.Cube.position.x -= 25;
      piece.add(cube.Cube);
    });

    return piece;
  }
}
