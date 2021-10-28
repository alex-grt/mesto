import { Popup } from "./Popup.js";

/* класс подтверждения удаления карточки */
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._deleteCard = deleteCard;
    this._buttonConfirm = this._popup.querySelector('.form__button-submit_type_confirmation');
  }

  /* открытие формы подтверждения */
  open(element, id) {
    this._element = element;
    this._id = id;

    super.open();
  }

  /* отслеживание клика подтверждения удаления карточки */
  setEventListeners() {
    this._buttonConfirm.addEventListener('click', () => this._deleteCard(this._element, this._id));
    super.setEventListeners();
  }
}
