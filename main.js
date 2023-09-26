import './style.scss';
import { renderProducts } from './scripts/components/product/productList';
import { PRODUCTS } from './scripts/mockdata/products';
import { renderDeliveryList } from './scripts/components/delivery/deliveryList';
import { DELIVERY_DATES } from './scripts/utils/constants';
import { validateCustomerData } from './scripts/customerForm';
import {
  closeModal,
  showDeliveryModal,
} from './scripts/components/modals/modal';

const APP_STATE = {
  isOpen: false,
  deliveryAddress: {
    type: 'delivery-home',
    address: 'Бишкек, улица Табышалиева, 57',
  },
};
const productsNode = document.querySelector('#product-list');
renderProducts(productsNode, PRODUCTS);

const deliveryContainer = document.querySelector('#delivery-options');
renderDeliveryList(deliveryContainer, DELIVERY_DATES, PRODUCTS);

validateCustomerData();

showDeliveryModal(APP_STATE);
closeModal();
