import * as THREE from 'three';

export class MouseClicker {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.objectClicked = null;
    }
    click(normalizedPosition, scene, camera) {
      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(scene.children);
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        this.pickedObject = intersectedObjects[0].object;
        this.pickedObject.material.color.setHex( 0xffffff );
        // console.log(`clicked: ${this.pickedObject.name}`);
      }
    }
  }