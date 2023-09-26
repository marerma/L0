import { PATTERN_MAP } from './utils/constants';
import { formatPhone, focusFirstInputWithError } from './utils/utils';

const FORM_STATE = {
  firstname: { isTouched: false },
  lastname: { isTouched: false },
  email: { isTouched: false },
  phone: { isTouched: false },
  inn: { isTouched: false },
};

const validateName = (inputName, value) => {
  return value.length > 0
    ? INPUT_ERRORS_MSG[inputName].error
    : INPUT_ERRORS_MSG[inputName].empty;
};

const validatePattern = (inputName, value) => {
  if (!value.length) {
    return INPUT_ERRORS_MSG[inputName].empty;
  } else {
    return PATTERN_MAP[inputName].test(value)
      ? INPUT_ERRORS_MSG[inputName].valid ?? ''
      : INPUT_ERRORS_MSG[inputName].error;
  }
};

const CUSTOMER_INFO_FIELDS = ['firstname', 'lastname', 'email', 'phone', 'inn'];

const INPUT_ERRORS_MSG = {
  firstname: {
    empty: 'Укажите имя',
    error: '',
    valid: '',
    validate: validateName,
  },
  lastname: {
    empty: 'Укажите фамилию',
    error: '',
    valid: '',
    validate: validateName,
  },
  email: {
    empty: 'Укажите электронную почту',
    error: 'Проверьте адрес электронной почты',
    valid: '',
    validate: validatePattern,
  },
  phone: {
    empty: 'Укажите номер телефона',
    error: 'Формат: +9 999 999 99 99',
    valid: '',
    validate: validatePattern,
  },
  inn: {
    empty: 'Укажите ИНН',
    error: 'Проверьте ИНН',
    valid: 'Для таможенного оформления',
    validate: validatePattern,
  },
};

const CUSTOMER_FORM = document.forms.orderDetail;

function getErrorElement(inputNode) {
  const parent = inputNode.parentElement;
  const errorElement = parent.querySelector('.customer__input_error');
  return errorElement;
}

function updateErrorText(inputNode, errorMsg) {
  const errorElement = getErrorElement(inputNode);
  if (errorElement) {
    errorElement.textContent = errorMsg;
  }
}

const getColor = (inputName, errorMsg) =>
  errorMsg === INPUT_ERRORS_MSG[inputName].valid ? 'black' : 'red';

function updateErrorColor(inputNode, color) {
  const element = getErrorElement(inputNode);
  switch (color) {
    case 'red': {
      if (element.classList.contains('black')) {
        element.classList.remove('black');
      }
      inputNode.classList.add('invalidInput');
      break;
    }
    case 'black': {
      if (!element.classList.contains('black')) {
        element.classList.add('black');
      }
      inputNode.classList.remove('invalidInput');
      break;
    }
  }
}

function updateInputClass(inputNode) {
  if (inputNode.value.trim()) {
    inputNode.classList.add('active');
  } else {
    inputNode.classList.remove('active');
  }
}

function validateForm(form) {
  CUSTOMER_INFO_FIELDS.forEach((name) => {
    const inputNode = form.elements[name];
    const inputValue = form.elements[name].value.trim();
    updateInputClass(inputNode);
    let errorMsg = INPUT_ERRORS_MSG[name].validate(name, inputValue);
    updateErrorText(inputNode, errorMsg);
    updateErrorColor(inputNode, getColor(name, errorMsg));
    FORM_STATE[name].isTouched = true;
  });
  focusFirstInputWithError();
}

function revalidateInputs(fields, form) {
  fields.forEach((name) => {
    const input = form.elements[name];
    input.addEventListener('blur', () => {
      const value = input.value.trim();
      let errorMsg = '';

      if (!value) {
        errorMsg = INPUT_ERRORS_MSG[name].valid;
      } else {
        errorMsg = INPUT_ERRORS_MSG[name].validate(name, value);
        FORM_STATE[name].isTouched = true;
        updateInputClass(input);
      }
      updateErrorText(input, errorMsg);
      updateErrorColor(input, getColor(name, errorMsg));
    });

    input.addEventListener('input', () => {
      updateInputClass(input);
      let value = input.value.trim();
      if (name === 'phone') {
        input.value = formatPhone(value);
      }
      if (FORM_STATE[name].isTouched) {
        let errorMsg = '';
        if (!value) {
          errorMsg = INPUT_ERRORS_MSG[name].valid;
        } else {
          errorMsg = INPUT_ERRORS_MSG[name].validate(name, value);
        }
        updateErrorText(input, errorMsg);
        updateErrorColor(input, getColor(name, errorMsg));
      }
    });
  });
}

function validateCustomerData() {
  CUSTOMER_FORM.addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm(this);
  });
  revalidateInputs(CUSTOMER_INFO_FIELDS, CUSTOMER_FORM);
}

export { validateCustomerData };
