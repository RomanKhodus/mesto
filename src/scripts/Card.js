export default class Card {
  constructor(
    item,
    selector,
    { handleCardClick},
    api,
    userId,
    popupConfirm
  ) {
    this._item = item;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._userId = userId;
    this._popupConfirm = popupConfirm;

    this._element = this._getElement();
    this._likes = this._item.likes;
    this._elementImage = this._element.querySelector(".elements__image");
    this._buttonDelete = this._element.querySelector(".elements__delete");
    this._likeCounter = this._element.querySelector(".elements__like-counter");
    this._elementLike = this._element.querySelector(".elements__like");
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
    this._cardIsLiked();
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

  _cardIsLiked() {
    if (
      this._likes.some((user) => {
        return user._id === this._userId
      })
    ) {
      return this._handleLikeAdd();
    } 
    return console.log('пришел сюда');
  }
  _setEventListeners() {
    const buttonDelete = this._element.querySelector(".elements__delete");
    const buttonLike = this._element.querySelector(".elements__like");

    buttonDelete.addEventListener("click", () => {
      this._popupConfirm.setEventListeners(this._item._id, this._element);
      this._popupConfirm.open();
    });
    buttonLike.addEventListener("click", () => {
      if (this._elementLike.classList.contains("elements__like_active")) {
        this._api.removeLike(this._item._id).then(res=>{
          return this._likeCounter.textContent = res.likes.length;
        })
          this._handleLikeRemove();
      } else {
        this._api.addLikes(this._item._id).then(res=>{
          return (this._likeCounter.textContent = res.likes.length);
        });
        this._handleLikeAdd();
      }
    });
    this._elementImage.addEventListener("click", this._handleCardClick);
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeAdd() {
    this._elementLike.classList.add("elements__like_active");
  }
  _handleLikeRemove() {
    this._elementLike.classList.remove("elements__like_active");
  }
}
