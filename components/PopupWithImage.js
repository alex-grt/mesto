import { Popup } from "./Popup.js";

/* класс отображения иллюстрации */
export class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }

  /* открытие формы */
  open() {
    const image = document.querySelector('.illustration__image');
    const caption = document.querySelector('.illustration__caption');
    image.src = this._link;
    image.alt = this._name;
    caption.textContent = this._name;

    super.open();
  }
}
