// @todo: Темплейт карточки
const oTeemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const oContainerCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(oCard, removefunction) {
    const oCardElement = oTeemplate.querySelector(".places__item").cloneNode(true);

    const oImg = oCardElement.querySelector(".card__image");

    oImg.setAttribute('src', oCard.link);
    oImg.setAttribute('alt', oCard.alt);

    const oDeleteButton = oCardElement.querySelector(".card__delete-button");
    oDeleteButton.addEventListener('click', removefunction);

    const oTitle = oCardElement.querySelector(".card__title");
    oTitle.textContent = oCard.name;

    const oLikeButton = oCardElement.querySelector(".card__like-button");
    oLikeButton.addEventListener('click', onLike);

    return oCardElement;
}

function renderCard(oCard, removefunction) {
    oContainerCard.append(createCard(oCard, removefunction));
}


// @todo: Функция удаления карточки
function onRemoveCard(oEvent) {
    oEvent.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    renderCard(item, onRemoveCard);
});

function onLike(oEvent) {
    // alert("Вы нажали на кнопку лайк");
}