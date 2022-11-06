import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
// import { Scene } from 'three';
import { Piece } from "./piece";
import { Scene } from "three";
import { Cube } from "./cube";
import { Data } from "./Data";

export class Holder extends THREE.Group {
  constructor(scene) {
    super();

    this.scene = scene;
    this.positionPiece = [];
    this.memoirePiece;
    this.memoireblock = [];
    this.piecePrincipale = this.initHolder();

    const loader = new GLTFLoader();

    loader.load("./misc/holdSquare.glb", function (gltf) {
      const holdMesh = gltf.scene.children.find(
        (child) => child.name == "holdSquare"
      );
      // holdMesh.material = new THREE.MeshBasicMaterial({ color: 0xfb4003 });
      holdMesh.material = new THREE.MeshNormalMaterial();
      
      holdMesh.scale.set(
        holdMesh.scale.x * 0.5,
        holdMesh.scale.y * 8,
        holdMesh.scale.z * 7
      );
      holdMesh.rotation.y = 1.56;

      holdMesh.position.y = 18;
      holdMesh.position.x = -25;
      holdMesh.position.z = -2.5;
      holdMesh.name = "holdSquare";
      scene.add(holdMesh);
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

  TransformerPosition(x, y, duTableau) {
    let x_transformer;
    let y_transformer;
    if (duTableau == false) {
      x_transformer = x / 2.5 + 4;
      y_transformer = (y / 2.5 - 10) / -1;
    } else {
      x_transformer = (x - 4) * 2.5;
      y_transformer = (y * -1 + 10) * 2.5;
    }

    return [x_transformer, y_transformer];
  }

  AjouterCubesAuVariable(listeCube) {
    let compteur = 0;
    listeCube.forEach((cube) => {
      let pos = this.TransformerPosition(
        cube.position.x,
        cube.position.y,
        false
      );

      let x = pos[0];
      let y = pos[1];

      if (compteur == 1) {
        this.piecePrincipale = [y, x];
        this.memoirePiece = cube;
      } else {
        this.positionPiece.push([y, x]);
        this.memoireblock.push(cube);
      }
      compteur++;
    });

    this.positionPiece.forEach((piece) => {
      piece[0] -= this.piecePrincipale[0];
      piece[1] -= this.piecePrincipale[1];
    });
  }

  AfficherPiece() {
    this.scene.add(this.memoirePiece);
    this.memoireblock.forEach((cube) => {
      this.scene.add(cube);
    });
  }

  initHolder() {
    let piece = new Piece(-25, 17.5);

    this.AjouterCubesAuVariable(piece.listeCube);

    this.AfficherPiece();

    return this.piecePrincipale;
  }

  DeleteCurrentHold() {
    this.scene.remove(this.memoirePiece);
    this.memoireblock.forEach((cube) => {
      this.scene.remove(cube);
    });
  }

  getInfo(){
    return [this.positionPiece,this.memoirePiece,this.memoireblock];
  }

  SwitchPiece(positionPiece, piecePrincipale, memoirePiece, memoireblock) {
    this.DeleteCurrentHold();
    let oldmemoirePiece = this.memoirePiece;
    let oldmemoireblock = this.memoireblock;
    let oldpositionpiece = this.positionPiece;

    this.positionPiece = positionPiece;
    this.memoirePiece = memoirePiece.clone();
    this.memoirePiece.position.x = -25;
    this.memoirePiece.position.y = 17.5;
    this.memoireblock = [];
    
    let compteur = 0;
    memoireblock.forEach((cube) => {
        let newCube = cube.clone();
        
        // if(compteur == 0){
        // console.log(piecePrincipale);  
        // console.log(memoirePiece.position); 
        // }
        // console.log(cube.position);
        // console.log(positionPiece[compteur]);

        newCube.position.x = -25 + this.positionPiece[compteur][1] * 2.5;
        newCube.position.y = 17.5 + -this.positionPiece[compteur][0] * 2.5;
        this.memoireblock.push(newCube);
        compteur++;
    });

    this.AfficherPiece();

    return [oldpositionpiece,oldmemoirePiece,oldmemoireblock];
  }
}
