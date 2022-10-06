import * as THREE from 'three';
import { Cube } from "./cube";


export class Data{
    constructor(){
        this.tableau = this.createBaseTableau();
    }

    AjouterCubesTableau(listeCube){
        listeCube.forEach(cube => {
            
            let x = (cube.position.x/2.5) + 4;
            let y = ((cube.position.y/2.5) - 10) / -1;
            // console.log(x,y)
            // this;
            
            this.tableau[y][x][1] = cube;
            this.tableau[y][x][0] = 'i';
            // console.log(this.tableau[y][x])
        });
        
    }

    TransformerPosition(x,y, vers){

    }

    AfficherTableau(){
        // for(let y = 0; y < this.tableau.length; y++){
        //     for(let x = 0; x < this.tableau[y].length; x++){
        //         // this.AfficherCube(this.tableau[y][x],x,y);
        //     }
        // }
        console.log(this.tableau);
    }

    AfficherCube(cube = new Cube(), x, y){
        //methode qui va afficher tout ce qui se trouve dans le tableau
        console.log(this.tableau[y][x]);

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
                Tableau[i][j] = ['x', null]; // tuple (char represantant la case, l'objet cube)
            }
        }
        return Tableau;
    }


}

