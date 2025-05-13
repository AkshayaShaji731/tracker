let graphCon = document.querySelector(".graph")
export function weekly() {
    const x = 7;
    const y = 15;
    for (let i = 0; i < y; i++) {
        let yDir= y-i
        if(yDir<=9){
            yDir="0"+yDir
        }
        else{
            yDir=yDir
        }
        let hours = document.createElement("div")
        hours.className = "col"
        graphCon.appendChild(hours)
        let yAxis = document.createElement("div")
        yAxis.className = "y-axis"
        yAxis.innerHTML =yDir
        hours.appendChild(yAxis)

        for (let j = 0; j < x; j++) {
            let day = document.createElement("div")
            day.className = "row-graph"
            hours.appendChild(day)
        }
    }
}