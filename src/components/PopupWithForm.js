import { Popup } from "./Popup.js";

/* класс работы с формами */
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, form) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = form;
    this._inputList = form.querySelectorAll('.form__input');
    this._formValues = {};
  }

  /* сбор данных полей формы */
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  /* закрытие формы */
  close() {
    this._form.reset();
    super.close();
  }

  /* отправка формы */
  setEventListeners() {
    this._form.addEventListener('submit', () => this._submitForm(this._getInputValues()));
    super.setEventListeners();
  }
}
