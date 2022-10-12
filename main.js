import * as THREE from 'three';
import { Data } from './Data';
import { Camera } from "./camera";
import { Piece } from "./piece";
import { MouseClicker } from "./mouseClicker";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Cube } from './cube';
import {Score} from './score';
let scene, renderer, cam, base, score;
let pieceInit;
let data;

let pause;

const gamewidth = 9;
const gameHeight = 20;




function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x00867f, 1);
  // 0x6b6362

  cam = new Camera(renderer);
  pause = false;

  let World = new THREE.Group();

  let PlayGround1 = CreatePlayGround();
  World.add(PlayGround1);
  let PlayGround2 = CreatePlayGround();
  PlayGround2.position.z = -5;
  World.add(PlayGround2);

  World.position.y = 1;
  let D2array = [20][19]

  pieceInit = new Piece();
  data = new Data();
  pieceInit.listeCube[3].name = 'hello';
  
  data.AjouterCubesTableau(pieceInit.listeCube)
  data.AfficherTableau2D();
  // pieceInit.listeCube.pop()


  for(let i = 0; i < pieceInit.listeCube.length; i++){
    scene.add(pieceInit.listeCube[i]);
  }

  // remove cube
  // scene.remove(scene.getObjectByName('hello'));

  
  // scene.remove(pieceInit.listeCube[3]);
  // scene.add(pieceInit.Piece);
  //console.log(pieceInit.Piece)
  setupKeyControls();
  // pieceInit.Piece.name = "a piece of game baby";
  //console.log(pieceInit.Piece.name);

  //pieceInit.enleveCube();


  scene.add(World);

  renderer.outputEncoding = THREE.sRGBEncoding;
  // pause for now, add to ui later
  const loader = new GLTFLoader();
  loader.load('./models/pauseModel.glb', 
    function (gltf) {
      const pauseMesh = gltf.scene.children.find((child) => child.name == "Circle" );
      pauseMesh.scale.set(pauseMesh.scale.x * 5, pauseMesh.scale.y * 5, pauseMesh.scale.z * 5);
      pauseMesh.position.x = 20;
      pauseMesh.position.y = 20;
      pauseMesh.position.z = -2.5;
      pauseMesh.material = new THREE.MeshBasicMaterial({color:0xfa4040})
      scene.add(pauseMesh);
    }
  );

  score = new Score();
}

function horizontalLine() {
  const geometry = new THREE.BoxGeometry(22.5, 0.5, 0.02);
  const texture = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const line = new THREE.Mesh(geometry, texture);
  return line;
}

function VecticalLine() {
  const geometry = new THREE.BoxGeometry(0.5, 50, 0.02);
  const texture = new THREE.MeshBasicMaterial({ color: 0x555555 });
  const line = new THREE.Mesh(geometry, texture);
  return line;
}


function CreatePlayGround() {
  let PlayGround = new THREE.Group();
  for (let i = 0; i < 21; i++) {
    const Hline1 = horizontalLine();
    Hline1.position.y = -2.5 * i + 25;
    PlayGround.add(Hline1)
  }
  for (let i = 0; i < 10; i++) {
    const Vline1 = VecticalLine();
    Vline1.position.x = -2.5 * i + 11.25;
    PlayGround.add(Vline1)
  }
  let geometry = new THREE.BoxGeometry(22.5, 1, 5);
  const texture = new THREE.MeshBasicMaterial({ color: 0xFFF515 });
  base = new THREE.Mesh(geometry, texture);
  base.position.y = -25;
  PlayGround.add(base);

  return PlayGround;
}


init();




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

function setupKeyControls() {
  document.onkeydown = function (e) {
    if (pause == false) {
      switch (e.key) {
        case "ArrowDown":
          data.Deplacement('b');
          break;
        case "ArrowRight":
          data.Deplacement('d');
          break;
        case "ArrowLeft":
          data.Deplacement('g');

          break;

      }
    }

  };
}

function clearClickPosition() {
  clickPosition.x = -100000;
  clickPosition.y = -100000;
  // mouseClicker.reset();
}

function setClickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  clickPosition.x = (pos.x / canvas.clientWidth) * 2 - 1;
  clickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
}


window.addEventListener('mousedown', setClickPosition);
window.addEventListener('mouseup', clearClickPosition);



let lastUpdate = new Date().getSeconds();
let updated = false;
let timeAtPaused;
let points = 0;

function gameLoop(timeAtPlay){
  if(pause == false){
    let now = new Date().getSeconds();
    if(score.IsReady == true){
      score.ShowNumbers(scene, points);
    }
    

    if(now > lastUpdate + 0.5){

      // changes block position
      if(updated == false){
        // data.HighwayToHell();
        lastUpdate = new Date().getSeconds();
        updated = true;
        data.AfficherTableau2D();
        points++;
      }
    } else updated = false;
    cam.reposition();

    //pause game
    if(timeAtPlay != undefined){
      if(mouseClicker.click(clickPosition, scene, cam) && Date.now() - timeAtPlay >= 100){
        pause = true;
        timeAtPaused = Date.now();
        cam.pause()
      }
    } else {
      if(mouseClicker.click(clickPosition, scene, cam) && pause == false){
        pause = true;
        timeAtPaused = Date.now();
        cam.pause()
      }
    } 
  } 

  if (timeAtPaused != undefined){
    let truechose = (Date.now() - timeAtPaused >= 100);
    if(mouseClicker.click(clickPosition, scene, cam) == true && truechose == true ){
      pause = false;
      cam.play();
      timeAtPlay = Date.now();
    }
  }else{
    if(mouseClicker.click(clickPosition, scene, cam) == true && pause == true){
      pause = false;
      cam.play();
      timeAtPlay = Date.now();
    }
  }

  return timeAtPlay;

}


let timeAtPlay;
// let timeAtPaused;
function animate() {

  timeAtPlay =  gameLoop(timeAtPlay);
  // data.HighwayToHell();
  requestAnimationFrame(animate);
  renderer.render(scene, cam);
  // data.AfficherTableau2D();
}



animate();

function onWindowResize() {
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);




