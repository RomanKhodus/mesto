const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass,
  InputInvalidClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(InputInvalidClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  InputInvalidClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(InputInvalidClass);
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  InputInvalidClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass,
      InputInvalidClass
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
      InputInvalidClass
    );
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
  InputInvalidClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
        InputInvalidClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (options) => {
  const {
    formSelector,
    formSet,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
    InputInvalidClass,
  } = options;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(formSet));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(
        fieldSet,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
        InputInvalidClass
      );
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
};

const options = {
  formSelector: ".popup__form",
  formSet: ".popup__form-set",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
  InputInvalidClass: "popup__input_invalid",
};
enableValidation(options);
