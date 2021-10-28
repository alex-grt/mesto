import { Popup } from "./Popup.js";

/* класс подтверждения удаления карточки */
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector('.form__button-submit_type_confirmation');
  }

  /* открытие формы подтверждения */
  open(element, id, api) {
    this._element = element;
    this._api = api;
    this._id = id;

    super.open();
  }

  /* удаление карточки */
  _deleteCard() {
    this._api.deleteCard(this._id)
    .then(() => {
      this._element.remove();
      super.close();
    })
    .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`));
  }

  /* отслеживание клика подтверждения удаления карточки */
  setEventListeners() {
    this._buttonConfirm.addEventListener('click', () => this._deleteCard());
    super.setEventListeners();
  }
}
