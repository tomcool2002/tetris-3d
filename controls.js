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
                up_arrow_mesh.position.x = 35;
                up_arrow_mesh.position.y = 20;
                up_arrow_mesh.position.z = -2.5;
                up_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const down_arrow_mesh = gltf.scene.children.find((child) => child.name == "Down_Key" );
                down_arrow_mesh.scale.set(down_arrow_mesh.scale.x * scale, down_arrow_mesh.scale.y * scale, down_arrow_mesh.scale.z * scale);
                down_arrow_mesh.rotation.set(1.5,0,0);
                down_arrow_mesh.position.x = 41;
                down_arrow_mesh.position.y = -5;
                down_arrow_mesh.position.z = -2.5;
                down_arrow_mesh.material = new THREE.MeshNormalMaterial();

                const rigth_arrow_mesh = gltf.scene.children.find((child) => child.name == "Right_Key" );
                rigth_arrow_mesh.scale.set(rigth_arrow_mesh.scale.x * scale, rigth_arrow_mesh.scale.y * scale, rigth_arrow_mesh.scale.z * scale);
                rigth_arrow_mesh.rotation.set(1.5,0,0);
                rigth_arrow_mesh.position.x = 22;
                rigth_arrow_mesh.position.y = 20;
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
                h_mesh.position.x = 15;
                h_mesh.position.y = -5;
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
                turn_arrow_mesh.position.x = 40;
                turn_arrow_mesh.position.y = 33;
                turn_arrow_mesh.position.z = -2.5;
                turn_arrow_mesh.material = new THREE.MeshStandardMaterial({color:0xffffff});

                
                // Exchange
                const exchange_mesh = gltf.scene.children.find((child) => child.name == "Exchange" );
                exchange_mesh.scale.set(exchange_mesh.scale.x * arrow_scale, exchange_mesh.scale.y * arrow_scale, exchange_mesh.scale.z * arrow_scale);
                exchange_mesh.position.x = 15;
                exchange_mesh.position.y = 2;
                exchange_mesh.position.z = -2.5;
                exchange_mesh.material = new THREE.MeshStandardMaterial({color:0xffffff});

                // Down_Arrow
                const down_arrow = gltf.scene.children.find((child) => child.name == "Down_Arrow" );
                down_arrow.scale.set(down_arrow.scale.x * arrow_scale, down_arrow.scale.y * arrow_scale, down_arrow.scale.z * arrow_scale);
                down_arrow.position.x = 40;
                down_arrow.position.y = 10;
                down_arrow.position.z = -2.5;
                down_arrow.material = new THREE.MeshStandardMaterial();

                scene.add(up_arrow_mesh);
                scene.add(down_arrow_mesh);
                scene.add(rigth_arrow_mesh);
                scene.add(left_arrow_mesh);
                scene.add(h_mesh);
                scene.add(left_mesh);
                scene.add(right_mesh);
                scene.add(turn_arrow_mesh);
                scene.add(exchange_mesh);
                scene.add(down_arrow);
            
            }
        );

        let pieceCreator= new Piece(0,0);
        let piece1 = pieceCreator.createPiece(5, 0xff0000);
        let piece2 = pieceCreator.createPiece(5, 0xff0000);
        let piece3 = pieceCreator.createPiece(5, 0xff0000, true);
        let piece4 = pieceCreator.createPiece(5, 0xff0000);
        let piece5 = pieceCreator.createPiece(6, 0x03fbf9);
        let piece6 = pieceCreator.createPiece(5, 0xff0000);

        piece1.position.y = 10;
        piece1.position.x = 30;

        piece2.position.y = 10;
        piece2.position.x = 46;

        piece3.position.y = 11;
        piece3.position.x = 62;

        piece4.position.y = -15;
        piece4.position.x = 30;

        piece5.position.y = -15;
        piece5.position.x = 50;

        piece6.position.y = -15;
        piece6.position.x = 65;


        piece1.name = "Piece_1";
        piece2.name = "Piece_2";
        piece3.name = "Piece_3";
        piece4.name = "Piece_4";
        piece5.name = "Piece_5";
        piece6.name = "Piece_6";
        
        


        scene.add(piece1);
        scene.add(piece2);
        scene.add(piece3);
        scene.add(piece4);
        scene.add(piece5);
        scene.add(piece6);
            
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
                        child.name == "Down_Arrow" || 

                        child.name == "Piece_1" ||
                        child.name == "Piece_2" ||
                        child.name == "Piece_3" ||
                        child.name == "Piece_4" ||
                        child.name == "Piece_5" ||
                        child.name == "Piece_6" ) {
                        return child;
                    }
                }
            );
            if (keycap == undefined) { areThere = false; }
            scene.remove(keycap);
        }
    }

}