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
export const listSelector = {
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
