import { CONTAINER_ELEMENTS } from '../../utils/constants';
import { queryElement } from '../../utils/utils';
import { deliveryModal, toggleDeliveryType } from './deliveryModal';
import { paymentCardsModal } from './paymentCardsModal';

export const hideModalVisibility = () => {
  const formToDelete = queryElement('.modal-form');
  CONTAINER_ELEMENTS.modal.classList.add('hidden');
  formToDelete.remove();
};

export const closeModal = (state) => {
  const closeIcon = queryElement('.modal__close-icon');

  CONTAINER_ELEMENTS.modal.addEventListener('click', (event) => {
    if (
      event.target.contains(CONTAINER_ELEMENTS.modalInner) ||
      event.target === closeIcon
    ) {
      hideModalVisibility();
      state.isOpen = false;
    }
  });
};

export const showModal = (state, modalContent, rootModal) => {
  if (!state.isOpen) {
    rootModal.append(modalContent);
    CONTAINER_ELEMENTS.modal.classList.remove('hidden');
    state.isOpen = true;
  }
};

export const showDeliveryModal = (state) => {
  const btn = [...document.querySelectorAll('.delivery-edit')];
  const deliveryModalContent = deliveryModal(state);
  btn.forEach((el) =>
    el.addEventListener('click', () => {
      showModal(state, deliveryModalContent, CONTAINER_ELEMENTS.modalInner);
      toggleDeliveryType();
    })
  );
};

export const showPaymentModal = (state) => {
  const btn = [...document.querySelectorAll('.payment-edit')];
  const paymentModalContent = paymentCardsModal(state);
  btn.forEach((el) =>
    el.addEventListener('click', () => {
      showModal(state, paymentModalContent, CONTAINER_ELEMENTS.modalInner);
    })
  );
};
