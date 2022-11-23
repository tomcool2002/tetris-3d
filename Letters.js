import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const stringToName = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "?"
]

export class Letters {
    constructor() {
        const loader = new GLTFLoader();
        this.theLetters = {};
        this.IsReady = false;
        const addingFunc = this.Loading.bind(this);
        loader.load('./misc/letters.glb', addingFunc);
    }

    AddLetters(local) {
        this.theLetters = local;
        this.IsReady = true;
    }

    Loading(gltf) {
        const AMesh = gltf.scene.children.find((child) => child.name == "A");
        const BMesh = gltf.scene.children.find((child) => child.name == "B");
        const CMesh = gltf.scene.children.find((child) => child.name == "C");
        const DMesh = gltf.scene.children.find((child) => child.name == "D");
        const EMesh = gltf.scene.children.find((child) => child.name == "E");
        const FMesh = gltf.scene.children.find((child) => child.name == "F");
        const GMesh = gltf.scene.children.find((child) => child.name == "G");
        const HMesh = gltf.scene.children.find((child) => child.name == "H");
        const IMesh = gltf.scene.children.find((child) => child.name == "I");
        const JMesh = gltf.scene.children.find((child) => child.name == "J");
        const KMesh = gltf.scene.children.find((child) => child.name == "K");
        const LMesh = gltf.scene.children.find((child) => child.name == "L");
        const MMesh = gltf.scene.children.find((child) => child.name == "M");
        const NMesh = gltf.scene.children.find((child) => child.name == "N");
        const OMesh = gltf.scene.children.find((child) => child.name == "O");
        const PMesh = gltf.scene.children.find((child) => child.name == "P");
        const QMesh = gltf.scene.children.find((child) => child.name == "Q");
        const RMesh = gltf.scene.children.find((child) => child.name == "R");
        const SMesh = gltf.scene.children.find((child) => child.name == "S");
        const TMesh = gltf.scene.children.find((child) => child.name == "T");
        const UMesh = gltf.scene.children.find((child) => child.name == "U");
        const VMesh = gltf.scene.children.find((child) => child.name == "V");
        const WMesh = gltf.scene.children.find((child) => child.name == "W");
        const XMesh = gltf.scene.children.find((child) => child.name == "X");
        const YMesh = gltf.scene.children.find((child) => child.name == "Y");
        const ZMesh = gltf.scene.children.find((child) => child.name == "Z");
        const UnknownMesh = gltf.scene.children.find((child) => child.name == "?");


        const scale = 7;
        AMesh.scale.set(AMesh.scale.x * scale, AMesh.scale.y * scale, AMesh.scale.z * scale);
        BMesh.scale.set(BMesh.scale.x * scale, BMesh.scale.y * scale, BMesh.scale.z * scale);
        CMesh.scale.set(CMesh.scale.x * scale, CMesh.scale.y * scale, CMesh.scale.z * scale);
        DMesh.scale.set(DMesh.scale.x * scale, DMesh.scale.y * scale, DMesh.scale.z * scale);
        EMesh.scale.set(EMesh.scale.x * scale, EMesh.scale.y * scale, EMesh.scale.z * scale);
        FMesh.scale.set(FMesh.scale.x * scale, FMesh.scale.y * scale, FMesh.scale.z * scale);
        GMesh.scale.set(GMesh.scale.x * scale, GMesh.scale.y * scale, GMesh.scale.z * scale);
        HMesh.scale.set(HMesh.scale.x * scale, HMesh.scale.y * scale, HMesh.scale.z * scale);
        IMesh.scale.set(IMesh.scale.x * scale, IMesh.scale.y * scale, IMesh.scale.z * scale);
        JMesh.scale.set(JMesh.scale.x * scale, JMesh.scale.y * scale, JMesh.scale.z * scale);
        KMesh.scale.set(KMesh.scale.x * scale, KMesh.scale.y * scale, KMesh.scale.z * scale);
        LMesh.scale.set(LMesh.scale.x * scale, LMesh.scale.y * scale, LMesh.scale.z * scale);
        MMesh.scale.set(MMesh.scale.x * scale, MMesh.scale.y * scale, MMesh.scale.z * scale);
        NMesh.scale.set(NMesh.scale.x * scale, NMesh.scale.y * scale, NMesh.scale.z * scale);
        OMesh.scale.set(OMesh.scale.x * scale, OMesh.scale.y * scale, OMesh.scale.z * scale);
        PMesh.scale.set(PMesh.scale.x * scale, PMesh.scale.y * scale, PMesh.scale.z * scale);
        QMesh.scale.set(QMesh.scale.x * scale, QMesh.scale.y * scale, QMesh.scale.z * scale);
        RMesh.scale.set(RMesh.scale.x * scale, RMesh.scale.y * scale, RMesh.scale.z * scale);
        SMesh.scale.set(SMesh.scale.x * scale, SMesh.scale.y * scale, SMesh.scale.z * scale);
        TMesh.scale.set(TMesh.scale.x * scale, TMesh.scale.y * scale, TMesh.scale.z * scale);
        UMesh.scale.set(UMesh.scale.x * scale, UMesh.scale.y * scale, UMesh.scale.z * scale);
        VMesh.scale.set(VMesh.scale.x * scale, VMesh.scale.y * scale, VMesh.scale.z * scale);
        WMesh.scale.set(WMesh.scale.x * scale, WMesh.scale.y * scale, WMesh.scale.z * scale);
        XMesh.scale.set(XMesh.scale.x * scale, XMesh.scale.y * scale, XMesh.scale.z * scale);
        YMesh.scale.set(YMesh.scale.x * scale, YMesh.scale.y * scale, YMesh.scale.z * scale);
        ZMesh.scale.set(ZMesh.scale.x * scale, ZMesh.scale.y * scale, ZMesh.scale.z * scale);
        UnknownMesh.scale.set(UnknownMesh.scale.x * scale, UnknownMesh.scale.y * scale, UnknownMesh.scale.z * scale);



        let local = {};

        local.A = AMesh;
        local.B = BMesh;
        local.C = CMesh;
        local.D = DMesh;
        local.E = EMesh;
        local.F = FMesh;
        local.G = GMesh;
        local.H = HMesh;
        local.I = IMesh;
        local.J = JMesh;
        local.K = KMesh;
        local.L = LMesh;
        local.M = MMesh;
        local.N = NMesh;
        local.O = OMesh;
        local.P = PMesh;
        local.Q = QMesh;
        local.R = RMesh;
        local.S = SMesh;
        local.T = TMesh;
        local.U = UMesh;
        local.V = VMesh;
        local.W = WMesh;
        local.X = XMesh;
        local.Y = YMesh;
        local.Z = ZMesh;
        local.Unknown = UnknownMesh;

        this.AddLetters(local);
    }

    showLetters(scene, letters = "???") {
        const positionX = {
            0: 10,
            1: 20,
            2: 30
        };

        // debugger



        if (letters != "" && letters != undefined) {
            let previousAlias = true;
            while (previousAlias) {
                let letter = scene.children.find(
                    function (child) {
                        if (child.name == stringToName[0] ||
                            child.name == stringToName[1] ||
                            child.name == stringToName[2] ||
                            child.name == stringToName[3] ||
                            child.name == stringToName[4] ||
                            child.name == stringToName[5] ||
                            child.name == stringToName[6] ||
                            child.name == stringToName[7] ||
                            child.name == stringToName[8] ||
                            child.name == stringToName[9] ||
                            child.name == stringToName[10] ||
                            child.name == stringToName[11] ||
                            child.name == stringToName[12] ||
                            child.name == stringToName[13] ||
                            child.name == stringToName[14] ||
                            child.name == stringToName[15] ||
                            child.name == stringToName[16] ||
                            child.name == stringToName[17] ||
                            child.name == stringToName[18] ||
                            child.name == stringToName[19] ||
                            child.name == stringToName[20] ||
                            child.name == stringToName[21] ||
                            child.name == stringToName[22] ||
                            child.name == stringToName[23] ||
                            child.name == stringToName[24] ||
                            child.name == stringToName[25] ||
                            child.name == stringToName[26]) {
                                // debugger
                            return child;
                        }
                    }
                );
                if (letter == undefined) { previousAlias = false; }
                scene.remove(letter);
            }


            for (let i = 0; i < letters.length; i++) {
                let letter = letters[i].toLocaleUpperCase();
                // debugger
                if(!stringToName.includes(letter) || undefined){
                    letter = "Unknown";
                }
                let letter3D = this.theLetters[letter].clone();
                letter3D.material = new THREE.MeshNormalMaterial();
                letter3D.position.x = positionX[i];
                letter3D.position.y = 0;
                letter3D.position.z = 0;
                scene.add(letter3D);
            }
        }

    }
}