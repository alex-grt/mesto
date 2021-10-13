/* импорт классов */
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

/* импорт констант и переменных */
import {
  /* Popup */
  popupProfileSelector,
  popupPlaceSelector,
  popupIllustrationSelector,
  /* форма редактирования профиля */
  formProfile,
  inputNameProfile,
  inputDescriptionProfile,
  /* форма добавления карточки места */
  formPlace,
  /* данные для проверки форм */
  listSelector,
  /* секция Profile */
  profileNameSelector,
  profileDescriptionSelector,
  buttonEdit,
  buttonAdd,
  /* шаблон для секции Places */
  templateSelector,
  /* секция Places */
  placesGrid,
  cardsPlaces
} from '../utils/constants.js';

/* <<<раздел объявления общих функций и классов>>> */
/* создание копии класса карточки места */
function copyClass(data) {
  const card = new Card(data, templateSelector, handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}

/* создание копий класса Popup */
const popupProfile = new PopupWithForm(popupProfileSelector, submitFormProfile, formProfile);
const popupPlace = new PopupWithForm(popupPlaceSelector, submitFormPlace, formPlace);

/* создание копии класса UserInfo */
const userInfo = new UserInfo({ profileNameSelector, profileDescriptionSelector });
/* <<<окончание раздела>>> */

/* <<<раздел Places>>> */
/* заполнение страницы карточками мест */
const cardsList = new Section({
  items: cardsPlaces,
  renderer: (item) => {
    cardsList.addItem(copyClass(item));
  }
}, placesGrid);

cardsList.renderItems();
/* <<<окончание раздела>>> */

/* <<<раздел формы редактирования профиля>>> */
/* отправка данных, введённых в форму редактирования профиля */
function submitFormProfile(info) {
  userInfo.setUserInfo(info);
  popupProfile.close();
}

popupProfile.setEventListeners();

/* проверка формы */
const formProfileValidator = new FormValidator(listSelector, formProfile);

formProfileValidator.enableValidation();
/* <<<окончание раздела>>> */

/* <<<раздел формы добавления карточки места>>> */
/* отправка данных, введённых в форму добавления карточки места */
function submitFormPlace(cardData) {
  const cardsList = new Section({
    items: [cardData],
    renderer: (item) => {
      cardsList.addItem(copyClass(item));
    }
  }, placesGrid);

  cardsList.renderItems();
  popupPlace.close();
}

popupPlace.setEventListeners();

/* проверка формы */
const formPlaceValidator = new FormValidator(listSelector, formPlace);

formPlaceValidator.enableValidation();
/* <<<окончание раздела>>> */

/* <<<раздел отображения иллюстрации>>> */
/* создание копии класса отображения иллюстрации */
function handleCardClick(link, name) {
  const popupIllustration = new PopupWithImage(popupIllustrationSelector, link, name);

  popupIllustration.open();
  popupIllustration.setEventListeners();
}
/* <<<окончание раздела>>> */

/* <<<раздел отслеживания действий пользователя>>> */
/* открытие форм */
// редактирования профиля
buttonEdit.addEventListener('click', () => {
  userInfo.getUserInfo(inputNameProfile, inputDescriptionProfile);
  formProfileValidator.resetValidation();
  popupProfile.open();
});

// добавления карточки места
buttonAdd.addEventListener('click', () => {
  formPlaceValidator.resetValidation();
  popupPlace.open();
});
