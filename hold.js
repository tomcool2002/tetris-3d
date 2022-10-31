import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
// import { Scene } from 'three';
import { Piece } from './piece';
import { Scene } from 'three';
import { Cube } from './cube';


export class Holder extends THREE.Group {
    constructor(scene){
        super();
        const loader = new GLTFLoader();
        
        loader.load('./models/holdSquare.glb', function(gltf){
            const holdMesh = gltf.scene.children.find((child) => child.name == "holdSquare");
            holdMesh.material = new THREE.MeshBasicMaterial({color:0xfb4003});
            holdMesh.scale.set(holdMesh.scale.x * 0.5 , holdMesh.scale.y * 8, holdMesh.scale.z * 7);
            holdMesh.rotation.y = 1.56;

            holdMesh.position.y = 18;
            holdMesh.position.x = -25;
            holdMesh.position.z = -2.5;
            holdMesh.name = "holdSquare";
            scene.add(holdMesh)
        });
        
        // let pieces = new Piece();
        // this.Pieces = {
        //     I : pieces.createPiece(1),
        //     J : pieces.createPiece(2),
        //     L : pieces.createPiece(3),
        //     O : pieces.createPiece(4),
        //     Z : pieces.createPiece(5),
        //     S : pieces.createPiece(7),
        //     T : pieces.createPiece(6),
        // };
        // // let piece = pieces.createPiece(7);
        // // debugger
        // // scene.add(piece);
    }

    // AddPieceToHolder(pieceShape,scene, color){
    //     for(const shape in this.Pieces){
    //         let piece = this.Pieces[shape];
    //         scene.remove(scene.getObjectById(piece.id));
    //     }
    //     let piece = this.Pieces[pieceShape];
    //     debugger
    //     piece.material.color.set(color);
    //     scene.add(piece);
    //     // debugger
    // }

    /**
     * 
     * @param {THREE.scene} scene 
     * @param {Array} positionPiece positionPiece cest les positions relatives des cube "i" dans le tableau
     * @param {Array} piecePrincipale la position de la piece "D" dans le tableau 2D
     * @param {Cube} memoirePiece le cube 3D "D"
     * @param {Array<Cube>} memoireCubes les cube 3D "i"
     */
    AddPieceToHolder(scene, positionPiece,piecePrincipale, memoirePiece, memoireCubes){
        // memoirePiece est 
        // memoireCubes sont 
        // la position absolu 
        memoirePiece.position.y += 17;
        memoirePiece.position.x -= 25;
        // position.y += 17;
        // cube.Cube.position.x -= 25;
        scene.add(memoirePiece);
        for(let i = 0; i < memoireCubes.length; i++){
            memoireCubes[i].position.y += 17;
            memoireCubes[i].position.x -= 25;
            scene.add(memoireCubes[i])
        }
        debugger
        // scene.add(memoireblock);
    }
}