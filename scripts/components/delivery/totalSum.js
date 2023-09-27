import { PRODUCTS } from '../../mockdata/products';
import {
  checkPriceLength,
  findProduct,
  formatPrice,
  getFullProductPrice,
  queryElement,
} from '../../utils/utils';

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

const changeProductAmount = (state) => {
  const allMinus = [...document.querySelectorAll('.counter-icon-minus')];
  const allPlus = [...document.querySelectorAll('.counter-icon-plus')];

  allMinus.forEach((minus) => {
    const amount = minus.nextElementSibling;
    const id = parseInt(minus.getAttribute('data-counter'), 10);
    const currentProduct = state.productisInCartIds.find((el) => el.id === id);

    minus.addEventListener('click', () => {
      const product = findProduct(id, PRODUCTS);
      if (currentProduct.amount !== 1) {
        currentProduct.amount -= 1;
        state.totalSum -= product.price.discount;
        state.fullSum -= product.price.full;
        state.totalDiscount = state.totalSum - state.fullSum;
        state.totalAmount -= 1;
        updateSum(state);
      }
      changeIconClass(minus, currentProduct.amount, 1);
      changeIconClass(
        minus.nextElementSibling.nextElementSibling,
        currentProduct.amount,
        product.stock
      );
      updateOneProductPrice(
        id,
        currentProduct.amount,
        product.price.full,
        product.price.discount
      );
      amount.textContent = currentProduct.amount;
    });
  });

  allPlus.forEach((plus) => {
    const amount = plus.previousElementSibling;
    const id = parseInt(plus.getAttribute('data-counter'), 10);
    const currentProduct = state.productisInCartIds.find((el) => el.id === id);

    plus.addEventListener('click', () => {
      const product = findProduct(id, PRODUCTS);

      if (currentProduct.amount !== product.stock) {
        currentProduct.amount += 1;
        state.totalSum += product.price.discount;
        state.fullSum += product.price.full;
        state.totalDiscount = state.totalSum - state.fullSum;
        state.totalAmount += 1;
        updateSum(state);
      }
      changeIconClass(plus, currentProduct.amount, product.stock);
      changeIconClass(
        plus.previousElementSibling.previousElementSibling,
        currentProduct.amount,
        1
      );
      updateOneProductPrice(
        id,
        currentProduct.amount,
        product.price.full,
        product.price.discount
      );
      amount.textContent = currentProduct.amount;
    });
  });
};
const updateSum = (state) => {
  const TOTAL_SUM = queryElement('.final-sum');
  const TOTAL_SUM_DISCOUNT = queryElement('.final-discountSum');
  const TOTAL_SUM_FULL = queryElement('.final-fullSum');
  const TOTAL_ITEMS_AMOUNT = queryElement('.final-amount');

  const { totalSum, totalDiscount, fullSum, totalAmount } = state;

  TOTAL_SUM.textContent = formatPrice(totalSum);
  TOTAL_SUM_DISCOUNT.textContent = `${formatPrice(totalDiscount)} сом`;
  TOTAL_SUM_FULL.textContent = `${formatPrice(fullSum)} сом`;
  TOTAL_ITEMS_AMOUNT.textContent = `${totalAmount} товаров`;
};
export { updateSum, changeProductAmount };
