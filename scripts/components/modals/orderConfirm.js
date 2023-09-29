import { createElement } from '../../utils/utils';

export const orderConfirmModal = () => {
  const modalForm = createElement('div');
  modalForm.classList = 'modal-form';

  modalForm.innerHTML = `
  <h4 class="modal__title">Подтверждение заказа</h4>
  <div class="modal__list-wrapper">
    <p class="tertiary-text bold">Заказ успешно оформлен</p>
    </div>
  `;
  return modalForm;
};
