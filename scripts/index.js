import '../styles/index.css';
import {
  renderProducts,
  renderDeliveryList,
  closeModal,
  showDeliveryModal,
  showPaymentModal,
  changeProductAmount,
  toggleSection,
  updateSelection,
  validateCustomerData,
  changeImmediatePayStatus,
  deleteProduct,
} from './components/index';

import { APP_STATE } from './state';
import { CONTAINER_ELEMENTS } from './utils/constants';

const initialProductsList = APP_STATE.getProductsInCart();
const initialDeliveryDates = APP_STATE.getDeliveryInfo();

renderProducts(
  CONTAINER_ELEMENTS.productsList,
  CONTAINER_ELEMENTS.productsListAbsent,
  initialProductsList
);
renderDeliveryList(CONTAINER_ELEMENTS.deliveryContainer, initialDeliveryDates);

changeProductAmount(APP_STATE);
deleteProduct(APP_STATE);
toggleSection();
updateSelection(APP_STATE);

validateCustomerData(APP_STATE);
changeImmediatePayStatus(APP_STATE);
showDeliveryModal(APP_STATE);
showPaymentModal(APP_STATE);
closeModal(APP_STATE);
