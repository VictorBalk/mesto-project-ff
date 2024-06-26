import "../pages/index.css";
import * as cards from "./cards.js";
import * as modal from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  getInitialCards,
  addNewCard,
  deleteCard,
  getUserInfo,
  updateAvatar,
  updateUserInfo,
} from "./api.js";

// @todo: DOM узлы
const containerCard = document.querySelector(".places__list");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImages = popUpImage.querySelector(".popup__image");
const popUpCaption = popUpImage.querySelector(".popup__caption");
const popUpNewCard = document.querySelector(".popup_type_new-card");
const popUpEdit = document.querySelector(".popup_type_edit");
const popUpUpdateAvatar = document.querySelector(".popup_type_update");
const popUpDeleteCard = document.querySelector(".popup_type_delete-card");
const profileInfo = document.querySelector(".profile__info");
const profileImage = document.querySelector(".profile__image");
const formNewPlace = document.forms["new-place"];
const formEditProfile = document.forms["edit-profile"];
const formUpdateAvatar = document.forms["update-avatar"];
const formDeleteCard = document.forms["delete-card"];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__span-error_active'
}

let idUser = "";
const saveText = 'Сохранить';
const saveTextProcess = 'Сохранение...';

//Установим обработку для валидации форм
enableValidation(validationConfig);

//Зачитаем карточки и информацию о пользователе с сервера
initial();


//Обработка нажатия обновления профиля
profileImage.addEventListener("click", (evt) => {

  const afterStyle = getComputedStyle(evt.target, "::after");
  const elementStyle = getComputedStyle(evt.target);

  const pseudoElWidth = parseInt(afterStyle.width);
  const pseudoElHeight = parseInt(afterStyle.height);

  const elementlWidth = parseInt(elementStyle.width);
  const elementlHeight = parseInt(elementStyle.height);

  // Следим за координатами X и Y клика в отношении элемента
  const relativeX = evt.clientX - evt.target.getBoundingClientRect().left;
  const relativeY = evt.clientY - evt.target.getBoundingClientRect().top;

  const elementlWidthHalf = elementlWidth / 2;
  const pseudolWidthHalf = pseudoElWidth / 2;

  const elementlHeightHalf = elementlHeight / 2;
  const pseudolHeightHalf = pseudoElHeight / 2;

  // Проверяем, попал ли клик в область псевдоэлемента
  // Условие по Оси X
  if (
    elementlWidthHalf - pseudolWidthHalf < relativeX &&
    relativeX <= elementlWidthHalf + pseudolWidthHalf &&
    // Условие по Оси Y
    elementlHeightHalf - pseudolHeightHalf < relativeY &&
    relativeY <= elementlHeightHalf + pseudolHeightHalf
  ) {
    resetPopUpUpdateAvatar();
    modal.openPopUp(popUpUpdateAvatar);
  }
});

//Установка обработчиков
modal.addEventCloseBtn(popUpImage);
modal.addEventCloseBlur(popUpImage);

modal.addEventCloseBtn(popUpUpdateAvatar);
modal.addEventCloseBlur(popUpUpdateAvatar);

modal.addEventCloseBtn(popUpDeleteCard);
modal.addEventCloseBlur(popUpDeleteCard);

modal.addEventCloseBtn(popUpNewCard);
modal.addEventCloseBlur(popUpNewCard);
addEventOpenPopUpNew(popUpNewCard, ".profile__add-button");

modal.addEventCloseBtn(popUpEdit);
modal.addEventCloseBlur(popUpEdit);
addEventOpenPopUpEdit(popUpEdit, ".profile__edit-button");

addEventSubmitForm(formEditProfile, handleFormEditProfileSubmit);

addEventSubmitForm(formNewPlace, handleFormNewPlaceSubmit);

addEventSubmitForm(formUpdateAvatar, handleUpdateAvatarSubmit);

addEventSubmitForm(formDeleteCard, handleDeleteCardSubmit);

//Обработка редактирования профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  const inputsForm = getInputsFormEdit();
  const submitBtn = evt.target.querySelector(validationConfig.submitButtonSelector);

  const profile = {
    name: inputsForm.editInputName.value,
    about: inputsForm.editInputDescription.value,
  };

  submitBtn.textContent = saveTextProcess;

  updateUserInfo(profile)
    .then((data) => {
      const textFields = getTextFieldsProfileInfo();

      textFields.infoDescription.textContent = data.about;
      textFields.infoTitle.textContent = data.name;
      modal.closePopUp();
    })
    .finally(() => {
      submitBtn.textContent = saveText;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });


}

function addEventSubmitForm(form, functionSubmit) {
  form.addEventListener("submit", functionSubmit);
}

//Обработка добавления новой карточки
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const placeNameInput = form.elements["place-name"];
  const linkInput = form.elements.link;

  const submitBtn = evt.target.querySelector(validationConfig.submitButtonSelector);
  submitBtn.textContent = saveTextProcess;

  const itemCard = {
    name: placeNameInput.value,
    link: linkInput.value,
    alt: placeNameInput.value,
  };

  addNewCard(itemCard)
    .then((data) => {
      renderCard(data, removeCard, likeCard, openPopUpImage);
      modal.closePopUp();
    })
    .finally(() => {
      submitBtn.textContent = saveText;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });

}

//Обработка обнавления аватара
function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;

  const link = form.elements.link;

  const submitBtn = evt.target.querySelector(validationConfig.submitButtonSelector);
  submitBtn.textContent = saveTextProcess;

  updateAvatar(link.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url("${data.avatar}")`;
      modal.closePopUp();
    })
    .finally(() => {

      submitBtn.textContent = saveText;
    })
    .catch((err) => {
      console.log(err);
    });


}

//Обработка удаления карточки
function handleDeleteCardSubmit(evt) {
  evt.preventDefault();

  const idCard = popUpDeleteCard.dataset.id;

  const elemCard = containerCard.querySelector(`[data-id='${idCard}']`);

  const submitBtn = evt.target.querySelector(validationConfig.submitButtonSelector);
  submitBtn.textContent = 'Удаление...';

  deleteCard(idCard)
    .then((data) => {
      cards.removeCard(elemCard);
      modal.closePopUp();
    })
    .finally(() => {
      submitBtn.textContent = 'Да';
    })
    .catch((err) => {
      console.log(err);
    });
}

function addEventOpenPopUpEdit(container, sNameClass) {
  document.querySelector(sNameClass).addEventListener("click", function (evt) {
    setDefaultValueForPopUpEdit();
    clearValidation(formEditProfile, validationConfig);
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

//Сброс Формы и валидации для добавления новой карточки
function resetPopUpNew() {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
}
//Сброс Формы и валидации для обновления аватара
function resetPopUpUpdateAvatar() {
  formUpdateAvatar.reset();
  clearValidation(formUpdateAvatar, validationConfig);
}

//Получения полей редактированяи профиля 
function getInputsFormEdit() {
  const editInputName = formEditProfile.elements.name;
  const editInputDescription = formEditProfile.elements.description;

  return { editInputName, editInputDescription };
}

//Получения полей редактированяи профиля 
function getTextFieldsProfileInfo() {
  const infoTitle = profileInfo.querySelector(".profile__title");
  const infoDescription = profileInfo.querySelector(".profile__description");

  return { infoTitle, infoDescription };
}

//Обработка открытия изображения 
function openPopUpImage(evt) {
  const srcImage = evt.target.getAttribute("src");
  const altImage = evt.target.getAttribute("alt");

  popUpImages.setAttribute("src", srcImage);
  popUpImages.setAttribute("alt", altImage);
  popUpCaption.textContent = altImage;
  modal.openPopUp(popUpImage);
}

//Обработка удаления карточки
function removeCard(evt) {
  const idCard = cards.getItemId(evt.target);
  popUpDeleteCard.setAttribute("data-id", idCard);
  modal.openPopUp(popUpDeleteCard);
}

//Обработка установки like
function likeCard(evt) {
  cards.like(evt.target);
}

// Добавления карточки в DOM
function renderCard(card, removeFunction, linkFunction, openPopUpFunction) {
  containerCard.prepend(
    cards.createCard(
      card,
      removeFunction,
      linkFunction,
      openPopUpFunction,
      idUser
    )
  );
}

// Начальная загрузка
function initial() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then((responses) => {
      const userInfo = responses[0];

      const textFields = getTextFieldsProfileInfo();
      textFields.infoDescription.textContent = userInfo.about;
      textFields.infoTitle.textContent = userInfo.name;
      profileImage.style.backgroundImage = `url("${userInfo.avatar}")`;
      idUser = userInfo._id;

      const serverCards = responses[1].reverse();
      serverCards.forEach((item) => {
        renderCard(item, removeCard, likeCard, openPopUpImage);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}