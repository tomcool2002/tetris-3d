
import * as THREE from 'three';
import {Camera} from "./camera";
import {Piece} from "./piece";
import {MouseClicker} from "./mouseClicker";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


let scene, renderer,cam, base;
let pieceInit;

let pause;

const gamewidth = 9;
const gameHeight = 20;

// let gameArray =[];






function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ 
    canvas:document.querySelector("#bg"),
    antialias: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor( 0x10deb5, 1 );

  cam = new Camera(renderer);

  let World = new THREE.Group();

  let PlayGround1 = CreatePlayGround();
  World.add(PlayGround1);
  let PlayGround2 = CreatePlayGround();
  PlayGround2.position.z = -5;
  World.add(PlayGround2);

  World.position.y = 1;


  pieceInit = new Piece();

  scene.add(pieceInit.Piece);
  pieceInit.Piece.name = "a piece of game baby";
  console.log(pieceInit.Piece.name);

  scene.add(World);

  // pause for now, add to ui later
  const loader = new GLTFLoader();
  loader.load('./pause/pauseModel.gltf', function(gltfScene){
    gltfScene.scene.scale.set(5,5,5);
    gltfScene.scene.position.x = 20;
    gltfScene.scene.position.y = 20;
    gltfScene.scene.position.z = -2.5;
    scene.add(gltfScene.scene); 
  });

  const light = new THREE.AmbientLight(0x404040 );
  scene.add(light);
  pause = false;
}

function horizontalLine() {
  const geometry = new THREE.BoxGeometry(22.5, 0.5, 0.02);
  const texture = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const line = new THREE.Mesh(geometry,texture);
  return line;
}

function VecticalLine() {
  const geometry = new THREE.BoxGeometry(0.5, 50, 0.02);
  const texture = new THREE.MeshBasicMaterial({ color: 0x555555 });
  const line = new THREE.Mesh(geometry,texture);
  return line;
}


function CreatePlayGround() {
  let PlayGround = new THREE.Group();
  for(let i = 0; i < 21; i++){
    const Hline1 = horizontalLine();
    Hline1.position.y = -2.5*i + 25;
    PlayGround.add(Hline1)
  }
  for(let i = 0; i < 10; i++){
    const Vline1 = VecticalLine();
  Vline1.position.x = -2.5*i + 11.25;
  PlayGround.add(Vline1)
  }
  let geometry = new THREE.BoxGeometry(22.5, 1, 5);
  const texture = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  base = new THREE.Mesh(geometry,texture);
  base.position.y = -25;
  PlayGround.add(base);


  //let geometry2 = new THREE.BoxGeometry(5,5,1);
  //let texture2 = new THREE.MeshBasicMaterial({color: 0xfff000});
  //let cubetest = new THREE.Mesh(geometry2,texture2);
  //cubetest.position.y = 2.5;
  //PlayGround.add(cubetest);

  return PlayGround;
}


init();




const clickPosition = {x: 0, y: 0};
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

function clearClickPosition() {
  clickPosition.x = -100000;
  clickPosition.y = -100000;
  // mouseClicker.reset();
}

function setClickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  clickPosition.x = (pos.x / canvas.clientWidth ) *  2 - 1;
  clickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
}


window.addEventListener('mousedown', setClickPosition);
window.addEventListener('mouseup', clearClickPosition);



let lastUpdate = new Date().getSeconds();
let updated = false;


function animate() {
//  console.log(pause);
  if(!pause){
    let now = new Date().getSeconds();
  
    if(now > lastUpdate + 0.5){
      if(updated == false){
        if(-21 < pieceInit.Piece.position.y){
          pieceInit.Piece.position.y -= 2.5;
          lastUpdate = new Date().getSeconds();
          updated = true;
        }
      }
    } else updated = false;
    cam.reposition();
    if(mouseClicker.click(clickPosition, scene, cam) == true){
      pause = true;
    }
    requestAnimationFrame(animate);
    renderer.render(scene, cam);
  } else {
    cam.pause()
  }

}



animate();

function onWindowResize() {
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
  cam.renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);




