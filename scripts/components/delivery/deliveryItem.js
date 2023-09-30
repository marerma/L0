import { ThumbImage } from './thumbImage';
import { createElement } from '../../utils/utils';

export class DeliveryItem {
  constructor(delivery, products) {
    this.deliveryDate = delivery;
    this.products = products;
  }

  renderNode() {
    const deliveryNode = createElement(
      'div',
      'delivery__item delivery__item_thumbs'
    );

    if (this.products.length) {
      let thumbsHtml = [];
      this.products.forEach(({ amount, title, image }) => {
        const thumb = new ThumbImage(image, title, amount).renderNode()
          .innerHTML;
        thumbsHtml.push(thumb);
      });

      deliveryNode.innerHTML = `
                    <p class="subtitle">${this.deliveryDate}</p>
                    <div class="delivery__content delivery__content_thumbs">
                      ${thumbsHtml.join('')}
                    </div>
      `;
      return deliveryNode;
    } else return null;
  }
}
