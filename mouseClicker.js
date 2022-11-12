import * as THREE from 'three';
// import 

export class MouseClicker {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.objectClicked = null;
      
    }
    click(normalizedPosition, scene, camera, name) {
      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(scene.children);
      if (intersectedObjects.length) {
        this.objectClicked = intersectedObjects[0].object;

        let lenom = this.objectClicked.name;
        console.log(lenom);
        if(lenom == name)
          return true
        return false
        // console.log(`clicked: ${this.objectClicked.name}`);
      }
    }
  }