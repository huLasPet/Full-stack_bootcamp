drumButtons = document.querySelectorAll(".drum");

//Loop through the buttons, if the drumButton is a number add a click eventlistener to that element
//doThis could be anything for name, this way the parameters of the current element is passed
//So doThis.currentTarget is the same as drumButtons[drumbutton] if we use an arrow function but using...
//... "this" works as well, like below

for (drumButton in drumButtons) {
  if (isNaN(drumButton) === false) {
    document.querySelectorAll(".drum")[drumButton].addEventListener("click", doThis);
  }
}
function doThis() {
  buttonPressed = this.innerText;
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
