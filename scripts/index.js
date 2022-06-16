import {
  initialCards,
  options,
  cardListSection,
  profileName,
  profileJob,
  buttonEditProfile,
  buttonAddCard,
  formPopupProfile,
  formPopupAddCard,
} from "../utils/constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

// Рендер дефолтных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const itemElement = new Card(item, "#elements-template", {
        handleCardClick: () => {
          const popupImage = new PopupWithImage(item, ".image-popup");
          popupImage.setEventListeners();
          popupImage.open();
        },
      });
      const cards = itemElement.generateCard();
      cardList.addItem(cards);
    },
  },
  cardListSection
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
  handleFormSubmit: (formData) => {
    profileName.textContent = formData.name;
    profileJob.textContent = formData.job;
  },
});
popupProfileObject.setEventListeners();

const popupAddCardObj = new PopupWithForm({
  selector: ".add-popup",
  handleFormSubmit: (formData) => {
    const cardElement = new Card(formData, "#elements-template", {
      handleCardClick: () => {
        const popupImage = new PopupWithImage(formData, ".image-popup");
        popupImage.setEventListeners();
        popupImage.open();
      },
    });
    const card = cardElement.generateCard();
    cardList.addItem(card);
  },
});
popupAddCardObj.setEventListeners();

// Данные Юзера
const userInfo = new UserInfo(".profile__name", ".profile__job");

// Слушатели событий в глобальной области видимости
buttonEditProfile.addEventListener("click", () => userInfo.getUserInfo());
buttonEditProfile.addEventListener("click", () => userInfo.setUserInfo());
buttonEditProfile.addEventListener("click", () => formProfile.resetInputsErrors());
buttonEditProfile.addEventListener(
  "click",
  () => formProfile.enableSubmitButton()
);
buttonEditProfile.addEventListener("click", () => popupProfileObject.open());

buttonAddCard.addEventListener("click", () => formAddCard.resetInputsErrors());
buttonAddCard.addEventListener("click", () => popupAddCardObj.open());
