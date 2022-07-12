import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ selector}) {
    super(selector);
    this._buttonConfirm = this._popup.querySelector(
      ".remove-popup__button-submit"
    );
  }

  setSuccessHandler(remove) {
    this._buttonConfirm.removeEventListener("click", this.remove);
    this.remove = remove;
    this._buttonConfirm.addEventListener("click", this.remove);
  }
}
