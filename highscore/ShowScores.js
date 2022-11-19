import * as THREE from 'three';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const stringToName = {
    0:"Zero",
    1:"One",
    2:"Two",
    3:"Three",
    4:"Four",
    5:"Five",
    6:"Six",
    7:"Seven",
    8:"Eight",
    9:"Nine",
}


export class ShowScores {
    
    constructor() {
        // super();
        const loader = new GLTFLoader();
        this.theNumbers = {};
        this.IsReady = false;
        const addingFunc = this.Loading.bind(this);
        loader.load('../misc/numbers.glb', addingFunc);

        this.positionsAdded = false;

    }
    
    AddNumbers(local) {
        this.theNumbers = local;
        this.IsReady = true;
    }
    
    Loading(gltf) {
        const scale = 3;
        const zeroMesh = gltf.scene.children.find((child) => child.name == stringToName[0]);
        const oneMesh = gltf.scene.children.find((child) => child.name == stringToName[1]);
        const twoMesh = gltf.scene.children.find((child) => child.name == stringToName[2]);
        const threeMesh = gltf.scene.children.find((child) => child.name == stringToName[3]);
        const fourMesh = gltf.scene.children.find((child) => child.name == stringToName[4]);
        const fiveMesh = gltf.scene.children.find((child) => child.name == stringToName[5]);
        const sixMesh = gltf.scene.children.find((child) => child.name == stringToName[6]);
        const sevenMesh = gltf.scene.children.find((child) => child.name == stringToName[7]);
        const eightMesh = gltf.scene.children.find((child) => child.name == stringToName[8]);
        const nineMesh = gltf.scene.children.find((child) => child.name == stringToName[9]);
        const pointMesh = gltf.scene.children.find((child) => child.name == "Point");

        pointMesh.scale.set(pointMesh.scale.x * scale, pointMesh.scale.y * scale, pointMesh.scale.z * scale);
        zeroMesh.scale.set(zeroMesh.scale.x * scale, zeroMesh.scale.y * scale, zeroMesh.scale.z * scale);
        oneMesh.scale.set(oneMesh.scale.x * scale, oneMesh.scale.y * scale, oneMesh.scale.z * scale);
        twoMesh.scale.set(twoMesh.scale.x * scale, twoMesh.scale.y * scale, twoMesh.scale.z * scale);
        threeMesh.scale.set(threeMesh.scale.x * scale, threeMesh.scale.y * scale, threeMesh.scale.z * scale);
        fourMesh.scale.set(fourMesh.scale.x * scale, fourMesh.scale.y * scale, fourMesh.scale.z * scale);
        fiveMesh.scale.set(fiveMesh.scale.x * scale, fiveMesh.scale.y * scale, fiveMesh.scale.z * scale);
        sixMesh.scale.set(sixMesh.scale.x * scale, sixMesh.scale.y * scale, sixMesh.scale.z * scale);
        sevenMesh.scale.set(sevenMesh.scale.x * scale, sevenMesh.scale.y * scale, sevenMesh.scale.z * scale);
        eightMesh.scale.set(eightMesh.scale.x * scale, eightMesh.scale.y * scale, eightMesh.scale.z * scale);
        nineMesh.scale.set(nineMesh.scale.x * scale, nineMesh.scale.y * scale, nineMesh.scale.z * scale);

        let local = {};
        local.Point = pointMesh;
        local.Zero = zeroMesh;
        local.One = oneMesh;
        local.Two = twoMesh;
        local.Three = threeMesh;
        local.Four = fourMesh;
        local.Five = fiveMesh;
        local.Six = sixMesh;
        local.Seven = sevenMesh;
        local.Eight = eightMesh;
        local.Nine = nineMesh;
        this.AddNumbers(local);
    }

    ShowScoresFR(scene, listeOfScores) {
        const positionY = {
            0 : 25,
            1 : 20,
            2 : 15,
            3 : 10,
            4 : 5,
            5 : 0,
            6 : -5,
            7 : -10,
            8 : -15,
            9 : -20,
            10 :-25,

        };

        if(this.positionsAdded == false){
            for(let i = 0; i <= 10; i++){
                if(i != 10){
                    let name = stringToName[i];
                
                    let position3D = this.theNumbers[name].clone();
                    
                    
                    position3D.position.y = positionY[i];
                    
                    
                    position3D.position.z = -2;
                    position3D.position.x = -20;
        
                    // debugger
                    scene.add(position3D);
                    
                }else{
                    let oneMesh = this.theNumbers.One.clone();
                    let zeroMesh = this.theNumbers.Zero.clone();

                    oneMesh.position.y = positionY[i];
                    zeroMesh.position.y = positionY[i];

                    oneMesh.position.z = -2;
                    zeroMesh.position.z = -2;

                    oneMesh.position.x = -24;
                    zeroMesh.position.x = -20;

                    scene.add(oneMesh);
                    scene.add(zeroMesh);

                }
                let point = this.theNumbers.Point.clone();
                let point2 = this.theNumbers.Point.clone();
                point.position.x = -18;
                point2.position.x = -18;

                point.position.y = positionY[i];
                point2.position.y = positionY[i] + 2;

                point.position.z = -2;
                point2.position.z = -2;
                
                scene.add(point);
                scene.add(point2);
    
            }

            this.positionsAdded = true;
        }
        
        

        for(let i = 0; i < listeOfScores.length; i++){
            let alias = listeOfScores[i].Alias;
            let score = listeOfScores[i].Score;

        }

        
        
    }
}