import * as THREE from 'three';

class Cube extends THREE.Group{
    constructor()


    createCube(size, colour) {
        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshPhongMaterial({ color: colour });
        var cube = new THREE.Mesh(geometry, material);
    
        return cube;
    }

    getRandomColour() {
    var letters = "0123456789ABCDEF";
    var colour = "#";
    for (var i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;


}  
}

