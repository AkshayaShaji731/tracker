const root=document.getElementById("root")


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
<input type="text" placeholder="Email ">
<input type="password" placeholder="Password">
<button id="login-btn">Log In</button>
<div id="forgot-con">
  <a href="">forgot password</a>
</div>
<p>Don't have an Account?<a href="sign-up.html" id="sign-in-btn">Create</a></p>`

document.getElementById("login-btn").addEventListener("click",()=>{
    window.location.href = "home.html";
})