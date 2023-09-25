const createElement = (tag, className) => {
  const el = document.createElement(tag);

  if (className) {
    el.className = className;
  }
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

export {
  createElement,
  formatPrice,
  checkPriceLength,
  checkStockAmount,
  filterProductsOnDelivery,
};
