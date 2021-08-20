/* общие переменные */

let popup = document.querySelector('.popup');
let formEdit = document.querySelector('.form-edit');
let inputName = formEdit.querySelector('.form-edit__name');
let inputDescription = formEdit.querySelector('.form-edit__description');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile-card__title');
let profileDescription = profile.querySelector('.profile-card__text');

/* секция открытия попапа с формой редактирования профиля */

let buttonEdit = profile.querySelector('.profile-card__button-edit');

function formEditOpen() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

buttonEdit.addEventListener('click', formEditOpen);

/* секция закрытия попапа с формой редактирования профиля */

let buttonClose = formEdit.querySelector('.form-edit__button-close');

function formEditClose() {
  popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', formEditClose);

/* секция отправки данных, введённых в форму редактирования профиля */

let buttonSubmit = formEdit.querySelector('.form-edit__button-submit');

function formEditSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove('popup_opened');
}

formEdit.addEventListener('submit', formEditSubmit);
