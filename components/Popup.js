/* класс работы с модальными окнами */
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  /* открытие формы */
  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  /* закрытие формы */
  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  // по клавише Escape
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // по кнопке и оверлею
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    });
  }
}
