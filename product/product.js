// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  const cart = document.getElementById('cart');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  cartBtn.addEventListener('click', () => {
    cart.classList.toggle('hidden');
  });

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productRow = event.target.closest('.product');
      const productName = productRow.cells[0].textContent;
      const quantity = productRow.querySelector('.quantity').value;
      const price = parseFloat(productRow.querySelector('.price').dataset.value);
      addToCart(productName, quantity, price);
    });
  });

  const closeCartBtn = document.getElementById('close-cart');

  closeCartBtn.addEventListener('click', () => {
    cart.classList.add('hidden');
  });
});


calculate_total_btn = document.getElementById('calc-total')
calculate_total_btn.addEventListener('click', (event) => {
  const total = document.getElementById('cart-total')
  total.textContent = `Total: $${calculateCartTotal()}`
})

document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    const accordionContent = button.nextElementSibling;

    button.classList.toggle('active');

    if (button.classList.contains('active')) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    } else {
      accordionContent.style.maxHeight = 0;
    }
  });
});

// FUNCTIONS AND OPERATIONS

items_in_cart = {}

function addToCart(productName, quantity, price) {
  quantity = parseInt(quantity); // Ensure quantity is an integer
  price = parseFloat(price); // Ensure price is a float
  const cartItems = document.getElementById('cart-items');
  let listItem = document.querySelector(`#cart-items li[data-product-name="${productName}"]`);
  
  // If the product is already in the cart, update the quantity and total
  if (items_in_cart[productName]) {
    items_in_cart[productName].quantity += quantity;
    items_in_cart[productName].total += quantity * price;
  } else {
    // If the product is not in the cart, add it
    items_in_cart[productName] = {quantity: quantity, total: price * quantity};
    listItem = document.createElement('li');
    listItem.setAttribute('data-product-name', productName);
    cartItems.appendChild(listItem);
  }

  // Update the list item's text content to reflect the current quantity and total
  listItem.textContent = `${productName} - Quantity: ${items_in_cart[productName].quantity} - Total: $${items_in_cart[productName].total.toFixed(2)}`;
}

function calculateCartTotal() {
  let total = 0;
  for (let item in items_in_cart) {
    total += items_in_cart[item].total;
  }
  return total;
}
