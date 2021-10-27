/* импорт стилей */
import './index.css';

/* импорт классов */
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';

/* импорт констант и переменных */
import {
  /* Popup */
  popupAvatarSelector,
  popupProfileSelector,
  popupPlaceSelector,
  popupIllustrationSelector,
  popupConfirmationSelector,
  /* форма редактирования аватара */
  formAvatar,
  /* форма редактирования профиля */
  formProfile,
  inputNameProfile,
  inputAboutProfile,
  /* форма добавления карточки места */
  formPlace,
  /* данные для проверки форм */
  selectorsList,
  /* секция Profile */
  avatarSelector,
  profileNameSelector,
  profileAboutSelector,
  buttonAvatar,
  buttonEdit,
  buttonAdd,
  /* шаблон для секции Places */
  templateSelector,
  /* секция Places */
  placesGrid
} from '../utils/constants.js';

/* <<<раздел объявления общих функций и классов>>> */
/* создание копии класса веб-запросов */
const api = new Api({
  headers: {
    "authorization": "b02f2cf1-1397-498b-b986-5d871e627d26",
    "content-type": "application/json"
  }
});

/* создание копии класса карточки места */
function createCard(data) {
  const card = new Card({ data, userData, api, handleCardClick, handleCardDelete }, templateSelector);
  const cardElement = card.createCard();

  return cardElement;
}

/* создание копий класса Popup */
const popupAvatar = new PopupWithForm(popupAvatarSelector, submitFormAvatar);
const popupProfile = new PopupWithForm(popupProfileSelector, submitFormProfile);
const popupPlace = new PopupWithForm(popupPlaceSelector, submitFormPlace);
const popupIllustration = new PopupWithImage(popupIllustrationSelector);
const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);

/* создание копии класса UserInfo */
const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector }, avatarSelector);
/* <<<окончание раздела>>> */

/* <<<раздел Profile>>> */
// получение данных профиля
const userData = api.getUserInfo();

// заполнение профиля информацией
userData.then(data => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data);
})
.catch(err => alert(`Упс. Не удалось заполнить профиль. Ошибка: ${err}`));
/* <<<окончание раздела>>> */

/* <<<раздел Places>>> */
// заполнение страницы карточками мест
const cards = api.getCards();

cards.then(data => {
  const cardsList = new Section({
    items: data,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }
  }, placesGrid);

  cardsList.renderItems();
})
.catch(err => alert(`Упс. Не удалось получить карточки мест. Ошибка: ${err}`));
/* <<<окончание раздела>>> */

/* <<<раздел формы редактирования аватара>>> */
// отправка данных, введённых в форму редактирования аватара
function submitFormAvatar(info) {
  this._form.querySelector('.form__button-submit').textContent = 'Сохранение...';
  const newAvatar = api.setUserAvatar(info);

  newAvatar.then(data => userInfo.setUserAvatar(data))
  .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
  .finally(this._form.querySelector('.form__button-submit').textContent = 'Сохранить');
  popupAvatar.close();
}

popupAvatar.setEventListeners();

// проверка формы
const formAvatarValidator = new FormValidator(selectorsList, formAvatar);

formAvatarValidator.enableValidation();
/* <<<окончание раздела>>> */

/* <<<раздел формы редактирования профиля>>> */
// отправка данных, введённых в форму редактирования профиля
function submitFormProfile(info) {
  this._form.querySelector('.form__button-submit').textContent = 'Сохранение...';
  const newInfo = api.setUserInfo(info);

  newInfo.then(data => userInfo.setUserInfo(data))
  .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
  .finally(this._form.querySelector('.form__button-submit').textContent = 'Сохранить');
  popupProfile.close();
}

popupProfile.setEventListeners();

// проверка формы
const formProfileValidator = new FormValidator(selectorsList, formProfile);

formProfileValidator.enableValidation();
/* <<<окончание раздела>>> */

/* <<<раздел формы добавления карточки места>>> */
// отправка данных, введённых в форму добавления карточки места
const cardsList = new Section({}, placesGrid);

function submitFormPlace(cardData) {
  this._form.querySelector('.form__button-submit').textContent = 'Сохранение...';
  const card = api.addCard(cardData);

  card.then(data => cardsList.addItem(createCard(data)))
  .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
  .finally(this._form.querySelector('.form__button-submit').textContent = 'Создать');
  popupPlace.close();
}

popupPlace.setEventListeners();

// проверка формы
const formPlaceValidator = new FormValidator(selectorsList, formPlace);

formPlaceValidator.enableValidation();
/* <<<окончание раздела>>> */

/* <<<раздел подтверждения удаления карточки>>> */
function handleCardDelete(element, api, id) {
  popupConfirmation.open(element, api, id);
}

popupConfirmation.setEventListeners();
/* <<<окончание раздела>>> */

/* <<<раздел отображения иллюстрации>>> */
function handleCardClick(name, link) {
  popupIllustration.open(name, link);
}

popupIllustration.setEventListeners();
/* <<<окончание раздела>>> */

/* <<<раздел отслеживания действий пользователя>>> */
/* открытие форм */
// редактирования аватара
buttonAvatar.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
});

// редактирования профиля
buttonEdit.addEventListener('click', () => {
  userInfo.getUserInfo(inputNameProfile, inputAboutProfile);
  formProfileValidator.resetValidation();
  popupProfile.open();
});

// добавления карточки места
buttonAdd.addEventListener('click', () => {
  formPlaceValidator.resetValidation();
  popupPlace.open();
});
