import Yakutia from "../images/cards/Yakutia.jpg";
import Kungur from "../images/cards/Kungur_Ice_Cave.jpg";
import KurileIslands from "../images/cards/KurileIslands.jpg";
import Moscow from "../images/cards/Moscow.jpg";
import Zabaykalye from "../images/cards/Zabaykalye.jpg";
import SaintPetersburg from "../images/cards/SaintPetersburg.jpg";

// @todo: Темплейт карточки
const oTeemplate = document.querySelector("#card-template").content;

const initialCards = [
  {
    name: "Якутия",
    link: Yakutia,
    alt: "Дом шамана на поле в Якутии",
  },
  {
    name: "Пермский край",
    link: Kungur,
    alt: "Кунгурская ледяная пещера, Пермский край",
  },
  {
    name: "Курильские острова",
    link: KurileIslands,
    alt: "Вулкан Креницына, Курильские острова",
  },
  {
    name: "Москва",
    link: Moscow,
    alt: "Стекляные небоскребы, Москва",
  },
  {
    name: "Забайкалье",
    link: Zabaykalye,
    alt: "Чарские пески, Забайкалье",
  },
  {
    name: "Санкт-Петербург",
    link: SaintPetersburg,
    alt: "Исаакиевский собор, Санкт-Петербург",
  },
];
// @todo: Функция создания карточки
function createCard(oCard, removeFunction, linkFunction, openPopUpFunction) {
  const oCardElement = oTeemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const oImg = oCardElement.querySelector(".card__image");

  oImg.setAttribute("src", oCard.link);
  oImg.setAttribute("alt", oCard.alt);

  oImg.addEventListener("click", function (oEvent) {
    const oPopUpImg = document.querySelector(".popup__image");

    oPopUpImg.setAttribute("src", oCard.link);
    oPopUpImg.setAttribute("alt", oCard.alt);

    const oPopUpCaptyion = document.querySelector(".popup__caption");
    oPopUpCaptyion.textContent = oCard.name;

    const oPopUpImage = document.querySelector(".popup_type_image");
    openPopUpFunction(oPopUpImage);
  });

  const oDeleteButton = oCardElement.querySelector(".card__delete-button");
  oDeleteButton.addEventListener("click", removeFunction);

  const oTitle = oCardElement.querySelector(".card__title");
  oTitle.textContent = oCard.name;

  const oLikeButton = oCardElement.querySelector(".card__like-button");
  oLikeButton.addEventListener("click", linkFunction);

  return oCardElement;
}

// @todo: Функция удаления карточки
function onRemoveCard(oEvent) {
  oEvent.target.closest(".places__item").remove();
}

function onLike(oEvent) {
  oEvent.target.classList.toggle("card__like-button_is-active");
}

export { initialCards, createCard, onRemoveCard, onLike };
