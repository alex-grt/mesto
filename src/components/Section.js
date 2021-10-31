/* класс заполнения страницы элементами */
export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /* заполнение страницы элементами */
  renderItems(data) {
    data.sort((a, b) => {
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt == b.createdAt) return 0;
      if (a.createdAt < b.createdAt) return -1;
    })
    .forEach((item) => {
      this._renderer(item);
    });
  }

  /* добавление элемента на страницу */
  addItem(element) {
    this._container.prepend(element);
  }
}
