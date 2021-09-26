/* класс валидации форм */
export class FormValidator {
  constructor(listSelector, formElement) {
    this._formElement = formElement;
    this._formSelector = listSelector.formSelector;
    this._inputSelector = listSelector.inputSelector;
    this._submitButtonSelector = listSelector.submitButtonSelector;
    this._inactiveButtonClass = listSelector.inactiveButtonClass;
    this._inputErrorClass = listSelector.inputErrorClass;
    this._errorClass = listSelector.errorClass;
  }

  /* отображение ошибки ввода данных */
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  /* скрытие ошибки ввода данных */
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /* проверка поля ввода */
  _checkInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /* отключение кнопки отправки формы */
  _disableButtonSubmit(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  /* включение кнопки отправки формы */
  _enableButtonSubmit(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  /* проверка формы */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /* проверка формы на пустые поля */
  _hasEmptyValue(inputList) {
    return inputList.some((inputElement) => {
      return inputElement.value.length === 0;
    });
  }

  /* переключение состояния кнопки отправки формы */
  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput(inputList) || this._hasEmptyValue(inputList)) {
      this._disableButtonSubmit(buttonElement);
    } else {
      this._enableButtonSubmit(buttonElement);
    }
  }

  /* добавление слушателя */
  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._toggleButtonState(inputList);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);

      inputElement.addEventListener('input', () => {
        this._checkInputValid(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  /* проверка форм */
  enableValidation() {
    this._setEventListeners();
  }
}
