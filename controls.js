import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Piece } from './piece';


export class Controls{
    constructor(scene){
        const loader = new GLTFLoader();
        loader.load('./misc/keycaps.gltf', 
            function (gltf) {
                const scale = 1;
                const up_arrow_mesh = gltf.scene.children.find((child) => child.name == "Up_Key" );
                up_arrow_mesh.scale.set(up_arrow_mesh.scale.x * scale, up_arrow_mesh.scale.y * scale, up_arrow_mesh.scale.z * scale);
                up_arrow_mesh.rotation.set(1.5,0,0);
                up_arrow_mesh.position.x = 20;
                up_arrow_mesh.position.y = -15;
                up_arrow_mesh.position.z = -2.5;
                up_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const down_arrow_mesh = gltf.scene.children.find((child) => child.name == "Down_Key" );
                down_arrow_mesh.scale.set(down_arrow_mesh.scale.x * scale, down_arrow_mesh.scale.y * scale, down_arrow_mesh.scale.z * scale);
                down_arrow_mesh.rotation.set(1.5,0,0);
                down_arrow_mesh.position.x = 30;
                down_arrow_mesh.position.y = -15;
                down_arrow_mesh.position.z = -2.5;
                down_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const rigth_arrow_mesh = gltf.scene.children.find((child) => child.name == "Right_Key" );
                rigth_arrow_mesh.scale.set(rigth_arrow_mesh.scale.x * scale, rigth_arrow_mesh.scale.y * scale, rigth_arrow_mesh.scale.z * scale);
                rigth_arrow_mesh.rotation.set(1.5,0,0);
                rigth_arrow_mesh.position.x = 10;
                rigth_arrow_mesh.position.y = -15;
                rigth_arrow_mesh.position.z = -2.5;
                rigth_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const left_arrow_mesh = gltf.scene.children.find((child) => child.name == "Left_Key" );
                left_arrow_mesh.scale.set(left_arrow_mesh.scale.x * scale, left_arrow_mesh.scale.y * scale, left_arrow_mesh.scale.z * scale);
                left_arrow_mesh.rotation.set(1.5,0,0);
                left_arrow_mesh.position.x = 5;
                left_arrow_mesh.position.y = 20;
                left_arrow_mesh.position.z = -2.5;
                left_arrow_mesh.material = new THREE.MeshNormalMaterial();

                
                const h_mesh = gltf.scene.children.find((child) => child.name == "H_Key" );
                h_mesh.scale.set(h_mesh.scale.x * scale, h_mesh.scale.y * scale, h_mesh.scale.z * scale);
                h_mesh.rotation.set(1.5,0,0);
                h_mesh.position.x = 40;
                h_mesh.position.y = -15;
                h_mesh.position.z = -2.5;
                h_mesh.material = new THREE.MeshNormalMaterial();

                const arrow_scale = 0.7;
                const left_mesh = gltf.scene.children.find((child) => child.name == "Left_Arrow" );
                left_mesh.scale.set(left_mesh.scale.x * arrow_scale, left_mesh.scale.y * arrow_scale, left_mesh.scale.z * arrow_scale);
                left_mesh.position.x = 5;
                left_mesh.position.y = 33;
                left_mesh.position.z = -2.5;
                left_mesh.material = new THREE.MeshStandardMaterial();
                
                // Right_Arrow
                const right_mesh = gltf.scene.children.find((child) => child.name == "Right_Arrow" );
                right_mesh.scale.set(right_mesh.scale.x * arrow_scale, right_mesh.scale.y * arrow_scale, right_mesh.scale.z * arrow_scale);
                right_mesh.rotation.set(1.5,4.7,0);
                right_mesh.position.x = 20;
                right_mesh.position.y = 33;
                right_mesh.position.z = -2.5;
                right_mesh.material = new THREE.MeshStandardMaterial();

                // Right_Turn
                const turn_arrow_mesh = gltf.scene.children.find((child) => child.name == "Right_Turn" );
                turn_arrow_mesh.scale.set(turn_arrow_mesh.scale.x * arrow_scale, turn_arrow_mesh.scale.y * arrow_scale, turn_arrow_mesh.scale.z * arrow_scale);
                turn_arrow_mesh.position.x = 30;
                turn_arrow_mesh.position.y = 33;
                turn_arrow_mesh.position.z = -2.5;
                turn_arrow_mesh.material = new THREE.MeshStandardMaterial();

                
                // Exchange
                const exchange_mesh = gltf.scene.children.find((child) => child.name == "Exchange" );
                exchange_mesh.scale.set(exchange_mesh.scale.x * arrow_scale, exchange_mesh.scale.y * arrow_scale, exchange_mesh.scale.z * arrow_scale);
                exchange_mesh.position.x = 30;
                exchange_mesh.position.y = 0;
                exchange_mesh.position.z = -2.5;
                exchange_mesh.material = new THREE.MeshStandardMaterial();



                scene.add(up_arrow_mesh);
                scene.add(down_arrow_mesh);
                scene.add(rigth_arrow_mesh);
                scene.add(left_arrow_mesh);
                scene.add(h_mesh);
                scene.add(left_mesh);
                scene.add(right_mesh);
                scene.add(turn_arrow_mesh);
                scene.add(exchange_mesh);
            
            }
        );

        let pieceCreator= new Piece(0,0);
        let piece1 = pieceCreator.createPiece(5, 0xff0000);
        piece1.position.y = 10;
        piece1.position.x = 30;

        piece1.name = "Piece_1";
        scene.add(piece1);
            
    }



    removeControls(scene){
        let areThere = true;
        while (areThere) {
            let keycap = scene.children.find(
                function (child) {
                    if (child.name == "Up_Key"|| 
                        child.name == "Down_Key"|| 
                        child.name == "Right_Key"|| 
                        child.name == "Left_Key" || 
                        child.name == "H_Key" || 
                        child.name == "Left_Arrow" || 
                        child.name == "Right_Arrow" || 
                        child.name == "Right_Turn" || 
                        child.name == "Exchange" || 

                        child.name == "Piece_1" ) {
                        return child;
                    }
                }
            );
            if (keycap == undefined) { areThere = false; }
            scene.remove(keycap);
        }
    }

}