const root = document.getElementById("root")

let userInfo = JSON.parse(localStorage.getItem("user")) || []

root.innerHTML = `
<div id="sign-up"></div>
`
const signUp = document.getElementById("sign-up")

signUp.innerHTML = `
<h3>Change the user Password</h3>
<input type="text" placeholder="Email" id="email">
<input type="password" placeholder="Password" id="password">
<input type="password" placeholder="Confirm Password" id="con-password">
<button id="login-btn" class="pass-change">Change</button>
<a href="sign-in.html" id="sign-up-btn">back</a>
`

const changeBtn = document.querySelector('.pass-change')
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("password")

document.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        e.preventDefault()
        passwordChange()
    }
})
changeBtn.addEventListener("click",passwordChange)
function passwordChange(){
    if (email.value=="" || password.value=="" || confirmPassword.value==""  ) {
      alert("Enter all the fields")
    }
    else {
      let checkId = userInfo.find(user => user.email == email.value)
      if (checkId) {
      if(password.value==confirmPassword.value){
        let userIndex = userInfo.findIndex(user => user.email === checkId.email);
        userInfo[userIndex].password=password.value
        localStorage.setItem('user', JSON.stringify(userInfo));
        alert("Password changed successfully!")
        window.location.href = "sign-in.html"
      }
      }
      else {
        alert("Enter the correct email")
        userId.style.borderColor = "red"
      }
      email.value = ""
      password.value = ""
      confirmPassword.value=""
    }
  }
  
  
function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
}
function isStrongPassword(password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return pattern.test(password);
  }