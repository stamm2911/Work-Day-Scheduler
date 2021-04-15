var time = document.getElementById("currentDay");
var T9AM = document.getElementById("9AM");
var timeTable = document.getElementById("time-table");
var today = moment();
var schedulerData = [];
var schedulerObj;

init();
currentTime();
colorCoded();

function init(){
  schedulerData = JSON.parse(localStorage.getItem("scheduler"));
  console.log(schedulerData);
  if(schedulerData !== null){
    console.log(schedulerData);
    loadEvents();
  }
};

timeTable.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    schedulerObj = {
      time: event.path[2].children[0].textContent,
      event: event.path[2].children[1].children[0].value,
    };
    if (schedulerData == null) {
      schedulerData = [];
      // schedulerData[0] = schedulerObj;
      schedulerData.push(schedulerObj);
      console.log(schedulerData);
      alert('Task saved')
    } else {
      for (var i = 0; i < schedulerData.length; i++) {
        console.log(schedulerData[i].time);
        console.log(schedulerObj.time);
        if (schedulerData[i].time == schedulerObj.time) {
          console.log("same");
          schedulerData[i] = schedulerObj;
          var flag = true;
          i = schedulerData.length;
        }
      }

      if (!flag) {
        schedulerData.push(schedulerObj);
        console.log("NOTsame");
      }
      console.log(schedulerData);
      alert('Task saved')
    }

    var schedulerDataString = JSON.stringify(schedulerData);
    localStorage.setItem("scheduler", schedulerDataString);
  }
});

function loadEvents(){
  console.log(schedulerData);  
  for (var i = 0; i < schedulerData.length; i++) {
    console.log(i);
    for(var x = 0; x < 13; x++){
      if (schedulerData[i].time == x + "AM" || schedulerData[i].time == x + "PM") {
        console.log("in");
        console.log(x);
        console.log(schedulerData[i]);
        if( x > 8){
          var y = x - 9;
        }else{
          var y = x + 3;
        }
        console.log(timeTable.children[0].children[y].children[1].children[0]);
        timeTable.children[0].children[y].children[1].children[0].textContent = schedulerData[i].event;
      }

    }
  }
};

function currentTime() {
  time.textContent = today.format("dddd, MMMM Do YYYY, h:mm:ss");
  setInterval(() => {
    today = moment();
    time.textContent = today.format("dddd, MMMM Do YYYY, h:mm:ss");
  }, 1000);
}

function colorCoded() {
  var currentTime = today.format("h");
  // var currentTime = 14;
  for (var i = 0; i < 9; i++) {
    // if (currentTime < i + 9 || currentTime == 12) {
    if (currentTime < i + 9) {
      timeTable.children[0].children[i].children[1].children[0].setAttribute(
        "style",
        "background-color: #77dd77;"
      );
    } else if (currentTime == i + 9) {
      timeTable.children[0].children[i].children[1].children[0].setAttribute(
        "style",
        "background-color: #ff6961;"
      );
    }
  }
}
