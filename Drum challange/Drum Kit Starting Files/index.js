let drumButtons = document.querySelectorAll(".drum");

//Loop through the buttons, if the drumButton is a number add a click eventlistener to that element
//(event) - or function(event) if we don't use an arrow function - could be anything for name
//this way the parameters of the current element are passed
//So event.currentTarget is the same as drumButtons[drumbutton] if we use an arrow function but using...
//... "this" works as well with a normal function call like ("click", playSound) or function(event)
//but "this" would be used in playsound instead
for (let drumButton in drumButtons) {
  if (isNaN(drumButton) === false) {
    document.querySelectorAll(".drum")[drumButton].addEventListener("click", (event) => {
      playSound(event.currentTarget.innerHTML);
      buttonAnimation(event.currentTarget.innerHTML);
    });
  }
}

//Keydown eventListener to the whole document
document.addEventListener("keydown", (event) => {
  playSound(event.key);
  buttonAnimation(event.key);
});

function playSound(pressed) {
  buttonPressed = pressed;
  switch (buttonPressed) {
    case "w":
      audioFile = new Audio("sounds/tom-1.mp3");
      audioFile.play();
      break;

    case "a":
      audioFile = new Audio("sounds/tom-2.mp3");
      audioFile.play();
      break;

    case "s":
      audioFile = new Audio("sounds/tom-3.mp3");
      audioFile.play();
      break;

    case "d":
      audioFile = new Audio("sounds/tom-4.mp3");
      audioFile.play();
      break;

    case "j":
      audioFile = new Audio("sounds/crash.mp3");
      audioFile.play();
      break;

    case "k":
      audioFile = new Audio("sounds/kick-bass.mp3");
      audioFile.play();
      break;

    case "l":
      audioFile = new Audio("sounds/snare.mp3");
      audioFile.play();
      break;

    default:
      break;
  }
}

function buttonAnimation(target) {
  document.querySelector("." + target).classList.toggle("pressed");
  setTimeout(function () {
    document.querySelector("." + target).classList.toggle("pressed");
  }, 100);
}
