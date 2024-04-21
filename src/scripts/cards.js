import Yakutia from "../images/cards/Yakutia.jpg";
import Kungur from "../images/cards/Kungur_Ice_Cave.jpg";
import KurileIslands from "../images/cards/KurileIslands.jpg";
import Moscow from "../images/cards/Moscow.jpg";
import Zabaykalye from "../images/cards/Zabaykalye.jpg";
import SaintPetersburg from "../images/cards/SaintPetersburg.jpg";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

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
function createCard(card, removeFunction, linkFunction, openPopUpFunction) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.alt);

  cardImage.addEventListener("click", openPopUpFunction);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeFunction);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", linkFunction);

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

function like(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { initialCards, createCard, removeCard, like };
