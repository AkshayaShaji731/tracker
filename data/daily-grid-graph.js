import { activeTask } from "../scripts/summary.js";

// let dataArray = JSON.parse(localStorage.getItem('task')) || [];
let userInfo = JSON.parse(localStorage.getItem("user")) || [];
let currentUserEmail = localStorage.getItem("currentUser");
let userIndex = userInfo.findIndex(user => user.email === currentUserEmail);
let dataArray = [...userInfo[userIndex].dataArray, ...userInfo[userIndex].completedArray]
// console.log(dataArray)
// let completedArray = userInfo[userIndex].completedArray

const filterInput = document.querySelector(".filter-input")
const filterBtn = document.querySelector(".filter-btn")
const root = document.querySelector(".root")
const outerCon = document.querySelector(".outer-con")
const Active = document.querySelector(".active-task")

export function dayGraph() {
    let y = daygraph()
    console.log(y)
    let checkY = y.map(function (e) {
        if (e === undefined || Number.isNaN(e)) {
            return 0;
        } else {
            return e;
        }
    });
    // console.log(checkY)
    let maxValue = Math.max(...checkY);


    let col = Math.floor(maxValue);
    // console.log(maxValue)
    let x = [0, 1, 2, 3, 4, 5, 6]
    let dateEl = day()
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
    //     index.innerText = i
    //     indexCon.appendChild(index)
    // }
    for (let i = 0; i < col + 3; i++) {
        let col = document.createElement("div")
        col.classList.add("col")
        col.style.display = 'grid';
        col.style.gridTemplateColumns = `repeat(${dateEl.length}, 1fr)`
        for (let j = 1; j <= dateEl.length; j++) {
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
            let pointRow = row[x[j]]
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

    for (let i = 0; i < dateEl.length; i++) {
        const date = document.createElement("div")
        date.classList.add("date")
        date.style.display = 'grid';
        date.style.gridTemplateColumns = `repeat(${dateEl.length}, 1fr)`
        date.innerText = `Task ${i+1}`
        dateCon.appendChild(date)
    }
}


let currentDate = new Date().toISOString().split('T')[0];

function day() {
    let array = []
    for (let i = 0; i < dataArray.length; i++) {
        let dateArray = dataArray[i].dateTotal
        for (let j = 0; j < dateArray.length; j++) {
            if (dateArray[j].date == currentDate) {
                array.push(dataArray[i].name)
            }
        }
    }
    // console.log(array)
    return array
}

function daygraph() {
    let array = []
    let date = currentDate
    for (let i = 0; i < dataArray.length; i++) {
        let dateArray = dataArray[i].dateTotal
        for (let j = 0; j < dateArray.length; j++) {
            if (dateArray[j].date == date) {
                let arrayEl = dateArray[j]
                let points = arrayEl.hour  + arrayEl.minute/60 + arrayEl.seconds / 360
                array.push(points)
            }
        }
    }
    return array
}
filterBtn.addEventListener("click", () => {
    currentDate = filterInput.value
    dayGraph()
    console.log(Active)
    Active.innerHTML=""
    activeTask(currentDate)
})