import { openForm, popupIllustration } from "./index.js";

/* класс создания карточки */
export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  /* показ иллюстрации */
  _showIllustration() {
    const image = popupIllustration.querySelector('.illustration__image');
    const caption = popupIllustration.querySelector('.illustration__caption');
    image.src = this._link;
    image.alt = this._name;
    caption.textContent = this._name;

    openForm(popupIllustration);
  }

  /* удаление карточки места */
  _deletePlace() {
    this._card.remove();
  };

  /* лайк карточки места */
  _likePlace(evt) {
    evt.target.classList.toggle('place__button-like_active');
  };

  /* создание карточки места */
  createCard() {
    this._card = this._template.cloneNode(true).children[0];
    this._image = this._card.querySelector('.place__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._card.querySelector('.place__title').textContent = this._name;

    this._card.querySelector('.place__button-delete')
    .addEventListener('click', () => this._deletePlace());
    this._card.querySelector('.place__button-like')
    .addEventListener('click', this._likePlace);
    this._image.addEventListener('click', () => this._showIllustration());

    return this._card;
  }
}
