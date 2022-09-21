
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, cube, line, geometry, material, controls;
const points = [];

function init() {

  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  geometry = new THREE.BufferGeometry().setFromPoints(points);
  scene = new THREE.Scene();
  material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  line = new THREE.Line(geometry, material);
  scene.add(line);
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 100);

  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  controls = new OrbitControls(camera,renderer.domElement);
  let PlayGround1 = CreatePlayGround();
  scene.add(PlayGround1);
  let PlayGround2 = CreatePlayGround();
  PlayGround2.position.z = -5;
  scene.add(PlayGround2);
}

function horizontalLine() {
  const geometry = new THREE.BoxGeometry(45, 0.1, 0.01);
  const texture = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const line = new THREE.Mesh(geometry,texture);
  return line;
}

function VecticalLine() {
  const geometry = new THREE.BoxGeometry(0.1, 100, 0.01);
  const texture = new THREE.MeshBasicMaterial({ color: 0x555555 });
  const line = new THREE.Mesh(geometry,texture);
  return line;
}

function CreatePlayGround() {
  let PlayGround = new THREE.Group();
  for(let i = 0; i < 21; i++){
    const Hline1 = horizontalLine();
  Hline1.position.y = -5*i + 50;
  PlayGround.add(Hline1)
  }
  for(let i = 0; i < 10; i++){
    const Hline1 = VecticalLine();
  Hline1.position.x = -5*i + 22.5;
  PlayGround.add(Hline1)
  }
  let geometry = new THREE.BoxGeometry(45, 1, 5);
  const texture = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  let base = new THREE.Mesh(geometry,texture);
  base.position.y = -50;
  PlayGround.add(base);
  //let geometry2 = new THREE.BoxGeometry(5,5,1);
  //let texture2 = new THREE.MeshBasicMaterial({color: 0xfff000});
  //let cubetest = new THREE.Mesh(geometry2,texture2);
  //cubetest.position.y = 2.5;
  //PlayGround.add(cubetest);
  return PlayGround;
}


function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
