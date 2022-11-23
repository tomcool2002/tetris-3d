function getData(path) {
  let data = "probleme avec la requete";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = this.responseText;
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();

  return data;
}

function postData(path,name,score) {
  let data = "probleme avec requete";
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = this.responseText;
    }
  };
  xhttp.open("POST", path, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`name=${name}&score=${score}`);
  return data;
}
