/* <<<раздел объявления переменных>>> */
/* Popup */
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImage = document.querySelector('#popup-image');
/* форма редактирования профиля */
const formEdit = document.querySelector('.form-edit');
const inputNameEdit = formEdit.querySelector('.form-edit__input_asgmt_name');
const inputDescriptionEdit = formEdit.querySelector('.form-edit__input_asgmt_description');
const buttonCloseEdit = formEdit.querySelector('.form-edit__button-close');
const buttonSubmitEdit = formEdit.querySelector('.form-edit__button-submit');
/* форма добавления карточки места */
const formAdd = document.querySelector('.form-add');
const inputNameAdd = formAdd.querySelector('.form-add__input_asgmt_name');
const inputLinkAdd = formAdd.querySelector('.form-add__input_asgmt_link');
const buttonCloseAdd = formAdd.querySelector('.form-add__button-close');
const buttonSubmitAdd = formAdd.querySelector('.form-add__button-submit');
/* форма показа иллюстрации */
const buttonCloseIllustration = document.querySelector('.form-illustration__button-close');
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
/* показ иллюстрации */
function showIllustration(evt) {
  popupImage.querySelector('.form-illustration__image').src = evt.target.src;
  popupImage.querySelector('.form-illustration__image').alt =
  evt.target.parentElement.closest('.place').querySelector('.place__title').textContent;
  popupImage.querySelector('.form-illustration__caption').textContent =
  evt.target.parentElement.closest('.place').querySelector('.place__title').textContent;
  popupImage.classList.add('popup_opened');
}

/* удаление карточки места */
function deletePlace(evt) {
  evt.target.closest('.place').remove();
};

/* лайк карточки места */
function likePlace(evt) {
  evt.target.classList.toggle('place__button-like_active');
};

/* <<<окончание раздела>>> */

/* <<<раздел формы редактирования профиля>>> */
/* открытие попапа с формой редактирования профиля */
function openFormEdit() {
  popupEdit.classList.add('popup_opened');
  inputNameEdit.value = profileName.textContent;
  inputDescriptionEdit.value = profileDescription.textContent;
}

/* закрытие попапа с формой редактирования профиля */
function closeFormEdit() {
  popupEdit.classList.remove('popup_opened');
}

/* отправка данных, введённых в форму редактирования профиля */
function submitFormEdit (evt) {
  evt.preventDefault();
  profileName.textContent = inputNameEdit.value;
  profileDescription.textContent = inputDescriptionEdit.value;

  closeFormEdit();
}
/* <<<окончание раздела>>> */

/* <<<раздел формы добавления карточки места>>> */
/* открытие попапа с формой добавления карточки места */
function openFormAdd() {
  inputNameAdd.value = '';
  inputLinkAdd.value = '';
  popupAdd.classList.add('popup_opened');
}

/* закрытие попапа с формой добавления карточки места */
function closeFormAdd() {
  popupAdd.classList.remove('popup_opened');
}

/* отправка данных, введённых в форму добавления карточки места */
function submitFormAdd (evt) {
  evt.preventDefault();

  // добавление карточки на страницу
  const placeCard = templatePlace.querySelector('.place').cloneNode(true);
  placeCard.querySelector('.place__image').src = inputLinkAdd.value;
  placeCard.querySelector('.place__image').alt = inputNameAdd.value;
  placeCard.querySelector('.place__title').textContent = inputNameAdd.value;
  placeCard.querySelector('.place__button-delete').addEventListener('click', deletePlace);
  placeCard.querySelector('.place__button-like').addEventListener('click', likePlace);
  placeCard.querySelector('.place__image').addEventListener('click', showIllustration);
  placesGrid.prepend(placeCard);

  // добавление карточки в массив
  const placeCardNew = {
      name: inputNameAdd.value,
      link: inputLinkAdd.value
    };
  placesCards.push(placeCardNew);

  closeFormAdd();
}
/* <<<окончание раздела>>> */

/* <<<раздел Places>>> */
/* заполнение страницы карточками мест */
function fillingPlaces() {
  for (i = 0; i < placesCards.length; i++) {
    const placeCard = templatePlace.querySelector('.place').cloneNode(true);
    placeCard.querySelector('.place__image').src = placesCards[i].link;
    placeCard.querySelector('.place__image').alt = placesCards[i].name;
    placeCard.querySelector('.place__title').textContent = placesCards[i].name;
    placeCard.querySelector('.place__button-delete').addEventListener('click', deletePlace);
    placeCard.querySelector('.place__button-like').addEventListener('click', likePlace);
    placeCard.querySelector('.place__image').addEventListener('click', showIllustration);
    placesGrid.prepend(placeCard);
  }
}

fillingPlaces();

/* закрытие попапа с иллюстрацией */
function closeFormIllustration() {
  popupImage.classList.remove('popup_opened');
}
/* <<<окончание раздела>>> */

/* <<<раздел отслеживания действий пользователя>>> */
buttonEdit.addEventListener('click', openFormEdit);
buttonCloseEdit.addEventListener('click', closeFormEdit);
formEdit.addEventListener('submit', submitFormEdit);
buttonAdd.addEventListener('click', openFormAdd);
buttonCloseAdd.addEventListener('click', closeFormAdd);
formAdd.addEventListener('submit', submitFormAdd);
buttonCloseIllustration.addEventListener('click', closeFormIllustration);
/* <<<окончание раздела>>> */
