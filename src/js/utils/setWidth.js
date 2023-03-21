export function setWidth(value) {
  //setting width function
  const sizeValue = document.querySelector(".sizeValue");
  const mainContainer = document.querySelector(".main");
  switch (true) {
    case value === 50:
      sizeValue.innerText = value;
      sizeValue.previousElementSibling.classList.add("disabled");
      mainContainer.style.gridTemplateColumns = "50% 1fr";
      break;
    case value === 60:
      sizeValue.innerText = value;
      sizeValue.previousElementSibling.classList.remove("disabled");
      sizeValue.nextElementSibling.classList.remove("disabled");
      mainContainer.style.gridTemplateColumns = "60% 1fr";
      break;
    case value === 70:
      sizeValue.innerText = value;
      sizeValue.nextElementSibling.classList.add("disabled");
      mainContainer.style.gridTemplateColumns = "65% 1fr";
      break;
    default:
      break;
  }
}
