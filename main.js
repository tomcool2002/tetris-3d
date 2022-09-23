
import * as THREE from 'three';
import {Camera} from "./camera";
import {Piece} from "./piece";

let scene, renderer,cam, base;

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ 
    canvas:document.querySelector("#bg"),
    antialias: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  cam = new Camera(renderer);

  let World = new THREE.Group();

  let PlayGround1 = CreatePlayGround();
  World.add(PlayGround1);
  let PlayGround2 = CreatePlayGround();
  PlayGround2.position.z = -5;
  World.add(PlayGround2);

  World.position.x = -2.5;

  scene.add(World);

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


let lastUpdate = new Date().getSeconds();
let updated = false;

function animate() {
  let p = new Piece();
  let now = new Date().getSeconds();
  
  if(now > lastUpdate + 0.5){
    if(updated == false){
      //if(-23 < cube.position.y){
        //cube.position.y -= 2;
        lastUpdate = new Date().getSeconds();
        updated = true;
      //}
    }
  } else updated = false;
  cam.reposition();
  requestAnimationFrame(animate);
  renderer.render(scene, cam);
}



init();
animate();

function onWindowResize() {
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
  cam.renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);




