import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';

const NbStars = 100;
export class Effects extends THREE.Group{
    constructor() {
        super();
    }

    AddStar(scene){
        let geometry = new THREE.SphereGeometry(0.25,24,24);
        let material = new THREE.MeshStandardMaterial({color:0x000000});
        let star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
        star.name = "star";

        star.position.set(x,y,z)
        
        scene.add(star);
    }


    Stars(scene){
        for(let i = 0; i <= NbStars; i++){
            this.AddStar(scene);
        }
    }

    changeColor(scene){
        // let star = scene.getObjectByName('star');
        
        // for(let i = 0; i <= NbStars; i++){
        //     star.material.color = 0xffffff;
        // }
        // // while(star != undefined){
        // //     // star.material.color = 0xffffff;
        // //     scene.remove(star);
        // //     star = scene.getObjectByName('star');
        // //     debugger
        // // }
        // scene.remove();
    }

}