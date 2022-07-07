export default class UserInfo {
  constructor(userData) {
    this._nameElement = document.querySelector(userData.nameSelector);
    this._jobElement = document.querySelector(userData.jobSelector);
    this._avatarElement = document.querySelector(userData.avatarSelector);
  }

  // getUserInfo() {
  //   return (this._formValues = {
  //     name: this._nameElement.textContent,
  //     job: this._jobElement.textContent,
  //   });
  // }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.about;
  }

  setUserAvatar(userData) {
    this._avatarElement.src = userData.avatar;  
  }
}
