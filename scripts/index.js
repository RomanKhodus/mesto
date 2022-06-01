import { initialCards } from "../utils/cards.js";
import { options } from "../utils/options.js";
import FormValidator from "./FormValidator.js";
import {
  enableSubmitButton,
  disabledSubmitButton,
  resetInputsErrors,
} from "./validate.js";
import Card from "./Card.js";

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

// Обработчики

function formPopupProfileSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = inputNamePopupProfile.value;
  profileJob.textContent = inputJobPopupProfile.value;

  closePopupProfile();
}

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const card = new Card(
    {
      name: inputPlacePopupAddCard.value,
      link: inputLinkPopupAddCard.value,
    },
    "#elements-template"
  );
  card.renderCard();

  inputPlacePopupAddCard.value = "";
  inputLinkPopupAddCard.value = "";

  closePopupAddCard();
};

export const handleDeleteCard = (evt) => {
  evt.target.closest(".elements__card").remove();
};

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

initialCards.forEach((data) => {
  const card = new Card(data, "#elements-template");
  card.renderCard();
});

// Слушатели событий в глобальной области видимости

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddCard.addEventListener("click", openPopupAddCard);
formPopupProfile.addEventListener("submit", formPopupProfileSubmitHandler);
buttonClosePopupProfile.addEventListener("click", closePopupProfile);
formPopupAddCard.addEventListener("submit", formAddCardSubmitHandler);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
