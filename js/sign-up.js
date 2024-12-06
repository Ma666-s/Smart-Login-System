// Register new user
var register = document.getElementById('registerId');
var smartRegister;
var registerBox = [];
// event when click Register
register.addEventListener('click', function () {
    smartRegister = {
      registerName : document.getElementById('upNameId').value,
      registerEmail : document.getElementById('upEmailId').value,
      registerPass : document.getElementById('upPassId').value,
    }
    registerBox.push(smartRegister);
    localStorage.setItem('accountsRegistered', JSON.stringify(registerBox));
    
    clearInputs();

});

// clear inputs after register new user
function clearInputs() {
    document.getElementById('upNameId').value = null;
    document.getElementById('upEmailId').value = null;
    document.getElementById('upPassId').value = null;
}
// store data in localstorage when register new user
if (localStorage.getItem("accountsRegistered") != null) {
    registerBox = JSON.parse(localStorage.getItem("accountsRegistered"));
}
