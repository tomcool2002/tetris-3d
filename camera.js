// tourner la camera
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export class Camera extends THREE.PerspectiveCamera{
    constructor(renderer = new THREE.WebGLRenderer({ antialias: false })){
        super(
            45,window.innerWidth / window.innerHeight,
            0.1,
            500);

        this.renderer = renderer;
        // this.controls = new OrbitControls(this.camera,this.renderer.domElement);
        
        this.lookAt(0, 0, 0);
        this.position.set(0, 0, 100);
    }

    onWindowResize() {
        this.aspect = window.innerWidth / window.innerHeight;
        this.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}




    
