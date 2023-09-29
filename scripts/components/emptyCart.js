import { CONTAINER_ELEMENTS } from '../utils/constants';
import { createElement, queryElement } from '../utils/utils';

export const emptyCart = () => {
  CONTAINER_ELEMENTS.main.innerHTML = '';
  const cartIcon = queryElement('.header__icon_count');
  const text = createElement('p');
  text.textContent = 'В корзине пока нет товаров';
  CONTAINER_ELEMENTS.main.append(text);
  cartIcon.remove();
};
