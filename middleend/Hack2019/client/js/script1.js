'use strict';

(function () {
  var url = 'getListOfAccounts';
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
      var j = response[i].acc_id;
      output += '<tr id="atr'+j+'"><td id="atd_id'+j+'">' +
        response[i].acc_id +
        '</td><td id="atd_name'+j+'">' +
        response[i].acc_name +
        '</td><td id="atd_login'+j+'">' +
        response[i].acc_login +
        '</td><td id="atd_password'+j+'">' +
        // response[i].acc_password +
        '</td><td id="atd_symbols'+j+'">' +
        '<button type="button" onclick=' + '"updateAcc('+"'"+j+"'"+')">' +
        '<span class="glyphicon glyphicon-pencil"></span>' +
        '</button>' + 
        '<button type="button" onclick=' + '"removeAcc('+"'"+j+"'"+')">' +
        '<span class="glyphicon glyphicon-trash"></span>' +
        '</button>' + 
        "</td></tr>";
    }
    document.getElementById("myAccTable").getElementsByTagName("tbody")[0].innerHTML = output;
  }
})();
