// tourner la camera
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

const Positions = {
    0: 0,
    1 : 25,
    2 : 50,
    3 : 75,
    4 : -25,
    5 : -50,
    6 : -75

};

export class Camera extends THREE.PerspectiveCamera{
    constructor(renderer = new THREE.WebGLRenderer({ antialias: false })){
        super(
            45,window.innerWidth / window.innerHeight,
            0.1,
            500);

        this.controls = new OrbitControls(this,renderer.domElement);
        
        this.rotationSpeed = 2;
        this.lookAt(0, 0, 0);
        this.position.set(0, 0, 100);
        

        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = this.rotationSpeed;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
    }

    newPosition(){
        // random number from 0 to 8
        const key = Math.floor(Math.random() * 8); 
        this.position.y = Positions[key];
    }

    newRotation(){
        this.rotationSpeed = -(this.rotationSpeed);
        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = this.rotationSpeed;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
    }



    pause(){
        this.controls.autoRotate  = false;
        this.controls.autoRotateSpeed = 0;
        this.controls.enablePan = true;
        this.controls.enableRotate = true;
        console.log("paused");
    }

    play(){
        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = this.rotationSpeed;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
        // debugger
    }

    reposition(){
        this.controls.update();
        // console.log(this.position);
    }

    
}




    
