// import {profileName, profileJob} from '../utils/constants.js'

export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._element = document.querySelector(".profile-popup");

    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    this._nameInput = this._element.querySelector("#name-input");
    this._jobInput = this._element.querySelector("#job-input");
  }

  getUserInfo(){
    return this._formValues = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(){
    this._nameInput.value = this._formValues.name;
    this._jobInput.value = this._formValues.job;
  }
}