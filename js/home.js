
var userTag = document.getElementById("user");
// variable empty first to store user name after login
var userName = "";
// check if username exists
if(localStorage.getItem("name") != null){
    userName=JSON.parse(localStorage.getItem("name"));
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500
      });
      // Message welcome username in home 
    userTag.innerHTML="Welcome "+ userName
}

