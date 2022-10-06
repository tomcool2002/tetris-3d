import * as THREE from "three";

export class cube extends THREE.Mesh {
  constructor(size, color, x, y, z) {
    super();
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
    this.z = z;

    this.Cube = this.createRandomColorCube(size, color,x,y,z);
  }

  createRandomColorCube(size, color, x, y, z) {
    let colour = new THREE.Color(color);
    let geometry = new THREE.BoxGeometry(size, size, size);

    let material = new THREE.MeshBasicMaterial({ color: colour });
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);

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
}
