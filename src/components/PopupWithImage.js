import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);

    this.imageElement = this._popup.querySelector(".image-popup__image");
    this._caption = this._popup.querySelector(".image-popup__caption");
  }

  open(data){
    this.imageElement.src = data.image;
    this.imageElement.alt = data.name;
    this._caption.textContent = data.name;
    
    super.open();
  }
}