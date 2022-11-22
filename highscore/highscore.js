import { MouseClicker } from "../mouseClicker";
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Camera } from "../camera";
import 'three';
import * as THREE from 'three';
import {ShowScores } from './ShowScores.js';
let scene, cam, renderer,score,scores, video;



function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
        antialias: false
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x8fff00, 0.5);

    scene.background= new THREE.TextureLoader().load('../misc/wallpaper_about.jpg');

    cam = new Camera(renderer);

    const scale = 1.5;
    const loader = new GLTFLoader();
    loader.load('../misc/buttons.gltf', 
        function (gltf) {

            const score_mesh = gltf.scene.children.find((child) => child.name == "Score" );
            score_mesh.scale.set(score_mesh.scale.x * scale, score_mesh.scale.y * scale, score_mesh.scale.z * scale);
            score_mesh.position.x = -15;
            score_mesh.position.y = 35;
            score_mesh.position.z = 0;
            score_mesh.material = new THREE.MeshStandardMaterial({color:0x717171});
            scene.add(score_mesh);
        }
    );

    loader.load('../misc/buttons.gltf',
        function(gltf){
            const BackToGame = gltf.scene.children.find((child) => child.name == "BTG" );
            BackToGame.scale.set(BackToGame.scale.x * 2, BackToGame.scale.y * 2, BackToGame.scale.z * 2);
            BackToGame.position.x = -12;
            BackToGame.position.y = -30;
            BackToGame.position.z = -1;
            scene.add(BackToGame);
        }
    );
    

    const light = new THREE.HemisphereLight( 0xffffff, 0x717171,1 );
    light.position.y = 10;
    light.position.z = -40;
    light.position.x = 60;
    // const lightHelper = new THREE.HemisphereLightHelper(light);
    // scene.add(lightHelper);
    scene.add(light);
    
    const light2 = new THREE.HemisphereLight( 0xffffff, 0x717171,1 );
    light2.position.y = 10;
    light2.position.z = -40;
    light2.position.x = -60;
    // const lightHelper2 = new THREE.HemisphereLightHelper(light2);
    // scene.add(lightHelper2);
    scene.add(light2);
    score = new ShowScores();
    
    scores = [
        {
            "Alias":"ANG",
            "Score":69420
        },
        {
            "Alias":"THO",
            "Score":42069
        },
        {
            "Alias":"JRT",
            "Score":2125
        },
        {
            "Alias":"AAA",
            "Score":1086
        },
        {
            "Alias":"BBB",
            "Score":1000
        },
        {
            "Alias":"BUL",
            "Score":365
        },
        {
            "Alias":"HEL",
            "Score":250
        },
        {
            "Alias":"HEA",
            "Score":140
        },
        {
            "Alias":"GOD",
            "Score":50
        },
        {
            "Alias":"DEV",
            "Score":10
        },
    ]
    


    cam.freeLook();


    
}

document.onkeydown = function (e) {
    switch (e.key) {
        case " ":
            if(video.paused){video.play();  }
            else {video.pause();  }
        break;
        case "m":
            if(video.muted){video.muted = false;  }
            else {video.muted = true;  }
        break;    
      }
  };


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


// let timeAtAbout =  Date.now();

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
    if(score.IsReady ){
        score.ShowScoresFR(scene,scores);
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