function openPopUp(container) {
  container.classList.add("popup_is-opened");
  addEscapeHandler();
}

function closePopUp() {
  const popUp = document.querySelector(".popup_is-opened");
  if (popUp) {
    popUp.classList.remove("popup_is-opened");
  }
  removeEscapeHandler();
}

function addEscapeHandler(evt) {
  document.addEventListener("keydown", handlerEscape);
}

function handlerEscape(evt) {
  if (evt.key === "Escape") {
    closePopUp();
  }
}

function removeEscapeHandler() {
  document.removeEventListener("keydown", handlerEscape);
}

function addEventCloseBtn(container) {
  container
    .querySelector(".popup__close")
    .addEventListener("click", function (evt) {
      closePopUp();
    });
}

function addEventOpenBtn(container, sNameClass) {
  document.querySelector(sNameClass).addEventListener("click", function (evt) {
    openPopUp(container);
  });
}

function addEventCloseBlur(container) {
  container.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopUp();
    }
  });
}

export {
  openPopUp,
  closePopUp,
  addEventCloseBlur,
  addEventOpenBtn,
  addEventCloseBtn,
};
