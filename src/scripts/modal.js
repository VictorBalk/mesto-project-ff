import * as oFormUtill from "./formsUtill.js";

function openPopUp(oContainer) {
  oContainer.classList.add("popup_is-opened");
  addEscapeHandler();
}

function closePopUp() {
  const oPopUp = document.querySelector(".popup_is-opened");
  oPopUp.classList.remove("popup_is-opened");
  removeEscapeHandler();
}

function addEscapeHandler(oEvent) {
  document.addEventListener("keydown", handlerEscape);
}

function handlerEscape(oEvent) {
  if (oEvent.key === "Escape") {
    closePopUp();
  }
}

function removeEscapeHandler() {
  document.removeEventListener("keydown", handlerEscape);
}

function addEventCloseBtn(oContainer) {
  oContainer
    .querySelector(".popup__close")
    .addEventListener("click", function (oEvent) {
      closePopUp();
    });
}

function addEventOpenPopUpEdit(oContainer, sNameClass) {
  document
    .querySelector(sNameClass)
    .addEventListener("click", function (oEvent) {
      beforeOpenPopUpEdit();
      openPopUp(oContainer);
    });
}

function beforeOpenPopUpEdit() {
  const oInputsForm = oFormUtill.getInputsFormEdit();

  const oTextFields = oFormUtill.getTextFieldsProfileInfo();

  oInputsForm.oEditDescription.value = oTextFields.oInfoDescription.textContent;
  oInputsForm.oEditName.value = oTextFields.oInfoTitle.textContent;
}

function addEventOpenPopUpNew(oContainer, sNameClass) {
  document
    .querySelector(sNameClass)
    .addEventListener("click", function (oEvent) {
      beforeOpenPopUpNew();
      openPopUp(oContainer);
    });
}

function beforeOpenPopUpNew() {
  const formNewPlace = document.forms["new-place"];
  formNewPlace.reset();
}

function addEventOpenBtn(oContainer, sNameClass) {
  document
    .querySelector(sNameClass)
    .addEventListener("click", function (oEvent) {
      openPopUp(oContainer);
    });
}

function addEventCloseBlur(oContainer) {
  oContainer.addEventListener("click", (oEvent) => {
    if (oEvent.currentTarget === oEvent.target) {
      closePopUp();
    }
  });
}

export {
  openPopUp,
  closePopUp,
  addEventCloseBlur,
  addEventOpenBtn,
  addEventOpenPopUpEdit,
  addEventOpenPopUpNew,
  addEventCloseBtn,
};
