// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  const cart = document.getElementById('cart');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  cartBtn.addEventListener('click', () => {
    cart.classList.toggle('cart-visible');
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
    cart.classList.remove('cart-visible');
  });

  const current_location = window.location.href;
  const navLinks = document.querySelectorAll('nav a')

  navLinks.forEach(link => {
    if (link.href == current_location) {
      link.classList.add('active')
    }
  })

  const increaseQuantityButtons = document.getElementsByClassName('increase-quantity');
  Array.from(increaseQuantityButtons).forEach(button => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      const quantityElement = card.querySelector('.quantity');
      const addToOrderButton = card.querySelector('.add-to-order');
      let currentQuantity = parseInt(quantityElement.textContent, 10);
      currentQuantity += 1;
      quantityElement.textContent = currentQuantity.toString();
      updateAddToOrderButton(addToOrderButton, currentQuantity);
    });
  });

  const decreaseQuantityButtons = document.getElementsByClassName('decrease-quantity');
  Array.from(decreaseQuantityButtons).forEach(button => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      const quantityElement = card.querySelector('.quantity');
      const addToOrderButton = card.querySelector('.add-to-order');
      let currentQuantity = parseInt(quantityElement.textContent, 10);
      if (currentQuantity > 1) {
        currentQuantity -= 1;
        quantityElement.textContent = currentQuantity.toString();
        updateAddToOrderButton(addToOrderButton, currentQuantity);
      }
    });
  });

  const addToOrderButtons = document.querySelectorAll(".add-to-order")
  addToOrderButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      const quantityElement = card.querySelector('.quantity');
      let currentQuantity = parseInt(quantityElement.textContent, 10);
      
      const pricePerItem = parseFloat(button.dataset.price);
      const productName = card.querySelector('h3').textContent
      
      addToCart(productName, currentQuantity, pricePerItem)
      
    })
  })
  

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


let lastScrollTop = 0;
const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight; // Get the height of the navigation bar

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > navHeight) {
    // Scrolling Down
    nav.classList.remove('nav-visible');
    nav.classList.add('nav-hidden');
  } else {
    // Scrolling Up
    nav.classList.remove('nav-hidden');
    nav.classList.add('nav-visible');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// FUNCTIONS AND OPERATIONS

items_in_cart = {}

function addToCart(productName, quantity, price) {
  quantity = parseInt(quantity);
  price = parseFloat(price); 
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

function updateAddToOrderButton(button, quantity) {
  const pricePerItem = parseFloat(button.dataset.price);
  const totalPrice = pricePerItem * quantity;
  button.textContent = `Add to my order $${totalPrice.toFixed(2)}`;
  button.setAttribute('data-total', totalPrice.toFixed(2));
}