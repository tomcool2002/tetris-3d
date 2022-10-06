import * as THREE from "three";
import { Vector3 } from "three";
import { Cube } from "./cube";

export class Piece extends THREE.Group {
  constructor(pos, orientation) {
    super();
    this.orientation = orientation;
    this.pos = pos;
   // this.listeCube = [];
    this.Piece = this.createRandomPiece();
    this.isControlled = false;
  }

  createRandomColorCube(size,color,x,y,z) {
    let colour = new THREE.Color(color);
    let geometry = new THREE.BoxGeometry (size, size, size);

    let material = new THREE.MeshBasicMaterial({ color: colour });
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(x,y,z);
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

    switch (rand) {
      case 1: // I Shape
        piece.add(new Cube(2.5,color,0,0,-2.5))
        piece.add(new Cube(2.5,color,0,2.5,-2.5))
        piece.add(new Cube(2.5,color,0,5,-2.5))
        piece.add(new Cube(2.5,color,0,7.5,-2.5))
        break;
      case 2: // j Shape
        piece.add(this.createRandomColorCube(2.5,color,0,0,-2.5))
        piece.add(this.createRandomColorCube(2.5,color,2.5,0,-2.5))
        piece.add(this.createRandomColorCube(2.5,color,2.5,2.5,-2.5))
        piece.add(this.createRandomColorCube(2.5,color,2.5,5,-2.5))
        break;
      case 3: // L Shape
      piece.add(this.createRandomColorCube(2.5,color,0,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,-2.5,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,-2.5,2.5,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,-2.5,5,-2.5))
        break;
      case 4: // O Shape
      piece.add(this.createRandomColorCube(2.5,color,0,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,2.5,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,2.5,2.5,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,0,2.5,-2.5))
        break;
      case 5: // Z Shape      
      piece.add(this.createRandomColorCube(2.5,color,0,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,2.5,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,0,2.5,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,-2.5,2.5,-2.5))
        break;
      case 6: // T Shape
      piece.add(this.createRandomColorCube(2.5,color,0,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,-2.5,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,2.5,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,0,2.5,-2.5))
        break;
      case 7: // S Shape
      piece.add(this.createRandomColorCube(2.5,color,0,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,-2.5,0,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,0,2.5,-2.5))
      piece.add(this.createRandomColorCube(2.5,color,2.5,2.5,-2.5))
        break;
    }
    return piece;
  }
}
