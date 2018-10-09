/*
    This file contains Asynchronous Javascript and XML functions.
*/

// This allows the buttons to redirct to form page.
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("rescue1").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "rescue-me.html", true);
  xhttp.send();
}