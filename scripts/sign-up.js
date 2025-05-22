const root = document.getElementById("root")

let userInfo=JSON.parse(localStorage.getItem("user")) || []
console.log(userInfo)

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
<button id="login-btn" class="signUp-btn">Sign Up</button>
<a href="sign-in.html" id="sign-up-btn">back</a>
`

const signUpBtn = document.querySelector('.signUp-btn')

signUpBtn.addEventListener("click", () => {
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    let user={
        name:name.value,
        email:email.value,
        password:password.value,
        dataArray:[],
        historyArray:[],
        completedArray:[],
        mergeArray:[]
    }
    let userInfo=JSON.parse(localStorage.getItem("user")) || [];
    userInfo.push(user)
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem("currentUser", email.value)
    userInfo=JSON.parse(localStorage.getItem("user")) || [];
    console.log(userInfo)

})