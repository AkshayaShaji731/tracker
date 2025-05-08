import { displayContent,timer,listOfTime } from "./display-list-content.js";
import { render } from "./create-task-list-table.js";

const taskTable=document.querySelector(".display-task")
let dataArray = JSON.parse(localStorage.getItem('task')) || [];


export function createlistMob(getDate, getDescription, getName, sNum, i, getTime){
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
     <button class="edit-btn">edit</button>
     <button class="timer-btn">Timer</button>
     <div class="start-stop-btn"></div>
     </div>
     <p id="timer"></p>
    </div> `
    
    taskTable.appendChild(taskDiv)

    const deleteBtn = taskDiv.querySelector('.delete-btn')
    const editBtn = taskDiv.querySelector('.edit-btn')
    const timerEl = taskDiv.querySelector('.timer-btn')
    const startStopBtn = taskDiv.querySelector('.start-stop-btn')
    const displayTimer = taskDiv.querySelector("#timer")
    if (getTime.hour == undefined || getTime.min == undefined || getTime.sec == undefined) {
        displayTimer.innerHTML = "00:00:00"
    }
    else {
        displayTimer.innerHTML = getTime.hour + ":" + getTime.min + ":" + getTime.sec
    }

    deleteBtn.addEventListener("click", (e) => {x
        taskDiv.remove()

        let dataArray = JSON.parse(localStorage.getItem('task')) || [];
        dataArray.splice(i, 1);
        localStorage.setItem('task', JSON.stringify(dataArray));
        render(dataArray)
        
    })

    editBtn.addEventListener("click", (e) => {
        let index =sNum-1
        let data = dataArray[index]

        let nameEl = data.name
        let descEl = data.description


        let nameInput = prompt("Enter the updated name:", nameEl);
        let descInput = prompt("Enter the updated decription:", descEl);

        data.name = nameInput
        data.description = descInput

        localStorage.setItem('task', JSON.stringify(dataArray));
        render(dataArray)
    })

    timerEl.addEventListener('click', (e) => {
        let index=sNum-1
          let time
      
              let timeobj=dataArray[index].totalTaskTime
              if(timeobj==''){
                  time="00:00:00"
              }
              else{
                   time=timeobj.hour+":"+timeobj.min+":"+timeobj.sec
              }
          
              let name=dataArray[index].name
              let desc=dataArray[index].description
              let tag=dataArray[index].tag
              let date=dataArray[index].date
              let endDate=dataArray[index].endDate
              let status=dataArray[index].status

              displayContent(time, name, desc, tag, date, endDate, status)
              timer(index, timeobj)
              listOfTime(index)
    })
}
