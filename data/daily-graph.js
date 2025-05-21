import { activeTask } from "../scripts/summary.js";

let dataArray = JSON.parse(localStorage.getItem('task')) || [];
const filterInput = document.querySelector(".filter-input")
const filterBtn = document.querySelector(".filter-btn")

let chart = null
export function createDayGraph() {
    let graphChart = document.getElementById("day-graph").getContext("2d");
    // console.log(graphChart)
    Chart.defaults.color = "  white "
    Chart.defaults.font.size = "16px"

    if (chart) {
        chart.destroy()
    }
    const config = {
        type: "bar",
        data: {
            labels: day(),
            datasets: [{
                label: "week data ",
                data: daygraph(),

            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "weekly data",
                    font: {
                        size: 25,
                    },
                    color: "white"
                },
                tooltip: {
                    enabled: false,
                },  
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Dates",
                        color: "white",
                        font: {
                            size: 25,
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Minutes",
                        color: "white",
                        font: {
                            size: 25,
                        }
                    }
                }
            }
        }
    }
    chart = new Chart(graphChart, config)
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
                let points = arrayEl.hour+ arrayEl.minute/60 + arrayEl.seconds/ 360
                array.push(points)
            }
        }
    }
    return array
}
filterBtn.addEventListener("click", () => {
    currentDate = filterInput.value
    createDayGraph()
    activeTask(currentDate)
})