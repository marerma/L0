import { createElement } from '../../utils/utils';
import { PRODUCT_TEMPLATE } from './productHtmlTemplate';

export class ProductItem {
  constructor(product) {
    this.product = product;
  }

  renderNode() {
    const { id, stock } = this.product;

    const productNode = createElement('div', 'product-item');
    productNode.setAttribute('id', id);

    productNode.innerHTML = PRODUCT_TEMPLATE(this.product);
    if (stock <= 0) {
      productNode.classList.add('product-item_grey');
    }
    return productNode;
  }
}
