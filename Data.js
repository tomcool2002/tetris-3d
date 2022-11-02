import { Piece } from "./piece";
import { Score } from "./score";
import { Holder } from './hold';


export class Data {
  constructor(camera,scene) {
    this.HAUTEUR = 20;
    this.LONGEUR = 9;
    this.tableau = this.createBaseTableau();
    this.camera = camera;

    this.ProchainePiece = this.InitPiece();

    this.positionPiece = [];
    this.piecePrincipale;

    this.points = 0;
    this.score = new Score();

    this.memoirePiece;
    this.memoireblock = [];

    this.scene = scene;

    this.holder = new Holder(this.scene);
    this.shapePiece = null;
    this.colorPiece;
    this.peutPlacer = true;

  }
  HighwayToHell() {
    this.Deplacement("b");
  }

  InitPiece() {
    let listePiece = [];

    for (let i = 0; i < 3; i++) {
      //console.log(i*10-20);
      listePiece.push(new Piece(20, 0));
    }
    return listePiece;
  }

  holdPiece(){
    let info = this.holder.SwitchPiece(this.positionPiece,this.piecePrincipale,this.memoirePiece,this.memoireblock);

    this.positionPiece = info[0]
    

  }
    /**
     * Check si le la ligne est pleine et change le tableau acordement
     * @param {THREE.scene} scene 
     */
  game(scene) {
    this.scene = scene;
    let lignePleine = this.CheckLine();

    switch (
      lignePleine.length // donne les points
    ) {
      case 1: {
        this.points += 40;
        break;
      }
      case 2: {
        this.points += 100;
        break;
      }
      case 3: {
        this.points += 300;
        break;
      }
      case 4: {
        this.points += 1200;
        break;
      }
    }

    if (this.score.IsReady) {
      //console.log(this.points);
      this.score.ShowNumbers(this.scene, this.points);
    }

    lignePleine.forEach((ligne) => {
      // enleve les ligne pleines
      for (let x = this.LONGEUR - 1; x >= 0; x--) {
        this.scene.remove(this.tableau[ligne][x][1]);
        this.tableau[ligne][x] = ["v", null];
      }
    });

    if (lignePleine.length > 0) {
      for (let y = lignePleine[lignePleine.length - 1]; y >= 0; y--) {
        for (let x = 0; x <= this.LONGEUR - 1; x++) {
          if (this.tableau[y][x][1] != null) {
            this.tableau[y][x][1].position.y = this.TransformerPosition(
              x,
              y + lignePleine.length,
              true
            )[1];

            this.tableau[y + lignePleine.length][x] = this.tableau[y][x];
            this.tableau[y][x] = ["v", null];
          }
        }
      }
    }
    this.AddPiece();
  }

  /**
   * Ajoute la nouvelle piece au tableau
   */
  AddPiece(){
    if(this.peutPlacer){
      let pieceInit = this.ProchainePiece.shift();
      this.shapePiece = pieceInit.name;
      this.colorPiece = pieceInit.listeCube[0].material.color;
  
      // Deplace
      for (let i = 0; i < pieceInit.listeCube.length; i++) {
        pieceInit.listeCube[i].position.x -= 20;
        pieceInit.listeCube[i].position.y += 20;
        // this.scene.add(pieceInit.listeCube[i]);
      }
      this.peutPlacer = this.AjouterCubesTableau(pieceInit.listeCube);
      if(this.peutPlacer){
         // ces lui qui reconstruit pieceprincipal
        for (let i = 0; i < pieceInit.listeCube.length; i++) {
          this.scene.add(pieceInit.listeCube[i]);
        }
        this.ProchainePiece.push(new Piece(20, 0));
  
        this.ProchainePiece[0].listeCube.forEach(cube =>{
          this.scene.add(cube);
        })
      }
    }
    
  }

  Deplacement(dir) {
    let peutDeplacer = true;

    switch (dir) {
      case "g": // gauche
        for (let i = 0; i < this.positionPiece.length; i++) {
          peutDeplacer = this.isValid(
            this.piecePrincipale[0] + this.positionPiece[i][0],
            this.piecePrincipale[1] - 1 + this.positionPiece[i][1]
          );

          if (!peutDeplacer) {
            break;
          }
        }
        if (peutDeplacer) {
          peutDeplacer = this.isValid(
            this.piecePrincipale[0],
            this.piecePrincipale[1] - 1
          );
        }

        if (peutDeplacer) {
          this.Deconstruction();
          this.piecePrincipale[1]--; // modifie position piece "D" dans le tableau 2d
          this.MoveBlock();
          this.Reconstruction(this.piecePrincipale[0], this.piecePrincipale[1]);
        }
        break;
      case "d": // droite
        for (let i = 0; i < this.positionPiece.length; i++) {
          peutDeplacer = this.isValid(
            this.piecePrincipale[0] + this.positionPiece[i][0],
            this.piecePrincipale[1] + 1 + this.positionPiece[i][1]
          );

          if (!peutDeplacer) {
            break;
          }
        }
        if (peutDeplacer) {
          peutDeplacer = this.isValid(
            this.piecePrincipale[0],
            this.piecePrincipale[1] + 1
          );
        }

        if (peutDeplacer) {
          this.Deconstruction();
          this.piecePrincipale[1]++; // modifie position piece "D" dans le tableau 2d
          this.MoveBlock();
          this.Reconstruction(this.piecePrincipale[0], this.piecePrincipale[1]);
        }
      break;

      case "b": // bas
        for (let i = 0; i < this.positionPiece.length; i++) {
          peutDeplacer = this.isValid(
            this.piecePrincipale[0] + 1 + this.positionPiece[i][0],
            this.piecePrincipale[1] + this.positionPiece[i][1]
          );

          if (!peutDeplacer){  break;}
        }

        if (peutDeplacer) {
          peutDeplacer = this.isValid(
            this.piecePrincipale[0] + 1,
            this.piecePrincipale[1]
          );
        }

        if (peutDeplacer) {
          this.Deconstruction();
          this.piecePrincipale[0]++; // modifie position piece "D" dans le tableau 2d
          this.MoveBlock();
          this.Reconstruction(this.piecePrincipale[0], this.piecePrincipale[1]);
        } else if(this.piecePrincipale != null) {
          this.PlaceBlock();
        }
      break;

      case "r":
        for (let i = 0; i < this.positionPiece.length; i++) {
          let [x, y] = this.BigMath(
            this.positionPiece[i][1],
            this.positionPiece[i][0]
          );
          peutDeplacer = this.isValid(
            this.piecePrincipale[0] + y,
            this.piecePrincipale[1] + x
          );
          if (!peutDeplacer) break;
        }

        if (peutDeplacer) {
          this.Deconstruction();
          for (let i = 0; i < this.positionPiece.length; i++) {
            let x = this.positionPiece[i][1];
            let y = this.positionPiece[i][0];
            let [new_x, new_y] = this.BigMath(x, y);
            this.positionPiece[i][1];
            this.positionPiece[i][1] = new_x;
            this.positionPiece[i][0] = new_y;
          }
          this.positionPiece;
          this.Reconstruction(this.piecePrincipale[0], this.piecePrincipale[1]);
        }
        break;
    }
  }

  BigMath(x, y) {
    return [-y, x];
  }
  /**
   * change le block I en X
   */
  PlaceBlock() {
    for (let y = this.HAUTEUR - 1; y >= 0; y--) {
      for (let x = this.LONGEUR - 1; x >= 0; x--) {
        if (this.tableau[y][x][0] == "i") {
          this.tableau[y][x][0] = "x"; // change tout les I en X
        }
      }
    }

    if(this.peutPlacer){ this.camera.newRotation();}
    else{this.camera.pause()}
   

    this.memoireblock.forEach((block) => {
      let coorTableau = this.TransformerPosition(
        block.position.x,
        block.position.y,
        false
      ); //trouve la position du block

      this.tableau[coorTableau[1]][coorTableau[0]][1] = block; // insere le block dans le tableau (non principale)
    });

    this.tableau[this.piecePrincipale[0]][this.piecePrincipale[1]] = [
      "x",
      this.memoirePiece,
    ]; // met le block principale dans le tableau
    this.positionPiece.length = 0; // delete le tableau position piece
    this.memoireblock.length = 0; // delete le tableau memoireblock

    this.game(this.scene);
  }

  MoveBlock() {
    this.memoirePiece.position.y = this.TransformerPosition(
      this.piecePrincipale[1],
      this.piecePrincipale[0],
      true
    )[1];

    this.memoirePiece.position.x = this.TransformerPosition(
      this.piecePrincipale[1],
      this.piecePrincipale[0],
      true
    )[0];

    this.tableau[this.piecePrincipale[0]][this.piecePrincipale[1]][0] = "D";
  }

  Reconstruction(y, x) {
    let compteur = 0;
    this.positionPiece.forEach((block) => {
      this.tableau[y + block[0]][x + block[1]][0] = "i";

      this.memoireblock[compteur].position.x = this.TransformerPosition(
        x + block[1],
        y + block[0],
        true
      )[0];

      this.memoireblock[compteur].position.y = this.TransformerPosition(
        x + block[1],
        y + block[0],
        true
      )[1];
      compteur++;
    });
  }

  Deconstruction() {
    for (let y = 0; y <=this.HAUTEUR - 1; y++) {
      for (let x = 0; x <= this.LONGEUR -1 ; x++) {
        if (this.tableau[y][x][0] == "i" || this.tableau[y][x][0] == "D") {
          this.tableau[y][x][0] = "v";
          this.tableau[y][x][1] = null;
        }
      }
    }
  }

  AjouterCubesTableau(listeCube) {
    if(this.peutPlacer){
      let compteur = 0;
      let peutPlacer;
  
      for(let i = 0; i < listeCube.length; i++){
  
        let pos = this.TransformerPosition(
          listeCube[i].position.x,
          listeCube[i].position.y,
          false
        );
  
        let x = pos[0];
        let y = pos[1];
        
  
        peutPlacer = this.isValid(y,x);
        if(!peutPlacer) break;
      }
  
      
      
      
      if(peutPlacer){
        listeCube.forEach((cube) => {
          let pos = this.TransformerPosition(
            cube.position.x,
            cube.position.y,
            false
          );
          let x = pos[0];
          let y = pos[1];
          if (compteur == 1) {
            
            this.piecePrincipale = [y, x];
            this.memoirePiece = cube;
            this.tableau[y][x][0] = "D";
          } else {
            this.positionPiece.push([y, x]);
            this.memoireblock.push(cube);
            this.tableau[y][x][0] = "i";
          }
          compteur++;
        })
  
  
        this.positionPiece.forEach((piece) => {
          piece[0] -= this.piecePrincipale[0];
          piece[1] -= this.piecePrincipale[1];
        });
      }
      this.peutPlacer = peutPlacer;
    }
    return this.peutPlacer;
  }

  TransformerPosition(x, y, duTableau) {
    let x_transformer;
    let y_transformer;
    if (duTableau == false) {
      x_transformer = x / 2.5 + 4;
      y_transformer = (y / 2.5 - 10) / -1;
    } else {
      x_transformer = (x - 4) * 2.5;
      y_transformer = (y * -1 + 10) * 2.5;
    }

    return [x_transformer, y_transformer];
  }

  AfficherTableau2D() {
    //console.clear();
    // console.log(this.ProchainePiece);
    // console.log(this.positionPiece);
    //console.log(this.piecePrincipale);
    for (let y = 0; y < this.HAUTEUR; y++) {
      let stringLigne = "";
      for (let x = 0; x < this.LONGEUR; x++) {
        stringLigne += this.tableau[y][x][0];
      }
      stringLigne += y;
      console.log(stringLigne);
    }
  }

  CheckLine() {
    let TableauligneComplete = [];

    for (let y = 0; y < this.tableau.length; y++) {
      let complete = true;
      for (let x = 0; x < this.tableau[y].length; x++) {
        if (this.tableau[y][x][0] != "x") {
          complete = false;
        }
      }
      if (complete) {
        TableauligneComplete.push(y);
      }
    }
    //console.log(TableauligneComplete);
    return TableauligneComplete;
  }

  isValid(y, x) {
    if (x < 0 || x >= this.LONGEUR) return false;
    if (y < 0 || y >= this.HAUTEUR) return false;
    if (this.tableau[y][x][0] == "x") return false;
    return true;
  }

  createBaseTableau() {
    let Tableau = new Array(this.HAUTEUR);

    for (let i = 0; i < this.HAUTEUR; i++) {
      Tableau[i] = new Array(this.LONGEUR);
    }

    for (let i = 0; i < this.HAUTEUR; i++) {
      for (let j = 0; j < this.LONGEUR; j++) {
        Tableau[i][j] = ["v", null]; // tuple (char represantant la case, l'objet cube)
      }
    }
    return Tableau;
  }
}
