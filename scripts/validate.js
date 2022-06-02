export const showInputError = (
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

export const hideInputError = (
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

export const checkInputValidity = (
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

// const setEventListeners = (
//   formElement,
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass,
//   inputInvalidClass
// ) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);

//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(
//         formElement,
//         inputElement,
//         inputErrorClass,
//         errorClass,
//         inputInvalidClass
//       );
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// };

// const enableValidation = (options) => {
//   const formSelector = options.formSelector;
//   const formSet = options.formSet;
//   const inputSelector = options.inputSelector;
//   const submitButtonSelector = options.submitButtonSelector;
//   const inactiveButtonClass = options.inactiveButtonClass;
//   const inputErrorClass = options.inputErrorClass;
//   const errorClass = options.errorClass;
//   const inputInvalidClass = options.inputInvalidClass;

//   const formList = Array.from(document.querySelectorAll(formSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });

//     const fieldsetList = Array.from(formElement.querySelectorAll(formSet));

//     fieldsetList.forEach((fieldSet) => {
//       setEventListeners(
//         fieldSet,
//         inputSelector,
//         submitButtonSelector,
//         inactiveButtonClass,
//         inputErrorClass,
//         errorClass,
//         inputInvalidClass
//       );
//     });
//   });
// };

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const resetInputsErrors = (popup, options) => {
  const inputSelector = options.inputSelector;
  const inputErrorSelector = options.inputErrorSelector;
  const errorClass = options.errorClass;
  const inputInvalidClass = options.inputInvalidClass;
  const errorList = Array.from(popup.querySelectorAll(inputErrorSelector));

  errorList.forEach((errorElement) => {
    errorElement.classList.remove(errorClass);
  });

  const inputList = Array.from(popup.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(inputInvalidClass);
  });
};

export const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled", "");
};

export const disabledSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", "");
};

export const toggleButtonState = (
  inputList,
  buttonElement,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputList)) {
    disabledSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

