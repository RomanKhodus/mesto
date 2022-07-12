export default class Card {
  constructor(
    item,
    selector,
    { handleCardClick, handleDeleteClik, handleLike, handledislike },
    api,
    userId
  ) {
    this._item = item;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClik = handleDeleteClik;
    this._handleLike = handleLike;
    this._handledislike = handledislike;
    this._api = api;
    this._userId = userId;
    this._element = this._getElement();
    this._likes = this._item.likes;
    this._elementImage = this._element.querySelector(".elements__image");
    this._buttonDelete = this._element.querySelector(".elements__delete");
    this._likeCounter = this._element.querySelector(".elements__like-counter");
    this._likeButton = this._element.querySelector(".elements__like");
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
    this.apdateLikes(this._item);
    this._elementImage.src = this._item.link;
    this._elementImage.alt = this._item.name;
    this._element.querySelector(".elements__header").textContent =
      this._item.name;
    this._likeCounter.textContent = this._item.likes.length;
    if (this._userId !== this._item.owner._id) {
      this._buttonDelete.remove();
    }
    return this._element;
  }

  getId() {
    return this._item._id;
  }

  apdateLikes(res) {
    if (
      res.likes.some((user) => {
        return user._id === this._userId;
      })
    ) {
      this._likeCounter.textContent = res.likes.length;
      return this._handleLikeAdd();
    } else {
      this._likeCounter.textContent = res.likes.length;
      return this._handleLikeRemove();
    }
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", this._handleDeleteClik);

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("elements__like_active")) {
        this._handledislike(this);
      } else {
        this._handleLike(this);
      }
    });
    this._elementImage.addEventListener("click", this._handleCardClick);
  }

  createCard() {}

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeAdd() {
    this._likeButton.classList.add("elements__like_active");
  }

  _handleLikeRemove() {
    this._likeButton.classList.remove("elements__like_active");
  }
}
