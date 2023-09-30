import { createElement } from '../../utils/utils';
import { PRODUCT_TEMPLATE } from './productHtmlTemplate';

export class ProductItem {
  constructor(product) {
    this.product = product;
    this.productNode = createElement('div', 'product-item');
  }

  fillNode() {
    const { id, stock } = this.product;

    this.productNode.setAttribute('id', id);

    this.productNode.innerHTML = PRODUCT_TEMPLATE(this.product);
    if (stock <= 0) {
      this.productNode.classList.add('product-item_grey');
    }
  }
  changeFavorite() {
    const favIcon = this.productNode.querySelector('.product-favorite');
    favIcon.addEventListener('click', () => {
      favIcon.classList.toggle('product-favorite_active');
    });
  }
  renderNode() {
    this.fillNode();
    this.changeFavorite();
    return this.productNode;
  }
}
