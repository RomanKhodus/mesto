import "../pages/index.css";
import {
  options,
  cardsContainer,
  nameInput,
  jobInput,
  buttonAvatar,
  imageAvatar,
  buttonEditProfile,
  buttonAddCard,
  buttonConfirmPopup,
  formPopupAvatar,
  formPopupProfile,
  formPopupAddCard,
  API_CONFIG,
  container,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/popupWithConfirmation.js";

//Создание обьекта api
const api = new Api(API_CONFIG);

// Данные юзера
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const card = (...arg) => {
  // const cardObj =
  return new Card(...arg);
  // return cardObj.generateCard();
};

api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user);
  userInfo.setUserAvatar(user);
  api
    .getInitialCards()
    .then((initialCards) => {
      const cardList = new Section(
        {
          items: initialCards,
          renderer: (item) => {
            const instanceCard = card(
              item,
              "#elements-template",
              {
                handleCardClick: () => {
                  popupImage.open({
                    image: item.link,
                    name: item.name,
                  });
                },
                handleDeleteClik: () => {
                  popupConfirm.open();
                  popupConfirm.setSuccessHandler(() => {
                    api.deleteCard(item._id).then(() => {
                      instanceCard.deleteCard();
                      popupConfirm.close();
                    });
                  });
                },
              },
              api,
              user._id
            );
            cardList.addItem(instanceCard.generateCard());
          },
        },
        cardsContainer
      );
      cardList.renderItems();
    })
    .catch((err) => Promise.reject(`Ошибка: ${err.status}`));
});

const popupAddCard = new PopupWithForm({
  selector: ".add-popup",
  handleFormSubmit: (formValues) => {
    api.renderLoadingCard(".add-popup__button-submit", true);
    api.getUserInfo().then((user) => {
      api
        .setNewCard(formValues)
        .then((item) => {
          const instanceCard = card(
            item,
            "#elements-template",
            {
              handleCardClick: () => {
                popupImage.open({
                  image: item.link,
                  name: item.name,
                });
              },
              handleDeleteClik: () => {
                popupConfirm.open();
                popupConfirm.setSuccessHandler(() => {
                  api.deleteCard(item._id).then(() => {
                    instanceCard.deleteCard();
                    popupConfirm.close();
                  });
                });
              },
            },
            api,
            user._id
          );
          container.prepend(instanceCard.generateCard());
          popupAddCard.close();
        })
        .catch((err) => Promise.reject(`Ошибка: ${err.status}`))
        .finally(() => {
          api.renderLoadingCard(".add-popup__button-submit", false);
        });
    });
  },
});
popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  formAddCard.resetInputsErrors();
  formAddCard.disabledSubmitButton();
  popupAddCard.open();
});

const popupConfirm = new PopupWithConfirmation({
  selector: ".remove-popup"
});
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm({
  selector: ".avatar-popup",
  handleFormSubmit: (Data) => {
    api.renderLoadingCard(".avatar-popup__button-submit", true);
    api
      .setAvatar(Data.link)
      .then((link) => {
        imageAvatar.src = link.avatar;
        popupAvatar.close();
      })
      .catch((err) => Promise.reject(`Ошибка: ${err.status}`))
      .finally(() => api.renderLoadingCard(".avatar-popup__button-submit", false));
  },
});
popupAvatar.setEventListeners();
buttonAvatar.addEventListener("click", () => {
  formAvatar.resetInputsErrors();
  popupAvatar.open();
});

const popupProfile = new PopupWithForm({
  selector: ".profile-popup",
  handleFormSubmit: (userData) => {
    api.renderLoadingCard(".popup__button-submit", true);
    api
      .setUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupProfile.close();
      })
      .catch((err) => Promise.reject(`Ошибка: ${err.status}`))
      .finally(() => api.renderLoadingCard(".popup__button-submit", false));
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

const popupImage = new PopupWithImage(".image-popup");
popupImage.setEventListeners();

const formProfile = new FormValidator(options, formPopupProfile);
formProfile.enableValidation();

const formAddCard = new FormValidator(options, formPopupAddCard);
formAddCard.enableValidation();

const formAvatar = new FormValidator(options, formPopupAvatar);
formAvatar.enableValidation();
