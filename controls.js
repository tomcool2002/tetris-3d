import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export class Controls{
    constructor(scene){
        const loader = new GLTFLoader();
        loader.load('./misc/keycaps.gltf', 
            function (gltf) {
                const scale = 1.5;
                const up_arrow_mesh = gltf.scene.children.find((child) => child.name == "Up_Key" );
                up_arrow_mesh.scale.set(up_arrow_mesh.scale.x * scale, up_arrow_mesh.scale.y * scale, up_arrow_mesh.scale.z * scale);
                up_arrow_mesh.rotation.set(1.5,0,0);
                up_arrow_mesh.position.x = 30;
                up_arrow_mesh.position.y = 25;
                up_arrow_mesh.position.z = -2.5;
                up_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const down_arrow_mesh = gltf.scene.children.find((child) => child.name == "Down_Key" );
                down_arrow_mesh.scale.set(down_arrow_mesh.scale.x * scale, down_arrow_mesh.scale.y * scale, down_arrow_mesh.scale.z * scale);
                down_arrow_mesh.rotation.set(1.5,0,0);
                down_arrow_mesh.position.x = 30;
                down_arrow_mesh.position.y = 0;
                down_arrow_mesh.position.z = -2.5;
                down_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const rigth_arrow_mesh = gltf.scene.children.find((child) => child.name == "Right_Key" );
                rigth_arrow_mesh.scale.set(rigth_arrow_mesh.scale.x * scale, rigth_arrow_mesh.scale.y * scale, rigth_arrow_mesh.scale.z * scale);
                rigth_arrow_mesh.rotation.set(1.5,0,0);
                rigth_arrow_mesh.position.x = 30;
                rigth_arrow_mesh.position.y = -15;
                rigth_arrow_mesh.position.z = -2.5;
                rigth_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const left_arrow_mesh = gltf.scene.children.find((child) => child.name == "Left_Key" );
                left_arrow_mesh.scale.set(left_arrow_mesh.scale.x * scale, left_arrow_mesh.scale.y * scale, left_arrow_mesh.scale.z * scale);
                left_arrow_mesh.rotation.set(1.5,0,0);
                left_arrow_mesh.position.x = 30;
                left_arrow_mesh.position.y = 15;
                left_arrow_mesh.position.z = -2.5;
                left_arrow_mesh.material = new THREE.MeshNormalMaterial();

                scene.add(up_arrow_mesh);
                scene.add(down_arrow_mesh);
                scene.add(rigth_arrow_mesh);
                scene.add(left_arrow_mesh);
            
            }
        );
    }

}