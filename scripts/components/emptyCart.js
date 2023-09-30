import { CONTAINER_ELEMENTS } from '../utils/constants';
import { createElement } from '../utils/utils';

export const emptyCart = () => {
  CONTAINER_ELEMENTS.main.innerHTML = '';
  const cartIcon = document.querySelectorAll('.header__icon_count');
  const text = createElement('p');
  const container = createElement('div');
  container.style.width = '90%';
  container.style.margin = '0 auto';
  text.textContent =
    'Загляните на главную, чтобы выбрать товары или найдите нужное в поиске.';
  const title = createElement('h4', 'subtitle pink');
  title.textContent = 'В корзине пока нет товаров';
  container.append(title, text);
  CONTAINER_ELEMENTS.main.append(container);
  for (const icon of cartIcon) {
    icon.remove();
  }
};
