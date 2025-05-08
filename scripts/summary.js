import { createNavBar, navBarMob } from "../data/navbar.js";
import { createDayGraph } from "../data/daily-graph.js";
createNavBar()
navBarMob()


let dataArray = JSON.parse(localStorage.getItem('task')) || [];
const mainCont = document.querySelector(".main-container")
const dayTask = document.querySelector(".daily-task")
const Active = document.querySelector(".active-task")
const activeTime = document.querySelector(".active-hour")
activeTimeFunction()

taskCreatedToady()
activeTask()
createDayGraph()

function activeTimeFunction() {
    let dayActive = daily()

    activeTime.innerHTML = `Active Time : ${dayActive.hour}:${dayActive.minute}:${dayActive.seconds}`
}

function taskCreatedToady() {
    const date = new Date().toISOString().split('T')[0]

    for (let i = 0; i < dataArray.length; i++) {

        if (date == dataArray[i].date) {
            let taskCon = document.createElement("div")
            taskCon.classList.add("task")
            let time = "00:00:00"
            if (dataArray[i].totalTaskTime == "") {
                time = "00:00:00"
                console.log(time);
            }
            else {
                time = dataArray[i].totalTaskTime.hour + ":" + dataArray[i].totalTaskTime.min + ":" + dataArray[i].totalTaskTime.sec
            }
            taskCon.innerHTML = `
      <h4>${dataArray[i].name}</h4>
      <p>${dataArray[i].description}</p>
      <p>Total Time:${time}</p>
          `
            dayTask.appendChild(taskCon)
        }
    }
}
export function activeTask() {
    let currentDate = new Date().toISOString().split('T')[0]
    let array = []
    for (let i = 0; i < dataArray.length; i++) {
        let dateArray = dataArray[i].dateTotal
        for (let j = 0; j < dateArray.length; j++) {
            if (dateArray[j].date == currentDate) {
                let taskCon = document.createElement("div")
                taskCon.classList.add("task")
                let time = "00:00:00"
                if (dataArray[i].totalTaskTime == "") {
                    time = "00:00:00"
                    console.log(time);
                }
                else {
                    time = dataArray[i].totalTaskTime.hour + ":" + dataArray[i].totalTaskTime.min + ":" + dataArray[i].totalTaskTime.sec
                }
                taskCon.innerHTML = `
                  <h4>${dataArray[i].name}</h4>
                  <p>${dataArray[i].description}</p>
                  <p>Total Time:${time}</p>
                 `
                Active.appendChild(taskCon)
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
    if (dataArray.length >= 1) {
        for (let i = 0; i < dataArray.length; i++) {
            date = dataArray[i].currentDate
            let [taskArray, taskArrayDate] = dailyTask(dataArray[i], currentDate);
            dataArray[i].dateTotal = taskArray
            // console.log(taskArray)
            localStorage.setItem('task', JSON.stringify(dataArray));
            array = taskArrayDate
            taskArrayEl = taskArray
        }
        for (let j = 0; j < dataArray.length; j++) {
            let currentTask = dataArray[j].dateTotal;
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
    // console.log(time)    
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
