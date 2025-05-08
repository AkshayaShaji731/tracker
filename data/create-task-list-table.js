import { displayList } from "../scripts/home.js";
import { displayContent, timer, listOfTime } from "./display-list-content.js";
const tableList = document.querySelector('.task-table')
const task = document.querySelector('.task-list-item')



let dataArray = JSON.parse(localStorage.getItem('task')) || [];
let completedArray = JSON.parse(localStorage.getItem('status')) || [];
// console.log(completedArray)

export function createlist(getDate, getTag, getDescription, getName, sNum, i, getTime, getEndDate, getStatus) {


    const taskRow = document.createElement("tr")
    taskRow.classList.add('taskrow')
    taskRow.innerHTML = `
     <td id="s-no">${sNum}</td>
     <td id="t-date">${getDate}</td>
     <td id="t-end-date">${getEndDate}</td>
     <td id="t-name">${getName}</td>
     <td id="t-desc">${getDescription}</td>
     <td id="t-tag">${getTag}</td>
     <td id="timer"></td>
     <td id="t-btn">
     <button class="delete-btn">Delete</button>
     <button class="edit-btn">edit</button>
     <button class="timer-btn">Timer</button>
     <div class="start-stop-btn"></div>
     </td>`
    tableList.appendChild(taskRow)

    if (getStatus == "completed") {

        taskRow.remove()

        let dataArray = JSON.parse(localStorage.getItem('task')) || [];
        dataArray.splice(i, 1);
        localStorage.setItem('task', JSON.stringify(dataArray));
        render(dataArray)
    }

    const deleteBtn = taskRow.querySelector('.delete-btn')
    const editBtn = taskRow.querySelector('.edit-btn')
    const timerEl = taskRow.querySelector('.timer-btn')
    const startStopBtn = taskRow.querySelector('.start-stop-btn')
    const displayTimer = taskRow.querySelector("#timer")
    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }

    deleteBtn.addEventListener("click", (e) => {
        taskRow.remove()

        let dataArray = JSON.parse(localStorage.getItem('task')) || [];
        dataArray.splice(i, 1);
        localStorage.setItem('task', JSON.stringify(dataArray));
        render(dataArray)
    })

    editBtn.addEventListener("click", (e) => {
        let row = taskRow.children
        let index = (row[0].innerHTML) - 1
        let data = dataArray[index]

        let nameEl = data.name
        let descEl = data.description
        let tagEl = data.tag

        let nameInput = prompt("Enter the updated name:", nameEl);
        let descInput = prompt("Enter the updated decription:", descEl);
        let tagInput = prompt("Enter the updated tag:", tagEl);

        data.name = nameInput
        data.description = descInput
        data.tag = tagInput

        localStorage.setItem('task', JSON.stringify(dataArray));
        render(dataArray)
    })
    timerEl.addEventListener('click', (e) => {
        let row = taskRow.children
        let index = (row[0].innerHTML) - 1

        let time

        let timeobj = dataArray[index].totalTaskTime
        if (timeobj == '') {
            time = "00:00:00"
        }
        else {
            time = timeobj.hour + ":" + timeobj.min + ":" + timeobj.sec
        }

        let name = dataArray[index].name
        let desc = dataArray[index].description
        let tag = dataArray[index].tag
        let date = dataArray[index].date
        let status = dataArray[index].status
        let endDate = dataArray[index].endDate
        displayContent(time, name, desc, tag, date, index, endDate, status)

        timer(index, timeobj)
        listOfTime(index)
    })
}


export function createLS(getName, getDescription, getTag, getDate) {
    if (getDate.value == '' || getName.value == '') {
        alert("Enter the Date and Name")
    }
    else {
        let data = {
            name: getName.value,
            description: getDescription.value,
            tag: getTag.value,
            date: getDate,
            endDate: "",
            time: [],
            currentTime: [],
            currentDate: [],
            totalTaskTime: "",
            dateTotal: [],
            dailyTotalTime: [],
            status: "Task Created"

        }
        let dataArray = JSON.parse(localStorage.getItem('task')) || [];
        dataArray.push(data);

        localStorage.setItem('task', JSON.stringify(dataArray));
        dataArray = JSON.parse(localStorage.getItem('task') || [])
        render(dataArray)
    }
    getName.value = ""
    getDescription.value = ""
    getTag.value = ""
    // getDate.value = ""
    window.location.reload()
}
const taskTable = document.querySelector(".display-task")

export function render(dataArray) {
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

    taskTable.innerHTML = ``
    displayList(dataArray)

}

export function total(data) {

    let array = data
    let totalHour = 0
    let totalMin = 0
    let totalSec = 0
    for (let i = 0; i < array.length; i++) {
        let timeArray = array[i]
        let timehour = timeArray.hour
        let timemin = timeArray.min
        let timeSec = timeArray.second
        totalHour += timehour
        totalMin += timemin
        totalSec += timeSec;

        if (totalSec >= 59) {
            totalMin += Math.floor(totalSec / 60)
            totalSec = totalSec % 60
        }

        if (totalMin >= 59) {
            totalHour += Math.floor(totalMin / 60)
            totalMin = totalMin % 60
        }
    }
    let totalTaskTIme
    if (totalHour <= 9) {
        totalHour = "0" + totalHour
    }
    if (totalMin <= 9) {
        totalMin = "0" + totalMin
    }
    if (totalSec <= 9) {
        totalSec = "0" + totalSec
    }

    totalTaskTIme = {
        hour: totalHour,
        min: totalMin,
        sec: totalSec
    }
    return totalTaskTIme
}


