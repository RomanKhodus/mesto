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
  container
} from "../utils/constants.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import Api from "../scripts/Api.js";
import PopupWithConfirmation from "../scripts/popupWithConfirmation";

//Создание обьекта api
const api = new Api(API_CONFIG);

// Данные юзера
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const CreateCard = (...arg) => {
  const cardObj = new Card(...arg);
  return cardObj.generateCard();
};

api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user);
  userInfo.setUserAvatar(user);
  api.getInitialCards().then((initialCards) => {
    const cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = CreateCard(
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
            user._id,
            popupConfirm
          );
          cardList.addItem(cardElement);
        },
      },
      cardsContainer
    );
    cardList.renderItems();
  });
});

const popupAddCard = new PopupWithForm({
  selector: ".add-popup",
  handleFormSubmit: (formValues) => {
    api.renderLoading(".add-popup__button-submit", true);
    api.getUserInfo().then((user) => {
      api
        .setNewCard(formValues)
        .then((item) => {
          const cardElement = CreateCard(
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
            user._id,
            popupConfirm
          );
          api.renderLoading(".add-popup__button-submit", false);
          container.prepend(cardElement);
          popupAddCard.close();
        })
    });
  },
});

popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  formAddCard.resetInputsErrors();
  formAddCard.disabledSubmitButton();
  popupAddCard.open();
});

const popupProfile = new PopupWithForm({
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
buttonEditProfile.addEventListener("click", () => {
  formProfile.resetInputsErrors();
  formProfile.enableSubmitButton();
  api.getUserInfo().then((userInfo) => {
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;
  });
  popupProfile.open();
});

const popupConfirm = new PopupWithConfirmation({
  selector: ".remove-popup",
  handlerCardDelet: (cardId) => {
    api.renderLoading(".popup__button-submit", true);
    api.deleteCard(cardId);
    popupConfirm.close();
  },
});

const popupImage = new PopupWithImage(".image-popup");
popupImage.setEventListeners();

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();

const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();
