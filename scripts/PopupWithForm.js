import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);

    this._handleFormSubmit = handleFormSubmit;
    this._element = super._getElement();
  }

  _getInputValues() {}

  setEventListeners(){
    super.setEventListeners();
    
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this._element.reset();
    });

  }

  close(){
    super.close();
    // this.reset();
  }
}
