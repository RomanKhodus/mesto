import {
  openPopup,
  closePopupCardImage,
  popupCardImage,
  captionPopupCardImage,
  imagePopupCardImage,
} from "./index.js";

export default class Card {
  constructor(data, selector) {
    this._image = data.link;
    this._name = data.name;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector(".elements__image").src = this._image;
    this._element.querySelector(".elements__image").alt = this._name;

    this._element.querySelector(".elements__header").textContent = this._name;

    return this._element;
  }

  _openPopupCardImage() {
    captionPopupCardImage.textContent = this._name;
    imagePopupCardImage.src = this._image;

    openPopup(popupCardImage);
  }

  _setEventListeners() {
    const buttonDelete = this._element.querySelector(".elements__delete");
    const buttonLike = this._element.querySelector(".elements__like");
    const imageElement = this._element.querySelector(".elements__image");
    const buttonClosePopupCardImage = document.querySelector(
      ".image-popup__button-close"
    );

    buttonDelete.addEventListener("click", this._handleDeleteCard);

    buttonLike.addEventListener("click", this._handleLikeToggle);

    imageElement.addEventListener("click", () => this._openPopupCardImage());

    buttonClosePopupCardImage.addEventListener("click", closePopupCardImage);
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".elements__card").remove();
    this._element = null;
  }

  _handleLikeToggle(evt) {
    evt.target.classList.toggle("elements__like_active");
  }
}
