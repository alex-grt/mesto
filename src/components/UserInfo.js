/* класс работы с данными пользователя */
export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }, avatarSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileAboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  /* заполнение полей ввода данными со страницы */
  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent }
  }

  /* добавление данных на страницу */
  setUserInfo(info) {
    this._name.textContent = info.name;
    this._about.textContent = info.about;
    this._avatar.src = info.avatar;
  }
}
