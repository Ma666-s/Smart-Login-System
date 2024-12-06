// catch input login
var login = document.getElementById('loginId');
// array empty first to use it check data in localstorage
var loginCheck = [];
// store values input in variables
var loginEmail = document.getElementById('inEmailId');
var loginPass = document.getElementById('inPassId');

// condition check in localstorage if it is not empty
if (localStorage.getItem("accountsRegistered") != null) {
    loginCheck = JSON.parse(localStorage.getItem("accountsRegistered"));
}
// Event when click button login
login.addEventListener('click', function () {


    // loop to search all users in localstorage
    for (var i = 0; i < loginCheck.length; i++) {
        // check if data user stored in localstorage
        if (loginCheck[i].registerEmail == loginEmail.value) {
            localStorage.setItem("name", JSON.stringify(loginCheck[i].registerName))
            window.location.href = "home.html"
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Email or Password is wrong!",
                showConfirmButton: false,
                timer: 2000
              });
            console.log("Wrong Email");
        }
    }
    clearInputs();
})

// clear inputs after login
function clearInputs() {
    document.getElementById('inEmailId').value = null;
    document.getElementById('inPassId').value = null;
}