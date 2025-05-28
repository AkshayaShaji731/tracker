import { displayList } from "../scripts/home.js";
import { render, total } from "./create-task-list-table.js";

let userInfo = JSON.parse(localStorage.getItem("user")) || [];
let currentUserEmail = localStorage.getItem("currentUser");
let userIndex = userInfo.findIndex(user => user.email === currentUserEmail);
let dataArray
let completedArray
let historyArray
if (userIndex > -1) {
    dataArray = userInfo[userIndex].dataArray
    completedArray = userInfo[userIndex].completedArray
    historyArray = userInfo[userIndex].historyArray
}
else {
    dataArray = userInfo[userIndex + 1].dataArray
    completedArray = userInfo[userIndex + 1].completedArray
    historyArray = userInfo[userIndex + 1].historyArray
}


const displaylistCon = document.querySelector('.display-content')
const days = document.querySelector('.days')
const timerCon = document.querySelector(".display-timer")
const timeslist = document.querySelector(".times")
// let completedArray = JSON.parse(localStorage.getItem('status')) || [];
const searchInput = document.querySelector(".search")
const searchBtn = document.getElementById("search-btn")


export function displayContent(time, name, desc, tag, date, index, enddate, status) {

    displaylistCon.innerHTML = ` 
      <h3>Task details</h3>
       <table>
         <tr>
           <td>Start Date </td>
           <td>:</td>
           <td id="td-value">${date}</td>
         </tr>
           <tr>
           <td>End Date </td>
           <td>:</td>
           <td id="td-value">${enddate}</td>
         </tr>
           <tr>
           <td>Task Name </td>
           <td>:</td>
           <td id="td-value">${name}</td>
         </tr>
           <tr>
           <td> Description </td>
           <td>:</td>
           <td id="td-value">${desc}</td>
         </tr>
           <tr>
           <td>Tag </td>
           <td>:</td>
           <td id="td-value">${tag}</td>
         </tr>
           <tr>
           <td>Total Time </td>
           <td>:</td>
           <td id="td-value">${time}</td>
         </tr>
         <tr>
           <td>Status</td>
           <td>:</td>
           <td class="status-text" id="td-value">${status}</td>
         </tr>
       </table>
       <button class="submit">Finished</button>`
    let endDate
    document.querySelector('.submit').addEventListener("click", () => {


        document.querySelector(".status-text").innerText = "Completed"
        endDate = new Date().toISOString().split('T')[0];
        // console.log(dataArray)
        dataArray[index].endDate = endDate
        dataArray[index].status = "completed"
        // localStorage.setItem("user", JSON.stringify(userInfo));
        for (let i = 0; i < dataArray.length; i++) {
            let status = dataArray[i].status
            if (status == "completed") {
                completedArray.push(dataArray[i])
                // localStorage.setItem("user", JSON.stringify(userInfo));
            }
        }
        // console.log(dataArray)
        render(dataArray)
        localStorage.setItem("user", JSON.stringify(userInfo));
        // setTimeout(location.reload,)
        // window.location.reload()

    })
    if (status == "completed") {
        document.querySelector('.submit').remove()

    }
}
export function numberOfDays(numDays) {
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
export function timer(index) {

    timerCon.innerHTML = `
    <p id="timer-heading">Timer</p>
   <div class="time-display-con">
     <span class="d-hour">00:</span>
     <span class="d-minute">00:</span>
     <span class="d-second">00</span>
   </div>
   <div class="timer-display-btn"> 
     <button id="d-start-btn">Start</button>
     <button id="d-stop-btn">Stop</button>
   </div>`

    let min = 0
    let sec = 0
    let hour = 0
    var interval;
    let startBtn = document.querySelector('#d-start-btn')
    startBtn.addEventListener("click", () => {
        // console.log("hiii")
        timerStart()
    })

    document.querySelector("#d-stop-btn").addEventListener("click", (e) => {
        listOfTime(index)
        render(dataArray)
        e.preventDefault()
        clearInterval(interval)
        let time = {
            hour: hour,
            min: min,
            second: sec
        }

        let data = dataArray[index]
        let hisData = historyArray.find(user => user.name == data.name)

        let taskTime = data.time
        taskTime.push(time);
        let hisTaskTime=hisData.time
        hisTaskTime.push(time)

        let totalTime = total(taskTime)
        data.totalTaskTime = totalTime
        hisData.totalTaskTime = totalTime

        localStorage.setItem("user", JSON.stringify(userInfo));

        let dailydata = daily()


        render(dataArray)

        minute.innerHTML = "00:"
        hours.innerHTML = "00:"
        second.innerHTML = "00"

        min = 0
        sec = 0
        hour = 0

    })

    function timerStart() {
        clearInterval(interval)
        interval = setInterval(startTime, 1000)

        let data = dataArray[index]
        let hisData = historyArray.find(user => user.name == data.name)

        data.status = "Pending"
        hisData.status = "Pending"

        let nowTime = new Date().toLocaleTimeString();
        let currentTime = data.currentTime
        let hiscurrTime = hisData.currentTime
        currentTime.push(nowTime)
        hiscurrTime.push(nowTime)

        let dayArray = data.dateTotal

        let today = new Date().toISOString().split('T')[0];
        let currentDate = data.currentDate
        let hisCurrDate = hisData.currentDate
        currentDate.push(today)
        hisCurrDate.push(today)
        localStorage.setItem("user", JSON.stringify(userInfo));
        startBtn.removeEventListener("click", timerStart)
        startBtn.id = "d-pause-btn"
        startBtn.innerHTML = "Pause"
        startBtn.addEventListener("click", timerPause)
    }
    function timerPause() {
        clearInterval(interval)
        startBtn.removeEventListener("click", timerPause)
        startBtn.innerHTML = "Resume"
        startBtn.addEventListener("click", timerStart)
    }
    let minute = document.querySelector('.d-minute')
    let second = document.querySelector('.d-second')
    let hours = document.querySelector('.d-hour')
    function startTime() {
        sec++
        if (sec < 60) {
            if (sec <= 9) {

                second.innerHTML = "0" + sec

            }
            else if (sec > 9) {
                second.innerHTML = sec
            }
        }
        else if (sec > 60 && min < 59) {
            min += 1
            if (min <= 9) {
                minute.innerHTML = "0" + min + ":"
            }
            else {
                minute.innerHTML = min + ":"
            }
            sec = 0
        }
        else if (sec > 60 && min >= 59) {
            hour += 1
            if (hour <= 9) {
                hours.innerHTML = "0" + hour + ":"
            }
            else {
                hours.innerHTML = hour + ":"
            }
            sec = 0
            min = 0
        }
    }
}

export function listOfTime(index) {

    if (dataArray.length >= 1 && dataArray[index]) {
        timeslist.innerHTML = " "
        // console.log(dataArray[index].time)
        let list = dataArray[index].time
        let nowTime = dataArray[index].currentTime
        let today = dataArray[index].currentDate
        if (nowTime.length >= 1) {
            document.getElementById("time-default").style.display = "none"
        }
        for (let i = 0; i < list.length; i++) {
            let currentDate = today[i]
            let currentTime = nowTime[i]
            let timeData = list[i].hour + ":" + list[i].min + ":" + list[i].second
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
}
export function daily() {
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

            let hisData = historyArray.find(user => user.name == dataArray[i].name)
            hisData.dateTotal = taskArray

            localStorage.setItem("user", JSON.stringify(userInfo));
            array = taskArrayDate
            taskArrayEl = taskArray
        }
        for (let j = 0; j < dataArray.length; j++) {
            let currentTask = dataArray[j].dateTotal;
            for (let k = 0; k < currentTask.length; k++) {
                let task = currentTask[k];
                // console.log(task.date)
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
    // console.log(total)
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
        date: "",
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
            if (tasktotal.seconds >= 59) {
                tasktotal.minute += Math.floor(tasktotal.seconds / 60)
                tasktotal.seconds = tasktotal.seconds % 60
            }

            if (tasktotal.minute >= 59) {
                tasktotal.hour += Math.floor(tasktotal.minute / 60)
                tasktotal.minute = tasktotal.minute % 60
            }

        }
        else {
            if (j > 0) {
                array.push({ ...tasktotal });
            }
            tasktotal = {
                date: date,
                hour: hour,
                minute: min,
                seconds: sec
            };
        }
    }
    array.push({ ...tasktotal });
    let demo = tasktotal.date
    // console.log(array)
    return [array, demo]
}
export function searchTask() {
    let searchArray = []
    searchInput.addEventListener("keypress", (e) => {
        if (e.code == "Enter") {
            search()
        }
    })
    searchBtn.addEventListener("click", search)
}
function search() {
    let dataArray = userInfo[userIndex].dataArray
    let searchArray = []
    if (searchInput.value != "") {
        let searchEl = searchInput.value
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].name == searchEl) {
                searchArray.push(dataArray[i])
            }
        }
        searchInput.value = ""
        if (searchArray.length == 0) {
            alert("it not found")
        }
        render(searchArray)
        searchArray = []
    }
}

// export function displayContentTrack(index, date, name, enddate, time, desc, tag, status, displayHTML) {
//     displayHTML.innerHTML = ` 
//       <h3>Task details</h3>
//        <table>
//          <tr>
//            <td>Start Date </td>
//            <td>:</td>
//            <td>${date}</td>
//          </tr>
//            <tr>
//            <td>End Date </td>
//            <td>:</td>
//            <td>${enddate}</td>
//          </tr>
//            <tr>
//            <td>Task Name </td>
//            <td>:</td>
//            <td>${name}</td>
//          </tr>
//            <tr>
//            <td> Description </td>
//            <td>:</td>
//            <td>${desc}</td>
//          </tr>
//            <tr>
//            <td>Tag </td>
//            <td>:</td>
//            <td>${tag}</td>
//          </tr>
//            <tr>
//            <td>Total Time </td>
//            <td>:</td>
//            <td>${time}</td>
//          </tr>
//          <tr>
//            <td>Status</td>
//            <td>:</td>
//            <td class="status-text">${status}</td>
//          </tr>
//        </table>`
// }
