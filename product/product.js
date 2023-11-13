// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  const cart = document.getElementById('cart');

  cartBtn.addEventListener('click', () => {
    cart.classList.toggle('cart-visible');
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

      const product_image = card.querySelector('img').src
      
      addToCart(productName, currentQuantity, pricePerItem, product_image)
      
    })
  })

  const calcTotalButton = document.getElementById('calc-total')

  calcTotalButton.addEventListener('click', () => {
    const totalAmountBeforeTax = updateSubtotal()
    const taxRate = 0.0805;
    const totalTax = totalAmountBeforeTax * taxRate;
    const totalAmount = totalAmountBeforeTax + totalTax
    
    const totalElement = document.querySelector('.total');
    const taxElement = document.querySelector('.cart-section')

    if (totalElement) {
      totalElement.innerHTML = `
        <h4>Total</h4>
        <p>$${totalAmount.toFixed(2)}</p>
      `;
      totalElement.classList.add('subtotal')
      

      taxElement.innerHTML = `
        <h4>Tax</h4>
        <p>$${totalTax.toFixed(2)}</p>
      `

    }

  })

});


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

items_in_cart = {} // "prodctName: {"total": 0, "quantity": 0}"

function addToCart(productName, quantity, price, product_image) {
  quantity = parseInt(quantity); 
  price = parseFloat(price);
  const cartItems = document.getElementById('cart-items');

  // Check if the product is already in the cart
  if (items_in_cart[productName]) {
    // Update the quantity and total if the item is already in the cart
    items_in_cart[productName].quantity += quantity;
    items_in_cart[productName].total = items_in_cart[productName].quantity * price;

    // Update the UI to reflect the new quantity
    const listItem = cartItems.querySelector(`li[data-product-name="${productName}"]`);
    const amountElement = listItem.querySelector('.cart-text p:nth-of-type(2)');
    amountElement.textContent = `Amount: ${items_in_cart[productName].quantity}`;
  } else {

    items_in_cart[productName] = {
      quantity: quantity,
      total: price * quantity
    }

    const listItem = document.createElement('li')
    listItem.setAttribute('data-product-name', productName);
    listItem.className = 'item';

    listItem.innerHTML = `
    <div class="item-container">
      <img src="${product_image}" alt="${productName}" />
      <div class="cart-text">
        <p>${productName}</p>
        <p>Amount: ${quantity}</p>
        <button class="remove-item">remove</button>
      </div>
    </div>`
    cartItems.appendChild(listItem)

    const removeButton = listItem.querySelector('.remove-item');
    removeButton.addEventListener('click', () => removeFromCart(productName, price));

  }
  updateSubtotal();
}

function updateAddToOrderButton(button, quantity) {
  const pricePerItem = parseFloat(button.dataset.price);
  const totalPrice = pricePerItem * quantity;
  button.textContent = `Add to my order $${totalPrice.toFixed(2)}`;
  button.setAttribute('data-total', totalPrice.toFixed(2));
}

function updateSubtotal() {
  let subtotal = 0;
  Object.values(items_in_cart).forEach(item => {
    subtotal += item.total;
  });
  document.querySelector('.subtotal p').textContent = `$${subtotal.toFixed(2)}`;
  return subtotal
}

function removeFromCart(productName, price) {
  const cartItems = document.getElementById('cart-items');
  const listItem = cartItems.querySelector(`li[data-product-name="${productName}"]`);
  if (items_in_cart[productName].quantity - 1 === 0) {
    delete items_in_cart[productName]
    cartItems.removeChild(listItem)
  } else {
    items_in_cart[productName].quantity -= 1
    items_in_cart[productName].total -= price;

    const amountElement = listItem.querySelector('.cart-text p:nth-of-type(2)');
    amountElement.textContent = `Amount: ${items_in_cart[productName].quantity}`;
  }
  
  updateSubtotal()
}