/* класс заполнения страницы элементами */
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /* заполнение страницы элементами */
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  /* добавление элемента на страницу */
  addItem(element) {
    this._container.prepend(element);
  }
}
