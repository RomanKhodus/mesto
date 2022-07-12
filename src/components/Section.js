export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._cardList = {};
  }

  renderItems() {
    this._items.reverse().forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem(item){
    this._renderer(item);
  }
}
