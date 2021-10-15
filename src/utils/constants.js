/* изображения */
const dargavs = new URL('../images/place-dargavs.jpg', import.meta.url);
const teriberka = new URL('../images/place-teriberka.jpg', import.meta.url);
const bermamyt = new URL('../images/place-bermamyt.jpg', import.meta.url);
const kamchatka = new URL('../images/place-kamchatka.jpg', import.meta.url);
const usva = new URL('../images/place-usva.jpg', import.meta.url);
const pskov = new URL('../images/place-pskov.jpg', import.meta.url);

/* Popup */
export const popupProfileSelector = '.popup_type_profile';
export const popupPlaceSelector = '.popup_type_place';
export const popupIllustrationSelector = '.popup_type_illustration';

/* форма редактирования профиля */
export const formProfile = document.querySelector('.form__info');
export const inputNameProfile = formProfile.querySelector('.form__input_asgmt_name');
export const inputDescriptionProfile = formProfile
.querySelector('.form__input_asgmt_description');

/* форма добавления карточки места */
export const formPlace = document.querySelector('.form__place');

/* данные для проверки форм */
export const selectorsList = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__error_visible'
};

/* секция Profile */
export const profileNameSelector = '.profile-card__title';
export const profileDescriptionSelector = '.profile-card__text';
export const buttonEdit = document.querySelector('.profile-card__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');

/* шаблон для секции Places */
export const templateSelector = '#template-place';

/* секция Places */
export const placesGrid = '.places-grid';
export const cardsPlaces = [
  {
    name: 'Даргавс',
    link: dargavs
  },
  {
    name: 'Териберка',
    link: teriberka
  },
  {
    name: 'Плато Бермамыт',
    link: bermamyt
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Усьвинские столбы',
    link: usva
  },
  {
    name: 'Псков',
    link: pskov
  },
];
