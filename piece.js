import * as THREE from "three";

export class Piece extends THREE.Group {
  constructor(pos, orientation) {
    super();
    this.orientation = orientation;
    this.pos = pos;
    this.Piece = this.createRandomPiece();
  }

  createRandomColorCube(size) {
    let colour = new THREE.Color(this.getRandomColour());
    let geometry = new THREE.BoxGeometry(size, size, size);

    let material = new THREE.MeshBasicMaterial({ color: colour });
    let cube = new THREE.Mesh(geometry, material);
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

  createRandomPiece() {
    //random number 1-7
    let rand = Math.floor(Math.random() * 7) + 1;

    switch (rand) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
    }
  }
}
