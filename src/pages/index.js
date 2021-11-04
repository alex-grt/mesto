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
  /* секция Places */
  templateSelector,
  placesGrid
} from '../utils/constants.js';

/* <<<раздел создания копий классов>>> */
// создание копии класса веб-запросов
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
    "authorization": "b02f2cf1-1397-498b-b986-5d871e627d26",
    "content-type": "application/json"
  }
});

// создание копии класса Card
function createCard(data) {
  const card = new Card({ data,
    ownerID,
    // отображение иллюстрации
    handleCardClick: (name, link) => {
      popupIllustration.open(name, link);
    },
    // форма подтверждения удаления карточки
    handleCardDelete: (element, id) => {
      popupConfirmation.open(element, id);
    },
    // переключение лайка карточки
    toggleLike: (evt, cardBlank, id) => {
      if (cardBlank.querySelector('.place__button-like_active')) {
        api.removeLike(id)
        .then(data => {
          evt.target.classList.remove('place__button-like_active'),
          card.counterLikes(data.likes)
        })
        .catch(err => alert(`Не удалось снять лайк. Ошибка: ${err}`));
      } else {
        api.setLike(id)
        .then(data => {
          evt.target.classList.add('place__button-like_active'),
          card.counterLikes(data.likes)
        })
        .catch(err => alert(`Не удалось поставить лайк. Ошибка: ${err}`));
      }
    }
  }, templateSelector);
  const cardElement = card.createCard();

  return cardElement;
}

// создание копии класса Section
const cardsList = new Section((item) => cardsList.addItem(createCard(item)), placesGrid);

// создание копий класса Popup
const popupAvatar = new PopupWithForm(popupAvatarSelector, submitFormAvatar);
const popupProfile = new PopupWithForm(popupProfileSelector, submitFormProfile);
const popupPlace = new PopupWithForm(popupPlaceSelector, submitFormPlace);
const popupIllustration = new PopupWithImage(popupIllustrationSelector);
const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector,
  // удаление карточки
  (element, id) => {
    api.deleteCard(id)
    .then(() => {
      element.remove();
      popupConfirmation.close();
    })
    .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`));
  }
);

// создание копии класса UserInfo
const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector }, avatarSelector);

// создание копий класса FormValidator
const formAvatarValidator = new FormValidator(selectorsList, formAvatar);
const formProfileValidator = new FormValidator(selectorsList, formProfile);
const formPlaceValidator = new FormValidator(selectorsList, formPlace);
/* <<<окончание раздела>>> */

/* <<<раздел заполнения страницы информацией>>> */
let ownerID = null;

api.getPageInfo()
.then(([ user, cards ]) => {
  ownerID = user._id;
  userInfo.setUserInfo(user);
  cardsList.renderItems(cards);
})
.catch(err => alert(`Упс. Не удалось получить информацию. Ошибка: ${err}`));
/* <<<окончание раздела>>> */

/* <<<раздел объявления функций>>> */
// форма редактирования аватара
function submitFormAvatar(info) {
  formAvatar.querySelector('.form__button-submit').textContent = 'Сохранение...';

  api.setUserAvatar(info)
  .then(data => {
    userInfo.setUserInfo(data);
    popupAvatar.close();
  })
  .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
  .finally(() => formAvatar.querySelector('.form__button-submit').textContent = 'Сохранить');
}

// форма редактирования профиля
function submitFormProfile(info) {
  formProfile.querySelector('.form__button-submit').textContent = 'Сохранение...';

  api.setUserInfo(info)
  .then(data => {
    userInfo.setUserInfo(data);
    popupProfile.close();
  })
  .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
  .finally(() => formProfile.querySelector('.form__button-submit').textContent = 'Сохранить');
}

// форма добавления карточки места
function submitFormPlace(cardData) {
  formPlace.querySelector('.form__button-submit').textContent = 'Сохранение...';

  api.addCard(cardData)
  .then(data => {
    cardsList.addItem(createCard(data));
    popupPlace.close();
  })
  .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
  .finally(() => formPlace.querySelector('.form__button-submit').textContent = 'Создать');
}
/* <<<окончание раздела>>> */

/* <<<раздел вызовов функций и методов>>> */
// слушатели форм
popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupConfirmation.setEventListeners();
popupIllustration.setEventListeners();

// проверка форм
formAvatarValidator.enableValidation();
formProfileValidator.enableValidation();
formPlaceValidator.enableValidation();

/* <<<раздел отслеживания действий пользователя>>> */
// открытие формы редактирования аватара
buttonAvatar.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
});

// открытие формы редактирования профиля
buttonEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  inputNameProfile.value = info.name;
  inputAboutProfile.value = info.about;

  formProfileValidator.resetValidation();
  popupProfile.open();
});

// открытие формы добавления карточки места
buttonAdd.addEventListener('click', () => {
  formPlaceValidator.resetValidation();
  popupPlace.open();
});
