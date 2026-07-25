// اطلاعات ربات تلگرام محمدحسین
const TELEGRAM_BOT_TOKEN = '8742095874:AAHJGHu7oDzIHUvBDknvPQ6gnJCsAHksxCs';
const TELEGRAM_CHAT_ID = '5869433249';

// لیست ۹ محصول فروشگاه با پسوند PNG
const products = [
  {
    id: 1,
    name: 'پین سینه Open To Work (طرح دفترچه)',
    image: 'assets/images/product1.png',
    desc: 'جنس از آلیاژ استیل رنگ‌ثابت، مخصوص ایventهای کاری و شبکه سازی. روی کت و کوله عالی میشه!',
    price: '۴۵۰,۰۰۰ تومان'
  },
  {
    id: 2,
    name: 'پین سینه هلالی لینکدین',
    image: 'assets/images/product2.png',
    desc: 'طرح هشتگ محبوب لینکدین با استیل ضد زنگ و لعاب میناکاری. خوراک دورهمی‌های استارتاپی.',
    price: '۳۳۰,۰۰۰ تومان'
  },
  {
    id: 3,
    name: 'سکه / بج هوشمند Open To Work (با QR Code)',
    image: 'assets/images/product3.png',
    desc: 'طراحی فلزی لوکس با آبکاری طلایی؛ پشتش QR Code اختصاصی رزومه یا لینکدینت حک میشه.',
    price: '۱۵۵,۰۰۰ تومان'
  }
];
    id: 4,
    name: 'محصول شماره چهار',
    image: 'assets/images/product4.png',
    desc: 'توضیحات کوتاه محصول شماره چهار. ساخته شده از بهترین متریال.'
  },
  {
    id: 5,
    name: 'محصول شماره پنج',
    image: 'assets/images/product5.png',
    desc: 'توضیحات کوتاه محصول شماره پنج. ایده‌آل برای ست کردن با سایز وسایل.'
  },
  {
    id: 6,
    name: 'محصول شماره شش',
    image: 'assets/images/product6.png',
    desc: 'توضیحات کوتاه محصول شماره شش. دارای بسته‌بندی شیک و اختصاصی.'
  },
  {
    id: 7,
    name: 'محصول شماره هفت',
    image: 'assets/images/product7.png',
    desc: 'توضیحات کوتاه محصول شماره هفت. گزینه‌ای جذاب برای علاقه‌مندان.'
  },
  {
    id: 8,
    name: 'محصول شماره هشت',
    image: 'assets/images/product8.png',
    desc: 'توضیحات کوتاه محصول شماره هشت. با دوام بالا و طراحی منحصربه‌فرد.'
  },
  {
    id: 9,
    name: 'محصول شماره نه',
    image: 'assets/images/product9.png',
    desc: 'توضیحات کوتاه محصول شماره نه. گزینه‌ای مدرن برای تکمیل مجموعه.'
  }
];

const cartIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

function getCart() {
  return JSON.parse(localStorage.getItem('userCart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('userCart', JSON.stringify(cart));
}

// ۱. رندر محصولات در صفحه فروشگاه
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
      <div class="product-price" style="font-weight: bold; color: var(--accent, #00ff88); margin: 10px 0; font-size: 1.1rem;">
        ${product.price}
      </div>
      <button class="btn btn-cart" onclick="addToCart(${product.id})">
        ${cartIcon} افزودن به سبد خرید
      </button>
    `;
    productsContainer.appendChild(card);
  });
}

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
  alert('محصول به سبد خرید اضافه شد!');
}

// ۲. رندر سبد خرید در checkout.html
const checkoutSummary = document.getElementById('checkout-summary');

function renderCheckoutCart() {
  if (!checkoutSummary) return;

  let cart = getCart();

  if (cart.length === 0) {
    checkoutSummary.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 20px 0;">سبد خرید شما خالی است.</p>';
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

window.removeItem = function(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  renderCheckoutCart();
};

if (checkoutSummary) {
  renderCheckoutCart();
}

// ۳. تابع ارسال اطلاعات سفارش به ربات تلگرام
async function sendToTelegram(customer, cart) {
  let itemsList = cart.map(item => `• ${item.name} - (تعداد: ${item.quantity})`).join('\n');

  const message = `🛒 *سفارش جدید در سایت ثبت شد!*\n\n` +
                  `👤 *نام خریدار:* ${customer.fullname}\n` +
                  `📞 *شماره تماس:* ${customer.phone}\n` +
                  `📧 *ایمیل:* ${customer.email}\n` +
                  `📮 *کد پستی:* ${customer.postal}\n` +
                  `📍 *آدرس:* ${customer.address}\n` +
                  `📝 *توضیحات:* ${customer.notes || 'ندارد'}\n\n` +
                  `📦 *اقلام سفارش:*\n${itemsList}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();

    if (!result.ok) {
      alert('خطا از سمت تلگرام: ' + result.description);
    }
  } catch (error) {
    alert('ارسال به تلگرام ناموفق بود. احتمالاً مرورگر امکان اتصال به تلگرام را ندارد (فیلترشکن را بررسی کنید).');
    console.error(error);
  }
}

// ۴. مدیریت ثبت فرم تسویه حساب
const checkoutForm = document.getElementById('checkout-form');
const formError = document.getElementById('form-error');

if (checkoutForm) {
  checkoutForm.addEventListener('submit', async (e) => {
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
    const notes = document.getElementById('notes').value.trim();

    if (!fullname || !phone || !email || !postal || !address) {
      formError.style.display = 'block';
      formError.innerText = 'تکمیل کردن فرم اجباری است';
      return;
    }

    formError.style.display = 'none';

    const customer = { fullname, phone, email, postal, address, notes };

    // ارسال سفارش به تلگرام
    await sendToTelegram(customer, cart);

    // ذخیره‌سازی و پاک‌سازی سبد خرید
    localStorage.setItem('lastOrder', JSON.stringify({ cart, customer }));
    localStorage.removeItem('userCart');

    // هدایت به صفحه موفقیت
    window.location.href = 'success.html';
  });
}
