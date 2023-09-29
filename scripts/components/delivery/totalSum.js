import { PRODUCTS } from '../../mockdata/products';
import { APP_STATE } from '../../state';
import { CONTAINER_ELEMENTS } from '../../utils/constants';
import {
  checkPriceLength,
  findProduct,
  formatPlural,
  formatPrice,
  getFullProductPrice,
  queryElement,
  toggleAllCheckedProds,
} from '../../utils/utils';
import { updateDeliveryList } from './deliveryList';

const changeIconClass = (node, amount, limit) => {
  if (amount !== limit) {
    node.classList.remove('disabled');
  } else {
    node.classList.add('disabled');
  }
};

const updateOneProductPrice = (id, amount, full, discount) => {
  const productEl = document.getElementById(`${id}`);
  const fullPriceSpan = productEl.querySelector('.full-price');
  const disountPriceSpan = productEl.querySelector('.discount-price');
  fullPriceSpan.textContent = formatPrice(
    getFullProductPrice(discount, amount)
  );
  disountPriceSpan.textContent = formatPrice(getFullProductPrice(full, amount));

  if (checkPriceLength(getFullProductPrice(full, amount))) {
    fullPriceSpan.classList.add('product-item__text_large');
  } else fullPriceSpan.classList.remove('product-item__text_large');
};

const updateOrderUISum = (state) => {
  const TOTAL_SUM = document.querySelectorAll('.final-sum');
  const TOTAL_ITEMS_AMOUNT = document.querySelectorAll('.final-amount');
  const TOTAL_SUM_DISCOUNT = queryElement('.final-discountSum');
  const TOTAL_SUM_FULL = queryElement('.final-fullSum');

  const { totalSum, totalDiscount, fullSum, totalAmount } = state;

  TOTAL_SUM.forEach((el) => (el.textContent = formatPrice(totalSum)));
  TOTAL_SUM_DISCOUNT.textContent = `${formatPrice(totalDiscount)} сом`;
  TOTAL_SUM_FULL.textContent = `${formatPrice(fullSum)} сом`;
  TOTAL_ITEMS_AMOUNT.forEach(
    (el) => (el.textContent = `${totalAmount} ${formatPlural(totalAmount)}`)
  );
};

const updateAppSumUi = (
  state,
  id,
  currentProduct,
  productInfo,
  minusIcon,
  plusIcon
) => {
  updateOrderUISum(state);
  changeIconClass(minusIcon, currentProduct.amount, 1);
  changeIconClass(plusIcon, currentProduct.amount, productInfo.stock);
  updateOneProductPrice(
    id,
    currentProduct.amount,
    productInfo.price.full,
    productInfo.price.discount
  );
};

const changeProductAmount = (state) => {
  const allMinus = [...document.querySelectorAll('.counter-icon-minus')];
  const allPlus = [...document.querySelectorAll('.counter-icon-plus')];
  const CART_ICON_AMOUNT = queryElement('.cart_total-amount');

  allMinus.forEach((minus) => {
    const amount = minus.nextElementSibling;
    const id = parseInt(minus.getAttribute('data-counter'), 10);
    const currentProduct = state.productsInCartIds.find((el) => el.id === id);

    minus.addEventListener('click', () => {
      const product = findProduct(id, state.products);
      if (currentProduct.amount !== 1) {
        currentProduct.amount -= 1;
        state.updateSum();
      }
      const plusIcon = minus.nextElementSibling.nextElementSibling;
      updateAppSumUi(state, id, currentProduct, product, minus, plusIcon);
      CART_ICON_AMOUNT.textContent = state.totalAmount;
      amount.textContent = currentProduct.amount;
    });
  });

  allPlus.forEach((plus) => {
    const amount = plus.previousElementSibling;
    const id = parseInt(plus.getAttribute('data-counter'), 10);
    const currentProduct = state.productsInCartIds.find((el) => el.id === id);

    plus.addEventListener('click', () => {
      const product = findProduct(id, PRODUCTS);

      if (currentProduct.amount !== product.stock) {
        currentProduct.amount += 1;
        state.updateSum();
      }
      const minusIcon = plus.previousElementSibling.previousElementSibling;
      updateAppSumUi(state, id, currentProduct, product, minusIcon, plus);
      CART_ICON_AMOUNT.textContent = state.totalAmount;
      amount.textContent = currentProduct.amount;
    });
  });
};

const updateSelection = (state) => {
  const SELECT_ALL = queryElement('input[name="select-all"]');
  const ALL_PRODUCT_CHECKBOXES = document.querySelectorAll(
    'input[name="selected-items"]'
  );
  SELECT_ALL.addEventListener('click', () => {
    toggleAllCheckedProds(SELECT_ALL.checked, state.productsInCartIds);
    for (const checkbox of ALL_PRODUCT_CHECKBOXES) {
      checkbox.checked = SELECT_ALL.checked;
    }
    state.updateSum();
    updateOrderUISum(state);
    updateDeliveryList(
      CONTAINER_ELEMENTS.deliveryContainer,
      APP_STATE.deliveryDates()
    );
    checkOrderButton(state);
  });

  for (const checkbox of ALL_PRODUCT_CHECKBOXES) {
    checkbox.addEventListener('click', () => {
      const productID = +checkbox.id.split('-')[1];
      const productInCart = findProduct(productID, state.productsInCartIds);
      productInCart.isChecked = checkbox.checked;
      if (!productInCart.isChecked) {
        SELECT_ALL.checked = false;
      }
      state.updateSum();
      updateOrderUISum(state);
      updateDeliveryList(
        CONTAINER_ELEMENTS.deliveryContainer,
        APP_STATE.deliveryDates()
      );
      checkOrderButton(state);
    });
  }
};

const toggleSection = () => {
  const toggler = document.querySelectorAll('.toggle-icon');

  toggler.forEach((el) =>
    el.addEventListener('click', () => {
      const parent = el.parentElement;
      if (el.classList.contains('available')) {
        const section = parent.nextElementSibling;
        const innerInfoNode = el.previousElementSibling;
        for (const child of innerInfoNode.children) {
          child.classList.toggle('hidden');
        }
        section.classList.toggle('hide-toggle');
      } else {
        parent.parentElement.nextElementSibling.classList.toggle('hide-toggle');
        parent.classList.toggle('withoutBorder');
      }
      el.classList.toggle('toggle-icon_closed');
    })
  );
};

const checkOrderButton = (state) => {
  const orderButton = queryElement('.order__submit-btn');
  orderButton.disabled = state.totalSum === 0;
};

export {
  updateOrderUISum,
  changeProductAmount,
  toggleSection,
  updateSelection,
  checkOrderButton,
};
