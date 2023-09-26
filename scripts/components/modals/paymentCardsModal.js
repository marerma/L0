import { CARD_NUMBERS } from '../../mockdata/cardNumbers';
import { createElement, formatPrice, queryElement } from '../../utils/utils';
import { hideModalVisibility } from './modal';

export const paymentCardsModal = () => {
  const modalForm = createElement('form');
  modalForm.setAttribute('name', 'payment-type');

  modalForm.innerHTML = `
  <h4 class="modal__title">Способ оплаты</h4>
  <div class="modal__list-wrapper">
    <p class="tertiary-text bold">Мои адреса</p>
    <ul class="modal__list-wrapper_list">
    ${CARD_NUMBERS.map(
      ({ name, icon, number, isChecked }) => `<li class="modal__list-item">
      <input id="card-${name}" 
             value=${JSON.stringify(number)} 
             type="radio" 
             name="payment-card" 
             class="radio-input" 
             ${isChecked ? 'checked' : ''} />
      <label for="card-${name}"><span class="modal__card-icon">
        ${icon}
      </span>${number}</label>
    </li>`
    ).join('')}
    </ul>
    </div>
    <button type='button' class="button_modal-action" id="confirm-paymentCard">Выбрать</button>
  `;
  return modalForm;
};

export const updatePaymentCard = () => {
  const cardIcons = document.querySelectorAll('.payment-card_icon');
  const cardNumbers = document.querySelectorAll('.payment-card_number');
  const button = queryElement('#confirm-paymentCard');
  const form = document.forms['payment-type'];
  const cardInputs = [...form.elements['payment-card']];

  button.addEventListener('click', () => {
    const checkedInput = cardInputs.find((input) => {
      return input.checked === true;
    });
    const chosenCard = {
      number: checkedInput.value,
      icon: CARD_NUMBERS.find(
        (card) => card.name === checkedInput.id.split('-')[1]
      ).icon,
    };

    cardIcons.forEach((el) => (el.innerHTML = chosenCard.icon));
    cardNumbers.forEach((el) => (el.textContent = chosenCard.number));
    hideModalVisibility();
  });
};

export const changeButtonText = (state) => {
  const form = document.forms.orderDetail;
  const payImmediateCheckbox = form.elements['pay-immediate'];
  const orderBtn = queryElement('.order__submit-btn');
  const notice = document.querySelectorAll('.pay-immediate_notice');

  payImmediateCheckbox.addEventListener('click', () => {
    if (payImmediateCheckbox.checked) {
      orderBtn.textContent = `Оплатить ${formatPrice(state.totalSum)} сом`;
      notice.forEach((el) => (el.textContent = ''));
    } else {
      orderBtn.textContent = 'Заказать';
      notice.forEach(
        (el) => (el.textContent = 'Спишем оплату с карты при получении')
      );
    }
  });
};
