function addUser() {
  var tr = document.createElement("tr");
  var td0 = tr.insertCell(0);
  var td1 = tr.insertCell(1);
  td1.innerHTML = '<div class="form-group"><input type="text" class="form-control" name="acc_name"  maxlength="15"></div>';
  var td2 = tr.insertCell(2);
  td2.innerHTML = '<div class="form-group"><input type="text" class="form-control" name="acc_login"  maxlength="15"></div>';
  var td3 = tr.insertCell(3);
  td3.innerHTML = '<div class="form-group"><input type="text" class="form-control" name="acc_password"  maxlength="15"></div>';
  var td4 = tr.insertCell(4);
  td4.innerHTML = '<button type="button" onclick="submitAccount()">' + '<span class="glyphicon glyphicon-floppy-save"></span>' + '</button> <button type="button" onclick="cancelAccount()">' + '<span class="glyphicon glyphicon-remove"></span>' + '</button>';
  document.getElementById('myAccTable').getElementsByTagName("tfoot")[0].appendChild(tr);
}
function submitAccount() {
  document.forms['addAccount'].action = "/postAccount";
  document.getElementById("addAccount").submit();
}
function cancelAccount() {
  document.forms['addAccount'].action = "/cancelAccount";
  document.getElementById("addAccount").submit();
}
function updateAccount() {
  document.forms['addAccount'].action = "/updateAccount";
  document.getElementById("addAccount").submit();
}
function cancelUpdate() {
  document.forms['addAccount'].action = "/cancelUpdate";
  document.getElementById("addAccount").submit();
}
function removeAcc(id) {
  var id1 = document.getElementById("atd_id" + id).innerHTML;
  var name = document.getElementById("atd_name" + id).innerHTML;
  var login = document.getElementById("atd_login" + id).innerHTML;
  var passwd = document.getElementById("atd_password" + id).innerHTML;
  var symb = document.getElementById("atd_symbols" + id).innerHTML;
  var hf = document.createElement("input");
  hf.setAttribute("name", "acc_id_d");
  hf.setAttribute("value", id1 );
  document.forms['addAccount'].appendChild(hf);
  console.log( document.forms['addAccount'].innerHTML);
  document.forms['addAccount'].action = "/deleteAccount";
  document.getElementById("addAccount").submit();
}
function updateAcc(id) {
  var id = document.getElementById("atd_id" + id).innerHTML;
  var name = document.getElementById("atd_name" + id).innerHTML;
  var login = document.getElementById("atd_login" + id).innerHTML;
  var passwd = document.getElementById("atd_password" + id).innerHTML;
  var symb = document.getElementById("atd_symbols" + id).innerHTML;
  document.getElementById("atd_id" + id).innerHTML = '<div class="form-group"><input type="hidden" class="form-control" name="acc_id_e" value="'+id+'" maxlength="15"></div>';
  document.getElementById("atd_name" + id).innerHTML = '<div class="form-group"><input type="text" class="form-control" name="acc_name_e" value="'+name+ '" maxlength="15" required></div>';
  document.getElementById("atd_login" + id).innerHTML = '<div class="form-group"><input type="text" class="form-control" name="acc_login_e" value="'+login+ '" maxlength="15" required></div>';
  document.getElementById("atd_password" + id).innerHTML = '<div class="form-group"><input type="text" class="form-control" name="acc_password_e" value="'+name+ '" maxlength="15" required></div>';
  document.getElementById("atd_symbols" + id).innerHTML  = '<button type="button" onclick="updateAccount()">' + '<span class="glyphicon glyphicon-floppy-save"></span>' + '</button> <button type="button" onclick="cancelUpdate()">' + '<span class="glyphicon glyphicon-refresh"></span>' + '</button>';
  
}
