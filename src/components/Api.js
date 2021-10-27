/* класс выполнения запросов */
export class Api {
  constructor(config) {
    this._headers = config.headers;
  }

  /* обработка запроса */
  _handleRequest(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  /* запрос на получение информации о пользователе */
  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._handleRequest(res));
  }

  /* запрос на изменение информации о пользователе */
  setUserInfo(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._handleRequest(res));
  }

  /* запрос на изменение аватара пользователя */
  setUserAvatar(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._handleRequest(res));
  }

  /* запрос на получение массива карточек */
  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._handleRequest(res));
  }

  /* запрос на добавление карточки */
  addCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._handleRequest(res));
  }

  /* запрос на удаление карточки */
  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-29/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._handleRequest(res));
  }

  /* запрос на добавление лайка карточки */
  setLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-29/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._handleRequest(res));
  }

  /* запрос на добавление лайка карточки */
  removeLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-29/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._handleRequest(res));
  }
}
