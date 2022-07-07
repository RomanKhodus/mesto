import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, handlerCardDelet }) {
    super(selector);
    this._handlerCardDelet = handlerCardDelet;

    this._buttonConfirm = this._popup.querySelector(".popup__button-submit");
  }

  setEventListeners(cardId, cardElement) {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("click", () => {
      cardElement.remove();
      this._handlerCardDelet(cardId);
    });
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
