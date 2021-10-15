import { Popup } from "./Popup.js";

/* класс отображения иллюстрации */
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.illustration__image');
    this._caption = this._popup.querySelector('.illustration__caption');
  }

  /* открытие формы */
  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
