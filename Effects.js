import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';


export class Effects extends THREE.Group{
    constructor() {
        super();
    }

    AddStar(scene){
        let geometry = new THREE.SphereGeometry(0.25,24,24);
        let material = new THREE.MeshStandardMaterial({color:0x000000});
        let star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

        star.position.set(x,y,z)
        
        scene.add(star);
    }


    Stars(scene){
        for(let i = 0; i < 200; i++){
            this.AddStar(scene);
        }
    }

}