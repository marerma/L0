import { filterProductsOnDelivery } from '../../utils/utils';
import { DeliveryItem } from './delivery';

export function renderDeliveryList(parentNode, deliveryDates, products) {
  const node = document.createElement('div');

  deliveryDates.forEach((date) => {
    const prods = filterProductsOnDelivery(date, products);
    const deliveryThumbs = new DeliveryItem(date, prods).renderNode();
    node.append(deliveryThumbs);
  });
  let lastChild = parentNode.lastElementChild;
  lastChild.before(node);
}
