import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';


export class Holder extends THREE.Group {
    constructor(scene){
        super();
        const loader = new GLTFLoader();
        
        loader.load('./models/holdSquare.glb', function(gltf){
            const holdMesh = gltf.scene.children.find((child) => child.name == "holdSquare");
            holdMesh.material = new THREE.MeshNormalMaterial();
            holdMesh.scale.set(holdMesh.scale.x * 5, holdMesh.scale.y * 5, holdMesh.scale.z * 5);
            // holdMesh.

            scene.add(holdMesh)
        });
    }
}