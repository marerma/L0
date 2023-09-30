import { CARD_NUMBERS } from './mockdata/cardNumbers';
import { PRODUCTS } from './mockdata/products';
import { findProduct, getDeliveryDates } from './utils/utils';

const APP_STATE = {
  isOpen: false,
  products: PRODUCTS,
  totalSum: 2101016,
  totalDiscount: 200985,
  fullSum: 2302001,
  totalAmount: 203,
  productsInCartIds: [
    { id: 1, amount: 1, isChecked: true },
    { id: 2, amount: 200, isChecked: true },
    { id: 3, amount: 2, isChecked: true },
    { id: 4, amount: 0, isChecked: false },
    { id: 5, amount: 0, isChecked: false },
    { id: 6, amount: 0, isChecked: false },
  ],
  getProductsInCart(isChecked) {
    return this.products.filter((item) =>
      this.productsInCartIds.find((prod) => {
        if (isChecked !== undefined) {
          return prod.id === item.id && prod.isChecked;
        } else return prod.id === item.id;
      })
    );
  },
  getDeliveryInfo() {
    const filteredProds = this.getProductsInCart(true);
    return getDeliveryDates(filteredProds);
  },
  deliveryAddress: {
    type: 'office',
    address: 'г. Бишкек, улица Ахматбека Суюмбаева, 12/1',
  },
  savedCards: CARD_NUMBERS,
  updateSum() {
    const sum = this.productsInCartIds.reduce(
      (tot, el) => {
        if (el.isChecked) {
          let productInfo = findProduct(el.id, this.products);
          tot.amount += el.amount;
          tot.total += productInfo.price.discount * el.amount;
          tot.full += productInfo.price.full * el.amount;
          tot.discount = tot.total - tot.full;
        }
        return tot;
      },
      { total: 0, full: 0, amount: 0, discount: 0 }
    );
    this.totalAmount = sum.amount;
    this.totalSum = sum.total;
    this.fullSum = sum.full;
    this.totalDiscount = sum.discount;
  },
  payImmediate: false,
};

export { APP_STATE };
