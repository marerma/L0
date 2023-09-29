export const CONTAINER_ELEMENTS = {
  main: document.getElementById('order-detail'),
  productsList: document.getElementById('product-list'),
  productsListAbsent: document.getElementById('product-list_empty'),
  deliveryContainer: document.getElementById('delivery-options'),
  modal: document.querySelector('.modal'),
  modalInner: document.querySelector('.modal__content'),
};

export const MAIL_REG = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const PHONE_REG = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;

export const INN_REG = /^\d{14}$/;

export const PATTERN_MAP = {
  email: MAIL_REG,
  phone: PHONE_REG,
  inn: INN_REG,
};
