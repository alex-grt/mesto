/* класс создания карточки */
export class Card {
  constructor({ data, ownerID, handleCardClick, handleCardDelete, toggleLike }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerCardID = data.owner._id;
    this._likes = data.likes;
    this._ownerID = ownerID;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._toggleLike = toggleLike;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.children[0].cloneNode(true);
    this._image = this._card.querySelector('.place__image');
    this._counter = this._card.querySelector('.place__counter-likes');
    this._title = this._card.querySelector('.place__title');
    this._buttonLike = this._card.querySelector('.place__button-like');
    this._buttonDelete = this._card.querySelector('.place__button-delete');
  }

  /* удаление кнопки удаления карточки */
  _removeButtonDelete() {
    console.log(this._ownerID);
    if (this._ownerCardID !== this._ownerID) {
      this._buttonDelete.remove();
    }
  }

  /* счётчик лайков */
  counterLikes(data) {
    this._counter.textContent = data.length;
  }

  /* отображение лайков пользователя */
  _showOwnerLike() {
    if (this._likes.find(item => item._id === this._ownerID)) {
      this._buttonLike.classList.add('place__button-like_active');
    } else {
      this._buttonLike.classList.remove('place__button-like_active');
    }
  }

  /* добавление обработчиков */
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => this._handleCardDelete(this._card, this._id));
    this._buttonLike.addEventListener('click', (evt) => this._toggleLike(evt, this._card, this._id));
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  /* создание карточки места */
  createCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this.counterLikes(this._likes);
    this._showOwnerLike();
    this._removeButtonDelete();
    this._setEventListeners();

    return this._card;
  }
}
