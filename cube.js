import * as THREE from "three";

export class Cube extends THREE.Group {
  static createRandomColorCube(size) {
    let colour = new THREE.Color(this.getRandomColour());
    let geometry = new THREE.BoxGeometry(size, size, size);

    let material = new THREE.MeshBasicMaterial({ color: colour });
    let cube = new THREE.Mesh(geometry, material);
    // console.log(cube.material.color)

    return cube;
  }

  static getRandomColour() {
    var letters = "0123456789ABCDEF";
    var colour = "#";
    for (var i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
  }
}
