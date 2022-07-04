import "../pages/index.css";

import {
  options,
  cardsContainer,
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

// Данные юзера
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

const CreateCard = (
  item,
  selector,
  { handleCardClick },
  api,
  userId,
  popupDeletCard
) => {
  const cardObj = new Card(
    item,
    selector,
    { handleCardClick },
    api,
    userId,
    popupDeletCard
  );
  return cardObj.generateCard();
};

api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user); // Отображение актуальных данных пользователя в профиле
  userInfo.setUserAvatar(user);
  api
    .getInitialCards() // Получение карточек с сервера
    .then((initialCards) => {
      const cardList = new Section( // Рендер карточек в контейне
        {
          items: initialCards,
          renderer: (item) => {
            const instanceCard = CreateCard(
              // Создание карточки
              item,
              "#elements-template",
              {
                handleCardClick: () => {
                  popupImage.open({
                    image: item.link,
                    name: item.name,
                  });
                },
              },
              api,
              user._id
            );
            cardList.addItem(instanceCard); // Добавление карточки в контейнер
          },
        },
        cardsContainer
      );
      cardList.renderItems(); // перебор карточек и запуск рендерера

      const popupAddCard = new PopupWithForm({
        // Попап новой карточки
        selector: ".add-popup",
        handleFormSubmit: (formValues) => {
          api.renderLoading(".add-popup__button-submit", true);
          api.setNewCard(formValues).then((item) => {
            const card = CreateCard(item, "#elements-template", {
              handleCardClick: () => {
                popupImage.open({
                  image: item.link,
                  name: item.name,
                });
              },
            });
            api.renderLoading(".add-popup__button-submit", false);
            cardList.addItem(card);
          });
        },
      });
      popupAddCard.setEventListeners();

      buttonAddCard.addEventListener("click", () => {
        formAddCard.resetInputsErrors();
        formAddCard.disabledSubmitButton();
        popupAddCard.open();
      });
    });
});

const popupProfile = new PopupWithForm({  //Профайл попап
  selector: ".profile-popup",
  handleFormSubmit: (userData) => {
    api.renderLoading(".popup__button-submit", true);
    api
      .setUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .catch((err) => Promise.reject(`Ошибка: ${err.status}`))
      .finally(() => api.renderLoading(".popup__button-submit", false));
  },
});
popupProfile.setEventListeners();

const popupImage = new PopupWithImage(".image-popup");  // Попап с изображением
popupImage.setEventListeners();

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

