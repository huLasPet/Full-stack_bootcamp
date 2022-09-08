let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let userChosenColour = "";
let level = 0;
let correctSequence = true;

//Create a random number for selecting the color
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function buttonToPress() {
  $("h1").text("Level " + level);
  let randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  flashButton(randomChosenColour);
}

function playSound(colour) {
  let buttonSound = new Audio((src = "sounds/" + colour + ".mp3"));
  buttonSound.play();
}

function flashButton(colour) {
  $("#" + colour)
    .fadeOut(100)
    .fadeIn(100);
}

function checkAnswer() {
  //If the length of userclick and gamepattern is the same, check if the 2 arrays are the same
  //If yes, raise level and show another button
  //If not, reset after a button press
  if (userClickedPattern.length == gamePattern.length) {
    for (i = 0; i <= level; i++) {
      if (gamePattern[i] == userClickedPattern[i]) {
        correctSequence = true;
      } else {
        correctSequence = false;
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        $(document).one("keypress", buttonToPress);
      }
    }
    if (correctSequence == true) {
      level++;
      userClickedPattern = [];
      setTimeout(buttonToPress, 1000);
    }
  }
}

//.one is the same .on but only fires once
$(document).one("keypress", buttonToPress);

$(".btn").on("click", function (event) {
  userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  flashButton(userChosenColour);

  //Add the pressed class to the button and then remove it with an anonym function and timeout
  $("." + userChosenColour).addClass("pressed");
  setTimeout(function () {
    $("." + userChosenColour).removeClass("pressed");
  }, 100);
  checkAnswer();
});
