'use strict';

(function () {
  var url = 'getListOfFavPlaces';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = JSON.parse(xmlhttp.responseText);
      fillTable(myArr);
    }
  }

  function fillTable(response) {
    var output = "";
    for (var i in response) {
      output += "<tr><td>" +
        response[i].place_name +
        "</td><td>" +
        response[i].addr_line1 +
        "<br>" +
        response[i].addr_line2 +
        "</td><td>" +
        response[i].open_time +
        "<br>" +
        response[i].close_time +
        "</td><td>" +
        response[i].add_info +
        "</td><td>" +
        response[i].add_info_url +
        "</td></tr>";
    }
    document.getElementById("myFavTable").getElementsByTagName("tbody")[0].innerHTML = output;
  }
})();
