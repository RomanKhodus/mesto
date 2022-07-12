export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._cardList = {};
  }

  renderItems(cards) {
    cards.reverse().forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem(item){
    this._renderer(item);
  }
}
