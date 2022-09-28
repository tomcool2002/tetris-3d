import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';


export class Pause extends THREE.Group {
    constructor(pos, ){
        super();
        // this.position = 
        const loader = new GLTFLoader();
        loader.load('./pauseModel.blend', function(gltf){
            scene.add();
        });

    }
}

