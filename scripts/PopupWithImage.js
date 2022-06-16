import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(item, selector){
    super(selector);

    this._element = super._getElement();
    this.imageElement = this._element.querySelector(".image-popup__image");
    this._image = item.link;
    this._name = item.name;
    this._caption = this._element.querySelector(".image-popup__caption");
  }

  open(){
    super.open();

    this.imageElement.src = this._image;
    this._caption.textContent = this._name;
  }
}