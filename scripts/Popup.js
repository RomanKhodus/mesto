export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = this._getElement();
    this._buttonClose = this._element.querySelector(".popup__button-close");
  }

  open() {
    this._element.classList.add("popup_opened");

    document.addEventListener("keydown", (evt) =>
      this._handleEscClose(evt, this)
    );
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("click", this.close);
  }

  // содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt,popup) {
    if (evt.key === "Escape") {
      popup.close();
    }
  }

  _handleOverlayClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._buttonClose.addEventListener("click", () => this.close());
    this._element.addEventListener("mousedown", (evt) => this._handleOverlayClickClose(evt));
  }

  _getElement() {
    const popupElement = document.querySelector(this._selector);

    return popupElement;
  }
}
