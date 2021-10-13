/* класс работы с данными пользователя */
export class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._description = document.querySelector(profileDescriptionSelector);
  }

  /* заполнение полей ввода данными со страницы */
  getUserInfo(inputName, inputDescription) {
    inputName.value = this._name.textContent;
    inputDescription.value = this._description.textContent;
  }

  /* добавление данных на страницу */
  setUserInfo(info) {
    this._name.textContent = info.name;
    this._description.textContent = info.description;
  }
}
