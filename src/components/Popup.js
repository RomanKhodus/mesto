export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
    this.close = this.close.bind(this);
    this._buttonClose = this._popup.querySelector(".popup__button-close");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
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
    this._buttonClose.addEventListener("click", this.close);
    this._popup.addEventListener("mousedown",
      this._handleOverlayClickClose
    );
  }
}
