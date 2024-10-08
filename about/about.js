import { MouseClicker } from "../mouseClicker";
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Camera } from "../camera";
import * as THREE from 'three';
let scene, cam, renderer;

// import {f} from '../public/misc/'
let video;

function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
        antialias: false
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x8fff00, 0.5);

    scene.background= new THREE.TextureLoader().load('../misc/wallpaper_about.png');

    cam = new Camera(renderer);

    const loader = new GLTFLoader();
    loader.load('../misc/about.gltf', 
        function (gltf) {

            const scale = 4;
            const text_thom_mesh = gltf.scene.children.find((child) => child.name == "thomas_about" );
            text_thom_mesh.scale.set(text_thom_mesh.scale.x * scale, text_thom_mesh.scale.y * scale, text_thom_mesh.scale.z * scale);
            text_thom_mesh.position.x = -70;
            text_thom_mesh.position.y = -15;
            text_thom_mesh.material = new THREE.MeshStandardMaterial({color:0xf69b93});



            const email_thom_mesh = gltf.scene.children.find((child) => child.name == "thomas_email" );
            email_thom_mesh.scale.set(email_thom_mesh.scale.x * scale, email_thom_mesh.scale.y * scale, email_thom_mesh.scale.z * scale);
            email_thom_mesh.position.x = -32.5;
            email_thom_mesh.position.y = -31;
            email_thom_mesh.material = new THREE.MeshStandardMaterial({color:0x93f6f5});

            
            const text_julian_mesh =  gltf.scene.children.find((child) => child.name == "julian_about" );
            text_julian_mesh.scale.set(text_julian_mesh.scale.x * scale, text_julian_mesh.scale.y * scale, text_julian_mesh.scale.z * scale);
            text_julian_mesh.position.x = 7;
            text_julian_mesh.position.y = -15;
            text_julian_mesh.material = new THREE.MeshStandardMaterial({color:0xe86cfe});

            const email_julian_mesh = gltf.scene.children.find((child) => child.name == "julian_email" );
            email_julian_mesh.scale.set(email_julian_mesh.scale.x * scale, email_julian_mesh.scale.y * scale, email_julian_mesh.scale.z * scale);
            email_julian_mesh.position.x = 10.5;
            email_julian_mesh.position.y = -35;
            email_julian_mesh.material = new THREE.MeshStandardMaterial({color:0x93f6f5});

            const description_mesh = gltf.scene.children.find((child) => child.name == "description" );
            description_mesh.scale.set(description_mesh.scale.x * scale, description_mesh.scale.y * scale, description_mesh.scale.z * scale);
            description_mesh.position.x = -70;
            description_mesh.position.y = 30;
            description_mesh.material = new THREE.MeshStandardMaterial({color:0xebf693});

            const superviseur_mesh = gltf.scene.children.find((child) => child.name == "superviseur" );
            superviseur_mesh.scale.set(superviseur_mesh.scale.x * scale, superviseur_mesh.scale.y * scale, superviseur_mesh.scale.z * scale);
            superviseur_mesh.position.x = 30;
            superviseur_mesh.position.y = 30;
            superviseur_mesh.material = new THREE.MeshStandardMaterial({color:0x6cfe7c});

            // Music
            const music_mesh = gltf.scene.children.find((child) => child.name == "Music" );
            music_mesh.scale.set(music_mesh.scale.x * scale, music_mesh.scale.y * scale, music_mesh.scale.z * scale);
            music_mesh.position.x = -60;
            music_mesh.position.y = -7;
            music_mesh.material = new THREE.MeshStandardMaterial({color:0x25BBE7});

            scene.add(email_julian_mesh);
            scene.add(email_thom_mesh);
            scene.add(text_thom_mesh);
            scene.add(text_julian_mesh);
            scene.add(description_mesh);
            scene.add(superviseur_mesh);
            scene.add(music_mesh);
        }
    );

    loader.load('../misc/buttons.gltf',
        function(gltf){
            const BackToGame = gltf.scene.children.find((child) => child.name == "BTG" );
            const scale = 3;
            BackToGame.scale.set(BackToGame.scale.x *scale, BackToGame.scale.y * scale, BackToGame.scale.z * scale);
            BackToGame.position.x = 30;
            BackToGame.position.y = 0;
            BackToGame.position.z = 2;
            scene.add(BackToGame);
        }
    );

    const light = new THREE.HemisphereLight( 0xffffff, 0x717171,0.7 );
    light.position.y = 10;
    light.position.z = -40;
    light.position.x = 60;
    // const lightHelper = new THREE.HemisphereLightHelper(light);
    // scene.add(lightHelper);
    scene.add(light);
    
    const light2 = new THREE.HemisphereLight( 0xffffff, 0x717171,0.7);
    light2.position.y = 10;
    light2.position.z = -40;
    light2.position.x = -60;
    // const lightHelper2 = new THREE.HemisphereLightHelper(light2);
    // scene.add(lightHelper2);
    scene.add(light2);

    cam.freeLook();


    video = document.getElementById("video");
    
    let videoTexture = new THREE.VideoTexture(video);

    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    var videoMaterial = new THREE.MeshBasicMaterial({
        map:videoTexture,
        side: THREE.FrontSide,
        toneMapped:false
    });


    let videoGeometry = new THREE.BoxGeometry(128,60,72);
    let videoScreen = new THREE.Mesh(videoGeometry, videoMaterial);
    videoScreen.position.set(0,0,-50);
    scene.add(videoScreen);


    /// this is for cube
    // let cubeText1 = new THREE.TextureLoader().load('../misc/Capture_tetris_1.PNG');
    // let cubeText2 = new THREE.TextureLoader().load('../misc/Capture_tetris_2.PNG');
    // let cubeText3 = new THREE.TextureLoader().load('../misc/Capture_tetris_3.PNG');
    // let cubeText4 = new THREE.TextureLoader().load('../misc/Capture_tetris_4.PNG');
    // let cubeText5 = new THREE.TextureLoader().load('../misc/Capture_tetris_5.PNG');

    // let cubeMat1 = new THREE.MeshBasicMaterial({
    //     map:cubeText1,
    //     side:THREE.FrontSide,
    //     toneMapped:false
    // })
    // let cubeMat2 = new THREE.MeshBasicMaterial({
    //     map:cubeText2,
    //     side:THREE.FrontSide,
    //     toneMapped:false
    // })  
    // let cubeMat3 = new THREE.MeshBasicMaterial({
    //     map:cubeText3,
    //     side:THREE.FrontSide,
    //     toneMapped:false
    // })   
    // let cubeMat4 = new THREE.MeshBasicMaterial({
    //     map:cubeText4,
    //     side:THREE.FrontSide,
    //     toneMapped:false
    // });

    // let cubeMat5 = new THREE.MeshBasicMaterial({
    //     map:cubeText5,
    //     side:THREE.FrontSide,
    //     toneMapped:false
    // })  

    // let cubeGeo = new BoxGeometry(15,15,15);


    // let cube1 = new THREE.Mesh(cubeGeo, cubeMat1);
    // let cube2 = new THREE.Mesh(cubeGeo, cubeMat2)
    // let cube3 = new THREE.Mesh(cubeGeo, cubeMat3)
    // let cube4 = new THREE.Mesh(cubeGeo, cubeMat4)
    // let cube5 = new THREE.Mesh(cubeGeo, cubeMat5)


    // cube1.position.x = -40;
    // cube2.position.x = -20;
    // cube3.position.x = 0;
    // cube4.position.x = 20;
    // cube5.position.x = 40;



    // cube1.position.y = 30;
    // cube2.position.y = 30;
    // cube3.position.y = 30;
    // cube4.position.y = 30;
    // cube5.position.y = 30;

    
    // scene.add(cube1);
    // scene.add(cube2);
    // scene.add(cube3);
    // scene.add(cube4);
    // scene.add(cube5);
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

function setClickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    clickPosition.x = (pos.x / canvas.clientWidth) * 2 - 1;
    clickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y

    if((mouseClicker.click(clickPosition, scene, cam,"BTG001") 
    || mouseClicker.click(clickPosition, scene, cam,"BTG001_1") )){
        document.location.href = '../index.html';
    }
}

window.addEventListener('mousedown', setClickPosition);
function animate() {

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