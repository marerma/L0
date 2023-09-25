import { ProductItem } from './productItem';
import { createElement } from '../../utils/utils';

export function renderProducts(parentNode, products) {
  const productListHtml = [];
  const outOfStockProducts = [];
  products.forEach((product) => {
    if (product.stock > 0) {
      productListHtml.push(new ProductItem(product).renderNode());
    } else {
      outOfStockProducts.push(new ProductItem(product).renderNode());
    }
  });

  parentNode.append(...productListHtml);

  let subtitle = createElement('p', 'subtitle');
  subtitle.textContent = `Отсутствуют · ${outOfStockProducts.length} товара`;

  let div = createElement('div', 'cart__outofstock');
  div.innerHTML = `<div class="cart__toggler">
  ${subtitle.outerHTML}
  <svg class="toggle-icon toggle-icon_open" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.3417 14.9121C16.966 15.2982 16.3477 15.3044 15.9644 14.9258L10.1418 9.17475C10.0634 9.0973 9.93715 9.09788 9.85945 9.17603L4.15281 14.9159C3.76725 15.3037 3.14293 15.3137 2.74516 14.9384C2.33549 14.552 2.32163 13.9049 2.71437 13.5012L9.28326 6.74949C9.67588 6.34593 10.3241 6.34593 10.7167 6.74949L17.3417 13.5588C17.7082 13.9355 17.7082 14.5354 17.3417 14.9121Z" fill="#9797AF"/>
  </svg>                  
</div>`;

  if (outOfStockProducts.length) {
    parentNode.append(div, ...outOfStockProducts);
  }
}
