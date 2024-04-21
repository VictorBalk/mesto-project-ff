import initialCards from './cards.js';

import '../pages/index.css';


// @todo: Темплейт карточки
const oTeemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const oContainerCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(oCard, removeFunction, linkFunction) {
    const oCardElement = oTeemplate.querySelector(".places__item").cloneNode(true);

    const oImg = oCardElement.querySelector(".card__image");

    oImg.setAttribute('src', oCard.link);
    oImg.setAttribute('alt', oCard.alt);

    oImg.addEventListener('click', function (oEvent) {

        const oPopUpImg = oPopUpImage.querySelector(".popup__image");

        oPopUpImg.setAttribute('src', oCard.link);
        oPopUpImg.setAttribute('alt', oCard.alt);
        openPopUp(oPopUpImage);

    });

    const oDeleteButton = oCardElement.querySelector(".card__delete-button");
    oDeleteButton.addEventListener('click', removeFunction);

    const oTitle = oCardElement.querySelector(".card__title");
    oTitle.textContent = oCard.name;

    const oLikeButton = oCardElement.querySelector(".card__like-button");
    oLikeButton.addEventListener('click', linkFunction);

    return oCardElement;
}

function renderCard(oCard, removeFunction, linkFunction) {
    oContainerCard.append(createCard(oCard, removeFunction, linkFunction));
}


// @todo: Функция удаления карточки
function onRemoveCard(oEvent) {
    oEvent.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    renderCard(item, onRemoveCard, onLike);
});

function onLike(oEvent) {
    oEvent.target.classList.toggle('card__like-button_is-active');
}


const oPopUpImage = document.querySelector('.popup_type_image');
addEventCloseBtn(oPopUpImage);
addEventCloseBlur(oPopUpImage);

const oPopUpNewCard = document.querySelector('.popup_type_new-card');
addEventCloseBtn(oPopUpNewCard);
addEventCloseBlur(oPopUpNewCard);
addEventOpenBtn(oPopUpNewCard, '.profile__add-button');

const oPopUpEdit = document.querySelector('.popup_type_edit');
addEventCloseBtn(oPopUpEdit);
addEventCloseBlur(oPopUpEdit);
addEventOpenPopUpEdit(oPopUpEdit, '.profile__edit-button');



function openPopUp(oContainer) {
    oContainer.classList.add('popup_is-opened');
    addEscapeHandler();
}

function closePopUp() {
    const oPopUp = document.querySelector('.popup_is-opened');
    oPopUp.classList.remove('popup_is-opened');
    removeEscapeHandler();
    const oForm = oPopUp.querySelector(".popup__form");
    if (oForm) {
        oForm.reset()
    }
}

function addEscapeHandler(oEvent) {
    document.addEventListener('keydown', handlerEscape);
}

function handlerEscape(oEvent) {
    if (oEvent.key === "Escape") {
        closePopUp();
    }
}

function removeEscapeHandler() {
    document.removeEventListener('keydown', handlerEscape);
}

function addEventCloseBtn(oContainer) {
    oContainer.querySelector(".popup__close").addEventListener('click',
        function (oEvent) {
            closePopUp()
        });

};

function getInputsFormEdit() {
    const oForm = document.forms["edit-profile"];
    const oEditName = oForm.elements.name;
    const oEditDescription = oForm.elements.description;

    return { oEditName, oEditDescription };

}
function getTextFieldsProfileInfo() {
    const oProfileInfo = document.querySelector('.profile__info');
    const oInfoTitle = oProfileInfo.querySelector('.profile__title');
    const oInfoDescription = oProfileInfo.querySelector('.profile__description');

    return { oInfoTitle, oInfoDescription };
}
function beforeOpenPopUpEdit() {

    const oInputsForm = getInputsFormEdit();

    const oTextFields = getTextFieldsProfileInfo();

    oInputsForm.oEditDescription.value = oTextFields.oInfoDescription.textContent;
    oInputsForm.oEditName.value = oTextFields.oInfoTitle.textContent;
}

function addEventOpenPopUpEdit(oContainer, sNameClass){

    document.querySelector(sNameClass).
    addEventListener('click', function (oEvent) {
        beforeOpenPopUpEdit();
        openPopUp(oContainer);
    });

}


function addEventOpenBtn(oContainer, sNameClass) {
    document.querySelector(sNameClass).
        addEventListener('click', function (oEvent) {
            openPopUp(oContainer)
        });
};

function addEventCloseBlur(oContainer) {
    oContainer.addEventListener('click', oEvent => {
        if (oEvent.currentTarget === oEvent.target) {
            closePopUp();
        }
    });
}


const formEditProfile = document.forms["edit-profile"];
addEventSubmitForm(formEditProfile, handleFormEditProfileSubmit);

function handleFormEditProfileSubmit(oEvent) {

    const oInputsForm = getInputsFormEdit();

    const oTextFields = getTextFieldsProfileInfo();

    oTextFields.oInfoDescription.textContent = oInputsForm.oEditDescription.value;
    oTextFields.oInfoTitle.textContent = oInputsForm.oEditName.value;

    oEvent.preventDefault();
    closePopUp();

}


function addEventSubmitForm(oForm, oFunct) {
    oForm.addEventListener('submit', oFunct);
}

const formNewPlace = document.forms["new-place"];
addEventSubmitForm(formNewPlace, handleFormNewPlaceSubmit);

function handleFormNewPlaceSubmit(oEvent) {
    const oForm = oEvent.target;

    const oPlaceName = oForm.elements["place-name"];
    const oLink = oForm.elements.link;

    const oCard = {
        name: oPlaceName.value,
        link: oLink.value,
        alt: oPlaceName.value
    };

    renderCard(oCard, onRemoveCard, onLike);

    oEvent.preventDefault();
    closePopUp();

}

