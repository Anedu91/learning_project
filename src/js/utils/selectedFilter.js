//Filter selecter UI
export function selectedFilter(setting, nodeGroup) {
  const radioButtons = document.querySelectorAll(nodeGroup);
  const array = [...radioButtons];
  array
    .filter((button) => button.id == setting)
    .map((selectedButton) => (selectedButton.checked = true));
}
