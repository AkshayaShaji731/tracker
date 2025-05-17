import { createNavBar,navBarMob } from "../data/navbar.js";
const tableList = document.querySelector('table')
const taskList=document.querySelector('.display-task')

createNavBar()
navBarMob()
let dataArray = JSON.parse(localStorage.getItem('task')) || [];


let historyArray = JSON.parse(localStorage.getItem('history')) || [];
createHistoryLs()

function createHistoryLs() {
    for (let i = 0; i < dataArray.length; i++) {
        let check = false
        for (let j = 0; j < historyArray.length; j++) {
            if (historyArray[j].name == dataArray[i].name && historyArray[j].date == dataArray[i].date) {
                check = true
                break
            }

        }
        if (check==false) {
            historyArray.push(dataArray[i])
        }
    }
    localStorage.setItem('history', JSON.stringify(historyArray));
    // dataSort
    historyArray.sort(function(a,b){return new Date( a.date) -new Date(b.date)})
}

historyDisplay()
function historyDisplay() {
    for (let i = 0; i < historyArray.length; i++) {
        let sNum = i + 1
        let getDate = historyArray[i].date
        let getName = historyArray[i].name
        let getDescription = historyArray[i].description
        let getTag = historyArray[i].tag

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
        createHistory(getDate, getTag, getDescription, getName, sNum, i, getTime)
        createHistoryMob(getDate, getTag, getDescription, getName, sNum, i, getTime)
    }
}
function createHistoryMob(getDate, getTag, getDescription, getName, sNum, i, getTime){
    const taskDiv=document.createElement("div");
    taskDiv.classList.add('task-div')
    taskDiv.innerHTML=`
    <div class="date-name">
      <h3>${sNum}.</h3> 
      <h3> ${getName}</h3>
        <p>${getDate}</p>
    </div>    
    <p>${getDescription}</p>
   <div class="btn-time">
    <div id="btn">
    <button class="delete-btn">Delete</button>
     </div>
      <p id="timer"></p>
    </div> `
    
    taskList.appendChild(taskDiv)

    const displayTimer = taskDiv.querySelector("#timer")
    const deleteBtn = taskDiv.querySelector('.delete-btn')

    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }


    deleteBtn.addEventListener("click", (e) => {
        taskDiv.remove()

        let historyArray = JSON.parse(localStorage.getItem('history') )|| [];
        historyArray.splice(i, 1);
        localStorage.setItem('history', JSON.stringify(historyArray));
        // reload()
        
    })
}
function createHistory(getDate, getTag, getDescription, getName, sNum, i, getTime) {
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
     </td>
   `
    tableList.appendChild(taskRow)

    const displayTimer = taskRow.querySelector("#timer")
    const deleteBtn = taskRow.querySelector('.delete-btn')

    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }


    deleteBtn.addEventListener("click", (e) => {
        taskRow.remove()

        let historyArray = JSON.parse(localStorage.getItem('history') )|| [];
        historyArray.splice(i, 1);
        localStorage.setItem('history', JSON.stringify(historyArray));
        // reload()
        
    })
}
function reload(){
       tableList.innerHTML = `
         <tr>
                  <th id="t-num">s.no</th>
                  <th id="t-date">Start Date</th>
                  <th id="t-date">End Date</th>
                  <th id="t-name">TaskName</th>
                  <th id="t-des">Task Description</th>
                  <th id="t-tag">Task Tag</th>
                  <th id="t-time">Time<th>
                  <th id="t-btn"></th>
                </tr>`
       historyDisplay()
}