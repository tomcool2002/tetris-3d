import * as THREE from 'three';
// import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
// import { Scene } from 'three';

const NbStars = 100;

const Colors = [
    0x062eb9,
    0x00e4d9,
    0x00e421,
    0xe40b00,
    0xffffff,

];
export class Effects {
    constructor() {
        this.compteur = -1;
    }

    AddStar(scene){
        let geometry = new THREE.SphereGeometry(0.25,24,24);
        let material = new THREE.MeshStandardMaterial({color:0x000000});
        let star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
        star.name = "star";

        star.position.set(x,y,z);
        
        scene.add(star);
    }


    Stars(scene){
        for(let i = 0; i <= NbStars; i++){
            this.AddStar(scene);
        }
    }

    nextColor(){
        if(this.compteur < Colors.length - 1)
            return Colors[++this.compteur];
        else
            return Colors[this.compteur];

    }

    changeColor(scene){
        let color = this.nextColor();
        scene.children.forEach(function(child){
            if(child.name == "star"){
                child.material.color.set(color);
            }
        })
        
    }

}