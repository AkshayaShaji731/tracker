const root=document.getElementById("root")
let userInfo=JSON.parse(localStorage.getItem("user")) || []
const currentUserEmail = localStorage.getItem("currentUser");
// console.log(userInfo)


root.innerHTML=`
<div id="login-context"></div>
<div id="login-con"></div>
`

const loginContext=document.getElementById("login-context")
const loginIn=document.getElementById("login-con")

loginContext.innerHTML=`
<h3>Welcome to UseTracker</h3>
<p>Make every minute count. Our smart time tracker helps you stay focused, manage tasks, and take control of your productivity.</p>`


loginIn.innerHTML=`
<h3>Welcome to UseTracker</h3>
<h4>Log in</h4>
<input type="text" placeholder="Email" id="user-name">
<input type="password" placeholder="Password" id="password">
<button id="login-btn">Log In</button>
<div id="forgot-con">
  <a href="">forgot password</a>
</div>
<p>Don't have an Account?<a href="sign-up.html" id="sign-in-btn">Create</a></p>`

const userId=document.getElementById("user-name")
const password=document.getElementById("password")
document.getElementById("login-btn").addEventListener("click",()=>{
    // window.location.href = "home.html";
   let checkId=userInfo.find(user=>user.email==userId.value)

   if(checkId){
    let checkPassword=userInfo.find(user=>user.password==password.value)
    if(checkPassword){
      console.log("verified")
      window.location.href = "home.html"
    }
   }
    
})


