export const options = {
  formSelector: ".popup__form",
  formSet: ".popup__form-set",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  inputErrorSelector: ".popup__input-error",
  errorClass: "popup__input-error_visible",
  inputInvalidClass: "popup__input_invalid",
};

export const API_CONFIG = {
  baseUrl: "https://nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "d4e0a88c-5fa2-48db-8833-e95cc8b3f3cb",
    "Content-Type": "application/json",
  },
};
export const buttonAvatar = document.querySelector(".profile__avatar-container");
export const imageAvatar = buttonAvatar.querySelector(".profile__avatar");

export const cardsContainer = ".elements";
export const container = document.querySelector(cardsContainer);

export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonAddCard = document.querySelector(".profile__add-button");

export const buttonConfirmPopup = document.querySelector(
  ".remove-popup__button-submit"
); 

export const profileAvatar = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__name");
export const profileEbout = document.querySelector(".profile__job");

export const formPopupProfile = document.forms.formProfile;
export const nameInput = formPopupProfile.querySelector("#name-input");
export const jobInput = formPopupProfile.querySelector("#job-input");

export const formPopupAddCard = document.forms.formCard;
export const formPopupAvatar = document.forms.formAvatar;

