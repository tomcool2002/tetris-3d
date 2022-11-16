import { MouseClicker } from "../mouseClicker";
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Camera } from "../camera";
import 'three';
import * as THREE from 'three';
let scene, cam, renderer;

function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
        antialias: false
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00867f, 0.5);

    scene.background= new THREE.TextureLoader().load('../misc/wallpaper.png');

    cam = new Camera(renderer);

    renderer.outputEncoding = THREE.sRGBEncoding;

    const loader = new GLTFLoader();
    loader.load('../misc/about.gltf', 
        function (gltf) {
        const aboutMesh = gltf.scene.children.find((child) => child.name == "About_Text" );
        aboutMesh.scale.set(aboutMesh.scale.x * 2, aboutMesh.scale.y * 2, aboutMesh.scale.z * 2);
        aboutMesh.position.x = -30;
        aboutMesh.position.y = 0;
        aboutMesh.position.z = 0;
        aboutMesh.material = new THREE.MeshNormalMaterial();
        scene.add(aboutMesh);
        }
    );

    loader.load('../misc/buttons.gltf',
        function(gltf){
            const BackToGame = gltf.scene.children.find((child) => child.name == "BTG" );
            BackToGame.scale.set(BackToGame.scale.x * 2, BackToGame.scale.y * 2, BackToGame.scale.z * 2);
            BackToGame.position.x = -7;
            BackToGame.position.y = -15;
            BackToGame.position.z = 2;
            BackToGame.material = new THREE.MeshNormalMaterial();
            scene.add(BackToGame);
        }
    );

    const light = new THREE.AmbientLight( 0xffffff ); 
    scene.add(light);
    
    cam.freeLook()
}


init();

function clearClickPosition() {
    clickPosition.x = -100000;
    clickPosition.y = -100000;
}
const clickPosition = { x: 0, y: 0 };
let mouseClicker = new MouseClicker();
clearClickPosition();
let canvas = document.querySelector("#bg");

function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function setClickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    clickPosition.x = (pos.x / canvas.clientWidth) * 2 - 1;
    clickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
}

window.addEventListener('mousedown', setClickPosition);
window.addEventListener('mouseup', clearClickPosition);

let timeAtAbout =  Date.now();
function animate() {

    let deltaTime = Date.now() - timeAtAbout;
    let enoughTime = ( deltaTime >= 500);
    if((mouseClicker.click(clickPosition, scene, cam,"BTG_1") 
    || mouseClicker.click(clickPosition, scene, cam,"BTG_2") )
        && enoughTime){
        document.location.href = '../index.html';
        timeAtAbout = Date.now();
        // debugger
    }


    cam.reposition(); 
    requestAnimationFrame(animate);
    renderer.render(scene, cam);
}

animate();

function onWindowResize() {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);