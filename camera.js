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
        
        this.rotationSpeed = 1;
        this.lookAt(0, 0, 0);
        this.position.set(0, 0, 100);
        

        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = this.rotationSpeed;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
    }

    newRotation(){
        this.rotationSpeed = -(this.rotationSpeed);
        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = this.rotationSpeed;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
    }

    freeLook(){
        this.controls.autoRotate  = false;
        this.controls.enablePan = true;
        this.controls.enableRotate = true;
    }

    gameOver(){
        this.position.set(0, 0, 100);
    }


    pause(){
        this.controls.autoRotate  = false;
        this.controls.autoRotateSpeed = 0;
        this.controls.enablePan = true;
        this.controls.enableRotate = true;
        console.log("paused");
    }
    
    speedUp(){
        if(this.rotationSpeed <= 10 && this.rotationSpeed >= -10 ){
            if(this.rotationSpeed >0) this.rotationSpeed+2;
            else this.rotationSpeed-=2;
            this.controls.autoRotateSpeed = this.rotationSpeed;
        }
    }

    play(){
        this.controls.autoRotate  = true;
        this.controls.autoRotateSpeed = this.rotationSpeed;
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
    }

    reposition(){
        this.controls.update();
    }

    
}




    
