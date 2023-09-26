const createElement = (tag, className) => {
  const el = document.createElement(tag);

  if (className) {
    el.className = className;
  }
  return el;
};

const queryElement = (name) => {
  const el = document.querySelector(name);

  return el;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const checkPriceLength = (price) => {
  return price.toFixed(0).length < 4;
};

const checkStockAmount = (stock) => stock < 3;

const filterProductsOnDelivery = (date, products) => {
  const productsList = products
    .filter((item) => item.shippingSchedule?.find((d) => d.date === date))
    .map((product) => {
      const filteredDate = product.shippingSchedule.find(
        (el) => el.date === date
      );
      const newProd = {
        id: product.id,
        shippingSchedule: filteredDate,
        image: product.image,
        title: product.title,
      };
      return newProd;
    });
  return productsList;
};

const formatPhone = (value) => {
  let inputValue = value.slice(0, 30).replace(/[^\d+]/g, '');

  if (inputValue.length > 0 && inputValue[0] !== '+') {
    inputValue = '+' + inputValue;
  }
  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 2) + ' ' + inputValue.slice(2);
  }
  if (inputValue.length > 6) {
    inputValue = inputValue.slice(0, 6) + ' ' + inputValue.slice(6);
  }
  if (inputValue.length > 10) {
    inputValue = inputValue.slice(0, 10) + ' ' + inputValue.slice(10);
  }
  if (inputValue.length > 13) {
    inputValue = inputValue.slice(0, 13) + ' ' + inputValue.slice(13);
  }
  if (inputValue.length > 16) {
    inputValue = inputValue.slice(0, 16) + ' ' + inputValue.slice(16);
  }
  return inputValue;
};

const focusFirstInputWithError = () => {
  const errors = document.querySelectorAll('.customer__input_error');
  const first = [...errors].find(
    (el) => !el.classList.contains('black') && el.textContent !== ''
  );
  if (first) {
    const input = first.parentElement.querySelector('.customer__input');
    input.focus();
  }
};

export {
  createElement,
  formatPrice,
  checkPriceLength,
  checkStockAmount,
  filterProductsOnDelivery,
  queryElement,
  formatPhone,
  focusFirstInputWithError,
};
