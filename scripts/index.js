import { initialCards, options, cardListSection } from "../utils/constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const popupProfileClass = document.querySelector(".profile-popup");
const formPopupProfile = popupProfileClass.querySelector(".popup__form");
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

  formProfile.enableSubmitButton();

  openPopup(popupProfileClass);
}

function openPopupAddCard() {
  formPopupAddCard.reset();

  formAddCard.resetInputsErrors();

  formAddCard.disabledSubmitButton();

  openPopup(popupAddCard);
}

// // Закрытие модальных окон
// export function closePopup(popup) {
//   popup.classList.remove("popup_opened");

//   document.removeEventListener("keydown", closeEscPopup);
// }

// function closePopupProfile() {
//   closePopup(popupProfileClass);
// }

// function closePopupAddCard() {
//   inputPlacePopupAddCard.value = "";
//   inputLinkPopupAddCard.value = "";

//   closePopup(popupAddCard);
// }

function closePopupCardImage() {
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

// const popupOverlayClickHandler = (evt) => {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.target);
//   }
// };

// const popupOverlayClose = () => {
//   const popupList = Array.from(document.querySelectorAll(".popup"));
//   popupList.forEach((popupElement) => {
//     popupElement.addEventListener("mousedown", popupOverlayClickHandler);
//   });
// };
// popupOverlayClose();

// const closeEscPopup = (evt) => {
//   if (evt.key === "Escape") {
//     const popup = document.querySelector(".popup_opened");

//     closePopup(popup);
//   }
// };

// Рендер карточки
const renderCard = (card) => {
  const cardsContainer = document.querySelector(".elements");
  cardsContainer.prepend(card);
};

// Рендер дефолтных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const itemElement = new Card(item, "#elements-template", {
        
        handleCardClick: () => {
          const popupImage = new PopupWithImage(item, ".image-popup");
          popupImage.open();
        },
      });
      const cards = itemElement.generateCard();
      cardList.addItem(cards);
    },
  },
  cardListSection,
);
cardList.renderItems();

// Валидация форм
const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();

// Попапы с формой
const popupProfileObject = new PopupWithForm({
  selector: ".profile-popup",
  handleFormSubmit: () => {},
});
popupProfileObject.setEventListeners();

const popupAddCardObj = new PopupWithForm({
  selector: ".add-popup",
  handleFormSubmit: () => {},
});
popupAddCardObj.setEventListeners();

// Слушатели событий в глобальной области видимости
// formPopupProfile.addEventListener("submit", submitHandlerFormPopupProfile);
// formPopupAddCard.addEventListener("submit", submitHandlerFormAddCard);

// buttonAddCard.addEventListener("click", openPopupAddCard);
// buttonClosePopupProfile.addEventListener("click", closePopupProfile);
// buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
// buttonClosePopupCardImage.addEventListener("click", closePopupCardImage);
