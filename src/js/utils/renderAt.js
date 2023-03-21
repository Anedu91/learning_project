export function renderAt(element, html) {
  const node = document.querySelector(element);

  node.innerHTML = html;
}
