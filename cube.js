import * as THREE from "three";

export class Cube extends THREE.Group {
  static createRandomColorCube(size) {
    let colour = new THREE.Color(`rgb(${this.getRandomColour()}, ${this.getRandomColour()}, ${this.getRandomColour()})`);
    let geometry = new THREE.BoxGeometry(size, size, size);
    // console.log(colour);
    let material = new THREE.MeshBasicMaterial({ color: colour });
    // console.log(material.color);
    let cube = new THREE.Mesh(geometry, material);
    // console.log(cube.material.color)

    return cube;
  }

  static getRandomColour() {
    let colour = Math.floor(Math.random() * 256) + 0;
    return colour;
  }
}
