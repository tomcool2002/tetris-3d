import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { Scene } from 'three';

const NbStars = 200;

const Colors = [
    0x062eb9,
    0x00e4d9,
    0x00e421,
    0xe40b00,
    0xffffff,
];
export class Effects {
    constructor() {
        this.compteur = -1;
        let loader = new GLTFLoader();
        this.startMesh;
        this.gameOverMesh;
        const addingFunc = this.Loading.bind(this);
        loader.load('./misc/buttons.gltf', addingFunc);
        this.loaded = false;
    }

    AddStar(scene){
        let geometry = new THREE.SphereGeometry(0.25,24,24);
        let material = new THREE.MeshStandardMaterial({color:0x000000});
        let star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
        star.name = "star";

        star.position.set(x,y,z);
        
        scene.add(star);
    }

    Loading(gltf){
        const gameOver = gltf.scene.children.find((child) => child.name == "gameOver" );
        const aboutMesh = gltf.scene.children.find((child) => child.name == "About" );
        const highScoreMesh = gltf.scene.children.find((child) => child.name == "Scores_Bouton" );

        
        const scale = 6;
        gameOver.scale.set(gameOver.scale.x * 2, gameOver.scale.y * 2, gameOver.scale.z * 2);
        aboutMesh.scale.set(aboutMesh.scale.x * scale, aboutMesh.scale.y * scale, aboutMesh.scale.z * scale);
        highScoreMesh.scale.set(highScoreMesh.scale.x * 5, highScoreMesh.scale.y * 5, highScoreMesh.scale.z * 5);
        

        aboutMesh.position.x = -35;
        aboutMesh.position.y = 5;
        aboutMesh.position.z = -2.5;

        highScoreMesh.position.z = -2.5;
        highScoreMesh.position.y = -15;
        highScoreMesh.position.x = -35;

        // pauseMesh.position.x = 20;
        // pauseMesh.position.y = 20;
        // pauseMesh.position.z = -2.5;

        
        
        
        gameOver.position.y = 0;
        gameOver.position.x = 0;
        this.gameOverMesh = gameOver;
        this.aboutMesh = aboutMesh;
        this.highScoreMesh = highScoreMesh;
        this.loaded = true;
    }
    gameOver(scene){
        scene.add(this.gameOverMesh)
    }

    addButtons(scene){
        if(this.loaded){
            scene.add(this.aboutMesh);
            scene.add(this.highScoreMesh);
            this.loaded = false;
            // debugger
        }
    }

    Stars(scene){
        for(let i = 0; i <= NbStars; i++){
            this.AddStar(scene);
        }
    }

    nextColor(){
        if(this.compteur < Colors.length - 1)
            return Colors[++this.compteur];
        else
            return Colors[this.compteur];

    }

    changeColor(scene){
        let color = this.nextColor();
        scene.children.forEach(function(child){
            if(child.name == "star"){
                child.material.color.set(color);
            }
        })
        
    }

}