var timerType = true,
  minutes = 25, //Start value of minutes counter
  seconds = 0, // start value of seconds counter
  minutesId = 0, 
  secondsId = 0, 
  sand = 80, //Start value of sand counter
  sandId = 0, 
  startTime = 25, // sets the number for the initial sand count
  isRunning = false, // on/off switch to prevent events from firing more than once when a button is clicked
  mousedown = false, // for the plus and minus buttons to speed through
  mouseDownTimer = '', // for the plus and minus buttons to speed through
  sandColor = " #f4c2c2",
  wav = 'http://soundbible.com/grab.php?id=1495&type=mp3',
  audio = new Audio(wav);

function start() {
  if (isRunning === false) {
    isRunning = true;
    $('.falling-sand').css('border-left-width', '1px');
    minutesId = setInterval('countdown()', 1000);
    sandId = setInterval(function() {
      sandDown(startTime);
    }, 1000);
  }
}

function sandDown(startingTime) {
  if (startingTime === 0) {
    startingTime++;
  }
  if (sand > 0) {
    sand = 80 * ((minutes * 60) + seconds) / (startingTime * 60);
    $(".hourglass-top-sand").css("border-right", sand + "px solid transparent");
    $(".hourglass-top-sand").css("border-left", sand + "px solid transparent");
    $(".hourglass-top-sand").css("top", "-" + sand + "px");
    $(".hourglass-top-sand").css("left", "-" + sand + "px");
    $(".hourglass-top-sand").css("border-top", sand + "px solid " + sandColor);
    $(".hourglass-bottom-sand").css("border-right", 78 - sand + "px solid transparent");
    $(".hourglass-bottom-sand").css("border-left", 78 - sand + "px solid transparent");
    $(".hourglass-bottom-sand").css("border-bottom", 78 - sand + "px solid " + sandColor);
    $(".hourglass-bottom-sand").css("left", "-" + (78 - sand) + "px");
    $(".hourglass-bottom-sand").css("top", 0 - (78 - sand) + "px");
    $(".falling-sand").css("border-left-width", "1px");
  } else {
    $(".falling-sand").css("border-left-width", "0px");
  }
}

function countdown() {
  if (seconds === 0 && minutes > 0) {
    seconds = 59;
    minutes--;
  } else if (minutes === 0 && seconds === 0) {
    window.clearInterval(minutesId);
    audio.play();
  } else {
    seconds = seconds - 1;
  }
  document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
}

function formatZero(num) {
  var formattedNum = "0";
  if (num < 10) {
    return formattedNum += num.toString();
  } else {
    return num.toString();
  }
}

function resetAll() {
  isRunning = false;
  window.clearInterval(minutesId);
  window.clearInterval(sandId);
  if (timerType === true) {
    minutes = 25;
    sandDown(25);
  } else {
    minutes = 5;
    sandDown(5);
  }
  seconds = 0;
  $(".hourglass-bottom-sand").css("border-bottom-width", "0px");
  $(".hourglass-top-sand").text("");
  $(".falling-sand").css("border-left-width", "0px");
  startTime = minutes;
  document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
}

$("#start-button").click(function() {
  start();
});

$("#stop-button").click(function() {
  if (isRunning === true) {
    isRunning = false;
    window.clearInterval(minutesId);
    window.clearInterval(sandId);
    $(".falling-sand").css("border-left-width", "0px");
  }
});

$("#reset-button").click(function() {
  resetAll();
});

$("#work-button").click(function() {
  timerType = true;
  resetAll();
  seconds = 0;
  startTime = minutes;
  sandColor = " #f4c2c2";
  $("#minutes").css("color", sandColor);
  $(".btn").css("background-color", sandColor);
  $("#break-button").css("background-color", "#6ed3cf");
  $(".falling-sand").css("border-left-color", sandColor);
  $(".hourglass-bottom-sand").css("border-bottom", 78 - sand + "px solid " + sandColor);
  $(".hourglass-top-sand").css("border-top", sand + "px solid " + sandColor);
  document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
});

$("#break-button").click(function() {
  timerType = false;
  resetAll();
  seconds = 0;
  minutes = 5;
  startTime = minutes;
  sandColor = "#6ed3cf";
  $("#minutes").css("color", sandColor);
  $(".btn").css("background-color", sandColor);
  $("#work-button").css("background-color", "#f4c2c2");
  $(".falling-sand").css("border-left", "0px dashed " + sandColor);
  $(".hourglass-top-sand").css("border-top", sand + "px solid " + sandColor);
  $(".hourglass-bottom-sand").css("border-bottom", 78 - sand + "px solid " + sandColor);
  document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
});

$('#plus-button').mousedown(function() {
    mousedown = true;
    isRunning = false;
    window.clearInterval(minutesId);
    window.clearInterval(sandId);
    seconds = 0;
    $(".hourglass-top-sand").css("border-top-width", sand + "px");
    $(".hourglass-bottom-sand").css("border-bottom-width", "0px");
    $(".falling-sand").css("border-left-width", "0px");
    mouseDownTimer = setInterval(function() {
      if (mousedown && minutes < 56) {
        minutes = minutes + 5;
        startTime = minutes;
        document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
      }
    }, 500);
  })
  .mouseup(function() {
    mousedown = false;
    window.clearInterval(mouseDownTimer);
    startTime = minutes;
    document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
  });

$('#minus-button').mousedown(function() {
  mousedown = true;
  isRunning = false;
  window.clearInterval(minutesId);
  window.clearInterval(sandId);
  seconds = 0;
  $(".hourglass-top-sand").css("border-top-width", sand + "px");
  $(".hourglass-bottom-sand").css("border-bottom-width", "0px");
  $(".falling-sand").css("border-left-width", "0px");
  mouseDownTimer = setInterval(function() {
    if (mousedown && minutes > 4) {
      minutes = minutes - 5;
      startTime = minutes;
      document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
    }
  }, 500);
}).mouseup(function() {
  mousedown = false;
  window.clearInterval(mouseDownTimer);
  startTime = minutes;
  document.getElementById('minutes').innerHTML = minutes + ":" + formatZero(seconds);
});

$("#plus-button").click(function() {
  if (minutes < 60) {
    minutes++;
  }
  cleanup();
});

$("#minus-button").click(function() {
  if (minutes > 0 && seconds === 0) {
    minutes--;
  }
  cleanup();
});

function cleanup() {
  document.getElementById('minutes').innerHTML = minutes + ':' + formatZero(seconds);
  window.clearInterval(minutesId);
  window.clearInterval(sandId);
  startTime = minutes;
  seconds = 0;
  $('.falling-sand').css('border-left-width', '0px');
  isRunning = false;
}