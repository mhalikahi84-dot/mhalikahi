// لیست محصولات
const products = [
  {
    id: 1,
    name: 'محصول شماره یک',
    image: 'assets/images/product1.jpg',
    desc: 'یک محصول دکوری از جنس چوب راش، مناسب برای استفاده در فضای داخلی.'
  },
  {
    id: 2,
    name: 'محصول شماره دو',
    image: 'assets/images/product2.jpg',
    desc: 'بسته‌بندی اختصاصی از جنس مقوای بازیافتی، ایده‌آل برای هدیه‌های سازمانی.'
  },
  {
    id: 3,
    name: 'محصول شماره سه',
    image: 'assets/images/product3.jpg',
    desc: 'ماگ سرامیکی مات با طراحی مینیمال، قابل استفاده در منزل و محیط کار.'
  }
];

const cartIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

// گرفت سبد از localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('userCart')) || [];
}

// ذخیره سبد در localStorage
function saveCart(cart) {
  localStorage.setItem('userCart', JSON.stringify(cart));
}

// ۱. رندر محصولات در صفحه اصلی فروشگاه (products.html)
const productsContainer = document.getElementById('products-container');
if (productsContainer) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      <button class="btn btn-cart" onclick="addToCart(${product.id})">
        ${cartIcon} افزودن به سبد خرید
      </button>
    `;
    productsContainer.appendChild(card);
  });
}

// افزودن محصول به سبد
function addToCart(productId) {
  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
      cart.push({ ...productToAdd, quantity: 1 });
    }
  }

  saveCart(cart);
  alert('محصول به سبد خرید اضافه شد! می‌توانی محصولات دیگر را اضافه کنی یا روی دکمه "ادامه جهت تسویه حساب" بزنی.');
}

// ۲. رندر سبد خرید و مدیریت تعداد تو صفحه تسویه حساب (checkout.html)
const checkoutSummary = document.getElementById('checkout-summary');

function renderCheckoutCart() {
  if (!checkoutSummary) return;

  let cart = getCart();

  if (cart.length === 0) {
    checkoutSummary.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 20px 0;">سبد خرید شما خالی است. لطفا ابتدا از فروشگاه محصولی انتخاب کنید.</p>';
    return;
  }

  let html = '';
  cart.forEach(item => {
    html += `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="summary-details">
          <h4>${item.name}</h4>
          <div class="quantity-controls">
            <button type="button" onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button type="button" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(${item.id})">حذف</button>
      </div>
    `;
  });

  checkoutSummary.innerHTML = html;
}

// کم و زیاد کردن تعداد محصول در صفحه چک‌اوت
window.updateQty = function(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);

  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    saveCart(cart);
    renderCheckoutCart();
  }
};

// حذف کامل محصول
window.removeItem = function(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  renderCheckoutCart();
};

if (checkoutSummary) {
  renderCheckoutCart();
}

// ۳. اعتبارسنچی فرم تسویه حساب
const checkoutForm = document.getElementById('checkout-form');
const formError = document.getElementById('form-error');

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      formError.style.display = 'block';
      formError.innerText = 'سبد خرید شما خالی است!';
      return;
    }

    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const postal = document.getElementById('postal').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!fullname || !phone || !email || !postal || !address) {
      formError.style.display = 'block';
      formError.innerText = 'تکمیل کردن فرم اجباری است';
      return;
    }

    formError.style.display = 'none';

    const orderData = {
      cart,
      customer: { fullname, phone, email, postal, address, notes: document.getElementById('notes').value.trim() }
    };

    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    localStorage.removeItem('userCart'); // پاک‌سازی سبد پس از ثبت موفق

    window.location.href = 'success.html';
  });
}
