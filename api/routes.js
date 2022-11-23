const fs = require("fs");
const JSONStream = require("jsonstream");

let filepath = "data.json";

var routes = function (app) {
  app.get("/", function (req, res) {
    console.log("received get");
    fs.readFile(filepath, "utf-8", (err, jsonString) => {
      if (err) {
        res.send(err);
      } else {
        try {
          const data = JSON.parse(jsonString);
          console.log(data);
          data.sort(function (a, b) {
            return b.score - a.score;
          });
          let BestScore = [];
          for (let compteur = 0; compteur < 10; compteur++) {
            //console.log(data[compteur]);
            BestScore[compteur] = data[compteur];
          }
          res.send(BestScore);
        } catch (error) {
          console.log("error parsing JSON", err);
        }
      }
    });
  });

  app.post("/", function (req, res) {
    console.log("received post");
    if (!req.body.name || !req.body.score) {
      console.log("erreur");
      return res.send({ status: "error", message: "missing parameters" });
    } else {
      fs.readFile(filepath, "utf-8", (err, jsonString) => {
        if (err) {
          res.send(err);
        } else {
          try {
            const data = JSON.parse(jsonString);
            //console.log(data);

            let newScore = {
              name: req.body.name,
              score: req.body.score,
            };

            let jsonwriter = JSONStream.stringify();
            let file = fs.createWriteStream(filepath);

            jsonwriter.pipe(file);
            data.forEach((score) =>{
                jsonwriter.write(score);
            })
            jsonwriter.write(newScore);
            jsonwriter.end();

          } catch (error) {
            console.log("error parsing JSON", err);
          }
        }
      });

      //let newScoreString = JSON.stringify(newScore);
      // fs.appendFile(filepath,newScoreString,(err)=>{
      //     if(err){
      //         console.log(err);
      //     }
      //     else{
      //         console.log("we good");
      //     }
      // });
      return res.send(req.body);
    }
  });
};

module.exports = routes;
