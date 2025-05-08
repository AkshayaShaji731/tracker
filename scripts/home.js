import { createNavBar, navBarMob } from "../data/navbar.js"
import { createLS, createlist, render } from "../data/create-task-list-table.js"
import { createlistMob } from "../data/create-task-list.js"
import { displayContent,timer,listOfTime,searchTask} from "../data/display-list-content.js"

const dateEl = document.querySelector(".date")
const taskBtn = document.querySelector('.add-task-btn')
const task = document.querySelector('.task-list-item')
// const displaylistCon = document.querySelector('.display-content')


let active = "active"


// getDate()
createNavBar()
navBarMob()
let dataArray = JSON.parse(localStorage.getItem('task')) || [];

if (dataArray == "") {
    document.querySelector(".display-con").style.display = "none"
}
if (dataArray.length >= 1) {
    displayList(dataArray)
}

let completedArray = JSON.parse(localStorage.getItem('status')) || [];

taskBtn.addEventListener('click', () => {
    createTask()
})

function getDate() {
    const date = new Date()
    dateEl.innerHTML = date.toDateString()
}


export function createTask() {
    if (active == "active") {
        task.innerHTML = `
        <label for="name">Enter your task</label>
        <input type="text" id="name" placeholder="Enter the task" class="name" required>
        <label for="decription">write Description</label>
        <textarea id="description" placeholder="Description" class="description"></textarea>
        <label for="tag">Give tag</label>
        <textarea type="text" id="tag" placeholder="tag" class="tag"></textarea>
        <button class="task-create-btn" >Create</button>`
        active = "inactive"

        let getDate =new Date().toISOString().split('T')[0]
        console.log(getDate)

        const createBtn = document.querySelector('.task-create-btn')
        const getName = document.getElementById('name')
        const getDescription = document.getElementById('description')
        const getTag = document.getElementById('tag')

        createBtn.addEventListener('click', () => {
            createLS(getName, getDescription, getTag, getDate)
        })
    }
    else {
        task.innerHTML = ""
        active = "active"
    }
}
export function displayList(dataArray) {

    if (dataArray == "") {
        document.querySelector(".display-con").style.display = "none"
    }
    let index = dataArray.length - 1
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
    let endDate = dataArray[index].endDate
    let status = dataArray[index].status
    displayContent(time, name, tag, desc, date, index, endDate, status)

    const day = 24 * 60 * 60 * 1000;
    let today = new Date(endDate)
    let taskdate = new Date(date)
    let numDays
    if (today == "Invalid Date") {
        numDays = "0"
    }
    else {
        numDays = Math.round(Math.abs((today - taskdate) / day))
    }
    // numberOfDays(numDays)
    timer(index, timeobj, status)
    for (let i = 0; i < dataArray.length; i++) {
        let sNum = i + 1
        let getDate = dataArray[i].date
        let getName = dataArray[i].name
        let getDescription = dataArray[i].description
        let getTag = dataArray[i].tag
        let getEndDate = dataArray[i].endDate
        let getStatus = dataArray[i].status

        if (getEndDate == "") {
            getEndDate = "--"
        }
        else {
            getEndDate = dataArray[i].endDate
        }
        let getTime = dataArray[i].totalTaskTime
        let timeArray = dataArray[i].time

        if (getDescription == '') {
            getDescription = "---"
        }
        else {
            getDescription = dataArray[i].description
        }
        if (getTag == '') {
            getTag = "--"
        }
        else {
            getTag = dataArray[i].tag

        }
        listOfTime(index)
        createlist(getDate, getTag, getDescription, getName, sNum, i, getTime, getEndDate, getStatus)
        createlistMob(getDate, getDescription, getName, sNum, i, getTime)
    }
}

searchTask()



