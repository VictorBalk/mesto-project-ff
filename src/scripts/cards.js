import Yakutia from "../images/cards/Yakutia.jpg";
import Kungur from "../images/cards/Kungur_Ice_Cave.jpg";
import KurileIslands from "../images/cards/KurileIslands.jpg";
import Moscow from "../images/cards/Moscow.jpg";
import Zabaykalye from "../images/cards/Zabaykalye.jpg";
import SaintPetersburg from "../images/cards/SaintPetersburg.jpg";
import {
  addLike,
  deleteLike
} from "./api.js";

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
function createCard(
  card,
  removeFunction,
  linkFunction,
  openPopUpFunction,
  idUser
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);

  cardImage.addEventListener("click", openPopUpFunction);

  cardElement.setAttribute("data-id", card._id);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (card.owner._id === idUser) {
    deleteButton.addEventListener("click", removeFunction);
  } else {
    deleteButton.style.display = "none";
  }

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", linkFunction);

  if (card.likes.some((item) => item._id === idUser)) {
    like(cardLikeButton);
  }

  const cardLikeCount = cardElement.querySelector(".card__like-count");
  cardLikeCount.textContent = card.likes.length;


  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(element) {
  element.closest(".places__item").remove();
}

function toggleLikeClass(element) {
  element.classList.toggle("card__like-button_is-active");
}

function getItemId(element) {
  return element.closest(".places__item").dataset.id;
}

function like(element) {

  const idCard = getItemId(element);

  const liked = function (data) {
    toggleLikeClass(element);
    const countElem = element
      .closest(".card__like")
      .querySelector(".card__like-count");
    countElem.textContent = data.likes.length;
  };

  if (element.classList.contains("card__like-button_is-active")) {
    deleteLike(idCard)
      .then((data) => {
        liked(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(idCard)
      .then((data) => {
        liked(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { getItemId, createCard, removeCard, like };
