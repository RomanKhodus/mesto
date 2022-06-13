export default class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._formSet = options.formSet;
    this._inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      options.submitButtonSelector
    );
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorList = Array.from(
      formElement.querySelectorAll(options.inputErrorSelector)
    );
    this._errorClass = options.errorClass;
    this._inputInvalidClass = options.inputInvalidClass;
  }

  _setEventListeners(
    formElement,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
    inputInvalidClass
  ) {
    this._toggleButtonState(
      this._inputList,
      this._buttonElement,
      inactiveButtonClass
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          formElement,
          inputElement,
          inputErrorClass,
          errorClass,
          inputInvalidClass
        );
        this._toggleButtonState(
          this._inputList,
          this._buttonElement,
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
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", "");
  }

  disabledSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "");
  }

  resetInputsErrors() {
    this._errorList.forEach((errorElement) => {
      errorElement.classList.remove(this._errorClass);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputInvalidClass);
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(
      this._formElement,
      this._inactiveButtonClass,
      this._inputErrorClass,
      this._errorClass,
      this._inputInvalidClass
    );
  }
}
