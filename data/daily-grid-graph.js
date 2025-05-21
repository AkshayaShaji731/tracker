import { activeTask } from "../scripts/summary.js";

let dataArray = JSON.parse(localStorage.getItem('task')) || [];
const filterInput = document.querySelector(".filter-input")
const filterBtn = document.querySelector(".filter-btn")
const root = document.querySelector(".root")
const outerCon = document.querySelector(".outer-con")

export function weekGraph() {
    let y = daygraph()
    let col = Math.floor(Math.max(...y))
    let x = [0, 1, 2, 3, 4, 5, 6]
    let dateEl =day()
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
        for (let j = 1; j <= dateEl.length; j++) {
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
            let pointRow = row[x[j]]
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

    for (let i = 0; i < dateEl.length; i++) {
        const date = document.createElement("div")
        date.classList.add("date")
        date.innerText = dateEl[i]
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
                let points = arrayEl.hour * 60 + arrayEl.minute + arrayEl.seconds / 60
                array.push(points)
            }
        }
    }
    return array
}
filterBtn.addEventListener("click", () => {
    currentDate = filterInput.value
    weekGraph()
    activeTask(currentDate)
})