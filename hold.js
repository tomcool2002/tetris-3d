import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';
import { Piece } from './piece';


export class Holder extends THREE.Group {
    constructor(scene){
        super();
        const loader = new GLTFLoader();
        
        loader.load('./models/holdSquare.glb', function(gltf){
            const holdMesh = gltf.scene.children.find((child) => child.name == "holdSquare");
            holdMesh.material = new THREE.MeshNormalMaterial();
            holdMesh.scale.set(holdMesh.scale.x , holdMesh.scale.y * 6, holdMesh.scale.z * 5);
            holdMesh.rotation.y = 1.56;

            holdMesh.position.y = 20;
            holdMesh.position.x = -20;
            holdMesh.position.z = -2.5;
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
    }

    AddPieceToHolder(pieceShape){
        for(const shape in this.Pieces){
            let piece = this.Pieces[shape];
            this.remove(this.getObjectById(piece.id));
        }
        let piece = this.Pieces[pieceShape];
        // scene.add(piece);
        this.add(piece)
        debugger
    }
}