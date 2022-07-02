export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems
      .then((items) => {
        items.forEach((item) => this._renderer(item));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  // itemIsOwner(ownerInfo, userId) {
  //   ownerInfo.then((res) => {
  //     if(res._id == userId){
  //       return 
  //     }
  //   })
  // }

  addItem(element) {
    this._container.prepend(element);
  }
}