// tourner la camera
import "./main";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Camera {
    constructor(renderer = new THREE.WebGLRenderer({ antialias: false })){
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            500
        );
        this.renderer = renderer;
        this.controls = new OrbitControls(this.camera,this.renderer.domElement);
        
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(0, 0, 100);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}




    
