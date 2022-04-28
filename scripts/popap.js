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
const formPopupProfile = popupProfile.querySelector(".popup-form");
const inputNamePopupProfile = document.querySelector(
  ".popup__form-input_type_name"
);
``;
const inputJobPopupProfile = document.querySelector(
  ".popup__form-input_type_job"
);
const buttonClosePopupProfile = document.querySelector(".popup__button-close");
const buttonSubmitPopupProfile = document.querySelector(
  ".popup__button-submit"
);

const popupAddCard = document.querySelector(".popup.add-popup");
const formPopupAddCard = document.querySelector(".add-popup-form");
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

// Открытие модальных окон

function openPopup(popup) {
  popup.classList.add("popup_opened");
};

function openPopupProfile() {
  inputNamePopupProfile.value = profileName.textContent;
  inputJobPopupProfile.value = profileJob.textContent;

  openPopup(popupProfile);
};

function openPopupAddCard() {
  openPopup(popupAddCard);
};

function openPopupCardImage(evt) {
  const headerText = evt.target
    .closest(".elements__card")
    .querySelector(".elements__header").textContent;
  captionPopupCardImage.textContent = headerText;
  imagePopupCardImage.src = evt.target.src;
  evt.target.alt = headerText;

  openPopup(popupCardImage);
}

// Закрытие модалных окон

function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

function closePopupProfile() {
  closePopup(popupProfile);
};

function closePopupAddCard() {
  inputPlacePopupAddCard.value = "";
  inoutLinkPopupAddCard.value = "";

  closePopup(popupAddCard);
}

function closePopupCardImage() {
  closePopup(popupCardImage);
};

// Обработчики

function formPopupProfileSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = inputNamePopupProfile.value;
  profileJob.textContent = inputJobPopupProfile.value;

  closePopupProfile();
};

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();

  renderElementsCard({
    name: inputPlacePopupAddCard.value,
    link: inoutLinkPopupAddCard.value,
  });

  inputPlacePopupAddCard.value = "";
  inoutLinkPopupAddCard.value = "";

  closePopupAddCard();
};

// Лайки

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
  imageOfCard.alt = cardsData.name;

  const buttonLike = newElementsCard.querySelector(".elements__like");
  buttonLike.addEventListener("click", handleLikeToggle);

  const buttonDelete = newElementsCard.querySelector(".elements__delete");
  buttonDelete.addEventListener("click", handleDeleteCard);

  imageOfCard.addEventListener("click", openPopupCardImage);

  return newElementsCard;
};

// Рендеринг Карточек

const renderElementsCard = (cardsData) => {
  cardsContainer.append(generateElementsCard(cardsData));
};

initialCards.forEach((cardsData) => {
  renderElementsCard(cardsData);
});

// Слушатели событий

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddCard.addEventListener("click", openPopupAddCard);
buttonClosePopupCardImage.addEventListener("click", closePopupCardImage);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
formPopupAddCard.addEventListener("submit", formAddCardSubmitHandler);
buttonClosePopupProfile.addEventListener("click", closePopupProfile);
formPopupProfile.addEventListener("submit", formPopupProfileSubmitHandler);