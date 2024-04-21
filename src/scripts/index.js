import * as oCards from "./cards.js";
import * as oModal from "./modal.js";
import * as oFormUtill from "./formsUtill.js";

import "../pages/index.css";

// @todo: DOM узлы
const oContainerCard = document.querySelector(".places__list");

function renderCard(oCard, removeFunction, linkFunction, openPopUpFunction) {
  oContainerCard.append(
    oCards.createCard(oCard, removeFunction, linkFunction, openPopUpFunction)
  );
}

// @todo: Вывести карточки на страницу
oCards.initialCards.forEach((item) => {
  renderCard(item, oCards.onRemoveCard, oCards.onLike, oModal.openPopUp);
});

const oPopUpImage = document.querySelector(".popup_type_image");
oModal.addEventCloseBtn(oPopUpImage);
oModal.addEventCloseBlur(oPopUpImage);

const oPopUpNewCard = document.querySelector(".popup_type_new-card");
oModal.addEventCloseBtn(oPopUpNewCard);
oModal.addEventCloseBlur(oPopUpNewCard);
oModal.addEventOpenPopUpNew(oPopUpNewCard, ".profile__add-button");

const oPopUpEdit = document.querySelector(".popup_type_edit");
oModal.addEventCloseBtn(oPopUpEdit);
oModal.addEventCloseBlur(oPopUpEdit);
oModal.addEventOpenPopUpEdit(oPopUpEdit, ".profile__edit-button");

const formEditProfile = document.forms["edit-profile"];
addEventSubmitForm(formEditProfile, handleFormEditProfileSubmit);

function handleFormEditProfileSubmit(oEvent) {
  const oInputsForm = oFormUtill.getInputsFormEdit();

  const oTextFields = oFormUtill.getTextFieldsProfileInfo();

  oTextFields.oInfoDescription.textContent = oInputsForm.oEditDescription.value;
  oTextFields.oInfoTitle.textContent = oInputsForm.oEditName.value;
  closePopUp();
  oEvent.preventDefault();
}

function addEventSubmitForm(oForm, oFunct) {
  oForm.addEventListener("submit", oFunct);
}

const formNewPlace = document.forms["new-place"];
addEventSubmitForm(formNewPlace, handleFormNewPlaceSubmit);

function handleFormNewPlaceSubmit(oEvent) {
  const oForm = oEvent.target;

  const oPlaceName = oForm.elements["place-name"];
  const oLink = oForm.elements.link;

  const oItemCard = {
    name: oPlaceName.value,
    link: oLink.value,
    alt: oPlaceName.value,
  };
  renderCard(oItemCard, oCards.onRemoveCard, oCards.onLike, oModal.openPopUp);
  oModal.closePopUp();
  oEvent.preventDefault();
}
