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
const popupForm = popupProfile.querySelector(".popup-form");
const nameInput = document.querySelector(".popup__form-input_type_name");
const jobInput = document.querySelector(".popup__form-input_type_job");
const buttonClosePopupProfile = document.querySelector(".popup__button-close");
const buttonSubmitPopupProfile = document.querySelector(".popup__button-submit");

const popupAddCard = document.querySelector(".popup.add-popup");
const popupAddCardForm = document.querySelector(".add-popup-form");
const placeInput = document.querySelector(".popup__form-input_type_place");
const linkInput = document.querySelector(".popup__form-input_type_link");
const buttonClosePopupAddCard = document.querySelector(
  ".popup__button-close.add-popup__button-close"
);
const buttonSubmitPopupAddCard = document.querySelector(
  ".add-popup__button-submit"
);

const imagePopup = document.querySelector(".popup-image");
const imageOfPopup = document.querySelector(".popup-image__image");
const captionAddPopup = document.querySelector(".popup-image__caption");
const buttonCloseImage = document.querySelector(".popup-image__button-close");

// Обработчики событий

function openPopup(evt) {
  if (evt.target.className == buttonEditProfile.className) {
    popupProfile.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }

  if (evt.target.className == buttonAddCard.className) {
    popupAddCard.classList.add("popup_opened");
  }
}

function closePopup(evt) {
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
    placeInput.value = "";
    linkInput.value = "";
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt);
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  renderElementsCard({
    name: placeInput.value,
    link: linkInput.value,
  });

  placeInput.value = "";
  linkInput.value = "";

  closePopup(evt);
}

const handleLikeToggle = (evt) => {
  evt.target
    .closest(".elements__like")
    .classList.toggle("elements__like_active");
};

const handleDeleteCard = (evt) => {
  evt.target.closest(".elements__card").remove();
};

const openImagePopup = (evt) => {
  const popupImage = document.querySelector(".popup-image");
  popupImage.classList.add("popup_opened");

  const popupCaption = document.querySelector(".popup-image__caption");
  const headerText = evt.target.closest(".elements__card").children[2].children[0].textContent;
  popupCaption.textContent = headerText;

  imageOfPopup.src = evt.target.src;
};

const closeImagePopup = () => {
  imagePopup.classList.remove("popup_opened");
}

// Генерация карточки

const generateElementsCard = (cardsData) => {
  const newElementsCard = elementTemplate.cloneNode(true);

  newElementsCard.querySelector(".elements__header").textContent =
    cardsData.name;
  newElementsCard.querySelector(".elements__image").src = cardsData.link;

  const likeButton = newElementsCard.querySelector(".elements__like");
  likeButton.addEventListener("click", handleLikeToggle);

  const deleteButton = newElementsCard.querySelector(".elements__delete");
  deleteButton.addEventListener("click", handleDeleteCard);

  const openImage = newElementsCard.querySelector(".elements__image");
  openImage.addEventListener("click", openImagePopup);

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

buttonClosePopupProfile.addEventListener("click", closePopup);
buttonClosePopupAddCard.addEventListener("click", closePopup);

popupForm.addEventListener("submit", formSubmitHandler);
popupAddCardForm.addEventListener("submit", formAddSubmitHandler);
buttonCloseImage.addEventListener("click", closeImagePopup);
