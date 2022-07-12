import "../pages/index.css";
import renderLoading from "../utils/utils.js";
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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//Создание обьекта api
const api = new Api(API_CONFIG);

// Данные юзера
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const createInstanceCard = (...arg) => {
  return new Card(...arg);
};

const createCard = (item, _id) => {
  const instanceCard = createInstanceCard(
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
          api
            .deleteCard(item._id)
            .then(() => {
              instanceCard.deleteCard();
              popupConfirm.close();
            })
            .catch((err) => console.log(`Ошибка: ${err.status}`));
        });
      },
      handleLike: (card) => {
        api
          .addLikes(card.getId())
          .then((res) => {
            card.apdateLikes(res);
          })
          .catch((err) => console.log(`Ошибка: ${err.status}`));
      },
      handledislike: (card) => {
        api
          .removeLike(card.getId())
          .then((res) => {
            card.apdateLikes(res);
          })
          .catch((err) => console.log(`Ошибка: ${err.status}`));
      },
    },
    api,
    _id
  );
  return instanceCard;
};

const craeteInstanceSection = (...arg) => {
  
  return new Section(...arg);
};

api.getUserInfo().then(({ name, about, avatar, _id }) => {
  userInfo.setUserInfo(name, about, avatar, _id);
  api
    .getInitialCards()
    .then((initialCards) => {
      const cardList = craeteInstanceSection(
        {
          items: initialCards,
          renderer: (item) => {
            const instanceCard = createCard(item, _id);
            cardList.addItem(instanceCard.generateCard());
          },
        },
        cardsContainer
      );
      cardList.renderItems();
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`));
});

const popupAddCard = new PopupWithForm({
  selector: ".add-popup",
  handleFormSubmit: (formValues) => {
    renderLoading(".add-popup__button-submit", true);
    const userId = userInfo.getUserId();
    api
      .setNewCard(formValues)
      .then((item) => {
        const card = craeteInstanceSection(
          {
            items: item,
            renderer: (item) => {
              const instanceCard = createCard(item, userId);
              card.addItem(instanceCard.generateCard());
            },
          },
          cardsContainer
        );
        card.renderItem(item);
        popupAddCard.close();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => {
        renderLoading(".add-popup__button-submit", false);
      });
  },
});
popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  formAddCard.resetValidation();
  popupAddCard.open();
});

const popupConfirm = new PopupWithConfirmation({
  selector: ".remove-popup",
});
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm({
  selector: ".avatar-popup",
  handleFormSubmit: (data) => {
    renderLoading(".avatar-popup__button-submit", true);
    api
      .setAvatar(data.link)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupAvatar.close();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => renderLoading(".avatar-popup__button-submit", false));
  },
});
popupAvatar.setEventListeners();
buttonAvatar.addEventListener("click", () => {
  formAvatar.resetValidation();
  popupAvatar.open();
});

const popupProfile = new PopupWithForm({
  selector: ".profile-popup",
  handleFormSubmit: (userData) => {
    renderLoading(".popup__button-submit", true);
    api
      .setUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupProfile.close();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => renderLoading(".popup__button-submit", false));
  },
});
popupProfile.setEventListeners();
buttonEditProfile.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  popupProfile.setInputValues(info);
  formProfile.resetValidation();
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
