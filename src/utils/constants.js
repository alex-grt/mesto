/* Popup */
export const popupAvatarSelector = '.popup_type_avatar';
export const popupProfileSelector = '.popup_type_profile';
export const popupPlaceSelector = '.popup_type_place';
export const popupIllustrationSelector = '.popup_type_illustration';
export const popupConfirmationSelector = '.popup_type_confirmation';

/* форма редактирования аватара */
export const formAvatar = document.querySelector('.form__avatar');

/* форма редактирования профиля */
export const formProfile = document.querySelector('.form__info');
export const inputNameProfile = formProfile.querySelector('.form__input_asgmt_name');
export const inputAboutProfile = formProfile
.querySelector('.form__input_asgmt_about');

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
export const avatarSelector = '.profile-card__avatar';
export const profileNameSelector = '.profile-card__title';
export const profileAboutSelector = '.profile-card__text';
export const buttonAvatar = document.querySelector('.profile-card__avatar-cover');
export const buttonEdit = document.querySelector('.profile-card__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');

/* шаблон для секции Places */
export const templateSelector = '#template-place';

/* секция Places */
export const placesGrid = '.places-grid';
