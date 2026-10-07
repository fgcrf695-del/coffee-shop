const products = [
  {
    id: 1,
    name: 'Sunrise Blend',
    tag: 'Light',
    origin: 'Ethiopia',
    price: 18,
    description: 'Citrus-forward and floral with a delicate caramel finish.',
    image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Velvet Roast',
    tag: 'Medium',
    origin: 'Brazil',
    price: 21,
    description: 'Smooth body and cocoa notes designed for a balanced espresso shot.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Cinder House',
    tag: 'Dark',
    origin: 'Indonesia',
    price: 23,
    description: 'Roasted deep for toasted almond sweetness and a smoky finish.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Atlas Espresso',
    tag: 'Espresso',
    origin: 'Colombia',
    price: 24,
    description: 'Rich crema, chocolate texture, and a lingering berry sweetness.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Harbor Bloom',
    tag: 'Light',
    origin: 'Kenya',
    price: 22,
    description: 'A vibrant cup with bright citrus sparkle and berry aroma.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Hearth Reserve',
    tag: 'Medium',
    origin: 'Costa Rica',
    price: 19,
    description: 'Balanced sweetness with caramel warmth and honey-like finish.',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Noon Drip',
    tag: 'Medium',
    origin: 'Guatemala',
    price: 20,
    description: 'A clean, juicy cup made for pour-over and cold brew alike.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688bcb4f5?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Midnight House',
    tag: 'Dark',
    origin: 'Peru',
    price: 25,
    description: 'Deep cocoa structure with toasted walnut and a soft spice finish.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b8e5?auto=format&fit=crop&w=900&q=80'
  }
];

const cartKey = 'bean-bloom-cart';
let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
let activeFilter = 'all';
let searchTerm = '';

const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalValue = document.getElementById('subtotalValue');
const totalValue = document.getElementById('totalValue');
const cartPanel = document.getElementById('cartPanel');
const checkoutModal = document.getElementById('checkoutModal');
const toast = document.getElementById('toast');

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('visible'), 2200);
}

function getFilteredProducts() {
  return products.filter((product) => {
    const tagMatches = activeFilter === 'all' || product.tag.toLowerCase() === activeFilter;
    const term = searchTerm.trim().toLowerCase();
    const searchMatches = !term || [
      product.name,
      product.origin,
      product.tag,
      product.description
    ].join(' ').toLowerCase().includes(term);

    return tagMatches && searchMatches;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();

  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-cart" style="grid-column: 1 / -1; min-height: 220px;">No products match your filter.</div>';
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-media">
        <button class="favorite-btn" type="button" aria-label="Save ${product.name}">♡</button>
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-tag">${product.tag}</span>
          <span class="product-origin">${product.origin}</span>
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="price">${formatPrice(product.price)}</span>
          <button class="add-btn" type="button" data-add-id="${product.id}">Add</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalQuantity;
  subtotalValue.textContent = formatPrice(subtotal);
  totalValue.textContent = formatPrice(subtotal);

  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty. Add a few beans to get brewing.</div>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <div class="price-tag">${formatPrice(item.price)}</div>
        <div class="qty-wrap">
          <button class="qty-btn" type="button" data-qty-action="decrease" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" type="button" data-qty-action="increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-item" type="button" aria-label="Remove ${item.name}" data-remove-id="${item.id}">✕</button>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(item => item.id === Number(id));
  if (!product) return;

  const existingItem = cart.find(item => item.id === Number(id));

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} added to cart`);
}

function updateQuantity(id, action) {
  const item = cart.find(item => item.id === Number(id));
  if (!item) return;

  if (action === 'increase') item.quantity += 1;
  if (action === 'decrease') item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== Number(id));
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  renderCart();
  showToast('Item removed from cart');
}

function toggleCart(forceOpen) {
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !cartPanel.classList.contains('open');
  cartPanel.classList.toggle('open', shouldOpen);
}

function openCheckout() {
  if (!cart.length) {
    showToast('Your cart is empty');
    return;
  }
  checkoutModal.classList.add('open');
}

function closeCheckout() {
  checkoutModal.classList.remove('open');
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());

  const orderSummary = {
    customer: payload,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString()
  };

  const allOrders = JSON.parse(localStorage.getItem('bean-bloom-orders') || '[]');
  allOrders.unshift(orderSummary);
  localStorage.setItem('bean-bloom-orders', JSON.stringify(allOrders));

  cart = [];
  saveCart();
  renderCart();
  closeCheckout();
  event.target.reset();
  showToast('Order placed successfully');
}

function bindEvents() {
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn === button));
      renderProducts();
    });
  });

  document.getElementById('searchInput').addEventListener('input', (event) => {
    searchTerm = event.target.value;
    renderProducts();
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target instanceof HTMLElement) {
      if (target.matches('[data-add-id]')) {
        addToCart(target.dataset.addId);
      }

      if (target.matches('[data-remove-id]')) {
        removeFromCart(target.dataset.removeId);
      }

      if (target.matches('[data-qty-action]')) {
        updateQuantity(target.dataset.id, target.dataset.qtyAction);
      }

      if (target.matches('.cart-button')) {
        toggleCart();
      }

      if (target.matches('.close-cart')) {
        toggleCart(false);
      }

      if (target.matches('.checkout-btn')) {
        openCheckout();
      }

      if (target.matches('[data-scroll]')) {
        const id = target.dataset.scroll;
        const section = document.querySelector(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }

      if (target.matches('.modal-close')) {
        closeCheckout();
      }

      if (target.matches('.modal-backdrop') && target === checkoutModal) {
        closeCheckout();
      }
    }
  });

  document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
  document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Subscribed successfully');
    event.target.reset();
  });
}

bindEvents();
renderProducts();
renderCart();

