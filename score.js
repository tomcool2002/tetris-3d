import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';

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
export class Score extends THREE.Group {
    
    constructor() {
        super();
        const loader = new GLTFLoader();
        this.theNumbers = {};
        this.IsReady = false;
        const addingFunc = this.Loading.bind(this);
        loader.load('./models/numbers.glb', addingFunc);
        this.texture = new THREE.TextureLoader().load('./models/checkers.jpg');
        // this.texture = new THREE.TextureLoader().load('./models/honeycomb.jpg');

    }
    
    AddNumbers(local) {
        this.theNumbers = local;
        this.IsReady = true;
    }
    
    Loading(gltf) {
        const zeroMesh = gltf.scene.children.find((child) => child.name == "Zero");
        const oneMesh = gltf.scene.children.find((child) => child.name == "One");
        const twoMesh = gltf.scene.children.find((child) => child.name == "Two");
        const threeMesh = gltf.scene.children.find((child) => child.name == "Three");
        const fourMesh = gltf.scene.children.find((child) => child.name == "Four");
        const fiveMesh = gltf.scene.children.find((child) => child.name == "Five");
        const sixMesh = gltf.scene.children.find((child) => child.name == "Six");
        const sevenMesh = gltf.scene.children.find((child) => child.name == "Seven");
        const eightMesh = gltf.scene.children.find((child) => child.name == "Eight");
        const nineMesh = gltf.scene.children.find((child) => child.name == "Nine");

        zeroMesh.scale.set(zeroMesh.scale.x * 5, zeroMesh.scale.y * 5, zeroMesh.scale.z * 5);
        oneMesh.scale.set(oneMesh.scale.x * 5, oneMesh.scale.y * 5, oneMesh.scale.z * 5);
        twoMesh.scale.set(twoMesh.scale.x * 5, twoMesh.scale.y * 5, twoMesh.scale.z * 5);
        threeMesh.scale.set(threeMesh.scale.x * 5, threeMesh.scale.y * 5, threeMesh.scale.z * 5);
        fourMesh.scale.set(fourMesh.scale.x * 5, fourMesh.scale.y * 5, fourMesh.scale.z * 5);
        fiveMesh.scale.set(fiveMesh.scale.x * 5, fiveMesh.scale.y * 5, fiveMesh.scale.z * 5);
        sixMesh.scale.set(sixMesh.scale.x * 5, sixMesh.scale.y * 5, sixMesh.scale.z * 5);
        sevenMesh.scale.set(sevenMesh.scale.x * 5, sevenMesh.scale.y * 5, sevenMesh.scale.z * 5);
        eightMesh.scale.set(eightMesh.scale.x * 5, eightMesh.scale.y * 5, eightMesh.scale.z * 5);
        nineMesh.scale.set(nineMesh.scale.x * 5, nineMesh.scale.y * 5, nineMesh.scale.z * 5);

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

    ShowNumbers(scene, number = 0) {
        // remove previous score
        scene.remove(scene.getObjectByName('Zero'));
        scene.remove(scene.getObjectByName('One'));
        scene.remove(scene.getObjectByName('Two'));
        scene.remove(scene.getObjectByName('Three'));
        scene.remove(scene.getObjectByName('Four'));
        scene.remove(scene.getObjectByName('Five'));
        scene.remove(scene.getObjectByName('Six'));
        scene.remove(scene.getObjectByName('Seven'));
        scene.remove(scene.getObjectByName('Eight'));
        scene.remove(scene.getObjectByName('Nine'));
        

        let listOfNumbers = `${number}`.split('');
        listOfNumbers.length;
        
        for(let i = 0; i < listOfNumbers.length; i++){
            listOfNumbers[i] = parseInt(listOfNumbers[i]);
        }

        const positionX = {
            0 : -9,
            1 : -6,
            2 : -3,
            3 : 0,
            4 : 3,
            5 : 6,
            6 : 9
        };
        for(let i = 0; i < listOfNumbers.length; i++){
            let number = listOfNumbers[i];
            let name = stringToName[number];
            let number3D = this.theNumbers[name].clone();
            let texture = this.texture;
            // number3D.material = new THREE.MeshStandardMaterial({ 
            //     color: 0xff8080,
            //     map:texture
            // });
            number3D.material = new THREE.MeshNormalMaterial({color:0xfa4040})
            number3D.position.y = 30;

            number3D.position.x = positionX[i];
            

            scene.add(number3D);
        }
    }
}