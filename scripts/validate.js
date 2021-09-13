/* отображение ошибки ввода данных */
function showInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

/* скрытие ошибки ввода данных */
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

/* скрытие ошибки ввода данных при закрытии формы */
function setCloseListener(formElement, inputElement, inputErrorClass, errorClass) {
  const buttonClose = formElement.querySelector('.popup__button-close');
  buttonClose.addEventListener('click', () => hideInputError(formElement,
    inputElement, inputErrorClass, errorClass));
}

/* проверка поля ввода */
function checkInputValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

/* отключение кнопки отправки формы */
function disableButtonSubmit(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

/* включение кнопки отправки формы */
function enableButtonSubmit(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

/* проверка формы */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/* проверка формы на пустые поля */
function hasEmptyValue(inputList) {
  return inputList.some((inputElement) => {
    return inputElement.value.length === 0;
  });
}

/* переключение состояния кнопки отправки формы */
function toggleButtonState(formElement, inputList, submitButtonSelector,
  inactiveButtonClass) {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList) || hasEmptyValue(inputList)) {
    disableButtonSubmit(buttonElement, inactiveButtonClass);
  } else {
    enableButtonSubmit(buttonElement, inactiveButtonClass);
  }
}

/* добавление слушателя */
function setEventListeners(formElement, inputSelector, inputErrorClass,
  errorClass, submitButtonSelector, inactiveButtonClass) {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });

    setCloseListener(formElement, inputElement, inputErrorClass, errorClass)
  });

  const buttonOpenList = document.querySelectorAll('.button-open');
  buttonOpenList.forEach((buttonOpen) => {
    buttonOpen.addEventListener('click', () => toggleButtonState(formElement,
      inputList, submitButtonSelector, inactiveButtonClass));
  });
}

/* проверка форм */
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config.inputErrorClass,
      config.errorClass, config.submitButtonSelector, config.inactiveButtonClass);
  });
}

enableValidation(listSelector);
