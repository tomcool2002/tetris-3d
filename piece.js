import * as THREE from "three";
import { Vector3 } from "three";
import { Cube } from "./cube";

export class Piece extends THREE.Group {
  constructor(ajouterCubeTableau) {
    super();
    // this.orientation = orientation;
    // this.pos = pos;
    this.listeCube = [];
    this.ajouterCubeTableau = ajouterCubeTableau;
    this.Piece = this.createRandomPiece();
    this.isControlled = false;
  }

  createRandomColorCube(size, color, x, y, z) {
    let colour = new THREE.Color(color);
    let geometry = new THREE.BoxGeometry(size, size, size);

    let material = new THREE.MeshBasicMaterial({ color: colour });
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    // console.log(cube.material.color)

    return cube;
  }

  getRandomColour() {
    var letters = "0123456789ABCDEF";
    var colour = "#";
    for (var i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
  }

  //enleveCube(){
  //  this.remove(this.listeCube[0]);
  //}

  createRandomPiece() {
    //random number 1-7
    //let rand = Math.floor(Math.random() * 7) + 1;
    let rand = 1;
    let piece = new THREE.Group();
    let color = this.getRandomColour();
    //console.log(rand);
    let cube1;
    let cube2;
    let cube3;
    let cube4;

    switch (rand) {
      case 1: // I Shape
        // let cube1 = new Cube(2.5,color,0,,-2.5);
        cube1 = new Cube(2.5, color, 0, 5, -2.5);
        cube2 = new Cube(2.5, color, 0, 2.5, -2.5);
        cube3 = new Cube(2.5, color, 0, 0, -2.5);
        cube4 = new Cube(2.5, color, 0, -2.5, -2.5);

        // this.ajouterCubeTableau(cube1.Cube);
        // this.ajouterCubeTableau(cube2.Cube);
        // this.ajouterCubeTableau(cube3.Cube);
        // this.ajouterCubeTableau(cube4.Cube);

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
        cube1 = new Cube(2.5, color, 0, 0, -2.5);
        cube2 = new Cube(2.5, color, -2.5, 0, -2.5);
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

    cube1.Cube.position.y += 20;
    cube2.Cube.position.y += 20;
    cube3.Cube.position.y += 20;
    cube4.Cube.position.y += 20;
    this.listeCube.push(cube1.Cube);
    this.listeCube.push(cube2.Cube);
    this.listeCube.push(cube3.Cube);
    this.listeCube.push(cube4.Cube);

    piece.add(cube1.Cube);
    piece.add(cube2.Cube);
    piece.add(cube3.Cube);
    piece.add(cube4.Cube);
    return piece;
  }
}
