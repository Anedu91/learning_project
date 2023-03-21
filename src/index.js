import { Tooltip, Collapse } from "bootstrap";
import "./scss/main.scss";
import "./images/sprite.svg";

import { getData } from "./js/fetchingData";

import { navigationTop, rendingScore } from "./js/components/navigationTop";
import { assignmentTask } from "./js/components/assignmentTask";
import { documentTask, renderIframe } from "./js/components/documentTask";
import { calcScore } from "./js/utils/calcScore";
import { store } from "./js/store/store";
import { setWidth } from "./js/utils/setWidth";
import { selectedFilter } from "./js/utils/selectedFilter";
import { updateTaskUi } from "./js/utils/updateTaskUi";
import { renderAt } from "./js/utils/renderAt";

/*======EVENT LISTENERS======*/
document.addEventListener("DOMContentLoaded", async () => {
  onPageLoad(1);
  setupClickHandlers();
});

async function onPageLoad(url) {
  try {
    getData(url)
      //Updating the data in the store state
      .then((data) => {
        const { evaluations, evaluatedScore, gradedScore, averageScore } = data;

        store.evaluations = evaluations.map((evaluation, index) => {
          return { ...evaluation, id: index };
        });
        const possibleScore = gradedScore.possibleScore;

        store.scoreInfo = {
          ...store.scoreInfo,
          evaluatedScore,
          gradedScore,
          possibleScore,
          averageScore,
        };
        store.scoreInfo.runningScore = calcScore(store);
        return data;
      })
      //Rendering the Navigation
      .then((data) => {
        renderAt("#topbar", navigationTop(data, store.scoreInfo));
        //passing settings to the UI
        selectedFilter(
          store.templateSettings.view,
          ".navigaton__dropdown-filter .btn-check"
        );
        return data;
      })
      // Rendering Document
      .then((data) => {
        renderAt(".main__document", documentTask(data, store.templateSettings));
        //passing settings to the UI
        selectedFilter(
          store.templateSettings.documentPreview,
          ".document__edit .btn-check"
        );
        setWidth(store.templateSettings.documentWidth);
      })
      // Rendering evaluations
      .then(() => {
        renderTask();
      })
      // Triggering the tooltips
      .then(() => {
        const tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map((tooltipEl) => {
          return new Tooltip(tooltipEl, {
            trigger: "hover",
          });
        });
      });
  } catch {}
}

function setupClickHandlers() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    /* TOP BAR EVENTS */
    if (target.matches(".teacherGraded")) {
      //todo teacher graded to 100%
      gradedTo100();
    }
    if (target.matches(".computerGraded")) {
      //todo all graded to 100%
      evaluatedTo100();
    }
    if (target.matches(".btn-filter")) {
      // Filter config
      store.templateSettings.view = target.id;
      renderTask();
    }
    if (target.matches(".feedback")) {
      //removing prev tooltip
      document.querySelector(".tooltip").remove();
      //getting feedback message
      const feedbackInput = document.querySelector("#feedback");
      const feedbackMessage = feedbackInput.value;
      feedbackInput.value = "";

      // Score Array
      const scoreArray = store.evaluations.map(
        (evaluation) => evaluation.score
      );

      // Data to post

      const dataToPost = {
        feedback: feedbackMessage,
        score: scoreArray,
      };

      onPageLoad(2);
    }
    if (target.matches(".finish")) {
      //removing prev tooltip
      document.querySelector(".tooltip").remove();
      //getting feedback message
      const feedbackInput = document.querySelector("#feedback");
      const feedbackMessage = feedbackInput.value;
      feedbackInput.value = "";

      // Score Array
      const scoreArray = store.evaluations.map(
        (evaluation) => evaluation.score
      );

      // Data to post

      const dataToPost = {
        feedback: feedbackMessage,
        score: scoreArray,
      };

      onPageLoad(2);
    }
    /* TASK EVENTS */
    if (target.matches(".card__btn")) {
      // Closing cards
      const cardOpen = document.querySelector(".principal.show");
      if (cardOpen) {
        cardOpen.classList.remove("show");
        const buttonOpen = cardOpen
          .closest(".card")
          .querySelector(".card__btn");
        buttonOpen.setAttribute("aria-expanded", false);
      }
      // actual card
      const card = target.closest(".card");
      card.scrollIntoView();
    }
    if (target.matches(".btn-task")) {
      //set score to 0 / to max / range
      const card = target.closest(".card");

      //Updating score inside the card
      updateScore(card, target.dataset.score, target.dataset.possible);
      //Closing actual card, opening new card and scroll up
      updateTaskUi(card);
    }
    if (target.matches(".form-range")) {
      //Updating number input and button data-score from range-input
      const card = target.closest(".card");
      const rangeLabel = card.querySelector(".form__range__input");
      const button = card.querySelector(".btn-range");
      rangeLabel.value = target.value;
      button.dataset.score = rangeLabel.value;
    }
    if (target.matches(".form__range__input")) {
      //Updating number input and button data-score from number-input
      setupChangeHandlers(target);
    }
    /* DOCUMENT EVENTS */

    if (target.matches(".filePreference")) {
      // Setting preview, edit and undock document views
      const mainContainer = document.querySelector(".main");

      if (target.dataset.target == "preview") {
        mainContainer.classList.remove("full-width");
        setWidth(store.templateSettings.documentWidth);
        store.templateSettings.documentPreview = target.dataset.target;
        renderAt(
          ".main__body",
          renderIframe(store.templateSettings.previewUrl)
        );
      }

      if (target.dataset.target == "edit") {
        mainContainer.classList.remove("full-width");
        setWidth(store.templateSettings.documentWidth);
        store.templateSettings.documentPreview = target.dataset.target;
        renderAt(".main__body", renderIframe(store.templateSettings.editUrl));
      }
    }
    if (target.matches(".btn-document")) {
      //Setting document width
      let widthValue = store.templateSettings.documentWidth;
      if (target.dataset.size === "small") {
        if (widthValue <= 50) {
          setWidth(widthValue);
        } else {
          widthValue -= 10;
          store.templateSettings.documentWidth = widthValue;
          setWidth(widthValue);
        }
      }
      if (target.dataset.size === "big") {
        if (widthValue >= 70) {
          setWidth(widthValue);
        } else {
          widthValue += 10;
          store.templateSettings.documentWidth = widthValue;
          setWidth(widthValue);
        }
      }
    }
  });
}
/* OTHERS EVENTS */
function setupChangeHandlers(input) {
  //change event from input number (range)
  const card = input.closest(".card");
  const range = card.querySelector(".form-range");
  const button = card.querySelector(".btn-range");
  input.addEventListener("change", (event) => {
    range.value = event.target.value;
    button.dataset.score = event.target.value;
  });
}

/* RENDER FUNCTION */

function updateScore(task, score, totalScore) {
  //Updating new value in the state
  store.evaluations.filter((evaluation) => evaluation.id == task.id)[0].score =
    parseInt(score);

  //Act number UI in the task card
  const taskScore = task.querySelector(".card__score");
  taskScore.innerText = `${parseInt(score)}/${parseInt(totalScore)}`;

  //Updating total score number
  store.scoreInfo.runningScore = calcScore(store);
  //Rendering Score (topbar)
  renderAt(
    "#running-score",
    rendingScore(
      store.scoreInfo.runningScore,
      store.scoreInfo.possibleScore,
      "Running"
    )
  );
}

function renderTask() {
  const evaluationTask = store.evaluations.filter((task) => {
    //show all filter
    if (store.templateSettings.view === "showAll") {
      return task;
    }
    //show 0 filter
    if (store.templateSettings.view === "show0") {
      return task.score === 0;
    }
    //show under 100 filter
    if (store.templateSettings.view === "showUnder") {
      return task.score / task.possibleScore != 1 && task.score >= 0;
    }
  });
  //rendering task after filtering
  const taskUI = evaluationTask
    .map((task, index) => assignmentTask(task, index))
    .join("");
  renderAt("#assignment", taskUI);
  store.evaluationsRendered = evaluationTask;
  if (evaluationTask.length > 0) {
    //Open first task in the assigment list
    document.querySelector(".card").scrollIntoView();
    new Collapse(document.querySelector(".card").querySelector(".collapse"), {
      show: true,
    });
  }
}

function evaluatedTo100() {
  // evaluated score to 100
  store.evaluationsRendered
    .filter((evaluation) => evaluation.teacherGraded === false)
    .forEach((gradedEvaluation) => {
      updateScore(
        document.getElementById(gradedEvaluation.id),
        gradedEvaluation.possibleScore,
        gradedEvaluation.possibleScore
      );
    });
}
function gradedTo100() {
  //graded score to 100
  store.evaluationsRendered
    .filter((evaluation) => evaluation.teacherGraded)
    .forEach((gradedEvaluation) => {
      const taskId = gradedEvaluation.id;
      updateScore(
        document.getElementById(taskId),
        gradedEvaluation.possibleScore,
        gradedEvaluation.possibleScore
      );
    });
}
