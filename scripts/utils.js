export function getElement(selector, parent = document) {
  return parent.querySelector(selector)
}

export function getElements(selector, parent = document) {
  return [...parent.querySelectorAll(selector)]
}

// Function to get a single element
export function getElement1(selector, parent = document) {
  return parent.querySelector(selector)
}

// Function to get multiple elements
export function getElements1(selector, parent = document) {
  return parent.querySelectorAll(selector)
}
