export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    // this._element = this._getElement();
    this._buttonClose = this._popup.querySelector(".popup__button-close");
  }

  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", (evt) =>
      this._handleEscClose(evt)
    );
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("click", this.close);
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
    this._buttonClose.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (evt) =>
      this._handleOverlayClickClose(evt)
    );
  }

  // _getElement() {
  //   const popupElement = document.querySelector(this._selector);

  //   return popupElement;
  // }
}
