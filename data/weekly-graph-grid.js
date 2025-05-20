const root = document.querySelector(".root")
const outerCon = document.querySelector(".outer-con")
let dataArray = JSON.parse(localStorage.getItem('task')) || [];
export function weekGraph() {
    let y = graph()
     let col = Math.floor(Math.max(...y))
    let x = [0, 1, 2, 3, 4, 5, 6]
    // let dateEl = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
    let dateEl=week()
    outerCon.innerHTML = `
       <div class="index-container"></div>
       <div class="container"></div>
       <div class="date-container"></div>
       `
    const indexCon = root.querySelector('.index-container')
    const container = root.querySelector('.container')
    const dateCon = root.querySelector(".date-container")

    for (let i = col + 3; i > 0; i--) {
        const index = document.createElement("div")
        index.classList.add("index")
        index.innerText = i
        indexCon.appendChild(index)
    }
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
        let num=Math.floor(y[j])
        let decimal=Math.abs(y[j]-num)
        for (let i = num- 1; i >= 0; i--) {
            let column = root.querySelectorAll(".col")
            let pointCol = column[i]
            let row = pointCol.querySelectorAll(".row")
            let pointRow = row[j]
            pointRow.style.backgroundColor = "blue"
        }
        if(decimal>0){
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

    // const columns = container.querySelectorAll(".col");
    // for (let j = 0; j < y.length; j++) {
    //     for (let i = 0; i < y[j]; i++) {
    //         const colIndex = columns.length - 1 - i;
    //         const pointCol = columns[colIndex];
    //         const rows = pointCol.querySelectorAll(".row");
    //         const pointRow = rows[j];
    //         pointRow.style.backgroundColor = "blue";
    //     }
    // }

    for (let i = 0; i < 7; i++) {
        const date = document.createElement("div")
        date.classList.add("date")
        date.innerText = dateEl[i]
        dateCon.appendChild(date)
    }
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

// let curr = new Date();

const prevWeekBtn = document.querySelector(".prev-week")
const currWeekBtn = document.querySelector(".current-week")

// let curr = new Date();
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
    // console.log(dataArray)
  
    for (let i = 0; i < dataArray.length; i++) {
      let demodate = dataArray[i].currentDate
      let uniq = [...new Set(demodate)]
      dateArray.push(...uniq)
      dateArray = [...new Set(dateArray)]
  
    }
  
    for (let d = 0; d < dateArray.length; d++) {
      for (let k = 0; k < dataArray.length; k++) {
  
        let dayTotal = dataArray[k].dateTotal
  
        for (let j = 0; j < dayTotal.length; j++) {
          let task = dayTotal[j];
          // let demo = dayTotal[j]
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
    // console.log(graphData)
    let graphPoints = []
    let pointedData = []
    for (let l = 0; l < weekArray.length; l++) {
      for (let m = 0; m < graphData.length; m++) {
        console.log(graphData)
        console.log(weekArray[l],graphData[m])
        if (weekArray[l] == graphData[m].date) {
          let points = graphData[m].time
          let hour = points.hour 
          let min = points.minute/60
          let sec = points.seconds /360
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
    console.log(graphPoints)
    return graphPoints
  }
