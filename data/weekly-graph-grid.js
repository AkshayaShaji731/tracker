// let graphCon = document.querySelector(".graph")
// export function weekly() {
//     const x = 7;
//     const y = 15;
//     for (let i = 0; i < y; i++) {
//         let yDir= y-i
//         if(yDir<=9){
//             yDir="0"+yDir
//         }
//         else{
//             yDir=yDir
//         }
//         let hours = document.createElement("div")
//         hours.className = "col"
//         graphCon.appendChild(hours)
//         let yAxis = document.createElement("div")
//         yAxis.className = "y-axis"
//         yAxis.innerHTML =yDir
//         hours.appendChild(yAxis)

//         for (let j = 0; j < x; j++) {
//             let day = document.createElement("div")
//             day.className = "row-graph"
//             hours.appendChild(day)
//         }
//     }
// }


const root = document.querySelector(".root")
const outerCon = document.querySelector(".outer-con")
export function weekGraph() {
    let y = [4, 3, 4, 2, 0, 6, 9]
    let col = Math.max(...y)
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

    const columns = container.querySelectorAll(".col");
    for (let j = 0; j < y.length; j++) {
        for (let i = 0; i < y[j]; i++) {
            const colIndex = columns.length - 1 - i;
            const pointCol = columns[colIndex];
            const rows = pointCol.querySelectorAll(".row");
            const pointRow = rows[j];
            pointRow.style.backgroundColor = "blue";
        }
    }

    for (let i = 0; i < 7; i++) {
        const date = document.createElement("div")
        date.classList.add("date")
        date.innerText = dateEl[i]
        dateCon.appendChild(date)
    }
}

// let curr = new Date
// function week() {
//     let week = []
//     const currentDate = new Date(curr);
//     for (let i = 1; i <= 7; i++) {
//       let first = currentDate.getDate() - currentDate.getDay() + i
//       let day = new Date(currentDate.setDate(first)).toISOString().slice(0, 10)
//       week.push(day)
//     }
//     return week
//   }

// let curr = new Date();

let curr = new Date();

function week() {
    let week = [];
    const currentDate = new Date(curr);

    for (let i = 1; i <= 7; i++) {
        let first = currentDate.getDate() - currentDate.getDay() + i;
        let date = new Date(currentDate.setDate(first));

        let parts = date.toDateString().split(' '); 
        let month = parts[1]; 
        let day = parts[2];   

        week.push(`${month}-${day}`);
    }

    return week;
}