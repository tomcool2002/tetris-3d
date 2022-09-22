import * as THREE from "three";
import {Cube} from './cube';

class Block extends THREE.Group {
    constructor(pos, orientation){
        this.orientation = orientation;
        this.pos = pos;
        this.block = this.createBlock();
        this.colour = Cube.getRandomColour();
    }

    // createBlock(){
    //     let cubes = [];

    //     let figure = 
    // }
    
}


