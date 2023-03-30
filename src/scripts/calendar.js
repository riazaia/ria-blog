// TODO: add localization for days, add 24 or 12 hour clock

const container = document.getElementById("container");
const paragraph = document.createElement("p");
const sidebar = document.querySelector(".sidebar");

const tasks = Array.from(document.querySelectorAll("li.task"));

let activeColor, activeTask;

function randomizeTaskColor() {
  tasks.forEach((el) => {
    let randomColor =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    el.style.backgroundColor = `${randomColor}55`;
  });
}
randomizeTaskColor();

sidebar.addEventListener("click", grabColor);
container.addEventListener("click", setColors);

function grabColor(e) {
  activeColor = e.target.style.backgroundColor;
  activeTask = e.target.textContent;
}

function setColors(e) {
  if (e.target.classList.contains("empty")) {
    e.target.style.backgroundColor = activeColor || "#ddd";
    e.target.textContent = activeTask;
  }
}

function drawCalendar() {
  let config = {
    totalHours: 24,
    blockLength: 30,
    hourLength: 60,
    showWeekend: true,
    startHour: 1,
  };
  let interval = (config.blockLength / config.hourLength) ** -1;
  let cols = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let rows = [];

  // build the rows array

  let rowNumber = (config.totalHours - 1) * interval + 1;
  // figure out how to update the number of columns in the css dynamically
  let columnNumber = 7;

  for (let x = config.startHour; x <= config.totalHours; x++) {
    //console.log("x", x, "config.totalHours", config.totalHours);
    for (let y = 1; y <= interval; y++) {
      // console.log("y", y, "interval", interval);
      rows.push(x);
    }
  }

 /*  //console.log("rows!", rows);
  for (let index = 1; index <= columnNumber; index++) {
    cols.push(index);
  } */

  cols.forEach((element) => {
    let cell = document.createElement("div");
    cell.textContent = `${element}`;
    cell.classList.add("row");
    container.appendChild(cell);
  });

  let minutes = 0;

  rows.forEach((element, i) => {
    // console.log("element!", element, "index", i);

    if (i < rowNumber) {
      let cell = document.createElement("div");
      switch (config.blockLength) {
        case 10:
          cell.textContent = `${element}:${minutes ? minutes : "00"}`;
          minutes += 10;
          if (minutes > 50) {
            minutes = 0;
          }
          break;

        case 15:
          cell.textContent = `${element}:${minutes ? minutes : "00"}`;
          minutes += 15;
          if (minutes > 45) {
            minutes = 0;
          }
          break;
        case 30:
          cell.textContent = `${element}:${minutes ? minutes : "00"}`;
          minutes += 30;
          if (minutes > 30) {
            minutes = 0;
          }
          break;
        case 60:
          cell.textContent = `${element}:${minutes ? minutes : "00"}`;
          break;
        default:
          cell.textContent = `ERROR`;
          break;
      }

      container.appendChild(cell);
      for (let index = 1; index <= columnNumber; index++) {
        let emptyCell = document.createElement("div");
        let colClass = `col${index}`;
        let rowClass = `row${element}`;
        emptyCell.classList.add(colClass);
        emptyCell.classList.add(rowClass);
        emptyCell.classList.add("empty");
        emptyCell.textContent = "";
        container.appendChild(emptyCell);
      }
    }
  });
}

drawCalendar();
