// آرایه دیتای محصولات
const products = [
  {
    id: 1,
    name: 'محصول شماره یک',
    image: 'assets/images/product1.jpg',
    desc: 'یک محصول دکوری از جنس چوب راش، مناسب برای استفاده در فضای داخلی و روی میز کار.'
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

const cartIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

// ۱. لود کردن محصولات در صفحه Products
const productsContainer = document.getElementById('products-container');
if (productsContainer) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      <button class="btn btn-cart" onclick="addToCart(${product.id})">
        ${cartIcon} افزودن به سبد
      </button>
    `;
    productsContainer.appendChild(card);
  });
}

// تابع افزودن به سبد
function addToCart(productId) {
  const selected = products.find(p => p.id === productId);
  if (selected) {
    selected.quantity = 1; // دیفالت تعداد رو روی ۱ میذاریم
    localStorage.setItem('selectedProduct', JSON.stringify(selected));
    window.location.href = 'checkout.html';
  }
}

// ۲. لود کردن دیتای محصول در صفحه تسویه حساب (با قابلیت تغییر تعداد)
const checkoutSummary = document.getElementById('checkout-summary');
let savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

function renderCheckout() {
  if (!savedProduct) {
    checkoutSummary.innerHTML = '<p>هیچ محصولی انتخاب نشده است.</p>';
    return;
  }
  checkoutSummary.innerHTML = `
    <div class="summary-item">
      <img src="${savedProduct.image}" alt="${savedProduct.name}">
      <div class="summary-details">
        <h4>${savedProduct.name}</h4>
        <div class="quantity-controls">
          <button type="button" onclick="changeQty(-1)">-</button>
          <span id="qty-display">${savedProduct.quantity}</span>
          <button type="button" onclick="changeQty(1)">+</button>
        </div>
      </div>
    </div>
  `;
}

// تابع تغییر تعداد
window.changeQty = function(amount) {
  if (savedProduct && (savedProduct.quantity + amount > 0)) {
    savedProduct.quantity += amount;
    localStorage.setItem('selectedProduct', JSON.stringify(savedProduct));
    document.getElementById('qty-display').innerText = savedProduct.quantity;
  }
}

if (checkoutSummary) {
  renderCheckout();
}

// ۳. هندل کردن فرم تسویه حساب و ارورها
const checkoutForm = document.getElementById('checkout-form');
const formError = document.getElementById('form-error');

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const postal = document.getElementById('postal').value.trim();
    const address = document.getElementById('address').value.trim();

    // چک کردن فیلدهای اجباری
    if (!fullname || !phone || !email || !postal || !address) {
      formError.style.display = 'block';
      formError.innerText = 'خطا: لطفاً تمام فیلدهای ستاره‌دار را پر کن!';
      return; // فرم سابمیت نمیشه
    }

    // اگر همه چی اوکی بود، ارور رو مخفی کن
    formError.style.display = 'none';

    // ذخیره دیتا و انتقال
    const orderData = {
      product: savedProduct,
      fullname,
      phone,
      email,
      postal,
      address,
      notes: document.getElementById('notes').value.trim()
    };

    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    window.location.href = 'success.html';
  });
}
