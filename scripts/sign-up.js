const root = document.getElementById("root")


root.innerHTML = `
<div id="sign-up"></div>
`
const signUp = document.getElementById("sign-up")

signUp.innerHTML = `
<h3>Welcome to UseTracker</h3>
<h4>Log in</h4>
<input type="text" placeholder="Full Name" id="name">
<input type="text" placeholder="Email" id="email">
<input type="password" placeholder="Password" id="password">
<button id="login-btn">Sign Up</button>
<a href="sign-in.html" id="sign-up-btn">back</a>
`

const signUpBtn = document.getElementById('sign-up-btn')

signUpBtn.addEventListener("click", () => {
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
})