import * as THREE from 'three';
import { Data } from './Data';
import { Camera } from "./camera";
import { MouseClicker } from "./mouseClicker";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Effects } from './Effects';
import { Letters } from './Letters';
import { Post } from './functionAPi';
import { Controls } from './controls';

// import { smh } from './about/about.html'

let scene, renderer, cam, base, effects;

let pausedMeshes = [];
// let pieceInit;
let data;

let pause;

const gamewidth = 9;
const gameHeight = 20;
let startTime = Date.now();

let isStarted = false;

let targetList = [];

let points = 0;
let music;
let gameOverMusic;
let pointsSound;
let speedUpSound;
let letters;

let alias = "";

let controls;

let raycaster;
let mouse;


function init(){
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0x00867f, 0.5);

  // background
  scene.background= new THREE.TextureLoader().load('./misc/wallpaper.png');
  cam = new Camera(renderer);

  const loader = new GLTFLoader();
  loader.load('./misc/buttons.gltf', 
    function (gltf) {
      const scale = 4;
      const start_mesh = gltf.scene.children.find((child) => child.name == "start" );
      start_mesh.scale.set(start_mesh.scale.x * scale, start_mesh.scale.y * scale, start_mesh.scale.z * scale);
      start_mesh.position.x = -60;
      start_mesh.position.y = 25;
      start_mesh.position.z = -2.5;
      start_mesh.material = new THREE.MeshNormalMaterial();
      scene.add(start_mesh);
      
    }
  );

  // public\misc\keycaps.gltf
  controls = new Controls(scene);

  
  
  
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  

  const light = new THREE.AmbientLight( 0xffffff ); 
  scene.add(light);

  cam.freeLook();
  effects =  new Effects();
  AliasControls();

  
  letters = new Letters();

  music = new Audio('./misc/music.mp3');
  music.volume = 0.1;
  music.play();
  music.autoplay = true;
}

function gameStart() {
  controls.removeControls(scene);
  pause = false;

  let World = new THREE.Group();

  let PlayGround1 = CreatePlayGround();
  World.add(PlayGround1);
  let PlayGround2 = CreatePlayGround();
  PlayGround2.position.z = -5;''
  World.add(PlayGround2);

  World.position.y = 1;
 
  
  scene.add(World);


  const loader = new GLTFLoader();
  loader.load('./misc/pause_play.glb', 
    function (gltf) {
      const pauseMesh = gltf.scene.children.find((child) => child.name == "Pause" );
      const scale = 8;
      pauseMesh.scale.set(pauseMesh.scale.x * scale, pauseMesh.scale.y * scale, pauseMesh.scale.z * scale);
      pauseMesh.position.x = 20;
      pauseMesh.position.y = 20;
      pauseMesh.position.z = -2.5;
      pauseMesh.material = new THREE.MeshNormalMaterial();

      const playMesh = gltf.scene.children.find((child) => child.name == "Play" );
      playMesh.scale.set(playMesh.scale.x * scale, playMesh.scale.y * scale, playMesh.scale.z * scale);
      playMesh.position.x = 20;
      playMesh.position.y = 20;
      playMesh.position.z = -2.5;
      playMesh.material = new THREE.MeshNormalMaterial();



      pausedMeshes.push(pauseMesh);
      pausedMeshes.push(playMesh);

      scene.add(pausedMeshes[0]);
    }
  );

  loader.load('./misc/buttons.gltf', 
    function (gltf) {
      const scale = 3;
      const menu_mesh = gltf.scene.children.find((child) => child.name == "MENU" );
      menu_mesh.scale.set(menu_mesh.scale.x * scale, menu_mesh.scale.y * scale, menu_mesh.scale.z * scale);
      menu_mesh.position.x = -30;
      menu_mesh.position.y = 0;
      menu_mesh.position.z = -2.5;
      menu_mesh.material = new THREE.MeshNormalMaterial();
      scene.add(menu_mesh);
      
    }
  );

  

  
  data = new Data(cam,scene);
  data.game(scene);
  data.AfficherTableau2D();
  points = data.points;
  document.onkeydown = null;

  setupKeyControls();

  
  effects.Stars(scene);


  
  
  gameOverMusic = new Audio('./misc/game_over.mp3');
  gameOverMusic.volume = 0.4;

  pointsSound = new Audio('./misc/clearLine.mp3');

  speedUpSound = new Audio('./misc/speed.mp3');
  speedUpSound.volume = 1;
}



function horizontalLine() {
  const geometry = new THREE.BoxGeometry(22.5, 0.5, 0.02);
  // const texture = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const texture = new THREE.MeshNormalMaterial();
  const line = new THREE.Mesh(geometry, texture);
  return line;
}

function VecticalLine() {
  const geometry = new THREE.BoxGeometry(0.5, 50, 0.02);
  // const texture = new THREE.MeshBasicMaterial({ color: 0x555555 });
  const texture = new THREE.MeshNormalMaterial();
  const line = new THREE.Mesh(geometry, texture);
  return line;
}


function CreatePlayGround() {
  let PlayGround = new THREE.Group();
  const Hline1 = horizontalLine();
  Hline1.position.y = 25;
  PlayGround.add(Hline1);

  const Vline1 = VecticalLine();
  Vline1.position.x = 11.25;
  PlayGround.add(Vline1);

  const Vline2 = VecticalLine();
  Vline2.position.x = -11.25;
  PlayGround.add(Vline2);
  let geometry = new THREE.BoxGeometry(22.5, 1, 5);
  const texture = new THREE.MeshBasicMaterial({ color: 0x06c7c0  });
  base = new THREE.Mesh(geometry, texture);
  base.position.y = -25;
  PlayGround.add(base);

  return PlayGround;
}


init();





const clickPosition = { x: 0, y: 0 };
let mouseClicker = new MouseClicker();
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

        case "ArrowUp":
          data.Deplacement('r');
        break;  

        case "h":
          data.holdPiece();
      }
    }
  };
}

function AliasControls(){
  document.onkeydown = function(e){
    if(isStarted == false){
      let keyString = e.key.toUpperCase();
      if(keyString == "BACKSPACE" && alias.length > 0){
        alias = alias.slice(0, -1); 
      }

      if(charIsLetter(keyString)){
        if(alias.length < 3){
          alias+=keyString;
        }
        alias;
      }
      
    }
  }
}

function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false;
  }

  return /^[a-zA-Z]$/.test(char);
}



function setClickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  clickPosition.x = (pos.x / canvas.clientWidth) * 2 - 1;
  clickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip 

  if((mouseClicker.click(clickPosition, scene, cam,"About_1") 
  || mouseClicker.click(clickPosition, scene, cam,"About_2") )){
      document.location.href = './about/index.html';
  }
  if((mouseClicker.click(clickPosition, scene, cam,"Scores_Bouton_1") 
  || mouseClicker.click(clickPosition, scene, cam,"Scores_Bouton_2") )){
      document.location.href = './highscore/index.html';
  }

  if((mouseClicker.click(clickPosition, scene, cam,"MENU_1") 
  || mouseClicker.click(clickPosition, scene, cam,"MENU_2") )){
      document.location.href = './index.html';
  }

  if((mouseClicker.click(clickPosition, scene, cam,"start_1") 
      || mouseClicker.click(clickPosition, scene, cam,"start_2") )){
    const startMesh = scene.children.find(((child) => child.name == "start" ));
    const aboutMesh = scene.children.find((child) => child.name == "About" );
    const highScoreMesh = scene.children.find((child) => child.name == "Scores_Bouton" );
    
    scene.remove(startMesh);
    scene.remove(aboutMesh);
    scene.remove(highScoreMesh);
    
    gameStart();
    isStarted = true;
    cam.play();
    letters.IsReady == false;
    
  }

  

  if(mouseClicker.click(clickPosition, scene, cam,"Pause")){
    pause = true;
    cam.pause();
    scene.remove(scene.getObjectByName("Pause"));
    scene.add(pausedMeshes[1]);
  }else if(mouseClicker.click(clickPosition, scene, cam,"Play")){
    pause = false;
    cam.play();
    scene.remove(scene.getObjectByName("Play"));
    scene.add(pausedMeshes[0]);
  }
}


window.addEventListener('mousedown', setClickPosition,false);
let done = false;


function AddToDB(data){
  console.log("Succesfully added player to dataBase")
  console.log(data);
}

function error(status) {
  let errorMessage = "";
  switch (status) {
      case 0:
          errorMessage = "Le service ne répond pas";
          break;
      case 401:
          errorMessage = "Requête non autorisée";
          break;
      case 400:
      case 422:
          errorMessage = "Requête invalide";
          break;
      case 404:
          errorMessage = "Service ou données introuvables";
          break;
      case 409:
          errorMessage = "Conflits de données: le email est déjà utiliser";
          break;
      case 500:
          errorMessage = "Erreur interne du service";
          break;
      case 480:
          errorMessage = "User n'est pas vérifier";
      default:
          errorMessage = "Une erreur est survenue";
          break;
  }
  console.error(errorMessage);
}

let lastUpdate = Date.now()
function gameLoop(timeAtPlay){
  let now = Date.now();
  if(pause == false){
    if(music.paused && !data.gameOver){
      music.play();
    }

    // speed up
    if(startTime + 20000 <= Date.now() && !data.gameOver){
      startTime = Date.now();
      cam.speedUp();
      speedUpSound.play();
    }
    
    if(data.points != points){ 
      effects.changeColor(scene);
      points = data.points;
      pointsSound.play()
    }

    //gameover manager
    if(data.gameOver && done == false){
      effects.gameOver(scene);
      cam.gameOver();
      
      done = true;
      music.pause();
      gameOverMusic.play();

      // verifie que le game over
      if(alias.length > 0 && data.points > 0){
        let object = { Id: 0, Alias:alias, Score:data.points};
        Post(object, AddToDB, error);
      }
    }
    
    if(now > lastUpdate + 1000){
      data.HighwayToHell();
      // data.AfficherTableau2D();
      lastUpdate = Date.now();
    }
    cam.reposition();
  }else{
    music.pause();
  }

}


let timeAtPlay;

let Isdone = false;
function animate() {

  if(isStarted){
    gameLoop(timeAtPlay);
  }else{
    if(effects.loaded){
      effects.addButtons(scene);
      effects.loaded = false; 
    }
  
    if(letters.IsReady){
      letters.showLetters(scene, alias);
    }
  }

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




