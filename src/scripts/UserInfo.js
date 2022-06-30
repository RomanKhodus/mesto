export default class UserInfo {
  constructor(userData) {
    this._nameElement = document.querySelector(userData.nameSelector);
    this._jobElement = document.querySelector(userData.jobSelector);
  }

  // getUserInfo() {
  //   return (this._formValues = {
  //     name: this._nameElement.textContent,
  //     job: this._jobElement.textContent,
  //   });
  // }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    if (userData.job) {
      this._jobElement.textContent = userData.job;
    } else if (userData.about) {
      this._jobElement.textContent = userData.about;
    }
  }
}
