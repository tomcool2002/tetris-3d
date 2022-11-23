import * as THREE from "three";

export class Cube extends THREE.Mesh {
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

    let material = new THREE.MeshBasicMaterial({ color: colour, opacity:0.7, transparent:true });
    // let material = new THREE.MeshBasicMaterial({ color: colour});
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);

    return cube;
  }
}
