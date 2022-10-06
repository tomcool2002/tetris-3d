import * as THREE from 'three';


export class Data{
    constructor(){
        this.tableau = this.createBaseTableau()




    }


    AfficherTableau(){
        //methode qui va afficher tout ce qui se trouve dans le tableau
        

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
                Tableau[i][j] =('v',null); // tuple (char represantant la case, l'objet cube)
            }
        }
        return Tableau;
    }


}

