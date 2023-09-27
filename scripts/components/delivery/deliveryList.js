import { DeliveryItem } from './delivery';

export function renderDeliveryList(parentNode, deliveryDates) {
  const node = document.createElement('div');

  Object.keys(deliveryDates).forEach((date) => {
    const prods = deliveryDates[date];
    const deliveryThumbs = new DeliveryItem(date, prods).renderNode();
    node.append(deliveryThumbs);
  });
  let lastChild = parentNode.lastElementChild;
  lastChild.before(node);
}
