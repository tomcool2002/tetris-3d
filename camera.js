// tourner la camera
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export class Camera extends THREE.PerspectiveCamera{
    constructor(renderer = new THREE.WebGLRenderer({ antialias: false })){
        super(
            45,window.innerWidth / window.innerHeight,
            0.1,
            500);

        this.controls = new OrbitControls(this,renderer.domElement);
        
        this.lookAt(0, 0, 0);
        this.position.set(0, 0, 100);

        // this.controls.enabled = true;
        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = 1;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
    }

    pause(){
        this.controls.autoRotate  = false;
        this.controls.autoRotateSpeed = 0;
        this.controls.enablePan = true;
        this.controls.enableRotate = true;
        // console.log("paused");
    }

    play(){
        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = 1;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
    }

    reposition(){
        this.controls.update();
    }

    
}




    
