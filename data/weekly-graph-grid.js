const root = document.querySelector(".root")
const outerCon = document.querySelector(".outer-con")
let userInfo = JSON.parse(localStorage.getItem("user")) || [];
let currentUserEmail = localStorage.getItem("currentUser");
let userIndex = userInfo.findIndex(user => user.email === currentUserEmail);
let dataArray = userInfo[userIndex].dataArray
let completedArray = userInfo[userIndex].completedArray

export function weekGraph() {
  let data = week()
  let y = graph()
  let checkY = y.map(function (e) {
    if (e === undefined || Number.isNaN(e)) {
      return 0;
    } else {
      return e;
    }
  });

  let maxValue = Math.max(...checkY);
  let col = Math.floor(maxValue);
  let x = [0, 1, 2, 3, 4, 5, 6]
  let dateEl = formatDateArray(data)
  // <div class="index-container"></div>
  outerCon.innerHTML = `
    <p id="index"> hours<p>
       <div class="container"></div>
       <div class="date-container"></div>
       `
  // const indexCon = root.querySelector('.index-container')
  const container = root.querySelector('.container')
  const dateCon = root.querySelector(".date-container")

  // for (let i = col + 3; i > 0; i--) {
  //     const index = document.createElement("div")
  //     index.classList.add("index")
  //     index.innerText = i+"hr"
  //     indexCon.appendChild(index)
  // }
  for (let i = 0; i < col + 3; i++) {
    let col = document.createElement("div")
    col.classList.add("col")
    for (let j = 1; j <= 7; j++) {
      let row = document.createElement("div")
      row.classList.add("row")
      col.appendChild(row)
    }
    container.appendChild(col)
  }

  for (let j = 0; j < y.length; j++) {
    let num = Math.floor(y[j])
    let decimal = Math.abs(y[j] - num)
    for (let i = num - 1; i >= 0; i--) {
      let column = root.querySelectorAll(".col")
      let pointCol = column[i]
      let row = pointCol.querySelectorAll(".row")
      let pointRow = row[j]
      pointRow.style.backgroundColor = "blue"
    }
    if (decimal > 0) {
      let column = root.querySelectorAll(".col")
      let pointCol = column[num]
      let row = pointCol.querySelectorAll(".row")[x[j]]

      const fill = document.createElement("div")
      fill.style.position = "absolute"
      fill.style.bottom = "0"
      fill.style.left = "0"
      fill.style.width = "100%"
      fill.style.height = `${decimal * 100}%`
      fill.style.backgroundColor = "blue"

      row.style.position = "relative"
      row.appendChild(fill)
    }
  }

  for (let i = 0; i < 7; i++) {
    const date = document.createElement("div")
    date.classList.add("date")
    date.innerText = dateEl[i]
    dateCon.appendChild(date)
    // date.addEventListener("mouseover",(e)=>{
    //   let value=e
    //   console.log(value)
    // })
  }
  // const date =document.querySelectorAll(".date")
  // date.forEach(e => {
  //   e.addEventListener("mouseover",()=>{
  //     console.log(indexOf(e))
  //   })
  // });

  const date = document.querySelectorAll(".date");
  const array = Array.from(date); 

  array.forEach(e => {
    e.addEventListener("mouseover", () => {
      let index=array.indexOf(e)
      let sec=y[index]*360
      let min=0
      let hour=0
      if(sec>59){
       min +=sec/60
       sec=sec%60
      }
      if(min>59){
        hour +=min/60
        min=min%60
       }
      e.title=`${hour}hr ${min}min ${sec}sec`
    });
  });
}

let curr = new Date()
function week() {
  let week = []
  const currentDate = new Date(curr);
  for (let i = 1; i <= 7; i++) {
    let first = currentDate.getDate() - currentDate.getDay() + i
    let day = new Date(currentDate.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
  }
  return week
}

const prevWeekBtn = document.querySelector(".prev-week")
const currWeekBtn = document.querySelector(".current-week")

prevWeekBtn.addEventListener("click", () => {
  prevWeekBtn.style.backgroundColor = "darkblue"
  prevWeekBtn.style.color = "white"
  currWeekBtn.style.backgroundColor = "white"
  currWeekBtn.style.color = "black"
  curr = new Date
  curr.setDate(curr.getDate() - 7);
  weekGraph()
})

currWeekBtn.addEventListener("click", () => {
  currWeekBtn.style.backgroundColor = "darkblue"
  currWeekBtn.style.color = "white"
  prevWeekBtn.style.backgroundColor = "white"
  prevWeekBtn.style.color = ""
  curr = new Date
  weekGraph()
})

currWeekBtn.style.backgroundColor = "darkblue"
currWeekBtn.style.color = "white"

function graph() {
  let graphObj = {
    date: "",
    time: ""
  }
  let dateArray = []
  let min
  let sec
  let hour
  let total = {
    hour: 0,
    minute: 0,
    seconds: 0
  }
  let graphData = []
  let array = [...dataArray, ...completedArray]

  for (let i = 0; i < array.length; i++) {
    let demodate = array[i].currentDate
    let uniq = [...new Set(demodate)]
    dateArray.push(...uniq)
    dateArray = [...new Set(dateArray)]

  }

  for (let d = 0; d < dateArray.length; d++) {
    for (let k = 0; k < array.length; k++) {

      let dayTotal = array[k].dateTotal

      for (let j = 0; j < dayTotal.length; j++) {
        let task = dayTotal[j];
        if (task.date == dateArray[d]) {
          hour = task.hour;
          min = task.minute;
          sec = task.seconds;
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
      graphObj.date = dateArray[d]
      graphObj.time = total
    }
    graphData.push(graphObj)
    graphObj = {
      date: "",
      time: ""
    }
    total = {
      hour: 0,
      minute: 0,
      seconds: 0
    }
  }
  let weekArray = week()
  let totalSec
  let graphPoints = []
  let pointedData = []
  for (let l = 0; l < weekArray.length; l++) {
    for (let m = 0; m < graphData.length; m++) {
      if (weekArray[l] == graphData[m].date) {
        let points = graphData[m].time
        let hour = points.hour
        let min = points.minute / 60
        let sec = points.seconds / 360
        totalSec = hour + min + sec
        break
      }
      else {
        totalSec = 0
        continue
      }
    }
    graphPoints.push(totalSec)
  }
  return graphPoints
}
function formatDateArray(inputDates) {
  return inputDates.map(inputDate => {
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  });
}
