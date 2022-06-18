// import {profileName, profileJob} from '../utils/constants.js'

export default class UserInfo {
  constructor(userData) {
    this._nameElement = document.querySelector(userData.nameSelector);
    this._jobElement = document.querySelector(userData.jobSelector);
  }

  getUserInfo(){
    return this._formValues = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(nameinput, jobinput){
    this._nameInput = document.querySelector(nameinput);
    this._jobInput = document.querySelector(jobinput);

    this._nameInput.value = this._formValues.name;
    this._jobInput.value = this._formValues.job;
  }
}