const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass,
  inputInvalidClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputInvalidClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  inputInvalidClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
  inputElement.classList.remove(inputInvalidClass);
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  inputInvalidClass
) => {
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

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
  inputInvalidClass
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
        inputInvalidClass
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
    inputInvalidClass,
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
        inputInvalidClass
      );
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const resetInputsErrors = (
  popup,
  inputSelector,
  inputErrorSelector,
  errorClass,
  inputInvalidClass
) => {
  const errorList = Array.from(popup.querySelectorAll(inputErrorSelector));
  errorList.forEach((errorElement) => {
    errorElement.classList.remove(errorClass);
  });

  const inputList = Array.from(popup.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(inputInvalidClass);
  });
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled", "");
};

const disabledSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disabledSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

const options = {
  formSelector: ".popup__form",
  formSet: ".popup__form-set",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  inputErrorSelector: ".popup__input-error",
  errorClass: "popup__input-error_visible",
  inputInvalidClass: "popup__input_invalid",
};
enableValidation(options);
