/* класс создания карточки */
export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  /* удаление карточки места */
  _deletePlace() {
    this._card.remove();
  };

  /* лайк карточки места */
  _likePlace(evt) {
    evt.target.classList.toggle('place__button-like_active');
  };

  /* добавление обработчиков */
  _setEventListeners() {
    this._card.querySelector('.place__button-delete')
    .addEventListener('click', () => this._deletePlace());
    this._card.querySelector('.place__button-like')
    .addEventListener('click', this._likePlace);
    this._image.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  /* получение разметки карточки из шаблона */
  _getTemplate() {
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.children[0].cloneNode(true);

    return this._card;
  }

  /* создание карточки места */
  createCard() {
    this._getTemplate();

    this._image = this._card.querySelector('.place__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._card.querySelector('.place__title').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}