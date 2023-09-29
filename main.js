import './style.css';
import {
  renderProducts,
  renderDeliveryList,
  changeFavorite,
  closeModal,
  showDeliveryModal,
  showPaymentModal,
  changeProductAmount,
  toggleSection,
  updateSelection,
  validateCustomerData,
  changeSubmitButtonText,
  deleteProduct,
} from './scripts/components/index';

import { APP_STATE } from './scripts/state';
import { CONTAINER_ELEMENTS } from './scripts/utils/constants';

const initialProductsList = APP_STATE.getProductsInCart();
const initialDeliveryDates = APP_STATE.deliveryDates();

renderProducts(
  CONTAINER_ELEMENTS.productsList,
  CONTAINER_ELEMENTS.productsListAbsent,
  initialProductsList
);
renderDeliveryList(CONTAINER_ELEMENTS.deliveryContainer, initialDeliveryDates);

changeProductAmount(APP_STATE);
changeFavorite();
deleteProduct(APP_STATE);
toggleSection();
updateSelection(APP_STATE);

validateCustomerData(APP_STATE);
changeSubmitButtonText(APP_STATE);
showDeliveryModal(APP_STATE);
showPaymentModal(APP_STATE);
closeModal(APP_STATE);
