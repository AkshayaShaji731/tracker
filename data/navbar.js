export function createNavBar(){
  let navBar = document.querySelector('.nav-container')
    const nav=`
    <div class="nav-inner-con">
            <div class="logo">
                <a href="../index.html">TimeTracker</a>
              </div>
              <nav>
                <ul class="nav-tag">
                  <li class="home"><a href="home.html">Home</a></li>
                  <li class="tracking"><a href="tracking.html">Tracking Table</a></li>
                  <li class="summary"><a href="summary.html">Daily Summary</a></li>
                  <li class="history"><a href="history.html">History</a></li>
                </ul>
              </nav>
        </div>
    `
    navBar.innerHTML=nav
}

const menuBar=document.querySelector('.menu-bar')
const nav=document.querySelector('.nav-list')
export function navBarMob(){
  let open="active" 
menuBar.addEventListener('click',()=>{
    if(open=="active"){
        nav.style.display="block"
    nav.innerHTML=`
       <nav>
         <ul class="nav-tag">
            <li class="home"><a href="home.html">Home</a></li>
            <li class="tracking"><a href="tracking.html">Tracking Table</a></li>
            <li class="summary"><a href="summary.html">Daily Summary</a></li>
            <li class="history"><a href="history.html">History</a></li>
         </ul>
       </nav>`
       open="inactive"
    }
    else{
        open="active"
        nav.style.display="none"
    }
})
}