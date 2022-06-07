export default class FormValidator {
  constructor(options, formElement) {
    this.formElement = formElement;
    this.formSelector = options.formSelector;
    this.formSet = options.formSet;
    this.inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    this.buttonElement = formElement.querySelector(
      options.submitButtonSelector
    );
    this.inactiveButtonClass = options.inactiveButtonClass;
    this.inputErrorClass = options.inputErrorClass;
    this.errorList = Array.from(
      formElement.querySelectorAll(options.inputErrorSelector)
    );
    this.errorClass = options.errorClass;
    this.inputInvalidClass = options.inputInvalidClass;
  }

  _setEventListeners(
    formElement,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
    inputInvalidClass
  ) {
    this._toggleButtonState(
      this.inputList,
      this.buttonElement,
      inactiveButtonClass
    );

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          formElement,
          inputElement,
          inputErrorClass,
          errorClass,
          inputInvalidClass
        );
        this._toggleButtonState(
          this.inputList,
          this.buttonElement,
          inactiveButtonClass
        );
      });
    });
  }

  _showInputError(
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass,
    inputInvalidClass
  ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputInvalidClass);
  }

  _hideInputError(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
    inputInvalidClass
  ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
    inputElement.classList.remove(inputInvalidClass);
  }

  _checkInputValidity(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
    inputInvalidClass
  ) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass,
        inputInvalidClass
      );
    } else {
      this._hideInputError(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
        inputInvalidClass
      );
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      this.disabledSubmitButton(buttonElement, inactiveButtonClass);
    } else {
      this.enableSubmitButton(buttonElement, inactiveButtonClass);
    }
  }

  enableSubmitButton() {
    this.buttonElement.classList.remove(this.inactiveButtonClass);
    this.buttonElement.removeAttribute("disabled", "");
  }

  disabledSubmitButton() {
    this.buttonElement.classList.add(this.inactiveButtonClass);
    this.buttonElement.setAttribute("disabled", "");
  }

  resetInputsErrors() {
    this.errorList.forEach((errorElement) => {
      errorElement.classList.remove(this.errorClass);
    });

    this.inputList.forEach((inputElement) => {
      inputElement.classList.remove(this.inputInvalidClass);
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(
      this.formElement,
      this.inactiveButtonClass,
      this.inputErrorClass,
      this.errorClass,
      this.inputInvalidClass
    );
  }
}
