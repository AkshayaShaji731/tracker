import { createNavBar, navBarMob } from "../data/navbar.js";
// import { graph } from "../data/yearly-grid-graph.js";
const tableList = document.querySelector('.history-table')
const taskList = document.querySelector('.display-task')
const clearBtn=document.getElementById("clear-btn")


createNavBar()
navBarMob()
// graph()
let userInfo = JSON.parse(localStorage.getItem("user")) || [];
let currentUserEmail = localStorage.getItem("currentUser");
let userIndex = userInfo.findIndex(user => user.email === currentUserEmail);
let historyArray = userInfo[userIndex].historyArray

clearBtn.addEventListener("click",()=>{
    userInfo[userIndex].dataArray=[]
    userInfo[userIndex].completedArray=[]
    userInfo[userIndex].historyArray=[]
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.reload()
})

historyDisplay()
function historyDisplay() {
    for (let i = 0; i < historyArray.length; i++) {
        let sNum = i + 1
        let getDate = historyArray[i].date
        let getName = historyArray[i].name
        let getDescription = historyArray[i].description
        let getTag = historyArray[i].tag
        let endDate = historyArray[i].endDate
        let getStatus = historyArray[i].status
        if (endDate == undefined) {
            endDate = "--"
        }
        else {
            endDate = historyArray[i].endDate
        }

        let getTime = historyArray[i].totalTaskTime

        if (getDescription == '') {
            getDescription = "---"
        }
        else {
            getDescription = historyArray[i].description
        }
        if (getTag == '') {
            getTag = "--"
        }
        else {
            getTag = historyArray[i].tag

        }
        let time
        if (getTime == '') {
            time = "00:00:00"
        }
        else {
            time = getTime.hour + ":" + getTime.min + ":" + getTime.sec
        }
        createHistory(getDate, getTag, getDescription, getName, sNum, i, getTime, endDate, getStatus, time)
        createHistoryMob(getDate, getTag, getDescription, getName, sNum, i, getTime, endDate, getStatus, time)
    }
}
function createHistoryMob(getDate, getTag, getDescription, getName, sNum, i, getTime, endDate, getStatus, time) {
    clearBtn.style.display="block"
    const taskDiv = document.createElement("div");
    taskDiv.classList.add('task-div')
    taskDiv.innerHTML = `
    <div class="date-name">
      <h3>${sNum}.</h3> 
      <h3> ${getName}</h3>
        <p>${getDate}</p>
    </div>    
    <p>${getDescription}</p>
   <div class="btn-time">
    <div id="btn">
     <button class="details-btn">Details</button>
     </div>
      <p id="timer"></p>
    </div> `

    taskList.appendChild(taskDiv)

    const displayTimer = taskDiv.querySelector("#timer")

    // <button class="delete-btn">Delete</button>
    // const deleteBtn = taskDiv.querySelector('.delete-btn')
    const detailsBtn = taskDiv.querySelector('.details-btn')

    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }


    // deleteBtn.addEventListener("click", (e) => {
    //     taskDiv.remove()

    //     historyArray.splice(i, 1);
    //     localStorage.setItem("user", JSON.stringify(userInfo));

    // })

    detailsBtn.addEventListener("click", () => {
        document.querySelector(".display-pending-con").style.display = "block"
        let arr = historyArray[sNum - 1]
        displayContentTrack(getDate, getTag, getDescription, getName, sNum, i, getTime, endDate, getStatus, time)
        timercloseData(arr)

    })
}
function createHistory(getDate, getTag, getDescription, getName, sNum, i, getTime, endDate, getStatus, time) {
    const taskRow = document.createElement("tr")
    taskRow.innerHTML = `
     <td id="s-no">${sNum}</td>
     <td id="t-date">${getDate}</td>
     <td>---</td>
     <td id="t-name">${getName}</td>
     <td id="t-desc">${getDescription}</td>
     <td id="t-tag">${getTag}</td>
     <td id="timer"></td>
     <td id="t-btn">
     <button class="delete-btn">Delete</button>
     <button class="details-btn">Details</button>
     </td>
   `
    tableList.appendChild(taskRow)

    const displayTimer = taskRow.querySelector("#timer")
    const deleteBtn = taskRow.querySelector('.delete-btn')
    const detailsBtn = taskRow.querySelector('.details-btn')

    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }


    deleteBtn.addEventListener("click", (e) => {
        taskRow.remove()
        historyArray.splice(i, 1);
        localStorage.setItem("user", JSON.stringify(userInfo));
    })

    detailsBtn.addEventListener("click", () => {
        document.querySelector(".display-pending-con").style.display = "block"
        document.querySelector(".time-list").style.display = "block"
        let array = historyArray[sNum - 1]
        displayContentTrack(getDate, getTag, getDescription, getName, sNum, i, getTime, endDate, getStatus, time)
        getNumDays(array)
        timercloseData(array)
    })
}

const displayHTML = document.querySelector('.display-pending')
const timeslist = document.querySelector(".times-pending")
const days = document.querySelector('.days')

function displayContentTrack(getDate, getTag, getDescription, getName, sNum, i, getTime, endDate, getStatus, time) {
    displayHTML.innerHTML = ` 
      <h3>Task details</h3>
       <table>
         <tr>
           <td>Start Date </td>
           <td>:</td>
           <td>${getDate}</td>
         </tr>
           <tr>
           <td>End Date </td>
           <td>:</td>
           <td>${endDate}</td>
         </tr>
           <tr>
           <td>Task Name </td>
           <td>:</td>
           <td>${getName}</td>
         </tr>
           <tr>
           <td> Description </td>
           <td>:</td>
           <td>${getDescription}</td>
         </tr>
           <tr>
           <td>Tag </td>
           <td>:</td>
           <td>${getTag}</td>
         </tr>
           <tr>
           <td>Total Time </td>
           <td>:</td>
           <td>${time}</td>
         </tr>
         <tr>
           <td>Status</td>
           <td>:</td>
           <td class="status-text">${getStatus}</td>
         </tr>
       </table>`
}
function timercloseData(index) {
    timeslist.innerHTML = ""
    let time = index.time
    let today = index.currentDate
    let nowTime = index.currentTime
    if (nowTime.length >= 1) {
        document.getElementById("time-default").style.display = "none"
    }
    for (let i = 0; i < time.length; i++) {
        let currentDate = today[i]
        let currentTime = nowTime[i]
        let timeData = time[i].hour + ":" + time[i].min + ":" + time[i].second
        let times = document.createElement("tr")
        times.innerHTML = `
           <tr>
            <td>${currentDate}</td>
            <td>${currentTime}</td>
            <td>${timeData}</td>
           </tr>`

        timeslist.appendChild(times)
    }
}

function getNumDays(data){
    let num=0;
    let count
    let days=data.currentDate
    for(let i=0;i<days.length;i++){
        count=1
        let day=days[num]
        if(day==days[i]){
            continue
        }
        else{
            count++
        }
    }
    numberOfDays(count)
}

function numberOfDays(numDays) {
    if (numDays == "") {
        days.innerHTML = `
        <h3>0</h3>
        <p>Number of days</p>`
    }
    else {
        days.innerHTML = `
        <h3>${numDays}</h3>
        <p>Number of days</p>`
    }

}
