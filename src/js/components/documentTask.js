export const renderIframe = (url) => {
  return `<iframe src=${url}></iframe>`
}
export const documentTask = (data, state) => {
  const lastEdit = `${data.documentEditDate.substring(0,10)}`;
  let url;
  if(state.documentPreview == "preview"){
    url = state.previewUrl
  }else{
    url = state.editUrl;  
  }
  return `
    <div class="main__header">
      <h2>${data.fileName}</h2>
      <div class="document__option">
        <div class="">
          <span class="text-primary" data-bs-toggle="tooltip" data-bs-placement="left" title="Last submitted">
          <span class="icon-calendar font-icon sm"></span>         
          </span>  
          <span class="">${lastEdit}</span>
        </div>
        <div class="document__edit" role="group" aria-label="Basic radio toggle button group">
          <div></div>
          <input type="radio" class="btn-check" name="docradio" id="preview" autocomplete="off" checked>
            <label class="btn btn-circle filePreference" for="preview" data-target="preview" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Preview view">
            <span class="icon-preview font-icon xs"></span>      
            </label>
          <input type="radio" class="btn-check" name="docradio" id="edit" autocomplete="off">
          <label class="btn btn-circle filePreference" for="edit" data-target="edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit view"> 
          <span class="icon-edit font-icon xs"></span> 
          </label>          
            <a href=${state.editUrl} target="_blank" class="btn btn-circle filePreference" for="undock-doc" data-target="undock" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Undock into separate window">               
            <span class="icon-undock font-icon xs"></span>           
            </a>
        </div>
      </div>
      </div>
      <div class="main__body">
        ${renderIframe(url)}
      </div>
      <div class="main__footer">
        <div class="btn-group">
          <button class="btn btn-primary text-white btn-rounded btn-document" data-size="small">
          <span class="icon-minus font-icon xxs"></span> 
          </button>
          <span class="btn-primary text-white btn sizeValue">
            ${state.documentWidth}
          </span>
          <button class="btn btn-primary text-white btn-rounded btn-document" data-size="big">
          <span class="icon-plus font-icon xxs"></span> 
          </button>
        </div>
      </div>
  `
}


{/* <button class="btn btn-circle filePreference" data-target="preview" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Preview view">
          <svg class="btn-icon btn-icon--small"><use xlink:href="images/sprite.svg#icon-preview"></use></svg>
        </button>
        <button class="btn btn-circle filePreference" data-target="edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit view">
          <svg class="btn-icon btn-icon--small"><use xlink:href="images/sprite.svg#icon-edit"></use></svg>
        </button> */}