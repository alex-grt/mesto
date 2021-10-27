/* класс работы с данными пользователя */
export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }, avatarSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileAboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  /* заполнение полей ввода данными со страницы */
  getUserInfo(inputName, inputAbout) {
    inputName.value = this._name.textContent;
    inputAbout.value = this._about.textContent;
  }

  /* добавление данных на страницу */
  setUserInfo(info) {
    this._name.textContent = info.name;
    this._about.textContent = info.about;
  }

  /* установка аватара пользователя */
  setUserAvatar(info) {
    this._avatar.src = info.avatar;
  }
}
