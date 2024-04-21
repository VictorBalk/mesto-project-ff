import "../pages/index.css";

import * as cards from "./cards.js";
import * as modal from "./modal.js";

// @todo: DOM узлы
const containerCard = document.querySelector(".places__list");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImages = popUpImage.querySelector(".popup__image");
const popUpCaption = popUpImage.querySelector(".popup__caption");
const popUpNewCard = document.querySelector(".popup_type_new-card");
const popUpEdit = document.querySelector(".popup_type_edit");
const profileInfo = document.querySelector(".profile__info");
const formNewPlace = document.forms["new-place"];
const formEditProfile = document.forms["edit-profile"];

function renderCard(card, removeFunction, linkFunction, openPopUpFunction) {
  containerCard.prepend(
    cards.createCard(card, removeFunction, linkFunction, openPopUpFunction)
  );
}

// @todo: Вывести карточки на страницу
cards.initialCards.forEach((item) => {
  renderCard(item, cards.removeCard, cards.like, openPopUpImage);
});

modal.addEventCloseBtn(popUpImage);
modal.addEventCloseBlur(popUpImage);

modal.addEventCloseBtn(popUpNewCard);
modal.addEventCloseBlur(popUpNewCard);
addEventOpenPopUpNew(popUpNewCard, ".profile__add-button");

modal.addEventCloseBtn(popUpEdit);
modal.addEventCloseBlur(popUpEdit);
addEventOpenPopUpEdit(popUpEdit, ".profile__edit-button");

addEventSubmitForm(formEditProfile, handleFormEditProfileSubmit);

addEventSubmitForm(formNewPlace, handleFormNewPlaceSubmit);

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  const inputsForm = getInputsFormEdit();

  const textFields = getTextFieldsProfileInfo();

  textFields.infoDescription.textContent =
    inputsForm.editInputDescription.value;
  textFields.infoTitle.textContent = inputsForm.editInputName.value;
  modal.closePopUp();
}

function addEventSubmitForm(form, functionSubmit) {
  form.addEventListener("submit", functionSubmit);
}

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const placeNameInput = form.elements["place-name"];
  const linkInput = form.elements.link;

  const itemCard = {
    name: placeNameInput.value,
    link: linkInput.value,
    alt: placeNameInput.value,
  };

  renderCard(itemCard, cards.removeCard, cards.like, openPopUpImage);
  modal.closePopUp();
}

function addEventOpenPopUpEdit(container, sNameClass) {
  document.querySelector(sNameClass).addEventListener("click", function (evt) {
    setDefaultValueForPopUpEdit();
    modal.openPopUp(container);
  });
}

function setDefaultValueForPopUpEdit() {
  const inputsForm = getInputsFormEdit();

  const textFields = getTextFieldsProfileInfo();

  inputsForm.editInputDescription.value =
    textFields.infoDescription.textContent;
  inputsForm.editInputName.value = textFields.infoTitle.textContent;
}

function addEventOpenPopUpNew(container, sNameClass) {
  document.querySelector(sNameClass).addEventListener("click", function (evt) {
    resetPopUpNew();
    modal.openPopUp(container);
  });
}

function resetPopUpNew() {
  formNewPlace.reset();
}

function getInputsFormEdit() {
  const editInputName = formEditProfile.elements.name;
  const editInputDescription = formEditProfile.elements.description;

  return { editInputName, editInputDescription };
}

function getTextFieldsProfileInfo() {
  const infoTitle = profileInfo.querySelector(".profile__title");
  const infoDescription = profileInfo.querySelector(".profile__description");

  return { infoTitle, infoDescription };
}

function openPopUpImage(evt) {
  const srcImage = evt.target.getAttribute("src");
  const altImage = evt.target.getAttribute("alt");

  popUpImages.setAttribute("src", srcImage);
  popUpImages.setAttribute("alt", altImage);
  popUpCaption.textContent = altImage;
  modal.openPopUp(popUpImage);
}
