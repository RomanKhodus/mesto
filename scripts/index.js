import { initialCards } from "../utils/cards.js";
import { options } from "../utils/options.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".profile-popup");
const formPopupProfile = popupProfile.querySelector(".popup__form");
const inputNamePopupProfile = document.querySelector(".popup__input_type_name");

const inputJobPopupProfile = document.querySelector(".popup__input_type_job");
const buttonClosePopupProfile = document.querySelector(".popup__button-close");
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
export const popupCardImage = document.querySelector(".image-popup");
export const captionPopupCardImage = document.querySelector(
  ".image-popup__caption"
);
export const imagePopupCardImage = document.querySelector(
  ".image-popup__image"
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

  // enableSubmitButton(buttonSubmitPopupProfile, options.inactiveButtonClass);

  openPopup(popupProfile);
}

function openPopupAddCard() {
  formPopupAddCard.reset();

  resetInputsErrors(popupAddCard, options);

  disabledSubmitButton(buttonSubmitPopupAddCard, options.inactiveButtonClass);

  openPopup(popupAddCard);
}

// Закрытие модальных окон

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

export function closePopupCardImage() {
  const popupCardImage = document.querySelector(".image-popup");
  closePopup(popupCardImage);
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
  const cardElement = newCard(
    {
      name: inputPlacePopupAddCard.value,
      link: inputLinkPopupAddCard.value,
    },
    "#elements-template"
  );
  const card = cardElement.generateCard();
  renderCard(card);

  inputPlacePopupAddCard.value = "";
  inputLinkPopupAddCard.value = "";

  closePopupAddCard();
};

const popupOverlayClickHandler = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

export const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled", "");
};

export const disabledSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
};

const resetInputsErrors = (popup, options) => {
  const inputSelector = options.inputSelector;
  const inputErrorSelector = options.inputErrorSelector;
  const errorClass = options.errorClass;
  const inputInvalidClass = options.inputInvalidClass;
  const errorList = Array.from(popup.querySelectorAll(inputErrorSelector));

  errorList.forEach((errorElement) => {
    errorElement.classList.remove(errorClass);
  });

  const inputList = Array.from(popup.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(inputInvalidClass);
  });
};

const popupOverlayClose = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("mousedown", popupOverlayClickHandler);
  });
};
popupOverlayClose();

const closeEscPopup = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");

    closePopup(popup);
  }
};

// Валидация форм

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();

const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();

// Рендер карточки

const renderCard = (card) => {
  const cardsContainer = document.querySelector(".elements");
  cardsContainer.prepend(card);
};

// Создание экземпляра Card

const newCard = (data, selector) => {
  const cardElement = new Card(data, selector);
  return cardElement;
};

// Рендер дефолтных карточек

initialCards.forEach((data) => {
  const cardElement = newCard(data, "#elements-template");
  const card = cardElement.generateCard();
  renderCard(card);
});

// Слушатели событий в глобальной области видимости

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddCard.addEventListener("click", openPopupAddCard);
formPopupProfile.addEventListener("submit", formPopupProfileSubmitHandler);
buttonClosePopupProfile.addEventListener("click", closePopupProfile);
formPopupAddCard.addEventListener("submit", formAddCardSubmitHandler);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
