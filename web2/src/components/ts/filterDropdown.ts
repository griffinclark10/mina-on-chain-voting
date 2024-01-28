//can't import badge variants for the badges in dropdown so need to manually assign className:
const badgeClassSecondary: string =
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm px-1 font-normal';

let globalSelections: Object = {};

// update the filter parameters in the URL
export const updateURLParams = (selectedOptionsSet: Object) => {
  const searchParams = new URLSearchParams();
  Object.entries(selectedOptionsSet).forEach(([dropdownId, selectedValues]) => {
    selectedValues.forEach((value) => {
      searchParams.append(dropdownId, value);
    });
  });
  window.history.pushState(null, '', `?${searchParams}`);
};

//make style changes based off whether the filter is selected or not
export const toggleCheckBox = (optionElement: Element, checked: boolean) => {
  if (checked) {
    optionElement.classList.add('bg-primary', 'text-primary-foreground');
    optionElement.classList.remove('opacity-50', '[&_svg]:invisible');
  } else {
    optionElement.classList.remove('bg-primary', 'text-primary-foreground');
    optionElement.classList.add('opacity-50', '[&_svg]:invisible');
  }
};

// get the filter parameters from the URL
export const getURLParams = () => {
  const params = new URLSearchParams(window.location.search);
  const paramObject = {};
  for (const [key, value] of params) {
    if (!paramObject[key]) {
      paramObject[key] = new Set();
    }
    paramObject[key].add(value);
  }
  return paramObject;
};

// update the display to add or remove selected filters to the badge
export const updateDisplay = (dropdownElement: Element) => {
  const urlParams = getURLParams();
  const title = dropdownElement.getAttribute('data-title');
  if (!title) return;
  const selectedFromURL = urlParams[title];
  console.log(selectedFromURL);

  const badgeContainer = dropdownElement.querySelector('.badge-container');
  if (!badgeContainer) {
    return;
  }
  badgeContainer.innerHTML = '';

  // show separator if there are selected filters
  const separator = dropdownElement.querySelector('.separator');
  if (selectedFromURL.size === 0) {
    separator?.classList.add('hidden');
    return;
  }
  separator?.classList.remove('hidden');

  // update value of count badge
  const countBadge = dropdownElement.querySelector('.selected-count-badge');
  if (countBadge) {
    countBadge.textContent = selectedFromURL.size > 0 ? selectedFromURL.size.toString() : '';
  }

  // update the display of the selected filters
  if (selectedFromURL.size > 2) {
    const badge = document.createElement('div');
    badge.className = badgeClassSecondary;
    badge.textContent = `${selectedFromURL.size} selected`;
    badgeContainer.appendChild(badge);
  } else {
    selectedFromURL.forEach((value) => {
      const badge = document.createElement('div');
      badge.className = badgeClassSecondary;
      badge.textContent = value;
      badgeContainer.appendChild(badge);
    });
  }
};

// differentiate between the filter categories of the different dropdowns, add event listeners to each
export function setupDropdown(dropdownElement: Element, title: string | null, selectedFromURL: Set<string>) {
  const optionElements = dropdownElement.querySelectorAll('.options-list li');
  let selectedOptions = selectedFromURL || new Set<string>();
  optionElements.forEach((element) => {
    const optionValue = element.getAttribute('data-value');
    if (optionValue && selectedOptions.has(optionValue)) {
      const checkbox = dropdownElement.querySelector(`[data-checkboxValue="${optionValue}"]`);
      if (checkbox) toggleCheckBox(checkbox, true);
    }
    element.addEventListener('click', () => {
      const optionValue = element.getAttribute('data-value');
      if (!optionValue || !title) return;
      toggleSelection(optionValue, selectedOptions, dropdownElement, title);
    });
  });

  //select or de-select filter check-box
  const toggleSelection = (
    optionValue: string,
    selectedOptionsSet: Set<string>,
    dropdownElement: Element,
    title: string
  ) => {
    const optionElement = dropdownElement.querySelector(`[data-checkboxValue="${optionValue}"]`);
    if (!optionElement) return;

    if (selectedOptionsSet.has(optionValue)) {
      selectedOptionsSet.delete(optionValue);
      toggleCheckBox(optionElement, false);
    } else {
      selectedOptionsSet.add(optionValue);
      toggleCheckBox(optionElement, true);
    }
    globalSelections[title] = selectedOptionsSet;
    updateURLParams(globalSelections);
    updateDisplay(dropdownElement);
  };
}
