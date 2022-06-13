// import {
//   openPopup,
//   popupCardImage,
//   captionPopupCardImage,
//   imagePopupCardImage,
// } from "./index.js";

export default class Card {
  constructor(item, selector, {handleCardClick}) {
    this._image = item.link;
    this._name = item.name;
    this._selector = selector;
    this._element = this._getElement();
    this._elementImage = this._element.querySelector(".elements__image");
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    this._elementImage.src = this._image;
    this._elementImage.alt = this._name;

    this._element.querySelector(".elements__header").textContent = this._name;

    return this._element;
  }

  // _openPopupCardImage() {
  //   captionPopupCardImage.textContent = this._name;
  //   imagePopupCardImage.src = this._image;

  //   openPopup(popupCardImage);
  // }

  _setEventListeners() {
    const buttonDelete = this._element.querySelector(".elements__delete");
    const buttonLike = this._element.querySelector(".elements__like");

    buttonDelete.addEventListener("click", () => this._handleDeleteCard());

    buttonLike.addEventListener("click", this._handleLikeToggle);
    this._elementImage.addEventListener("click", this._handleCardClick);
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeToggle(evt) {
    evt.target.classList.toggle("elements__like_active");
  }
}
