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

// получение продуктов, положенных в корзину, из базы данных по id
const filterProductsInCart = (idsArray, productDb) => {
  return productDb.filter((item) =>
    idsArray.find((prod) => prod.id === item.id)
  );
};

// получение возможных дат доставки и количества продуктов в эти даты
const getDeliveryDates = (products) => {
  return products.reduce((obj, el) => {
    const { shipping } = el;

    if (shipping && shipping.length) {
      shipping.forEach(({ date, maxQuantity }) => {
        obj[date]
          ? obj[date].push({
              id: el.id,
              amount: maxQuantity,
              image: el.image,
              title: el.title,
            })
          : (obj[date] = [
              {
                id: el.id,
                amount: maxQuantity,
                image: el.image,
                title: el.title,
              },
            ]);
      });
    }
    return obj;
  }, {});
};

const getRetinaSrc = (src) => {
  return `${src.split('.')[0]}_x2.png`;
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

const getFullProductPrice = (amount, price) => {
  return price * amount;
};

const findProduct = (id, db) => {
  return db.find((el) => el.id === id);
};

const toggleAllCheckedProds = (selected, products) => {
  products.forEach((el) => (el.isChecked = selected));
};

const formatPlural = (number) => {
  switch (number % 10) {
    case 1:
      return 'товар';
    case 2:
    case 3:
    case 4:
      return 'товара';
    default:
      return 'товаров';
  }
};

const checkNotAvailableProds = (prodList) => {
  return prodList.filter((prod) => prod.amount === 0);
};

export {
  createElement,
  formatPrice,
  checkPriceLength,
  checkStockAmount,
  queryElement,
  formatPhone,
  focusFirstInputWithError,
  filterProductsInCart,
  getDeliveryDates,
  findProduct,
  getFullProductPrice,
  getRetinaSrc,
  toggleAllCheckedProds,
  formatPlural,
  checkNotAvailableProds,
};
