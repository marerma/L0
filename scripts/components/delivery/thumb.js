import { createElement, getRetinaSrc } from '../../utils/utils';

export class ThumbImage {
  constructor(src, title, amount) {
    this.src = src;
    this.title = title;
    this.amount = amount;
  }

  renderNode() {
    const div = createElement('div');
    const image = createElement('img');
    image.setAttribute('src', this.src);
    image.setAttribute('srcset', `${getRetinaSrc(this.src)}`);
    image.setAttribute('alt', this.title);
    image.setAttribute('loading', 'lazy');

    const iconHTML =
      this.amount > 1
        ? `<div class="thumb__icon">
    <span>${this.amount}</span>
   </div>`
        : '';

    div.innerHTML = `<div class="thumb-icons__wrapper">
    ${image.outerHTML}

    ${iconHTML}
    </div>`;
    return div;
  }
}
