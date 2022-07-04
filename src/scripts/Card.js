export default class Card {
  constructor(item, selector, { handleCardClick }, api, userId, popupDeletCard) {
    this._item = item;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._userId = userId;

    this._element = this._getElement();
    this._elementImage = this._element.querySelector(".elements__image");
    this._buttonDelete = this._element.querySelector(".elements__delete");
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
    this._elementImage.src = this._item.link;
    this._elementImage.alt = this._item.name;
    this._element.querySelector(".elements__header").textContent =
      this._item.name;
    if (this._userId !== this._item.owner._id) {
      this._buttonDelete.remove();
    }
    return this._element; 
  }

  _setEventListeners() {
    const buttonDelete = this._element.querySelector(".elements__delete");
    const buttonLike = this._element.querySelector(".elements__like");

    buttonDelete.addEventListener("click", () => {
      this._api.deleteCard(this._item._id);
      this._handleDeleteCard();
    });

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
