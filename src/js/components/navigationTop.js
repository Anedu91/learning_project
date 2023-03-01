export const rendingScore = (actualScore, possibleScore, type) => {
  const percent = parseInt(actualScore*100/possibleScore);
  const STROKE_DASH = 106.76;
  const progressCircle = STROKE_DASH*actualScore/possibleScore

  return `
      <div class="score">
        ${type}
        <span class="score__number">${actualScore}/${possibleScore}</span>  
        <div class="score__progress" data-pct=${percent}>
          <svg class="score__icon" viewBox="0 0 40 40" version="1.1">
           <circle class="score__circle" r="17" cx="20" cy="20" fill="transparent"  stroke-dashoffset=${0} stroke-dasharray=${STROKE_DASH}></circle>
            <circle class="score__bar" r="17" cx="20" cy="20" fill="transparent" stroke-dashoffset=${STROKE_DASH - progressCircle} stroke-dasharray=${STROKE_DASH}></circle>
          </svg>
        </div>
      </div>
  `
}

export const navigationTop = (data, state) => {  

  return 	`
    <div class="container">
      <!-- STUDENT INFORMATION -->
      <div class="navigation__student">
        <p data-bs-toggle="tooltip" data-bs-placement="bottom" title=${data.studentName}>
          ${data.studentName}
        </p>
        <p data-bs-toggle="tooltip" data-bs-placement="bottom" title=${data.className}> 
          ${data.className}
        </p>
        <p>
          Period <span>${data.period}</span>
        </p>
      </div>

      <ul class="navigation__nav">
        <!-- EVALUATION INFORMATION -->
        <li class="navigation__item dropdown">
            <button class="dropdown-toggle navigation__dropdown-button" type="button" id="evaluated-score" data-bs-toggle="dropdown" aria-expanded="false">
              ${rendingScore(state.evaluatedScore.scoreEarned, state.evaluatedScore.possibleScore, "Evaluated")}
            </button>
            <ul class="dropdown-menu" aria-labelledby="evaluated-score">
              <li class="dropdown-item navigation__dropdown-item">
              ${rendingScore(state.gradedScore.scoreEarned, state.gradedScore.possibleScore, "Graded")}
              </li>
            </ul>
          </li>

        <!-- EVALUATION INFORMATION -->
        <li class="navigation__item">
          <span class="navigation__label" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Submitted times">
          <span class="icon-submitted font-icon lg"></span>

          <span class="navigation__submited">${data.submittedCount}</span>
          </span>
        </li>

        <!-- GRADING ASSIGNMENT -->
        <li class="navigation__item btn-group">
            <button class="btn btn-custom teacherGraded" data-bs-toggle="tooltip" data-bs-placement="bottom" title="All Teacher Graded = 100%">
            <span class="icon-graded font-icon"></span>            
            </button>
            <button class="btn btn-custom computerGraded" data-bs-toggle="tooltip" data-bs-placement="bottom" title="All Computer Graded = 100%">
            <span class="icon-evaluated font-icon"></span> 
            </button>
          </li>

        <!-- FILTER SHOW ASSIGNMENT BUTTONS -->
        <li class="navigation__item dropdown">
            <button class="dropdown-toggle navigation__dropdown-button" type="button" id="evaluated-score" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="icon-view-menu font-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>  
             
            </button>
            <ul class="dropdown-menu navigaton__dropdown-filter" aria-labelledby="evaluated-score">
              <li class="dropdown-item navigation__dropdown-item btn-group">
                <input type="radio" class="btn-check btn-filter" name="showfilter" id="showAll">
                <label class="btn" for="showAll" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View All Tasks">
                <span class="icon-view-all font-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                </label>  
  
                <input type="radio" class="btn-check btn-filter" name="showfilter" id="show0">
                <label class="btn" for="show0" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View Only Tasks Marked 0">
                <span class="icon-view-0 font-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                </label>    
  
                <input type="radio" class="btn-check btn-filter" name="showfilter" id="showUnder">
                <label class="btn" for="showUnder" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View Only Tasks Marked Less Than 100">
                <span class="icon-view-less font-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></span>
                </label>
              </li>
            </ul>
          </li>

        <!-- RUNNING SCORE INFO -->
        <li class="navigation__item navigation__item--score" id="running-score">            
          ${rendingScore(state.runningScore,state.possibleScore,"Running")}  
        </li>

        <!-- POSTING ASSIGNMENT -->
        <li class="navigation__item navigation__item--space" id="posting">
            <button class="btn btn-big feedback" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Send Feedback">
            <span class="icon-feedback font-icon lg"></span>
            </button>
            <button class="btn btn-big finish" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Final Grade">
            <span class="icon-finish font-icon lg"></span>
            </button>
          </li>
      </ul>
    </div>
  `
}