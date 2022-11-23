import * as THREE from 'three';
import { Data } from './Data';
import { Camera } from "./camera";
import { MouseClicker } from "./mouseClicker";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Effects } from './Effects';
import { Letters } from './Letters';

// import { smh } from './about/about.html'

let scene, renderer, cam, base, effects;

// let pieceInit;
let data;

let pause;

const gamewidth = 9;
const gameHeight = 20;
let startTime = Date.now();

let isStarted = false;



let points = 0;
let music;
let gameOverMusic;
let pointsSound;
let speedUpSound;
let letters;

let alias = "";



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
      const scale = 6;
      const start_mesh = gltf.scene.children.find((child) => child.name == "start" );
      start_mesh.scale.set(start_mesh.scale.x * scale, start_mesh.scale.y * scale, start_mesh.scale.z * scale);
      start_mesh.position.x = -30;
      start_mesh.position.y = 25;
      start_mesh.position.z = -2.5;
      start_mesh.material = new THREE.MeshNormalMaterial();
      scene.add(start_mesh);
      
    }
  );

  

  const light = new THREE.AmbientLight( 0xffffff ); 
  scene.add(light);

  cam.freeLook();
  effects =  new Effects();
  AliasControls();

  
  letters = new Letters();
}

function gameStart() {
  
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
  loader.load('./misc/pauseModel.glb', 
    function (gltf) {
      const pauseMesh = gltf.scene.children.find((child) => child.name == "Pause" );
      const scale = 8;
      pauseMesh.scale.set(pauseMesh.scale.x * scale, pauseMesh.scale.y * scale, pauseMesh.scale.z * scale);
      pauseMesh.position.x = 20;
      pauseMesh.position.y = 20;
      pauseMesh.position.z = -2.5;
      pauseMesh.material = new THREE.MeshNormalMaterial();
      scene.add(pauseMesh);
    }
  );

  

  
  data = new Data(cam,scene);
  data.game(scene);
  data.AfficherTableau2D();
  points = data.points;
  document.onkeydown = null;

  setupKeyControls();

  
  effects.Stars(scene);


  music = new Audio('./misc/music.mp3');
  music.volume = 0.1;
  music.play();
  music.autoplay = true;
  
  gameOverMusic = new Audio('./misc/game_over.mp3');
  gameOverMusic.volume = 0.5;

  pointsSound = new Audio('./misc/clearLine.mp3');

  speedUpSound = new Audio('./misc/speed.mp3');
  speedUpSound.volume = 0.3;
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

function clearClickPosition() {
  clickPosition.x = -100000;
  clickPosition.y = -100000;
}

function setClickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  clickPosition.x = (pos.x / canvas.clientWidth) * 2 - 1;
  clickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
}


window.addEventListener('mousedown', setClickPosition);
window.addEventListener('mouseup', clearClickPosition);


let lastUpdate = Date.now();
let timeAtPaused;
let done = false;

let timeAtButtons =  Date.now();


function clickLoop(){
  let deltaTime = Date.now() - timeAtButtons;
  let enoughTime = ( deltaTime >= 500);

  if((mouseClicker.click(clickPosition, scene, cam,"About_1") 
  || mouseClicker.click(clickPosition, scene, cam,"About_2") )
     && enoughTime){
      document.location.href = './about/index.html';
    timeAtButtons = Date.now();
  }
  if((mouseClicker.click(clickPosition, scene, cam,"Scores_Bouton_1") 
  || mouseClicker.click(clickPosition, scene, cam,"Scores_Bouton_2") )
     && enoughTime){
      document.location.href = './highscore/index.html';
    timeAtButtons = Date.now();
  }

  if((mouseClicker.click(clickPosition, scene, cam,"start_1") 
      || mouseClicker.click(clickPosition, scene, cam,"start_2") )
      && enoughTime){
      timeAtButtons = Date.now();
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

  if(effects.loaded){
    effects.addButtons(scene);
    effects.loaded = false; 
  }

  if(letters.IsReady){
    letters.showLetters(scene, alias);
  }

}
function gameLoop(timeAtPlay){
  //about page
  


  let now = Date.now();
  if(pause == false){
    if(music.paused && !data.gameOver){
      music.play();
    }

    

    

    // speed up
    if(startTime + 20000 <= Date.now() && !data.gameOver && cam.rotationSpeed != 10 && cam.rotationSpeed != -10 ){
      startTime = Date.now();
      cam.speedUp();
      speedUpSound.play();
    }

    
    
    if(data.points != points){ 
      effects.changeColor(scene);
      points = data.points;
      pointsSound.play()
    }

    if(data.gameOver && done == false){
      effects.gameOver(scene);
      
      done = true;
      music.pause();
      gameOverMusic.play();

    }
    if(now > lastUpdate + 1000){
      data.HighwayToHell();
      // data.AfficherTableau2D();
      lastUpdate = Date.now();
    }
    cam.reposition();

    //pause game
    if(timeAtPlay != undefined){
      if(mouseClicker.click(clickPosition, scene, cam,"Pause") && Date.now() - timeAtPlay >= 100){
        pause = true;
        timeAtPaused = Date.now();
        cam.pause();
      }
    } else {
      if(mouseClicker.click(clickPosition, scene, cam,"Pause") && pause == false){
        pause = true;
        timeAtPaused = Date.now();
        cam.pause();
      }
    } 
  }else{
    music.pause();
  }



  if (timeAtPaused != undefined){
    let enoughTime = (Date.now() - timeAtPaused >= 100);
    if(mouseClicker.click(clickPosition, scene, cam,"Pause") == true && enoughTime == true ){
      pause = false;
      cam.play();
      timeAtPlay = Date.now();
    }
  }else{
    if(mouseClicker.click(clickPosition, scene, cam,"Pause") == true && pause == true){
      pause = false;
      cam.play();
      timeAtPlay = Date.now();
      
    }
  }

  return timeAtPlay;

}


let timeAtPlay;
let timeNoStart =  Date.now();
function animate() {

  if(isStarted){
    timeAtPlay =  gameLoop(timeAtPlay);
  }

  clickLoop();

  

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




