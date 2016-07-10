// variables!
var originalMinutes = 25;
var minutes = originalMinutes;
var seconds = 0;
var breakOriginalMinutes = 5;
var breakMinutes = breakOriginalMinutes;
var breakSeconds = 0;
var state = "pomo-paused"; // can be pomo-running, pomo-paused, break-running, break-paused 
var breakTimer;
var timer;

var snd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");

// this is begging to be refactored...
function minutesdown() {
  if (minutes > 0) {
    if (seconds === 0) {
      minutes--;
      seconds = 59;
      $("#minutes").text(minutes);
      $("#seconds").text(seconds);
    } else if (seconds > 0) {
      seconds--;
      if (seconds < 10) {
        $("#minutes").text(minutes);
        $("#seconds").text("0" + seconds);
      } else {
        $("#minutes").text(minutes);
        $("#seconds").text(seconds);
      }
    }
  } else if (minutes === 0 && seconds !== 0) {
    seconds--;
    if (seconds < 10) {
      $("#minutes").text(minutes);
      $("#seconds").text("0" + seconds);
    } else {
      $("#minutes").text(minutes);
      $("#seconds").text(seconds);
    }
  } else {
    minutes = originalMinutes;
    seconds = 0;
    $("#minutes").text(minutes);
    $("#seconds").text("0" + seconds);
    clearInterval(timer);
    snd.play();
    startBreak();
  }
}

// also begging
function breakMinutesdown() {
  if (breakMinutes > 0) {
    if (breakSeconds === 0) {
      breakMinutes--;
      breakSeconds = 59;
      $("#break-minutes").text(breakMinutes);
      $("#break-seconds").text(breakSeconds);
    } else if (breakSeconds > 0) {
      breakSeconds--;
      if (breakSeconds < 10) {
        $("#break-minutes").text(breakMinutes);
        $("#break-seconds").text("0" + breakSeconds);
      } else {
        $("#break-minutes").text(breakMinutes);
        $("#break-seconds").text(breakSeconds);
      }
    }
  } else if (breakMinutes === 0 && breakSeconds !== 0) {
    breakSeconds--;
    if (breakSeconds < 10) {
      $("#break-minutes").text(breakMinutes);
      $("#break-seconds").text("0" + breakSeconds);
    } else {
      $("#break-minutes").text(breakMinutes);
      $("#break-seconds").text(breakSeconds);
    }
  } else {
    breakMinutes = breakOriginalMinutes;
    breakSeconds = 0;
    $("#break-minutes").text(breakMinutes);
    $("#break-seconds").text("0" + breakSeconds);
    clearInterval(breakTimer);
    snd.play();
    startPomo();
  }
}

function startPomo() {
  state = "pomo-running";
  timer = setInterval(minutesdown, 1000);
}

function startBreak() {
  state = "break-running";
  breakTimer = setInterval(breakMinutesdown, 1000);
}

$("#minutes").text(minutes);
$("#seconds").text("0" + seconds);

$("#break-minutes").text(breakMinutes);
$("#break-seconds").text("0" + breakSeconds);

$("#plus").on("click", function() {
  if (state !== "running") {
    originalMinutes++;
    minutes = originalMinutes;
    $("#minutes").text(minutes);
  }
});

$("#minus").on("click", function() {
  if (state !== "running") {
    originalMinutes--;
    minutes = originalMinutes;
    $("#minutes").text(minutes);
  }
});

$("#start-button").on("click", function() {
  if (state === "pomo-paused") {
    startPomo();
    $("#start-button").text("pause");
  } else if (state === "pomo-running") {
    clearInterval(timer);
    state = "pomo-paused";
    $("#start-button").text("start");
  } else if (state === "break-running") {
    clearInterval(breakTimer);
    state = "break-paused"
    $("#start-button").text("start");
  } else if (state === "break-paused") {
    startBreak();
    $("#start-button").text("pause");
  }
});

$("#reset-button").on("click", function() {
  clearInterval(timer);
  clearInterval(breakTimer);
  state = "pomo-paused";
  $("#start-button").text("start");
  minutes = originalMinutes;
  seconds = 0;
  $("#minutes").text(minutes);
  $("#seconds").text("0" + seconds);
  breakMinutes = breakOriginalMinutes;
  breakSeconds = 0;
  $("#break-minutes").text(breakMinutes);
  $("#break-seconds").text("0" + breakSeconds);
});

$("#break-plus").on("click", function() {
  if (state !== "running") {
    breakOriginalMinutes++;
    breakMinutes = breakOriginalMinutes;
    $("#break-minutes").text(breakMinutes);
  }
});

$("#break-minus").on("click", function() {
  if (state !== "running") {
    breakOriginalMinutes--;
    breakMinutes = breakOriginalMinutes;
    $("#break-minutes").text(breakMinutes);
  }
});