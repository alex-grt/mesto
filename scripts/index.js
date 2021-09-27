import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

/* <<<раздел объявления переменных>>> */
/* Popup */
const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupIllustration = document.querySelector('.popup_type_illustration');
/* форма редактирования профиля */
const formProfile = document.querySelector('.form__info');
const inputNameProfile = formProfile.querySelector('.form__input_asgmt_name');
const inputDescriptionProfile = formProfile
.querySelector('.form__input_asgmt_description');
/* форма добавления карточки места */
const formPlace = document.querySelector('.form__place');
const inputNamePlace = formPlace.querySelector('.form__input_asgmt_name-place');
const inputLinkPlace = formPlace.querySelector('.form__input_asgmt_link');
/* данные для проверки форм */
const listSelector = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__error_visible'
};
/* секция Profile */
const sectionProfile = document.querySelector('.profile');
const profileName = sectionProfile.querySelector('.profile-card__title');
const profileDescription = sectionProfile.querySelector('.profile-card__text');
const buttonEdit = sectionProfile.querySelector('.profile-card__button-edit');
const buttonAdd = sectionProfile.querySelector('.profile__button-add');
/* шаблон для секции Places */
const templateSelector = '#template-place';
/* секция Places */
const placesGrid = document.querySelector('.places-grid');
const cardsPlaces = [
  {
    name: 'Даргавс',
    link: './images/place-dargavs.jpg'
  },
  {
    name: 'Териберка',
    link: './images/place-teriberka.jpg'
  },
  {
    name: 'Плато Бермамыт',
    link: './images/place-bermamyt.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/place-kamchatka.jpg'
  },
  {
    name: 'Усьвинские столбы',
    link: './images/place-usva.jpg'
  },
  {
    name: 'Псков',
    link: './images/place-pskov.jpg'
  },
];
/* <<<окончание раздела>>> */

/* <<<раздел объявления общих функций>>> */
/* создание данных карточки места */
function createCardData(name, link) {
  const cardPlaceNew = {
    name: name.value,
    link: link.value
  };
  return cardPlaceNew;
}

/* создание копии класса карточки места */
function copyClass(data) {
  const card = new Card (data, templateSelector);
  const cardElement = card.createCard();

  return cardElement;
}

/* добавление карточки места на страницу */
function addCard(section, element) {
  section.prepend(element);
}

/* открытие формы */
function openForm(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closeByEscape);
}

/* закрытие формы */
// по клавише Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closeForm(openedPopup);
  }
}
// по кнопке
function closeForm(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closeByEscape);
}
/* <<<окончание раздела>>> */

/* <<<раздел формы редактирования профиля>>> */
/* отправка данных, введённых в форму редактирования профиля */
function submitFormProfile() {
  profileName.textContent = inputNameProfile.value;
  profileDescription.textContent = inputDescriptionProfile.value;

  closeForm(popupProfile);
}
/* <<<окончание раздела>>> */

/* <<<раздел формы добавления карточки места>>> */
/* отправка данных, введённых в форму добавления карточки места */
function submitFormPlace() {
  const cardData = createCardData(inputNamePlace, inputLinkPlace);

  addCard(placesGrid, copyClass(cardData));
  closeForm(popupPlace);
}
/* <<<окончание раздела>>> */

/* <<<раздел Places>>> */
/* заполнение страницы карточками мест */
cardsPlaces.forEach((item) => {
  addCard(placesGrid, copyClass(item));
});
/* <<<окончание раздела>>> */

/* <<<раздел отслеживания действий пользователя>>> */
/* открытие форм */
// редактирования профиля
buttonEdit.addEventListener('click', () => {
  inputNameProfile.value = profileName.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;

  const formValidator = new FormValidator(listSelector, formProfile);

  formValidator.enableValidation();
  openForm(popupProfile);
});
// добавления карточки места
buttonAdd.addEventListener('click', () => {
  formPlace.reset();

  const formValidator = new FormValidator(listSelector, formPlace);

  formValidator.enableValidation();
  openForm(popupPlace);
});

/* отправка форм */
formProfile.addEventListener('submit', submitFormProfile);
formPlace.addEventListener('submit', submitFormPlace);

/* закрытие форм */
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') ||
    evt.target.classList.contains('popup__button-close')) {
      closeForm(popup);
    }
  });
});
/* <<<окончание раздела>>> */

export { openForm, popupIllustration };
