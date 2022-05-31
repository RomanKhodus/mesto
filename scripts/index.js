import { initialCards } from "../utils/cards.js";
import { options } from "../utils/options.js";
import FormValidator from "./FormValidator.js"
import {
  enableSubmitButton,
  disabledSubmitButton,
  resetInputsErrors,
} from "./validate.js";
import Card from "./Card.js";

// Шаблоны

// const elementTemplate = document
//   .querySelector("#elements-template")
//   .content.querySelector(".elements__card");

// DOM Элементы

// const cardsContainer = document.querySelector(".elements");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".profile-popup");
const formPopupProfile = popupProfile.querySelector(".popup__form");
const inputNamePopupProfile = document.querySelector(".popup__input_type_name");

const inputJobPopupProfile = document.querySelector(".popup__input_type_job");
const buttonClosePopupProfile = document.querySelector(".popup__button-close");
const buttonSubmitPopupProfile = document.querySelector(
  ".popup__button-submit"
);

const popupAddCard = document.querySelector(".add-popup");
const formPopupAddCard = document.querySelector(".add-form");
const inputPlacePopupAddCard = document.querySelector(
  ".popup__input_type_place"
);
const inputLinkPopupAddCard = document.querySelector(".popup__input_type_link");
const buttonClosePopupAddCard = document.querySelector(
  ".popup__button-close.add-popup__button-close"
);
const buttonSubmitPopupAddCard = document.querySelector(
  ".add-popup__button-submit"
);

// const popupCardImage = document.querySelector(".image-popup");
// const imagePopupCardImage = document.querySelector(".image-popup__image");
// const captionPopupCardImage = document.querySelector(".image-popup__caption");
// const buttonClosePopupCardImage = document.querySelector(
//   ".image-popup__button-close"
// );

// Открытие модальных окон

export function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closeEscPopup);
}

function openPopupProfile() {
  formPopupProfile.reset();

  resetInputsErrors(popupProfile, options);

  inputNamePopupProfile.value = profileName.textContent;
  inputJobPopupProfile.value = profileJob.textContent;

  enableSubmitButton(buttonSubmitPopupProfile, options.inactiveButtonClass);

  openPopup(popupProfile);
}

function openPopupAddCard() {
  formPopupAddCard.reset();

  resetInputsErrors(popupAddCard, options);

  disabledSubmitButton(buttonSubmitPopupAddCard, options.inactiveButtonClass);

  openPopup(popupAddCard);
}

// export function openPopupCardImage(evt) {
//   const headerText = evt.target
//     .closest(".elements__card")
//     .querySelector(".elements__header").textContent;
//   captionPopupCardImage.textContent = headerText;
//   imagePopupCardImage.src = evt.target.src;
//   evt.target.alt = headerText;

//   openPopup(popupCardImage);
// };

// Закрытие модалных окон

export function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closeEscPopup);
}

function closePopupProfile() {
  closePopup(popupProfile);
}

function closePopupAddCard() {
  inputPlacePopupAddCard.value = "";
  inputLinkPopupAddCard.value = "";

  closePopup(popupAddCard);
}

// function closePopupCardImage() {
//   closePopup(popupCardImage);
// }

// Обработчики

function formPopupProfileSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = inputNamePopupProfile.value;
  profileJob.textContent = inputJobPopupProfile.value;

  closePopupProfile();
}

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();

  renderElementsCard({
    name: inputPlacePopupAddCard.value,
    link: inputLinkPopupAddCard.value,
  });

  inputPlacePopupAddCard.value = "";
  inputLinkPopupAddCard.value = "";

  closePopupAddCard();
};

// const handleLikeToggle = (evt) => {
//   evt.target.classList.toggle("elements__like_active");
// };

export const handleDeleteCard = (evt) => {
  evt.target.closest(".elements__card").remove();
};

// Генерация карточки

// const generateElementsCard = (cardsData) => {
//   const newElementsCard = elementTemplate.cloneNode(true);
//   const imageOfCard = newElementsCard.querySelector(".elements__image");

//   newElementsCard.querySelector(".elements__header").textContent =
//     cardsData.name;
//   imageOfCard.src = cardsData.link;
//   imageOfCard.alt = cardsData.name;

// const buttonLike = newElementsCard.querySelector(".elements__like");
// buttonLike.addEventListener("click", handleLikeToggle);

//   const buttonDelete = newElementsCard.querySelector(".elements__delete");
//   buttonDelete.addEventListener("click", handleDeleteCard);

//   imageOfCard.addEventListener("click", openPopupCardImage);

//   return newElementsCard;
// };

// Рендеринг Карточек

// const renderElementsCard = (cardsData) => {
//   cardsContainer.append(generateElementsCard(cardsData));
// };

const popupOverlayClickHandler = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

// Закрытие popup при нажатии вне модального окна

const popupOverlayClose = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("mousedown", popupOverlayClickHandler);
  });
};
popupOverlayClose();

// Закрытие popup при нажатии esc

const closeEscPopup = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");

    closePopup(popup);
  }
};

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();

const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();

initialCards.forEach((cardsData) => {
  const card = new Card(cardsData, "#elements-template");
  const cardElement = card.generateCard();

  document.querySelector(".elements").append(cardElement);
});

// Слушатели событий в глобальной области видимости

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddCard.addEventListener("click", openPopupAddCard);
formPopupProfile.addEventListener("submit", formPopupProfileSubmitHandler);
buttonClosePopupProfile.addEventListener("click", closePopupProfile);
formPopupAddCard.addEventListener("submit", formAddCardSubmitHandler);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
