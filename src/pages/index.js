import "../pages/index.css";

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
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";

// Создание объекта карточки
const generateCardObj = (item, selector, {handleCardClick}) => {
  const cardObj = new Card(item, selector, {handleCardClick});
  return cardObj.generateCard();
}

// Попап с изображением
const popupImage = new PopupWithImage(".image-popup");
popupImage.setEventListeners();

// Рендер дефолтных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = generateCardObj(item, "#elements-template", {
        handleCardClick: () => {
          popupImage.open({
            image: item.link,
            name: item.name
          });
        },
      });
      cardList.addItem(card);
    },
  },
  cardListSection
);
cardList.renderItems();

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
    const card = generateCardObj(formData, "#elements-template",{
      handleCardClick: () => {
        popupImage.open({
          image: formData.link,
          name: formData.name
        });
      }
    })
    cardList.addItem(card);
  },
});
popupAddCardObj.setEventListeners();

// Данные юзера
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// Валидация форм
const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();

// Слушатели событий в глобальной области видимости
buttonEditProfile.addEventListener("click", () => {
  userInfo.getUserInfo();
  userInfo.setUserInfo("#name-input", "#job-input");
  formProfile.resetInputsErrors();
  formProfile.enableSubmitButton();
  popupProfileObject.open();
});

buttonAddCard.addEventListener("click", () => {
  formAddCard.resetInputsErrors();
  formAddCard.disabledSubmitButton();
  popupAddCardObj.open();
});

