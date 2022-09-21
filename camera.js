// tourner la camera
import "./main";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function camera(){
    controls = new OrbitControls(camera,renderer.domElement);
    camera.lookAt(0, 0, 0);
    camera.position.set(0, 0, 100);
    
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
      
    window.addEventListener("resize", onWindowResize, false);
}

