drumButtons = document.querySelectorAll(".drum");

//Loop through the buttons, if the drumButton is a number add a click eventlistener to that element
//(doThis) could be anything for name, this way the parameters of the current element is passed
//So doThis.currentTarget is the same as drumButtons[drumbutton]
for (drumButton in drumButtons) {
  if (isNaN(drumButton) === false) {
    document.querySelectorAll(".drum")[drumButton].addEventListener("click", (doThis) => {
      alert(doThis.currentTarget.innerText);
    });
  }
}
