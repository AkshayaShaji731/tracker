import { createNavBar, navBarMob } from "../data/navbar.js";
// import { createDayGraph } from "../data/daily-graph.js";
import { dayGraph } from "../data/daily-grid-graph.js";
createNavBar()
navBarMob()

let userInfo = JSON.parse(localStorage.getItem("user")) || [];
let currentUserEmail = localStorage.getItem("currentUser");
let userIndex = userInfo.findIndex(user => user.email === currentUserEmail);
let dataArray = userInfo[userIndex].dataArray
let completedArray = userInfo[userIndex].completedArray
let historyArray=userInfo[userIndex].historyArray
let arrayLs=[...dataArray,...completedArray]
// console.log(arrayLs)

if (historyArray.length > 0) {
    document.querySelector(".emptyActive").style.display = "none"
    document.querySelector(".emptyList").style.display = "none"
}
const mainCont = document.querySelector(".main-container")
const dayTask = document.querySelector(".daily-task")
const Active = document.querySelector(".active-task")
const activeTime = document.querySelector(".active-hour")

let currentDate = new Date().toISOString().split('T')[0]

activeTimeFunction()

taskCreatedToady()
activeTask(currentDate)
// createDayGraph()
dayGraph()

function activeTimeFunction() {
    let dayActive = daily()
    let hour = dayActive.hour
    let min = dayActive.minute
    let sec = dayActive.seconds
    if (hour < 9) {
        hour = "0" + hour
    }
    if (min < 9) {
        min = "0" + min
    }

    if (sec < 9) {
        sec = "0" + sec
    }


    activeTime.innerHTML = `Active Time : ${hour}:${min}:${sec}`
}

function taskCreatedToady() {
    const date = new Date().toISOString().split('T')[0]

    for (let i = 0; i < historyArray.length; i++) {

        if (date == historyArray[i].date) {
            let taskCon = document.createElement("div")
            taskCon.classList.add("task")
            let time = "00:00:00"
            if (historyArray[i].totalTaskTime == "") {
                time = "00:00:00"
            }
            else {
                time = historyArray[i].totalTaskTime.hour + ":" + historyArray[i].totalTaskTime.min + ":" + historyArray[i].totalTaskTime.sec
            }
            taskCon.innerHTML = `
      <h4>${i + 1} . ${historyArray[i].name}</h4>
      <p>${historyArray[i].description}</p>
      <p>Total Time:${time}</p>
          `
            dayTask.appendChild(taskCon)
        }
    }
}

export function activeTask(currentDate) {
    let array = []
    let num=1
    for (let i = 0; i <arrayLs.length; i++) {
        let dateArray = arrayLs[i].dateTotal
        // console.log(dateArray)
        for (let j = 0; j < dateArray.length; j++) {
            if (dateArray[j].date == currentDate) {
                let taskCon = document.createElement("div")
                taskCon.classList.add("task")
                let time = "00:00:00"
                if (historyArray[i].totalTaskTime == "") {
                    time = "00:00:00"
                }
                else {
                    time = arrayLs[i].totalTaskTime.hour + ":" + arrayLs[i].totalTaskTime.min + ":" +arrayLs[i].totalTaskTime.sec
                }
                taskCon.innerHTML = `
                  <h4>${num} . ${arrayLs[i].name}</h4>
                  <p>${arrayLs[i].description}</p>
                  <p>Total Time:${time}</p>
                 `
                Active.appendChild(taskCon)
                num++
            }
        }
    }


}

 function daily() {
    let array
    let date
    let time
    let hour
    let min
    let sec
    let currentDate = new Date().toISOString().split('T')[0];
    let total = {
        hour: 0,
        minute: 0,
        seconds: 0
    }
    let taskArrayEl
    if (historyArray.length >= 1) {
        for (let i = 0; i < historyArray.length; i++) {
            date = historyArray[i].currentDate
            let [taskArray, taskArrayDate] = dailyTask(historyArray[i], currentDate);
            historyArray[i].dateTotal = taskArray
            localStorage.setItem("user", JSON.stringify(userInfo));
            array = taskArrayDate
            taskArrayEl = taskArray
        }
        for (let j = 0; j < historyArray.length; j++) {
            let currentTask = historyArray[j].dateTotal;
            for (let k = 0; k < currentTask.length; k++) {
                let task = currentTask[k];
                if (task.date == currentDate) {
                    hour = currentTask[k].hour;
                    min = currentTask[k].minute;
                    sec = currentTask[k].seconds;

                    total.hour += hour;
                    total.minute += min;
                    total.seconds += sec;

                    if (total.seconds >= 60) {
                        total.minute += Math.floor(total.seconds / 60);
                        total.seconds = total.seconds % 60;
                    }

                    if (total.minute >= 60) {
                        total.hour += Math.floor(total.minute / 60);
                        total.minute = total.minute % 60;
                    }
                }
            }
        }
    }
    return total
}


function dailyTask(dataArray, currentDate) {
    let array = []
    let date
    let time
    let hour
    let min
    let sec
    let tasktotal = {
        date: currentDate,
        hour: 0,
        minute: 0,
        seconds: 0
    }
    date = dataArray.currentDate
    time = dataArray.time  
    for (let j = 0; j < time.length; j++) {

        hour = time[j].hour
        min = time[j].min
        sec = time[j].second

        if (date[j] == date[j - 1]) {
            tasktotal.hour += hour
            tasktotal.minute += min
            tasktotal.seconds += sec
            tasktotal.date = date[j]
            if (tasktotal.seconds >= 60) {
                tasktotal.minute += Math.floor(tasktotal.seconds / 60)
                tasktotal.seconds = tasktotal.seconds % 60
            }

            if (tasktotal.minute >= 60) {
                tasktotal.hour += Math.floor(tasktotal.minute / 60)
                tasktotal.minute = tasktotal.minute % 60
            }

        }
        else {
            if (j > 0) {
                array.push({ ...tasktotal });
            }
            tasktotal = {
                date: date[j],
                hour: hour,
                minute: min,
                seconds: sec
            };
        }
    }
    array.push({ ...tasktotal });
    let demo = tasktotal.date
    return [array, demo]
}
