import { createElement } from '../../utils/utils';
import { hideModalVisibility } from './modal';

export const paymentCardsModal = (state) => {
  const modalForm = createElement('form');
  modalForm.setAttribute('name', 'payment-type');
  modalForm.classList = 'modal-form';
  const button = createElement('button');
  button.classList = 'button_modal-action';
  button.setAttribute('id', 'confirm-paymentCard');
  button.textContent = 'Выбрать';
  button.setAttribute('type', 'button');

  modalForm.innerHTML = `
  <h4 class="modal__title">Способ оплаты</h4>
  <div class="modal__list-wrapper">
    <p class="tertiary-text bold">Мои адреса</p>
    <ul class="modal__list-wrapper_list">
    ${state.savedCards
      .map(
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
      )
      .join('')}
    </ul>
    </div>
  `;
  button.addEventListener('click', () => updatePaymentCard(state));
  modalForm.append(button);
  return modalForm;
};

export const updatePaymentCard = (state) => {
  const cardIcons = document.querySelectorAll('.payment-card_icon');
  const cardNumbers = document.querySelectorAll('.payment-card_number');
  const form = document.forms['payment-type'];
  const cardInputs = [...form.elements['payment-card']];
  const checkedInput = cardInputs.find((input) => {
    return input.checked === true;
  });
  const chosenCard = {
    number: checkedInput.value,
    icon: state.savedCards.find(
      (card) => card.name === checkedInput.id.split('-')[1]
    ).icon,
  };

  cardIcons.forEach((el) => (el.innerHTML = chosenCard.icon));
  cardNumbers.forEach((el) => (el.textContent = chosenCard.number));
  hideModalVisibility();
  state.isOpen = false;
};
