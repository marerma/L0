import { DeliveryItem } from './delivery';

export function renderDeliveryList(parentNode, deliveryDates) {
  const node = document.createElement('div');
  node.setAttribute('id', 'delivery-dates-container');

  Object.keys(deliveryDates).forEach((date) => {
    const prods = deliveryDates[date];
    const deliveryThumbs = new DeliveryItem(date, prods).renderNode();
    node.append(deliveryThumbs);
  });
  let lastChild = parentNode.lastElementChild;
  lastChild.before(node);
}

export function updateDeliveryList(parentNode, deliveryDates) {
  const child = document.getElementById('delivery-dates-container');
  parentNode.removeChild(child);
  renderDeliveryList(parentNode, deliveryDates);
}
