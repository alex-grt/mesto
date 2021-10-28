/* класс заполнения страницы элементами */
export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /* заполнение страницы элементами */
  renderItems(data) {
    data.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  /* добавление элемента на страницу */
  addItem(element) {
    this._container.prepend(element);
  }
}
