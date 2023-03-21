export function updateTaskUi(task) {
  //update task card
  const nextTask = task.nextElementSibling;
  const taskContainer = task.querySelector(".principal");

  //hide actual card
  taskContainer.classList.remove("show");
  task.querySelector(".card__btn").setAttribute("aria-expanded", false);
  // if there any other card open it and scroll it to top
  if (nextTask) {
    nextTask.scrollIntoView();
    new Collapse(nextTask.querySelector(".principal"), {
      show: true,
    });
  }
}
