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
export const popupCardImage = document.querySelector(".image-popup");
export const buttonClosePopupCardImage = document.querySelector(
  ".image-popup__button-close"
);
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

  formProfile.resetInputsErrors();

  inputNamePopupProfile.value = profileName.textContent;
  inputJobPopupProfile.value = profileJob.textContent;
  
  formProfile.enableSubmitButton(
    formProfile.buttonElement,
    formProfile.inactiveButtonClass
  );

  openPopup(popupProfile);
}

function openPopupAddCard() {
  formPopupAddCard.reset();

  formAddCard.resetInputsErrors();

  formAddCard.disabledSubmitButton(
    formAddCard.buttonElement,
    formAddCard.inactiveButtonClass
  );

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

function closePopupCardImage() {
  const popupCardImage = document.querySelector(".image-popup");
  closePopup(popupCardImage);
}

// Обработчики

function submitHandlerFormPopupProfile(evt) {
  evt.preventDefault();

  profileName.textContent = inputNamePopupProfile.value;
  profileJob.textContent = inputJobPopupProfile.value;

  closePopupProfile();
}

const submitHandlerFormAddCard = (evt) => {
  evt.preventDefault();
  const card = createCardObject(
    {
      name: inputPlacePopupAddCard.value,
      link: inputLinkPopupAddCard.value,
    },
    "#elements-template"
  );
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

// Рендер карточки

const renderCard = (card) => {
  const cardsContainer = document.querySelector(".elements");
  cardsContainer.prepend(card);
};

// Создание экземпляра Card

const createCardObject = (data, selector) => {
  const cardElement = new Card(data, selector);
  const card = cardElement.generateCard();
  return card;
};

// Рендер дефолтных карточек

initialCards.forEach((data) => {
  const card = createCardObject(data, "#elements-template");
  renderCard(card);
});

// Валидация форм
const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();


// Слушатели событий в глобальной области видимости

formPopupProfile.addEventListener("submit", submitHandlerFormPopupProfile);
formPopupAddCard.addEventListener("submit", submitHandlerFormAddCard);
buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddCard.addEventListener("click", openPopupAddCard);
buttonClosePopupProfile.addEventListener("click", closePopupProfile);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
buttonClosePopupCardImage.addEventListener("click", closePopupCardImage);
