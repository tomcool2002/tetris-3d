import * as THREE from 'three';
import Cube from './cube';


export class Data{
    constructor(){
        this.tableau = this.createBaseTableau()




    }

    AfficherTableau(){

        for(const y = 0; i < this.tableau.length; y++){
            for(const x = 0; i < this.tableau[i].length; x++){
                
            }
        }
    }

    AfficherCube(val, cube = Cube){

    }

    createBaseTableau(){
        const Longueur = 9;
        const Hauteur = 20;

        let Tableau = new Array(Hauteur)

        for(let i=0; i< Hauteur; i++){
            Tableau[i] = new Array(Longueur);
        }

        for( let i =0; i<Hauteur; i++){
            for(let j=0; j< Longueur; j++){
                Tableau[i][j] =('v',null);
            }
        }
        return Tableau;
    }


}

