const root = document.getElementById("root")

let userInfo = JSON.parse(localStorage.getItem("user")) || []

root.innerHTML = `
<div id="sign-up"></div>
`
const signUp = document.getElementById("sign-up")

signUp.innerHTML = `
<h3>Welcome to UseTracker</h3>
<h4>Sign Up</h4>
<input type="text" placeholder="Full Name" id="name">
<input type="text" placeholder="Email" id="email">
<input type="password" placeholder="Password" id="password">
<button id="login-btn" class="signUp-btn">Sign Up</button>
<a href="sign-in.html" id="sign-up-btn">back</a>
`

const signUpBtn = document.querySelector('.signUp-btn')
const username = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")

document.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        e.preventDefault()
        signup()
    }
})

signUpBtn.addEventListener("click", signup)
function signup() {
    let user = {
        name: username.value,
        email: email.value,
        password: password.value,
        dataArray: [],
        historyArray: [],
        completedArray: [],
        mergeArray:[]
    }
    if (username.value == " " || email.value == "" || password.value == "") {
        alert('Enter all the fileds')
    }
    else {
        let userInfo = JSON.parse(localStorage.getItem("user")) || [];
        let inputVerify = isValidEmail(email.value)
        if (inputVerify == true) {
            let verify = userInfo.find(user => (user.email == email.value))
            if (verify) {
                alert("Account already created")
                window.location.href = "sign-in.html"
            }
            else {
                userInfo.push(user)
                localStorage.setItem('user', JSON.stringify(userInfo));
                localStorage.setItem("currentUser", email.value)
                userInfo = JSON.parse(localStorage.getItem("user")) || [];
                console.log(userInfo)
                username.value = ""
                email.value = ""
                password.value = ""
                window.location.href = "home.html"
            }
        }
        else{
            alert("Enter the valid email")
        }
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