/* объявление переменных */

let popup = document.querySelector('.popup');
let formEdit = document.querySelector('.form-edit');
let inputName = formEdit.querySelector('.form-edit__input_asgmt_name');
let inputDescription = formEdit.querySelector('.form-edit__input_asgmt_description');
let buttonClose = formEdit.querySelector('.form-edit__button-close');
let buttonSubmit = formEdit.querySelector('.form-edit__button-submit');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile-card__title');
let profileDescription = profile.querySelector('.profile-card__text');
let buttonEdit = profile.querySelector('.profile-card__button-edit');

/* секция открытия попапа с формой редактирования профиля */

function openFormEdit() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

/* секция закрытия попапа с формой редактирования профиля */

function closeFormEdit() {
  popup.classList.remove('popup_opened');
}

/* секция отправки данных, введённых в форму редактирования профиля */

function submitFormEdit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeFormEdit();
}

/* секция отслеживания действий пользователя */

buttonEdit.addEventListener('click', openFormEdit);
buttonClose.addEventListener('click', closeFormEdit);
formEdit.addEventListener('submit', submitFormEdit);
