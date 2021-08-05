const spinner = `
<svg class="spinner" viewBox="0 0 50 50">
  <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
</svg>`;

export const addLoader = () => {
  const $loader = document.querySelector('#loader') as HTMLElement;
  $loader.innerHTML = spinner;

  window.addEventListener('request', (e: CustomEvent) => {
    $loader.setAttribute('data-id', e.detail.id);
    $loader.classList.add('show');
  });

  window.addEventListener('request-end', (e: CustomEvent) => {
    if (+$loader.dataset.id === e.detail.id) $loader.classList.remove('show');
  });
};
