import DELIVERY from '../../mockdata/deliveryAddresses';
import { createElement, queryElement } from '../../utils/utils';
import { hideModalVisibility } from './modal';

export const deliveryModal = (state) => {
  const modalForm = createElement('form');
  modalForm.setAttribute('name', 'delivery-type');
  modalForm.classList = 'modal-form';
  const button = createElement('button');
  button.classList = 'button_modal-action';
  button.setAttribute('id', 'confirm-deliveryType');
  button.textContent = 'Выбрать';
  button.setAttribute('type', 'button');

  modalForm.innerHTML = `
  <h4 class="modal__title">Способ доставки</h4>
  <div class="modal__btns">
    <label for="delivery-target_office" class="modal__label tertiary-text bold">
      В пункт выдачи
      <input id="delivery-target_office" type="radio" value="office" name="delivery-target" class="modal__button">
    </label>
    <label for="delivery-target_home" class="modal__label tertiary-text bold">
       Курьером
      <input id="delivery-target_home" type="radio" value="home" name="delivery-target" checked class="modal__button">
    </label>
  </div>
  <div class="modal__list-wrapper">
    <p class="tertiary-text bold">Мои адреса</p>
    <ul class="modal__list-wrapper_list">
    ${DELIVERY.home
      .map(
        ({ id, address, isChecked }) => `<li class="modal__list-item">
      <input id="home-${id}" 
             value=${JSON.stringify(address)} 
             type="radio" 
             name="delivery-home" 
             class="radio-input" 
             ${isChecked ? 'checked' : ''} />
      <label for="home-${id}">${address}</label>
      <span>
        <svg class="address-delete" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
        </svg>
      </span>
    </li>`
      )
      .join('')}
    </ul>

    <ul class="modal__list-wrapper_list hidden">
    ${DELIVERY.office
      .map(
        ({ id, address, rating, isChecked }) => `<li class="modal__list-item">
      <input id="office-${id}" 
             value=${JSON.stringify(address)} 
             type="radio" 
             name="delivery-office" 
             class="radio-input" 
             ${isChecked ? 'checked' : ''}/>
      <label for="office-${id}">${address}
      <p class="office-rating tertiary-text grey">${rating} Пункт выдачи</p>
      </label>
      <span>
        <svg class="address-delete" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
        </svg>
      </span>
    </li>`
      )
      .join('')}
    </ul>
    </div>
  `;
  button.addEventListener('click', () => updateDeliveryAddress(state));
  modalForm.append(button);
  return modalForm;
};

export const toggleDeliveryType = () => {
  const list = document.querySelectorAll('.modal__list-wrapper_list');
  const form = document.forms['delivery-type'];
  const homeInput = form.elements['delivery-target_home'];
  const officeInput = form.elements['delivery-target_office'];

  officeInput.addEventListener('click', () => {
    list[0].classList.add('hidden');
    list[1].classList.remove('hidden');
  });
  homeInput.addEventListener('click', () => {
    list[0].classList.remove('hidden');
    list[1].classList.add('hidden');
  });
};

function updateState(state) {
  const form = document.forms['delivery-type'];
  const typeInputs = form.elements['delivery-target'];

  state.deliveryAddress.type = typeInputs.value;

  if (typeInputs.value === 'home') {
    const homeInputs = form.elements['delivery-home'];
    state.deliveryAddress.address = homeInputs.value;
  } else {
    const officeInputs = form.elements['delivery-office'];
    state.deliveryAddress.address = officeInputs.value;
  }
}

function updateDeliveryUI(state) {
  const deliveryAddress = document.querySelectorAll('.delivery-address');
  const deliveryTypeInCart = queryElement('.delivery-type');
  const deliveryTypeOrderInfo = queryElement('.delivery-type_short');
  const subtitle =
    state.deliveryAddress.type === 'home'
      ? 'Доставка по адресу'
      : 'Доставка в пункт выдачи';
  const addressText =
    state.deliveryAddress.type === 'home' ? 'Адрес доставки' : 'Пункт выдачи';
  deliveryTypeInCart.textContent = subtitle;
  deliveryTypeOrderInfo.textContent = addressText;
  deliveryAddress.forEach((el, ind) => {
    el.textContent = `
    ${state.deliveryAddress.address}
    `;
    if (ind === 0) {
      el.innerHTML =
        el.innerHTML +
        `<div>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922" fill="#FF970D"/>
        </svg>
      <span class="tertiary-text">4.99</span>
      <span class="tertiary-text">Ежедневно с 10 до 21 </span>
    </div>`;
    }
  });
}

export const updateDeliveryAddress = (state) => {
  updateState(state);
  updateDeliveryUI(state);
  hideModalVisibility();
  state.isOpen = false;
};
