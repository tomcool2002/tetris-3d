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


export class Score {
    
    constructor() {
        // super();
        const loader = new GLTFLoader();
        this.theNumbers = {};
        this.IsReady = false;
        const addingFunc = this.Loading.bind(this);
        loader.load('../misc/numbers.glb', addingFunc);

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

    ShowNumbers(scene, scores) {
        let previousScores = true;
        while(previousScores){
            let number = scene.children.find(
                function(child){
                    if(child.name == stringToName[0] || 
                        child.name == stringToName[1] ||
                        child.name == stringToName[2] ||
                        child.name == stringToName[3] ||
                        child.name == stringToName[4] ||
                        child.name == stringToName[5] ||
                        child.name == stringToName[6] ||
                        child.name == stringToName[7] ||
                        child.name == stringToName[8] ||
                        child.name == stringToName[9] ){
                        return child;
                    }
                }
            );
            scene.remove(number);
            // debugger
            if(number == undefined) { previousScores = false;}
        }
        
        const positionX = {
            0 : 5,
            1 : 10,
            2 : 15,
            3 : 20,
            4 : 25,
            5 : 30,
            6 : 35
        };


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

        for(let j = 0; j < scores.length; j++){
            let listOfNumbers = `${scores[j]}`.split('');
            listOfNumbers.length;
            
            for(let i = 0; i < listOfNumbers.length; i++){
                listOfNumbers[i] = parseInt(listOfNumbers[i]);
            }

            


            for(let i = 0; i < listOfNumbers.length; i++){
                let number = listOfNumbers[i];
                let name = stringToName[number];
                let number3D = this.theNumbers[name].clone();
                
                if(j == 0){ number3D.material = new THREE.MeshBasicMaterial({color:0xefea11});}
                else if(j == 1){ number3D.material = new THREE.MeshBasicMaterial({color:0xc7c7c7});}
                else if(j == 2){ number3D.material = new THREE.MeshBasicMaterial({color:0x8f6818});}
                else{ number3D.material = new THREE.MeshNormalMaterial();}

                number3D.position.y = positionY[j];
                number3D.position.z = -2;

                number3D.position.x = positionX[i];
                

                scene.add(number3D);
            }
        }
        
    }
}