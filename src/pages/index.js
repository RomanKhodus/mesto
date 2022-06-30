import "../pages/index.css";

import {
  options,
  cardListSection,
  nameInput,
  jobInput,
  buttonEditProfile,
  buttonAddCard,
  formPopupProfile,
  formPopupAddCard,
  profileName,
  profileEbout,
  API_CONFIG,
} from "../utils/constants.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import Api from "../scripts/Api.js";

//Создание обьекта api
const api = new Api(API_CONFIG);

// Отображение актуальных данных пользователя в профиле
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
});

// Данные юзера
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// Создание объекта карточки
const generateCardObj = (item, selector, { handleCardClick }) => {
  const cardObj = new Card(item, selector, { handleCardClick });
  return cardObj.generateCard();
};

// Попап с изображением
const popupImage = new PopupWithImage(".image-popup");
popupImage.setEventListeners();

// Рендер дефолтных карточек
const cardList = new Section(
  {
    items: api
      .getInitialCards()
      .then((items) => items)
      .catch((err) => console.log(err)),
    renderer: (item) => {
      const card = generateCardObj(item, "#elements-template", {
        handleCardClick: () => {
          popupImage.open({
            image: item.link,
            name: item.name,
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

const popupProfile = new PopupWithForm({
  selector: ".profile-popup",
  handleFormSubmit: (userData) => {
    api.setUserInfo(userData).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  },
});
popupProfile.setEventListeners();

const popupAddCardObj = new PopupWithForm({
  selector: ".add-popup",
  handleFormSubmit: (formData) => {
    const card = generateCardObj(formData, "#elements-template", {
      handleCardClick: () => {
        popupImage.open({
          image: formData.link,
          name: formData.name,
        });
      },
    });
    api.setNewCard(formData);
    cardList.addItem(card);
  },
});
popupAddCardObj.setEventListeners();

// Валидация форм
const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();

// Слушатели событий в глобальной области видимости
buttonEditProfile.addEventListener("click", () => {
  formProfile.resetInputsErrors();

  formProfile.enableSubmitButton();

  api.getUserInfo().then((userInfo) => {
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;
  });

  popupProfile.open();
});

buttonAddCard.addEventListener("click", () => {
  formAddCard.resetInputsErrors();
  formAddCard.disabledSubmitButton();
  popupAddCardObj.open();
});
