import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
// import { Scene } from 'three';
import { Piece } from './piece';


export class Holder extends THREE.Group {
    constructor(scene){
        super();
        const loader = new GLTFLoader();
        
        loader.load('./models/holdSquare.glb', function(gltf){
            const holdMesh = gltf.scene.children.find((child) => child.name == "holdSquare");
            holdMesh.material = new THREE.MeshBasicMaterial({color:0xfb4003});
            holdMesh.scale.set(holdMesh.scale.x * 0.5 , holdMesh.scale.y * 8, holdMesh.scale.z * 7);
            holdMesh.rotation.y = 1.56;

            holdMesh.position.y = 20;
            holdMesh.position.x = -25;
            holdMesh.position.z = -2.5;
            holdMesh.name = "holdSquare";
            scene.add(holdMesh)
        });
        
        let pieces = new Piece();
        this.Pieces = {
            I : pieces.createPiece(1),
            J : pieces.createPiece(2),
            L : pieces.createPiece(3),
            O : pieces.createPiece(4),
            Z : pieces.createPiece(5),
            S : pieces.createPiece(7),
            T : pieces.createPiece(6),
        };
        // let piece = pieces.createPiece(7);
        // debugger
        // scene.add(piece);
    }

    AddPieceToHolder(pieceShape,scene){
        for(const shape in this.Pieces){
            let piece = this.Pieces[shape];
            scene.remove(scene.getObjectById(piece.id));
        }
        let piece = this.Pieces[pieceShape];
        scene.add(piece);
        // debugger
    }
}