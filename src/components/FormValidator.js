/* класс валидации форм */
export class FormValidator {
  constructor(selectorsList, formElement) {
    this._formElement = formElement;
    this._formSelector = selectorsList.formSelector;
    this._inputSelector = selectorsList.inputSelector;
    this._submitButtonSelector = selectorsList.submitButtonSelector;
    this._inactiveButtonClass = selectorsList.inactiveButtonClass;
    this._inputErrorClass = selectorsList.inputErrorClass;
    this._errorClass = selectorsList.errorClass;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
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
  _disableButtonSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  /* включение кнопки отправки формы */
  _enableButtonSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  /* проверка формы */
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /* проверка формы на пустые поля */
  _hasEmptyValue() {
    return this._inputList.some((inputElement) => {
      return inputElement.value.length === 0;
    });
  }

  /* переключение состояния кнопки отправки формы */
  _toggleButtonState() {
    if (this._hasInvalidInput() || this._hasEmptyValue()) {
      this._disableButtonSubmit();
    } else {
      this._enableButtonSubmit();
    }
  }

  /* добавление слушателя */
  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /* сброс проверки формы */
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  /* проверка форм */
  enableValidation() {
    this._setEventListeners();
  }
}
