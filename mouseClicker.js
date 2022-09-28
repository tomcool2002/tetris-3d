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
        // pick the first object. It's the closest one
        this.objectClicked = intersectedObjects[0].object;
        // this.previousColour = this.objectClicked.material.color;
        // this.objectClicked.material.color.setHex( 0xffffff );
        // console.log(this.objectClicked.name);
        if(this.objectClicked.name == "Circle")
          return true
        return false
        // console.log(`clicked: ${this.objectClicked.name}`);
      }
    }
    // reset(){
    //     if(this.objectClicked != null)
    //         this.objectClicked.material.color.setHex( this.previousColour );
    // }
  }