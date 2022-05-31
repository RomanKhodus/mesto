import {
  toggleButtonState,
  showInputError,
  hideInputError,
} from "./validate.js";

export default class FormValidator {
  constructor(options, formElement) {
    this.formElement = formElement;

    this.formSelector = options.formSelector;
    this.formSet = options.formSet;
    this.inputSelector = options.inputSelector;
    this.submitButtonSelector = options.submitButtonSelector;
    this.inactiveButtonClass = options.inactiveButtonClass;
    this.inputErrorClass = options.inputErrorClass;
    this.errorClass = options.errorClass;
    this.inputInvalidClass = options.inputInvalidClass;
  }

  _setEventListeners(
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
    inputInvalidClass
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          formElement,
          inputElement,
          inputErrorClass,
          errorClass,
          inputInvalidClass
        );
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  }

  _checkInputValidity(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
    inputInvalidClass
  ) {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass,
        inputInvalidClass
      );
    } else {
      hideInputError(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
        inputInvalidClass
      );
    }
  };

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      this.formElement.querySelectorAll(this.formSet)
    );

    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(
        fieldSet,
        this.inputSelector,
        this.submitButtonSelector,
        this.inactiveButtonClass,
        this.inputErrorClass,
        this.errorClass,
        this.inputInvalidClass
      );
    });
  }
}
