const root=document.getElementById("root")


root.innerHTML=`
<div id="sign-up"></div>
`
const signUp=document.getElementById("sign-up")

signUp.innerHTML=`
<h3>Welcome to UseTracker</h3>
<h4>Log in</h4>
<input type="text" placeholder="Full Name">
<input type="text" placeholder="Email ">
<input type="password" placeholder="Password">
<button id="login-btn">Sign Up</button>
<a href="sign-in.html" id="sign-up-btn">back</a>
`