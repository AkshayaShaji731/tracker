const root = document.getElementById("root")
root.innerHTML = `<div id="container"> </div>`
const container = document.getElementById("container")

container.innerHTML = `
<div id="main-container"> </div>`
const mainContainer = document.getElementById("main-container")
export function graph() {
    let y = [2, 3.2, 1.5, 4, 5, 1, 3]
    let maxValue = Math.floor(Math.max(...y))
    for (let i = 0; i < 7; i++) {
        const col = document.createElement("div")
        col.classList.add("col")
        mainContainer.appendChild(col)
       let  column = mainContainer.querySelectorAll(".col")[i]
        for (let i = 0; i < maxValue+1; i++) {
            const row = document.createElement("div")
            row.classList.add("row")
            column.appendChild(row);
    }
}
    const column = mainContainer.querySelectorAll(".col")
    for (let i = 0; i < column.length; i++) {
        let rows = column[i].querySelectorAll(".row")
        let point =  Math.floor(y[i])
        let decimal=Math.abs(y[i]-point)
        for (let j = point; j >0; j--) {
            let pointRow = rows[j-1]
            pointRow.style.backgroundColor = "blue"
            pointRow.style.borderLeft="2px solid #000"
            pointRow.style.borderRight="2px solid #000"
            if(decimal==0){
                rows[Math.floor(y[i]-1)].style.borderTop="2px solid #000"
            }
        }
        if(decimal>0){
            const fill = document.createElement("div")
            fill.style.position = "absolute"
            fill.style.bottom = "0"
            fill.style.left = "0"
            fill.style.width = "100%"
            fill.style.height = `${decimal * 100}%`
            fill.style.backgroundColor = "blue"
            fill.style.borderLeft="2px solid #000"
            fill.style.borderRight="2px solid #000"
            fill.style.borderTop="2px solid #000"
    
            rows[point].style.position = "relative"
            rows[point].appendChild(fill)
        }
    }

}