let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userChosenColour = "";
let userClickedPattern = [];
let level = 0;

//Create a random number for selecting the color
function nextSequence() {
  level++;
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

//.one is the same .on but only fires once
$(document).one("keypress", buttonToPress);

$(".btn").on("click", function (event) {
  userChosenColour = event.currentTarget.id;
  playSound(userChosenColour);
  flashButton(userChosenColour);

  //Add the pressed class to the button and then remove it with an anonym function and timeout
  $("." + userChosenColour).addClass("pressed");
  setTimeout(function () {
    $("." + userChosenColour).removeClass("pressed");
  }, 100);

  userClickedPattern.push(userChosenColour);
  setTimeout(buttonToPress, 1000);
});
