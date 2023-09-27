import './style.scss';
import { renderProducts } from './scripts/components/product/productList';
import { PRODUCTS } from './scripts/mockdata/products';
import { renderDeliveryList } from './scripts/components/delivery/deliveryList';
import { validateCustomerData } from './scripts/customerForm';
import {
  closeModal,
  showDeliveryModal,
  showPaymentModal,
} from './scripts/components/modals/modal';
import { changeButtonText } from './scripts/components/modals/paymentCardsModal';
import { filterProductsInCart, getDeliveryDates } from './scripts/utils/utils';
import { changeProductAmount } from './scripts/components/delivery/totalSum';

const APP_STATE = {
  isOpen: false,
  deliveryAddress: {
    type: 'delivery-home',
    address: 'Бишкек, улица Табышалиева, 57',
  },
  totalSum: 2101063,
  totalDiscount: 200985,
  fullSum: 2302048,
  totalAmount: 203,
  productisInCartIds: [
    { id: 1, amount: 1 },
    { id: 2, amount: 200 },
    { id: 3, amount: 2 },
    { id: 4, amount: 0 },
    { id: 5, amount: 0 },
    { id: 6, amount: 0 },
  ],
  favoriteProducts: [],
};

const productsNode = document.querySelector('#product-list');
const initialProductsList = filterProductsInCart(
  APP_STATE.productisInCartIds,
  PRODUCTS
);
const initialDeliveryDates = getDeliveryDates(initialProductsList);
renderProducts(productsNode, initialProductsList);

const deliveryContainer = document.querySelector('#delivery-options');
renderDeliveryList(deliveryContainer, initialDeliveryDates);

changeProductAmount(APP_STATE);
validateCustomerData();
changeButtonText(APP_STATE);
showDeliveryModal(APP_STATE);
showPaymentModal(APP_STATE);
closeModal();
