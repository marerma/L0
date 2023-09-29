import {
  checkPriceLength,
  formatPrice,
  getFullProductPrice,
  getRetinaSrc,
} from '../../utils/utils';

export const PRODUCT_TEMPLATE = ({
  id,
  image,
  title,
  properties,
  price,
  location,
  seller,
  stock,
  amount,
}) => {
  return `
    <div class=${stock > 0 ? 'product-item__checkbox' : 'hidden'}>
      <input type='checkbox' name="selected-items" id="selected-${id}" checked>
    </div>
    <div class="product-item__image">
      <img src=${image} srcset="${getRetinaSrc(image)} 2x" alt=${title}>
      <div class="product-item__size-icon ${
        properties.size ? '' : ' transparent'
      }">${properties.size ?? ''}</div>
    </div>
      <div class="product-item__props">
        <h4 class="product-item__text">${title}</h4>
          <div>
          ${
            properties.color
              ? `<span class="product-item__text product-item__text_small" data-props="color">Цвет: ${properties.color}</span>`
              : ''
          }
          ${
            properties.size
              ? `<span class="product-item__text product-item__text_small" data-props="size">Размер: ${properties.size}</span>`
              : ''
          }
          </div>
          <div class=${stock > 0 ? 'product-item__location' : 'hidden'}>
            <p class="product-item__text product-item__text_small grey">${location}</p>
            <div class="product-item__text product-item__text_small grey" id="seller">${
              seller.title
            } <span class="product-item__icon-info">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="7.5" stroke="#9797AF"/>
                <path d="M9.88867 7.58691C9.62826 7.58691 9.41504 7.51042 9.24902 7.35742C9.08301 7.20117 9 7.01074 9 6.78613C9 6.55501 9.08301 6.36621 9.24902 6.21973C9.41504 6.07324 9.62826 6 9.88867 6C10.1523 6 10.3656 6.07324 10.5283 6.21973C10.6943 6.36621 10.7773 6.55501 10.7773 6.78613C10.7773 7.02051 10.6943 7.21257 10.5283 7.3623C10.3656 7.51204 10.1523 7.58691 9.88867 7.58691ZM10.6504 13.3779H9.10742V8.37793H10.6504V13.3779Z" fill="#9797AF"/>
                </svg>
              </span>
              <div class="tooltip box-shadow" id="seller-tooltip">
                <p class="tooltip__title">${seller.title}</p>
                <p class="tooltip__text">ОГРН: ${seller.OGRN}</p>
                <p class="tooltip__text">${seller.address}</p>
              </div>
            </div>
          </div>
        </div>
          <div class="product-item__counter-block ${
            stock <= 0 ? 'absent' : ''
          }">
            <div class="${stock > 0 ? 'product-item__counter' : 'hidden'}">
              <span class="product-item__text product-item__text_large counter-icon-minus ${
                amount === 1 ? 'disabled' : ''
              }" data-counter=${id}>−</span>
              <span class="product-item__text" data-counter="amount">${amount}</span>
              <span class="product-item__text product-item__text_large counter-icon-plus ${
                amount === stock ? 'disabled' : ''
              }" data-counter=${id}>+</span>
            </div>
            <div class=${
              stock < 3 && stock > 1 ? 'product-item__rest' : 'hidden'
            }>
              <span class="product-item__text product-item__text_small coral" data-product="rest-${id}"> Осталось ${stock} шт.</span>
            </div>
            <div class="product-item__icons-block">
              <svg class="product-favorite" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 2.05857C2.26592 2.75224 1.76687 3.83284 1.99496 5.42928C2.22335 7.02783 3.26497 8.68522 4.80439 10.3478C6.25868 11.9184 8.10965 13.4437 9.99999 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.7351 8.68521 17.7767 7.02783 18.005 5.4293C18.2331 3.83285 17.734 2.75224 16.9659 2.05856C16.1767 1.34572 15.055 1 14 1C12.132 1 11.0924 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1583 3.04882 9.84169 3.04882 9.64643 2.85355C9.59644 2.80356 9.54185 2.7466 9.48227 2.68443C8.9076 2.08479 7.868 1 5.99999 1C4.94498 1 3.82328 1.34573 3.03399 2.05857ZM2.36374 1.31643C3.37372 0.404274 4.75205 0 5.99999 0C8.07126 0 9.34542 1.11257 9.99999 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2669 3.66715 18.995 5.5707C18.7233 7.47217 17.515 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87776 16.0333 9.69999 15.9C7.69356 14.3952 5.66446 12.7485 4.07063 11.0272C2.48506 9.31478 1.27668 7.47217 1.00501 5.57072C0.733043 3.66716 1.33253 2.24776 2.36374 1.31643Z" fill="black"/>
              </svg>
              <svg class="product-delete" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
              </svg>
            </div>
          </div>
          <div class=${stock > 0 ? 'product-item__price' : 'hidden'}>
            <div id="full-price">
              <span class="product-item__text full-price ${
                checkPriceLength(getFullProductPrice(price.discount, amount))
                  ? 'product-item__text_large'
                  : ''
              } product-item__text_bold">${formatPrice(
                getFullProductPrice(price.discount, amount)
              )}</span>
              <span class="product-item__text product-item__text_bold">сом</span>
            </div>
            <div id="discount-price"> 
              <span class="product-item__text product-item__text_small overwritten discount-price">${formatPrice(
                getFullProductPrice(price.full, amount)
              )}</span>
              <span class="product-item__text product-item__text_small overwritten"> сом</span></div>
              <div class="tooltip box-shadow price-tooltip_wrapper">
                <p class="tooltip__text price-tooltip"><span>Скидка 55%</span><span>-300 сом</span></p>
                <p class="tooltip__text price-tooltip"><span>Скидка покупателя 10%</span><span>-30 сом</span></p>
              </div>
          </div>
        </div>`;
};
