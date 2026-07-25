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
  },
  // می‌تونی تا ۱۰ تا محصول رو همینطوری به این لیست اضافه کنی
];

// آیکون سبد خرید (SVG)
const cartIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

// ۱. لود کردن محصولات در صفحه محصولات
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

// تابع افزودن به سبد و انتقال به صفحه چک‌اوت
function addToCart(productId) {
  const selected = products.find(p => p.id === productId);
  if (selected) {
    localStorage.setItem('selectedProduct', JSON.stringify(selected));
    window.location.href = 'checkout.html';
  }
}

// ۲. لود کردن دیتای محصول در صفحه تسویه حساب
const checkoutSummary = document.getElementById('checkout-summary');
if (checkoutSummary) {
  const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  
  if (!savedProduct) {
    checkoutSummary.innerHTML = '<p>هیچ محصولی انتخاب نشده است.</p>';
  } else {
    checkoutSummary.innerHTML = `
      <div class="summary-item">
        <img src="${savedProduct.image}" alt="${savedProduct.name}">
        <h4>${savedProduct.name}</h4>
      </div>
    `;
  }
}

// ۳. هندل کردن فرم تسویه حساب
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    
    // گرفتن اطلاعات فرم
    const orderData = {
      product: JSON.parse(localStorage.getItem('selectedProduct')),
      fullname: document.getElementById('fullname').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      postal: document.getElementById('postal').value,
      address: document.getElementById('address').value,
      notes: document.getElementById('notes').value
    };

    // ذخیره موقت اطلاعات در لوکال استوریج (در صورت نیاز به بک‌اند در آینده)
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // انتقال به صفحه موفقیت
    window.location.href = 'success.html';
  });
}
