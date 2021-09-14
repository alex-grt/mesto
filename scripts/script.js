/* <<<раздел объявления переменных>>> */
/* Popup */
const popupList = document.querySelectorAll('.popup');
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
const buttonSubmitProfile = formProfile.querySelector('.form__button-submit_type_profile');
/* форма добавления карточки места */
const formPlace = document.querySelector('.form__place');
const inputNamePlace = formPlace.querySelector('.form__input_asgmt_name-place');
const inputLinkPlace = formPlace.querySelector('.form__input_asgmt_link');
const buttonSubmitPlace = formPlace.querySelector('.form__button-submit_type_place');
/* форма отображения иллюстрации */
const illustrationImage = popupIllustration.querySelector('.illustration__image');
const illustrationCaption = popupIllustration.querySelector('.illustration__caption');
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
/* создание карточки места */
function createCard(data) {
  const cardPlace = templatePlace.querySelector('.place').cloneNode(true);
  const imagePlace = cardPlace.querySelector('.place__image');
  imagePlace.src = data.link;
  imagePlace.alt = data.name;
  cardPlace.querySelector('.place__title').textContent = data.name;
  cardPlace.querySelector('.place__button-delete').addEventListener('click', deletePlace);
  cardPlace.querySelector('.place__button-like').addEventListener('click', likePlace);
  imagePlace.addEventListener('click', () => showIllustration(data));
  return cardPlace;
}

/* добавление карточки места на страницу */
function addCard(section, element) {
  section.prepend(element);
}

/* создание данных карточки места */
function createCardData(name, link) {
  const cardPlaceNew = {
    name: name.value,
    link: link.value
  };
  return cardPlaceNew;
}

/* показ иллюстрации */
function showIllustration(data) {
  illustrationImage.src = data.link;
  illustrationImage.alt = data.name;
  illustrationCaption.textContent = data.name;

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

/* очистка формы от ошибок ввода */
function clearInputError(formElement) {
  const inputList = formElement.querySelectorAll(listSelector.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, listSelector.inputErrorClass,
      listSelector.errorClass);
  });
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
cardsPlaces.forEach(function(item) {
  addCard(placesGrid, createCard(item));
});
/* <<<окончание раздела>>> */

/* <<<раздел отслеживания действий пользователя>>> */
/* открытие форм */
// редактирования профиля
buttonEdit.addEventListener('click', () => {
  clearInputError(formProfile);
  enableButtonSubmit(buttonSubmitProfile, listSelector.inactiveButtonClass);
  openForm(popupProfile);

  inputNameProfile.value = profileName.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
});
// добавления карточки места
buttonAdd.addEventListener('click', () => {
  formPlace.reset();
  clearInputError(formPlace);
  disableButtonSubmit(buttonSubmitPlace, listSelector.inactiveButtonClass);
  openForm(popupPlace);
});

/* отправка форм */
formProfile.addEventListener('submit', submitFormProfile);
formPlace.addEventListener('submit', submitFormPlace);

/* закрытие форм */
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeForm(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closeForm(popup);
    }
  });
});
/* <<<окончание раздела>>> */
