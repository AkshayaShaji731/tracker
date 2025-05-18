import { createNavBar, navBarMob } from "../data/navbar.js";
import { weekGraph } from "../data/weekly-graph-grid.js";
// import { createWeekGraph } from "../data/weekly-graph.js";
createNavBar()
navBarMob()
weekGraph()
// createWeekGraph()

let dataArray = JSON.parse(localStorage.getItem('task')) || [];
let completedArray = JSON.parse(localStorage.getItem('status')) || [];

const pendindMobCon=document.querySelector(".display-task-pending")
const completedMobCon=document.querySelector(".display-task-completed")
const tablePending = document.querySelector('.task-table-pending')
const tableCompleted=document.querySelector('.task-table-completed')
const displayPendingCon = document.querySelector('.display-pending')
const displayCompletedCon=document.querySelector('.display-completed')
const days = document.querySelector('.days')
const timerCon = document.querySelector(".display-timer")
const timespending = document.querySelector(".times-pending")
const timescompleted=document.querySelector(".times-completed")
const prevWeekBtn = document.querySelector(".prev-week")
const currWeekBtn = document.querySelector(".current-week")
displayTracking()
function displayTracking() {
    for (let i = 0; i < dataArray.length; i++) {
        let sNum = i + 1
        let getDate = dataArray[i].date
        let getName = dataArray[i].name
        let getTime = dataArray[i].totalTaskTime
        let endDate = dataArray[i].endDate
        let getDescription = dataArray[i].description
        let getStatus = dataArray[i].status
        let getTag = dataArray[i].tag
        if (endDate == undefined) {
            endDate = "--"
        }
        else {
            endDate = dataArray[i].endDate
        }
        let time
        if (getTime == '') {
            time = "00:00:00"
        }
        else {
            time = getTime.hour + ":" + getTime.min + ":" + getTime.sec
        }
        document.querySelector(".display-pending-con").style.display = "none"
        pendingTask(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time)
        trackingPendingMob(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time)
    }
    for (let i = 0; i < completedArray.length; i++) {
        let sNum = i + 1
        let getDate = completedArray[i].date
        let getName = completedArray[i].name
        let getTime = completedArray[i].totalTaskTime
        let endDate = completedArray[i].endDate
        let getDescription = completedArray[i].description
        let getStatus = completedArray[i].status
        let getTag = completedArray[i].tag
        if (endDate == undefined) {
            endDate = "--"
        }
        else {
            endDate = completedArray[i].endDate
        }
        let time
        if (getTime == '') {
            time = "00:00:00"
        }
        else {
            time = getTime.hour + ":" + getTime.min + ":" + getTime.sec
        }
        document.querySelector(".display-completed-con").style.display = "none"
        completedTask(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time)
        trackingCOmpletedMob(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time)
    }
}

function pendingTask(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time) {
    const taskRow = document.createElement("tr")
    taskRow.innerHTML = `
     <td id="s-no">${sNum}</td>
     <td id="t-date">${getDate}</td>
     <td id="t-desc">${endDate}</td>
     <td id="t-name">${getName}</td>
     <td id="timer"></td>
     <td id="t-btn">
     <button class="details">Details</button>
     </td>
   `
    tablePending.appendChild(taskRow)
    const displayTimer = taskRow.querySelector("#timer")
    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }
    taskRow.querySelector(".details").addEventListener("click", () => {

        document.querySelector(".display-pending-con").style.display = "block"
        document.querySelector(".time-list").style.display="block"
        let array=dataArray[sNum-1]
        displayContentTrack(sNum, getDate, getName, endDate, time, getDescription, getTag, getStatus,displayPendingCon)
        timercloseData(array,timespending)
        getNumDays(array)
    }
    )

}
function completedTask(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time){
    const taskRow = document.createElement("tr")
    taskRow.innerHTML = `
     <td id="s-no">${sNum}</td>
     <td id="t-date">${getDate}</td>
     <td id="t-name">${endDate}</td>
     <td id="t-desc">${getName}</td>
     <td id="timer"></td>
     <td id="t-btn">
     <button class="details">Details</button>
     </td>
   `
    tableCompleted.appendChild(taskRow)
    const displayTimer = taskRow.querySelector("#timer")
    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }
    taskRow.querySelector(".details").addEventListener("click", () => {

        document.querySelector(".display-completed-con").style.display = "block"
        let array=completedArray[sNum-1]
        displayContentTrack(sNum, getDate, getName, endDate, time, getDescription, getTag, getStatus,displayCompletedCon)
        timercloseData(array,timescompleted)
        getNumDays(array)
    }
    )

}

function displayContentTrack(index, date, name, enddate, time, desc, tag, status,displayHTML) {
    displayHTML.innerHTML = ` 
      <h3>Task details</h3>
       <table>
         <tr>
           <td>Start Date </td>
           <td>:</td>
           <td>${date}</td>
         </tr>
           <tr>
           <td>End Date </td>
           <td>:</td>
           <td>${enddate}</td>
         </tr>
           <tr>
           <td>Task Name </td>
           <td>:</td>
           <td>${name}</td>
         </tr>
           <tr>
           <td> Description </td>
           <td>:</td>
           <td>${desc}</td>
         </tr>
           <tr>
           <td>Tag </td>
           <td>:</td>
           <td>${tag}</td>
         </tr>
           <tr>
           <td>Total Time </td>
           <td>:</td>
           <td>${time}</td>
         </tr>
         <tr>
           <td>Status</td>
           <td>:</td>
           <td class="status-text">${status}</td>
         </tr>
       </table>`
}

function timercloseData(index,timeslist){
    timeslist.innerHTML=""
    let  time=index.time
    let today=index.currentDate
    let nowTime=index.currentTime
    if (nowTime.length >= 1) {
        document.getElementById("time-default").style.display = "none"
    }
    for (let i = 0; i < time.length; i++) {
        let currentDate=today[i]
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


// mobile view
function trackingPendingMob(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time){
    const taskDiv=document.createElement("div");
    taskDiv.classList.add('task-div')
    taskDiv.innerHTML=`
    <div class="date-name">
      <h3>${sNum}.</h3> 
      <h3> ${getName}</h3>
        <p>${getDate}</p>
    </div>    
   <div class="btn-time">
    <div id="btn">
    <button class="details">Details</button>
     </div>
     <p id="timer"></p>
    </div> `
    
    pendindMobCon.appendChild(taskDiv)

    const deleteBtn = taskDiv.querySelector('.details')
    const displayTimer = taskDiv.querySelector("#timer")
    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }
    taskDiv.querySelector(".details").addEventListener("click", () => {

        document.querySelector(".display-pending-con").style.display = "block"
        let array=dataArray[sNum-1]
        displayContentTrack(sNum, getDate, getName, endDate, time, getDescription, getTag, getStatus,displayPendingCon)
        timercloseData(array,timespending)
        getNumDays(array)
    }
    )
}
function trackingCOmpletedMob(sNum, getDate, getName, endDate, getTime, getDescription, getTag, getStatus, time){
    const taskDiv=document.createElement("div");
    taskDiv.classList.add('task-div')
    taskDiv.innerHTML=`
    <div class="date-name">
      <h3>${sNum}.</h3> 
      <h3> ${getName}</h3>
        <p>${getDate}</p>
    </div>    
   <div class="btn-time">
    <div id="btn">
    <button class="details">Details</button>
     </div>
     <p id="timer"></p>
    </div> `
    
    completedMobCon.appendChild(taskDiv)

    const deleteBtn = taskDiv.querySelector('.details')
    const displayTimer = taskDiv.querySelector("#timer")
    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }
    taskDiv.querySelector(".details").addEventListener("click", () => {

        document.querySelector(".display-completed-con").style.display = "block"
        let array=completedArray[sNum-1]
        displayContentTrack(sNum, getDate, getName, endDate, time, getDescription, getTag, getStatus,displayCompletedCon)
        timercloseData(array,timescompleted)
        getNumDays(array)
    }
    )
}



