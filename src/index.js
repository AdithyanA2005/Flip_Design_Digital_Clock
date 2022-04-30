function flipTimeFragmentCard(timeCard, newValue) {
  const topHalf = timeCard.querySelector(".card__top");
  const bottomHalf = timeCard.querySelector(".card__bottom");
  const currentValue = parseInt(topHalf.textContent);

  // Skip the rest of codes if the newValue provided is equal to old value
  if (newValue === currentValue) return;

  // Create the flipcover div with approprite class name to the timeCard
  const topFlip = document.createElement("div");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("card__bottom__flip");
  topFlip.classList.add("card__top__flip");
  timeCard.append(topFlip, bottomFlip);

  // Updates the value of flip covers and top bottom halves
  bottomHalf.textContent = currentValue;
  topHalf.textContent = currentValue;
  topFlip.textContent = currentValue;
  bottomFlip.textContent = newValue;

  // Handle the top half value according to animation and remove the flip after animation finishes
  topFlip.addEventListener("animationstart", () => (topHalf.textContent = newValue));
  topFlip.addEventListener("animationend", () => topFlip.remove());

  // Handle bottom half value next value and remove the flip after animation finishes
  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.textContent = newValue;
    bottomFlip.remove();
  });
}

function setTimeCardsData(datasetSelector, timeFragment) {
  // This function update the ones and tens place of section of the time
  flipTimeFragmentCard(document.querySelector(`[data-${datasetSelector}-ones]`), timeFragment % 10);
  flipTimeFragmentCard(
    document.querySelector(`[data-${datasetSelector}-tens]`),
    Math.floor(timeFragment / 10)
  );
}

function updateTime() {
  // Update the Hour, Minute and Second cards to the current time
  const now = new Date();
  setTimeCardsData("hours", now.getHours());
  setTimeCardsData("minutes", now.getMinutes());
  setTimeCardsData("seconds", now.getSeconds());
}

function main() {
  // Call updateTime at a time interval of 1sec
  setInterval(() => {
    updateTime();
  }, 1000);
}

main();
