export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserInfo(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setNewCard(cardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  renderLoading(buttonSelector, isLoading){
    const btnSubmit = document.querySelector(buttonSelector);
    if (isLoading) {
      btnSubmit.textContent = "Сохранение...";
    } else {
      btnSubmit.textContent = "Сохранить";
    }
  }

  likeCounter(evt, cardData) {
    if (evt.target.classList.contain("elements__like_active")) {
      return setNewCard(cardData);
    }
  }

  _addLikeCounter(evt) {
    if (evt.target.classList.contain("elements__like_active")) {
      return fetch(``);
    }
  }

  _removeLikeCounter() {}

}