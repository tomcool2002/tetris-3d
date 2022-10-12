import * as THREE from 'three';
// import 

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
        this.objectClicked = intersectedObjects[0].object;
        // this.objectClicked.material.color.setHex( 0xffffff );
        let lenom = this.objectClicked.name;
        // debugger
        if(lenom == "Circle")
          return true
        return false
        // console.log(`clicked: ${this.objectClicked.name}`);
      }
    }
  }