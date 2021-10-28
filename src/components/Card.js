/* класс создания карточки */
export class Card {
  constructor({ data, userData, api, handleCardClick, handleCardDelete }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerCardID = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._userData = userData;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.children[0].cloneNode(true);
    this._buttonLike = this._card.querySelector('.place__button-like');
  }

  /* удаление кнопки удаления карточки */
  _removeButtonDelete(ownerID) {
    if (ownerID !== this._ownerCardID) {
      this._card.querySelector('.place__button-delete').remove();
    }
  }

  /* отключение возможности удаления чужих карточек */
  _disabledCardDelete() {
    this._userData.then(data => {
      this._removeButtonDelete(data._id);
    })
    .catch(err => console.log(`Не удалось получить данные профиля. Ошибка: ${err}`));
  }

  /* счётчик лайков */
  _counterLikes(data) {
    this._card.querySelector('.place__counter-likes').textContent = data.length;
  }

  /* отображение лайков пользователя */
  _showOwnerLike() {
    this._userData.then(data => {
      if (this._likes.find(item => item._id === data._id)) {
        this._buttonLike.classList.add('place__button-like_active');
      } else {
        this._buttonLike.classList.remove('place__button-like_active');
      }
    })
    .catch(err => console.log(`Не удалось получить данные профиля. Ошибка: ${err}`));
  }

  /* переключение лайков карточки */
  _toggleLike(evt) {
    if (this._card.querySelector('.place__button-like_active')) {
      this._api.removeLike(this._id)
      .then(data => {
        evt.target.classList.remove('place__button-like_active'),
        this._counterLikes(data.likes)
      })
      .catch(err => alert(`Не удалось снять лайк. Ошибка: ${err}`));
    } else {
      this._api.setLike(this._id)
      .then(data => {
        evt.target.classList.add('place__button-like_active'),
        this._counterLikes(data.likes)
      })
      .catch(err => alert(`Не удалось поставить лайк. Ошибка: ${err}`));
    }
  }

  /* добавление обработчиков */
  _setEventListeners() {
    this._card.querySelector('.place__button-delete')
    .addEventListener('click', () => this._handleCardDelete(this._card, this._id));
    this._buttonLike.addEventListener('click', (evt) => this._toggleLike(evt));
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  /* создание карточки места */
  createCard() {
    this._image = this._card.querySelector('.place__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._card.querySelector('.place__title').textContent = this._name;

    this._showOwnerLike();
    this._counterLikes(this._likes);
    this._disabledCardDelete();
    this._setEventListeners();

    return this._card;
  }
}
