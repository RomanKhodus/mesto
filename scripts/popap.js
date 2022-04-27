// Шаблоны

const elementTemplate = document
  .querySelector("#elements-template")
  .content.querySelector(".elements__card");

// DOM Элементы

const cardsContainer = document.querySelector(".elements");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup");
const popupProfileForm = popupProfile.querySelector(".popup-form");
const inputNamePopupProfile = document.querySelector(
  ".popup__form-input_type_name"
);``
const inputJobPopupProfile = document.querySelector(
  ".popup__form-input_type_job"
);
const buttonClosePopupProfile = document.querySelector(".popup__button-close");
const buttonSubmitPopupProfile = document.querySelector(
  ".popup__button-submit"
);

const popupAddCard = document.querySelector(".popup.add-popup");
const popupAddCardForm = document.querySelector(".add-popup-form");
const inputPlacePopupAddCard = document.querySelector(
  ".popup__form-input_type_place"
);
const inoutLinkPopupAddCard = document.querySelector(
  ".popup__form-input_type_link"
);
const buttonClosePopupAddCard = document.querySelector(
  ".popup__button-close.add-popup__button-close"
);
const buttonSubmitPopupAddCard = document.querySelector(
  ".add-popup__button-submit"
);

const popupCardImage = document.querySelector(".popup-image");
const imagePopupCardImage = document.querySelector(".popup-image__image");
const captionPopupCardImage = document.querySelector(".popup-image__caption");
const buttonClosePopupCardImage = document.querySelector(
  ".popup-image__button-close"
);


const addDefaultFieldValues = () => {
  inputNamePopupProfile.value = profileName.textContent;
  inputJobPopupProfile.value = profileJob.textContent;
};

const resetDefaultFieldValues = () => {
  inputPlacePopupAddCard.value = "";
  inoutLinkPopupAddCard.value = "";
};

const addContentPopapCardImage = (evt) => {
  const headerText =
    evt.target.closest(".elements__card").querySelector('.elements__header').textContent;
  captionPopupCardImage.textContent = headerText;

  imagePopupCardImage.src = evt.target.src;
};

// Обработчики событий

const closePopup = (evt) => {
  if (
    evt.target.className == buttonClosePopupProfile.className ||
    buttonSubmitPopupProfile.className
  ) {
    popupProfile.classList.remove("popup_opened");
  }

  if (
    evt.target.className == buttonClosePopupAddCard.className ||
    buttonSubmitPopupAddCard.className
  ) {
    popupAddCard.classList.remove("popup_opened");
    resetDefaultFieldValues();
  }

  if (evt.target.className == buttonClosePopupCardImage.className) {
    popupCardImage.classList.remove("popup_opened");
  }
};

const openPopup = (evt) => {
  if (evt.target.className == buttonEditProfile.className) {
    addDefaultFieldValues();
    popupProfile.classList.add("popup_opened");

    buttonClosePopupProfile.addEventListener("click", closePopup);
    popupProfileForm.addEventListener("submit", formPopupProfileSubmitHandler);
  }

  if (evt.target.className == buttonAddCard.className) {
    popupAddCard.classList.add("popup_opened");

    buttonClosePopupAddCard.addEventListener("click", closePopup);
    popupAddCardForm.addEventListener("submit", formAddCardSubmitHandler);
  }

  if (evt.target.className == "elements__image") {
    addContentPopapCardImage(evt);
    popupCardImage.classList.add("popup_opened");

    buttonClosePopupCardImage.addEventListener("click", closePopup);
  }
};

const formPopupProfileSubmitHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = inputNamePopupProfile.value;
  profileJob.textContent = inputJobPopupProfile.value;

  closePopup(evt);
};

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();

  renderElementsCard({
    name: inputPlacePopupAddCard.value,
    link: inoutLinkPopupAddCard.value,
  });

  inputPlacePopupAddCard.value = "";
  inoutLinkPopupAddCard.value = "";

  closePopup(evt);
};

const handleLikeToggle = (evt) => {
  evt.target
    .closest(".elements__like")
    .classList.toggle("elements__like_active");
};

const handleDeleteCard = (evt) => {
  evt.target.closest(".elements__card").remove();
};

// Генерация карточки

const generateElementsCard = (cardsData) => {
  const newElementsCard = elementTemplate.cloneNode(true);
  const imageOfCard = newElementsCard.querySelector(".elements__image");

  newElementsCard.querySelector(".elements__header").textContent =
    cardsData.name;
  imageOfCard.src = cardsData.link;

  const buttonLike = newElementsCard.querySelector(".elements__like");
  buttonLike.addEventListener("click", handleLikeToggle);

  const buttonDelete = newElementsCard.querySelector(".elements__delete");
  buttonDelete.addEventListener("click", handleDeleteCard);

  imageOfCard.addEventListener("click", openPopup);

  return newElementsCard;
};

// Рендеринг Карточек

const renderElementsCard = (cardsData) => {
  cardsContainer.append(generateElementsCard(cardsData));
};

initialCards.forEach((cardsData) => {
  renderElementsCard(cardsData);
});

// События

buttonEditProfile.addEventListener("click", openPopup);
buttonAddCard.addEventListener("click", openPopup);
