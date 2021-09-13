/* <<<раздел объявления переменных>>> */
/* Popup */
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupIllustration = document.querySelector('.popup_type_illustration');
const buttonCloseProfile = popupProfile.querySelector('.popup__button-close_type_profile');
const buttonClosePlace = popupPlace.querySelector('.popup__button-close_type_place');
const buttonCloseIllustration = popupIllustration.querySelector('.popup__button-close_type_illustration');
/* форма редактирования профиля */
const formProfile = document.querySelector('.form__info');
const inputNameProfile = formProfile.querySelector('.form__input_asgmt_name');
const inputDescriptionProfile = formProfile.querySelector('.form__input_asgmt_description');
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
const templatePlace = document.querySelector('#template-place').content;
/* секция Places */
const placesGrid = document.querySelector('.places-grid');
const placesCards = [
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
/* создание карточки места */
function createCard(data) {
  const placeCard = templatePlace.querySelector('.place').cloneNode(true);
  placeCard.querySelector('.place__image').src = data.link;
  placeCard.querySelector('.place__image').alt = data.name;
  placeCard.querySelector('.place__title').textContent = data.name;
  placeCard.querySelector('.place__button-delete').addEventListener('click', deletePlace);
  placeCard.querySelector('.place__button-like').addEventListener('click', likePlace);
  placeCard.querySelector('.place__image').addEventListener('click', () => showIllustration(data));
  return placeCard;
}

/* добавление карточки места на страницу */
function addCard(section, element) {
  section.prepend(element);
}

/* создание данных карточки места */
function createCardData(name, link) {
  const placeCardNew = {
    name: name.value,
    link: link.value
  };
  return placeCardNew;
}

/* показ иллюстрации */
function showIllustration(data) {
  popupIllustration.querySelector('.illustration__image').src = data.link;
  popupIllustration.querySelector('.illustration__image').alt = data.name;
  popupIllustration.querySelector('.illustration__caption').textContent = data.name;

  openForm(popupIllustration);
}

/* удаление карточки места */
function deletePlace(evt) {
  evt.target.closest('.place').remove();
};

/* лайк карточки места */
function likePlace(evt) {
  evt.target.classList.toggle('place__button-like_active');
};

/* открытие формы */
function openForm(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', (evt) => closeFormEscape(evt, popup));
}

/* закрытие формы */
// по клавише Escape
function closeFormEscape(evt, popup) {
  if (evt.key === 'Escape') {
    closeForm(popup);
  }
}
// по кнопке
function closeForm(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', (evt) => closeFormEscape(evt, popup));
}
// по клику по оверлею
function closeOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeForm(evt.target);
  }
}
/* <<<окончание раздела>>> */

/* <<<раздел формы редактирования профиля>>> */
/* отправка данных, введённых в форму редактирования профиля */
function submitFormProfile (evt) {
  evt.preventDefault();

  profileName.textContent = inputNameProfile.value;
  profileDescription.textContent = inputDescriptionProfile.value;

  closeForm(popupProfile);
}
/* <<<окончание раздела>>> */

/* <<<раздел формы добавления карточки места>>> */
/* отправка данных, введённых в форму добавления карточки места */
function submitFormPlace (evt) {
  evt.preventDefault();

  const cardData = createCardData(inputNamePlace, inputLinkPlace);

  addCard(placesGrid, createCard(cardData));
  closeForm(popupPlace);
}
/* <<<окончание раздела>>> */

/* <<<раздел Places>>> */
/* заполнение страницы карточками мест */
placesCards.forEach(function(item) {
  addCard(placesGrid, createCard(item));
});
/* <<<окончание раздела>>> */

/* <<<раздел отслеживания действий пользователя>>> */
/* открытие форм */
// редактирования профиля
buttonEdit.addEventListener('click', () => {
  openForm(popupProfile);

  inputNameProfile.value = profileName.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
});
// добавления карточки места
buttonAdd.addEventListener('click', () => {
  formPlace.reset();
  openForm(popupPlace);
});
/* отправка форм */
formProfile.addEventListener('submit', submitFormProfile);
formPlace.addEventListener('submit', submitFormPlace);
/* закрытие форм */
// редактирования профиля
buttonCloseProfile.addEventListener('click', () => closeForm(popupProfile));
popupProfile.addEventListener('click', (evt) => closeOverlay(evt));
// добавления карточки места
buttonClosePlace.addEventListener('click', () => closeForm(popupPlace));
popupPlace.addEventListener('click', (evt) => closeOverlay(evt));
// иллюстрации
buttonCloseIllustration.addEventListener('click', () => closeForm(popupIllustration));
popupIllustration.addEventListener('click', (evt) => closeOverlay(evt));
/* <<<окончание раздела>>> */
