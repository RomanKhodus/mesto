export default class UserInfo {
  constructor(userData) {
    this._nameElement = document.querySelector(userData.nameSelector);
    this._jobElement = document.querySelector(userData.jobSelector);
    this._avatarElement = document.querySelector(userData.avatarSelector);
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return (this._formValues = {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
    });
  }

  setUserInfo(name, about, avatar, _id) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatarElement.src = avatar;
    this._id = _id;
  }

  setUserAvatar(userData) {
    this._avatarElement.src = userData.avatar;
  }
}
