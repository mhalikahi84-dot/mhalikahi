// آدرس فرم اختصاصی Formspree (در صورت نیاز آی‌دی خودت رو بزار)
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

// اطلاعات ربات تلگرام محمدحسین
const TELEGRAM_BOT_TOKEN = '8742095874:AAHJGHu7oDzIHUvBDknvPQ6gnJCsAHksxCs';
const TELEGRAM_CHAT_ID = '5869433249';

// لیست محصولات فروشگاه
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
  },
  {
    id: 4,
    name: 'پین سینه Open To Work (طرح آویز نمدی)',
    image: 'assets/images/product9.png',
    desc: 'طرح دست‌ساز نمدی با بند سبزرنگ، استایل کاملاً متفاوت و جلب‌توجه‌کننده برای ایونت‌ها.',
    price: '۲۴۰,۰۰۰ تومان'
  },
  {
    id: 5,
    name: 'پین سینه Open To Work (طرح زیتونی تایپوگرافی)',
    image: 'assets/images/product4.png',
    desc: 'طراحی مینیمال و متنی با پس‌زمینه زیتونی و لبخند، ایده‌آل برای استایل‌های مدرن و شبکه‌سازی.',
    price: '۲۸۰,۰۰۰ تومان'
  },
  {
    id: 6,
    name: 'پین سینه Open To Work (طرح گرد لبخند)',
    image: 'assets/images/product5.png',
    desc: 'پین لعابی سبزرنگ با لوگوی هشتگ و لبخند، حس مثبت و پرانرژی برای ارتباطات حرفه‌ای.',
    price: '۲۹۰,۰۰۰ تومان'
  },
  {
    id: 7,
    name: 'پین آویز Open To Work (طرح مستطیلی باریک)',
    image: 'assets/images/product6.png',
    desc: 'طراحی آویزدار و خاص فلزی با فونت عمودی، مناسب نصب روی کت، کیف و استایل‌های رسمی.',
    price: '۳۲۰,۰۰۰ تومان'
  },
  {
    id: 8,
    name: 'پین آویز Open To Work (طرح کپسولی)',
    image: 'assets/images/product7.png',
    desc: 'مدل آویز دار با فرم کپسولی و جلا داده‌شده، جذاب و چشم‌گیر برای رویدادهای کاری.',
    price: '۳۱۰,۰۰۰ تومان'
  },
  {
    id: 9,
    name: 'پیکسل گلدوزی Open To Work (طرح هلال نمدی)',
    image: 'assets/images/product8.png',
    desc: 'بافت پارچه‌ای و گلدوزی‌شده برجسته، بافت گرم و متفاوتی به هودی، کوله و لباس میده.',
    price: '۲۵۰,۰۰۰ تومان'
  }
];

const cartIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

// ساخت کد پیگیری یکتا
function generateOrderId() {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MH-${timestamp}${random}`;
}

function getCart() {
  return JSON.parse(localStorage.getItem('userCart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('userCart', JSON.stringify(cart));
}

// ۱. رندر محصولات
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
      <div class="product-price" style="font-weight: bold; color: #00ff88; margin: 12px 0; font-size: 1.1rem;">
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
          <p style="color: #00ff88; font-size: 0.9rem; margin-top: 4px;">${item.price}</p>
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

// ۳. تابع ارسال به ایمیل
async function sendToEmail(customer, cart, orderId) {
  let itemsList = cart.map(item => `${item.name} (${item.price}) - تعداد: ${item.quantity}`).join(' | ');

  try {
    await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        order_id: orderId,
        fullname: customer.fullname,
        phone: customer.phone,
        email: customer.email,
        postal: customer.postal,
        address: customer.address,
        notes: customer.notes || 'ندارد',
        order_items: itemsList
      })
    });
  } catch (err) {
    console.error('Email send failed:', err);
  }
}

// ۴. تابع ارسال به تلگرام با کد پیگیری
async function sendToTelegram(customer, cart, orderId) {
  let itemsList = cart.map(item => `• ${item.name} (${item.price}) - (تعداد: ${item.quantity})`).join('\n');

  const message = `🛒 *سفارش جدید در سایت ثبت شد!*\n` +
                  `🔢 *کد پیگیری:* \`${orderId}\` \n\n` +
                  `👤 *نام خریدار:* ${customer.fullname}\n` +
                  `📞 *شماره تماس:* ${customer.phone}\n` +
                  `📧 *ایمیل:* ${customer.email}\n` +
                  `📮 *کد پستی:* ${customer.postal}\n` +
                  `📍 *آدرس:* ${customer.address}\n` +
                  `📝 *توضیحات:* ${customer.notes || 'ندارد'}\n\n` +
                  `📦 *اقلام سفارش:*\n${itemsList}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  } catch (error) {
    console.error('Telegram send failed:', error);
  }
}

// ۵. ثبت فرم تسویه حساب
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

    // ساخت کد پیگیری یکتا
    const orderId = generateOrderId();
    const customer = { fullname, phone, email, postal, address, notes };

    // ارسال همزمان به ایمیل و تلگرام به همراه کد پیگیری
    await Promise.allSettled([
      sendToEmail(customer, cart, orderId),
      sendToTelegram(customer, cart, orderId)
    ]);

    // ذخیره سفارش به همراه کد پیگیری برای نمایش در success.html
    localStorage.setItem('lastOrder', JSON.stringify({ orderId, cart, customer }));
    localStorage.removeItem('userCart');

    // انتقال به صفحه موفقیت
    window.location.href = 'success.html';
  });
}
