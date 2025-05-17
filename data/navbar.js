export function createNavBar(){
  let navBar = document.querySelector('.nav-container')
    const nav=`
    <div class="nav-inner-con">
            <div class="logo">
                <a href="../index.html">TimeTracker</a>
              </div>
              <nav>
                <ul class="nav-tag">
                  <li class="home">
                    <a href="home.html" title="Home">
                       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                    </a>
                  </li>
                  <li class="tracking">
                    <a href="tracking.html" title="Tracking Table">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/></svg>
                    </a>
                  </li>
                  <li class="summary">
                    <a href="summary.html" title="Daily Summary">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M320-600q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm0 160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0 160q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h440l200 200v440q0 33-23.5 56.5T760-120H200Zm0-80h560v-400H600v-160H200v560Zm0-560v160-160 560-560Z"/></svg>
                    </a>
                  </li>
                  <li class="history">
                    <a href="history.html" title="History">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M160-200v-440 440-15 15Zm0 80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-18-13-38-22.5T800-508v-132H160v440h283q3 21 9 41t15 39H160Zm240-600h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm20-208v-112h-40v128l86 86 28-28-74-74Z"/></svg>
                    </a>
                  </li>
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