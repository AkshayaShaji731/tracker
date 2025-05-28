const root = document.getElementById("root")
let userInfo = JSON.parse(localStorage.getItem("user")) || []

root.innerHTML = `
<div id="login-context"></div>
<div id="login-con"></div>
`

const loginContext = document.getElementById("login-context")
const loginIn = document.getElementById("login-con")

loginContext.innerHTML = `
<h3>Welcome to UseTracker</h3>
<p>Make every minute count. Our smart time tracker helps you stay focused, manage tasks, and take control of your productivity.</p>`


loginIn.innerHTML = `
<h3>Welcome to UseTracker</h3>
<h4>Sign In</h4>
<input type="text" placeholder="Email" id="user-name">
<input type="password" placeholder="Password" id="password">
<button id="login-btn">Sign In</button>
<div id="forgot-con">
  <a href="password.html">forgot password</a>
</div>
<p>Don't have an Account?<a href="sign-up.html" id="sign-in-btn">Create</a></p>`

const userId = document.getElementById("user-name")
const password = document.getElementById("password")
document.addEventListener("keypress",(e)=>{
  if(e.code=="Enter"){
    e.preventDefault()
    login()
  }
})
document.getElementById("login-btn").addEventListener("click", login)
function login(){
  if (userId.value =="" || password.value == "") {
    alert("Enter all the fields")
  }
  else {
    let checkId = userInfo.find(user => user.email == userId.value)
    password.style.borderColor = "white"
    userId.style.borderColor = "white"
    if (checkId) {
      let checkPassword = userInfo.find(user => user.password == password.value)
      localStorage.setItem("currentUser", userId.value)
      if (checkPassword) {
        window.location.href = "home.html"
      }
      else {
        alert("Wrong password. Try again")
        password.style.borderColor = "red"
      }
    }
    else {
      alert("Account doesn't Exist")
      userId.style.borderColor = "red"
    }
    userId.value = ""
    password.value = ""
  }
}

