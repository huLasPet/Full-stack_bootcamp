function generateNumber() {
  let randomNumber1 = Math.ceil(Math.random() * 6);
  let randomNumber2 = Math.ceil(Math.random() * 6);
  let dice1 = "images/dice" + randomNumber1 + ".png";
  document.querySelector(".img1").setAttribute("src", dice1);
  let dice2 = "images/dice" + randomNumber2 + ".png";
  document.querySelector(".img2").setAttribute("src", dice2);

  if (randomNumber1 < randomNumber2) {
    document.querySelector("body > div.container > h1").textContent =
      "Player 2 wins🚩";
  } else if (randomNumber1 > randomNumber2) {
    document.querySelector("body > div.container > h1").textContent =
      "🚩Player 1 wins";
  } else {
    document.querySelector("body > div.container > h1").textContent =
      "It's a draw";
  }
}
