// const bulbInput;
document.getElementById("startButton").addEventListener("click", () => {
  const defaultNumberOfBulbs = 30;
  const defaultSpeed = 300;
  const chosenBulb = 10;
  const speedInput = document.getElementById("speedSlider").value,
    speed = speedInput ? speedInput : defaultSpeed;

  const bulbsInput = document.getElementById("bulbInput").value,
    numberOfBulbs = bulbsInput ? bulbsInput : defaultNumberOfBulbs;
  const winner = Math.floor(numberOfBulbs / 2);

  let counter = 0;
  let bulbs = [];

  while (counter < numberOfBulbs) {
    const newElement = document.createElement("div");
    newElement.className = "bulb";
    document.getElementById("light-bulbs").appendChild(newElement);

    bulbs[counter] = false;
    counter++;
  }

  counter = 0;
  bulbs[chosenBulb] = true;
  console.log(bulbs);

  const cyclone = setInterval(() => {
    bulbs[counter] = false;
    document.getElementsByClassName("bulb")[counter].classList.remove("active");
    document.getElementsByClassName("bulb")[winner].classList.add("goal");
    if (counter < numberOfBulbs - 1) {
      counter++;
    } else {
      counter = 0;
    }

    bulbs[counter] = true;
    document.getElementsByClassName("bulb")[counter].classList.add("active");

    console.clear();
    console.log(bulbs);
  }, speed);

  const stop = (event) => {
    clearInterval(cyclone);
    document.getElementsByClassName("bulb")[counter].classList.add("chosen");

    if (
      document
        .getElementsByClassName("bulb")
        [counter].classList.contains("chosen") &&
      document
        .getElementsByClassName("bulb")
        [counter].classList.contains("goal")
    ) {
      let message = document.createElement("p");
      message.innerText = "You won!!";
      document.body.appendChild(message);
    } else {
      let message = document.createElement("p");
      message.innerText = "Too bad, you missed it";
      document.body.appendChild(message);
    }
  };

  document.getElementById("stopButton").addEventListener("click", stop);

  const arrangeBulbsInACircle = (nodes) => {
    const radius = "12em",
      start = -90,
      $els = [...nodes], // turn nodelist into a real array
      numberOfEls = $els.length,
      slice = 360 / numberOfEls,
      index = 0;

    $els.forEach((el, index) => {
      const rotate = slice * index + start;
      const rotateReverse = rotate * -1;

      el.style.transform = `rotate(${rotate}deg) translate(${radius}) rotate(${rotateReverse}deg)`;
    });
  };

  // invoke the fn on the class bulb elements to create the effect
  arrangeBulbsInACircle(document.getElementsByClassName("bulb"));
});
