import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const stringToName = {
    A:"A",
    B:"B",
    C:"C",
    D:"D",
    E:"E",
    F:"F",
    G:"G",
    H:"H",
    I:"I",
    J:"J",
    K:"K",
    L:"L",
    M:"M",
    N:"N",
    O:"O",
    P:"P",
    Q:"Q",
    R:"R",
    S:"S",
    T:"T",
    U:"U",
    V:"V",
    W:"W",
    X:"X",
    Y:"Y",
    Z:"Z",
    Unkown:"?",
}

export class Letters{
    constructor(){
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

    Loading(gltf){
        const AMesh =  gltf.scene.children.find((child) => child.name == "A");
        const BMesh =  gltf.scene.children.find((child) => child.name == "B");
        const CMesh =  gltf.scene.children.find((child) => child.name == "C");
        const DMesh =  gltf.scene.children.find((child) => child.name == "D");
        const EMesh =  gltf.scene.children.find((child) => child.name == "E");
        const FMesh =  gltf.scene.children.find((child) => child.name == "F");
        const GMesh =  gltf.scene.children.find((child) => child.name == "G");
        const HMesh =  gltf.scene.children.find((child) => child.name == "H");
        const IMesh =  gltf.scene.children.find((child) => child.name == "I");
        const JMesh =  gltf.scene.children.find((child) => child.name == "J");
        const KMesh =  gltf.scene.children.find((child) => child.name == "K");
        const LMesh =  gltf.scene.children.find((child) => child.name == "L");
        const MMesh =  gltf.scene.children.find((child) => child.name == "M");
        const NMesh =  gltf.scene.children.find((child) => child.name == "N");
        const OMesh =  gltf.scene.children.find((child) => child.name == "O");
        const PMesh =  gltf.scene.children.find((child) => child.name == "P");
        const QMesh =  gltf.scene.children.find((child) => child.name == "Q");
        const RMesh =  gltf.scene.children.find((child) => child.name == "R");
        const SMesh =  gltf.scene.children.find((child) => child.name == "S");
        const TMesh =  gltf.scene.children.find((child) => child.name == "T");
        const UMesh =  gltf.scene.children.find((child) => child.name == "U");
        const VMesh =  gltf.scene.children.find((child) => child.name == "V");
        const WMesh =  gltf.scene.children.find((child) => child.name == "W");
        const XMesh =  gltf.scene.children.find((child) => child.name == "X");
        const YMesh =  gltf.scene.children.find((child) => child.name == "Y");
        const ZMesh =  gltf.scene.children.find((child) => child.name == "Z");
        const UnknownMesh =  gltf.scene.children.find((child) => child.name == "?");


        AMesh.scale.set(AMesh.scale.x * 5, AMesh.scale.y * 5, AMesh.scale.z * 5);
        BMesh.scale.set(BMesh.scale.x * 5, BMesh.scale.y * 5, BMesh.scale.z * 5);
        CMesh.scale.set(CMesh.scale.x * 5, CMesh.scale.y * 5, CMesh.scale.z * 5);
        DMesh.scale.set(DMesh.scale.x * 5, DMesh.scale.y * 5, DMesh.scale.z * 5);
        EMesh.scale.set(EMesh.scale.x * 5, EMesh.scale.y * 5, EMesh.scale.z * 5);
        FMesh.scale.set(FMesh.scale.x * 5, FMesh.scale.y * 5, FMesh.scale.z * 5);
        GMesh.scale.set(GMesh.scale.x * 5, GMesh.scale.y * 5, GMesh.scale.z * 5);
        HMesh.scale.set(HMesh.scale.x * 5, HMesh.scale.y * 5, HMesh.scale.z * 5);
        IMesh.scale.set(IMesh.scale.x * 5, IMesh.scale.y * 5, IMesh.scale.z * 5);
        JMesh.scale.set(JMesh.scale.x * 5, JMesh.scale.y * 5, JMesh.scale.z * 5);
        KMesh.scale.set(KMesh.scale.x * 5, KMesh.scale.y * 5, KMesh.scale.z * 5);
        LMesh.scale.set(LMesh.scale.x * 5, LMesh.scale.y * 5, LMesh.scale.z * 5);
        MMesh.scale.set(MMesh.scale.x * 5, MMesh.scale.y * 5, MMesh.scale.z * 5);
        NMesh.scale.set(NMesh.scale.x * 5, NMesh.scale.y * 5, NMesh.scale.z * 5);
        OMesh.scale.set(OMesh.scale.x * 5, OMesh.scale.y * 5, OMesh.scale.z * 5);
        PMesh.scale.set(PMesh.scale.x * 5, PMesh.scale.y * 5, PMesh.scale.z * 5);
        QMesh.scale.set(QMesh.scale.x * 5, QMesh.scale.y * 5, QMesh.scale.z * 5);
        RMesh.scale.set(RMesh.scale.x * 5, RMesh.scale.y * 5, RMesh.scale.z * 5);
        SMesh.scale.set(SMesh.scale.x * 5, SMesh.scale.y * 5, SMesh.scale.z * 5);
        TMesh.scale.set(TMesh.scale.x * 5, TMesh.scale.y * 5, TMesh.scale.z * 5);
        UMesh.scale.set(UMesh.scale.x * 5, UMesh.scale.y * 5, UMesh.scale.z * 5);
        VMesh.scale.set(VMesh.scale.x * 5, VMesh.scale.y * 5, VMesh.scale.z * 5);
        WMesh.scale.set(WMesh.scale.x * 5, WMesh.scale.y * 5, WMesh.scale.z * 5);
        XMesh.scale.set(XMesh.scale.x * 5, XMesh.scale.y * 5, XMesh.scale.z * 5);
        YMesh.scale.set(YMesh.scale.x * 5, YMesh.scale.y * 5, YMesh.scale.z * 5);
        ZMesh.scale.set(ZMesh.scale.x * 5, ZMesh.scale.y * 5, ZMesh.scale.z * 5);
        UnknownMesh.scale.set(UnknownMesh.scale.x * 5, UnknownMesh.scale.y * 5, UnknownMesh.scale.z * 5);

        

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

    showLetters(scene, letters = "???"){
        const positionX = {
            0 : -7,
            1 : -2,
            2 : 4
        };

        for(let i = 0; i < 3; i++){
            let letter = letters[i].toLocaleUpperCase();
            letter = stringToName[letter];
            // debugger
            if(letter == "?" || letter ==undefined){ letter = "Unknown"}
            // debugger
            let letter3D = this.theLetters[letter].clone();
            letter3D.material = new THREE.MeshNormalMaterial();
            letter3D.position.x = positionX[i];
            letter3D.position.y = 0;
            letter3D.position.z = 0;
            scene.add(letter3D);
        }
    }
}