import { queryElement } from '../../utils/utils';
import {
  deliveryModal,
  toggleDeliveryType,
  updateDeliveryAddress,
} from './deliveryModal';

export const hideModalVisibility = () => {
  const modal = queryElement('.modal');
  const modalContent = queryElement('.modal__content');
  modal.classList.add('hidden');
  modalContent.removeChild(modalContent.lastChild);
};

export const closeModal = () => {
  const modal = queryElement('.modal');
  const modalContent = queryElement('.modal__content');
  const closeIcon = queryElement('.modal__close-icon');

  modal.addEventListener('click', (event) => {
    if (event.target.contains(modalContent) || event.target === closeIcon) {
      hideModalVisibility();
    }
  });
};

const MODAL_GLOBAL = queryElement('.modal');
const MODAL_CONTAINER = queryElement('#modal-container');

export const showModal = (isOpen, modalContent, rootModal) => {
  if (!isOpen) {
    rootModal.append(modalContent);
    MODAL_GLOBAL.classList.remove('hidden');
  }
};

export const showDeliveryModal = (state) => {
  const btn = [...document.querySelectorAll('.delivery-edit')];
  const deliveryModalContent = deliveryModal();
  btn.forEach((el) =>
    el.addEventListener('click', () => {
      showModal(state.isOpen, deliveryModalContent, MODAL_CONTAINER);
      toggleDeliveryType();
      updateDeliveryAddress(state);
    })
  );
};
