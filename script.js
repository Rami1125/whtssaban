import { faqData, newProductsImages, chatSuggestionsData, productsData as staticProductsData } from './data.js';

// General elements
const tabletContainer = document.getElementById('tabletContainer');
const mainContentArea = document.getElementById('mainContentArea');
const categoryPagesContainer = document.getElementById('categoryPagesContainer');
const allButtons = document.querySelectorAll('.btn, .popup-btn, .branch-button, .chat-send-btn, .close-popup, .main-menu-btn, .back-to-home, .order-product-btn, .favorite-btn, .start-chat-btn, .agent-popup-btn, .open-chat-btn, .add-to-cart-btn, .cart-toggle-btn, .close-cart-btn, .send-order-whatsapp-btn, .cart-item-quantity-controls button, .filter-btn');
const mainLogoLink = document.getElementById('mainLogoLink');
const openCatalogBtn = document.getElementById('openCatalogBtn');
const catalogPage = document.getElementById('catalogPage');
const backToMainFromCatalog = document.getElementById('backToMainFromCatalog');
const mainProductGrid = document.getElementById('mainProductGrid');
const categoryFilterButtons = document.getElementById('categoryFilterButtons');

// Splash Screen elements
const splashScreen = document.getElementById('splashScreen');
const startChatBtn = document.getElementById('startChatBtn');
const splashCountdown = document.getElementById('splashCountdown');

// Navigation menu elements
const mainMenuBtn = document.getElementById('mainMenuBtn');
const navOverlay = document.getElementById('navOverlay');
const closeNav = document.getElementById('closeNav');
const navLinks = document.querySelectorAll('.nav-menu ul li a');
const navCatalogBtn = document.getElementById('navCatalogBtn');

// Dynamic contact form popup elements
const messagePopup = document.getElementById('messagePopup');
const closePopup = document.getElementById('closePopup');
const formNameInput = document.getElementById('formNameInput');
const formPhoneInput = document.getElementById('formPhoneInput');
const formSubjectInput = document.getElementById('formSubjectInput');
const formMessageInput = document.getElementById('formMessageInput');
const formSummary = document.getElementById('formSummary');
const summaryName = document.getElementById('summaryName');
const summaryPhone = document.getElementById('summaryPhone');
const summarySubject = document.getElementById('summarySubject');
const summaryMessage = document.getElementById('summaryMessage');
const copyFormMessageBtn = document.getElementById('copyFormMessageBtn');
const sendFormWhatsappBtn = document.getElementById('sendFormWhatsappBtn');

// Branches elements
const branchesBtn = document.getElementById('branchesBtn');
const branchesPopup = document.getElementById('branchesPopup');
const closeBranchesPopup = document.getElementById('closeBranchesPopup');
const navBranchesBtn = document.getElementById('navBranchesBtn');

// WhatsApp chat simulation elements
const whatsappChatContainer = document.getElementById('whatsappChatContainer');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const openChatBtn = document.getElementById('openChatBtn');
const chatSuggestionsContainer = document.getElementById('chatSuggestions');

// AI recommendations elements
const recommendedProductsContainer = document.getElementById('recommendedProducts');
let searchHistory = []; // User search/view history

// FAQ elements
const faqList = document.getElementById('faqList');
const faqSearchInput = document.getElementById('faqSearchInput');

// New Products carousel elements
const carouselImagesContainer = document.getElementById('carouselImages');
const carouselPrevBtn = document.getElementById('carouselPrevBtn');
const carouselNextBtn = document.getElementById('carouselNextBtn');
const carouselDotsContainer = document.getElementById('carouselDots');
let currentCarouselIndex = 0;
let carouselInterval;

// Smart agent popup elements
const agentPopupOverlay = document.getElementById('agentPopupOverlay');
const openChatFromPopupBtn = document.getElementById('openChatFromPopupBtn');
const agentPopupTimerFill = document.getElementById('agentPopupTimerFill');

// Shopping cart elements
const cartToggleBtn = document.getElementById('cartToggleBtn');
const shoppingCartSidebar = document.getElementById('shoppingCartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemCount = document.getElementById('cartItemCount');
const cartTotalItems = document.getElementById('cartTotalItems'); // Changed: total items instead of total price
const sendOrderWhatsappBtn = document.getElementById('sendOrderWhatsappBtn');

// Global shopping cart variable
let cart = [];
// Global variable for products data fetched from Google Sheet
let productsData = {};

// Constant WhatsApp phone number
const WHATSAPP_PHONE_NUMBER = '972508860896'; // International format without +

// --- General Functions ---

// Typing effect function
function typeMessage(element, text, speed = 40) {
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Function to show a popup
function showPopup(popupElement) {
    popupElement.classList.add('show');
    adjustPopupHeight();
}

// Function to hide a popup
function hidePopup(popupElement) {
    popupElement.classList.remove('show');
}

// Adjust popup content height to screen height
function adjustPopupHeight() {
    const popups = document.querySelectorAll('.popup-container');
    popups.forEach(popup => {
        const headerHeight = popup.querySelector('.popup-header') ? popup.querySelector('.popup-header').offsetHeight : 0;
        const actionsHeight = popup.querySelector('.popup-actions') ? popup.querySelector('.popup-actions').offsetHeight : 0;
        const padding = parseInt(window.getComputedStyle(popup).paddingTop) + parseInt(window.getComputedStyle(popup).paddingBottom);
        const availableHeight = window.innerHeight * 0.9 - headerHeight - actionsHeight - padding;
        const popupContent = popup.querySelector('.popup-content');
        if (popupContent) {
            popupContent.style.maxHeight = `${availableHeight}px`;
        }
    });
}

// Button animations on click and release
allButtons.forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
        this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    });

    button.addEventListener('mouseup', function() {
        if (button.matches('.btn:hover')) {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15), inset 0 0 8px rgba(255, 255, 255, 0.7)';
        } else if (button.matches('.popup-btn:hover, .branch-button:hover, .chat-send-btn:hover, .order-product-btn:hover, .start-chat-btn:hover, .main-menu-btn:hover, .agent-popup-btn:hover, .add-to-cart-btn:hover, .cart-toggle-btn:hover, .send-order-whatsapp-btn:hover, .cart-item-quantity-controls button:hover, .filter-btn:hover')) {
            this.style.transform = 'translateY(-2px)';
        } else if (button.matches('.close-popup:hover, .back-to-home:hover, .favorite-btn:hover, .close-chat-btn:hover, #openChatBtn:hover, .remove-from-cart-btn:hover, .close-cart-btn:hover')) {
            this.style.transform = 'scale(1.1)';
        } else {
            this.style.transform = 'scale(1)';
        }
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '';
        if (button.matches('.btn')) {
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.5)';
        }
    });
});

// --- Splash Screen Logic ---
function hideSplashScreen() {
    splashScreen.style.opacity = '0';
    setTimeout(() => {
        splashScreen.style.display = 'none';
        tabletContainer.style.display = 'flex';
        showAgentPopup(); // Show agent popup after site loads
    }, 1000); // Matches opacity transition time
}

startChatBtn.addEventListener('click', () => {
    hideSplashScreen();
});

// Automatic countdown for splash screen
function startSplashCountdown(duration = 3) {
    let timeLeft = duration;
    splashCountdown.textContent = timeLeft;
    const countdownInterval = setInterval(() => {
        timeLeft--;
        splashCountdown.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            hideSplashScreen();
        }
    }, 1000);
}

// --- Navigation Menu Logic ---
mainMenuBtn.addEventListener('click', () => {
    navOverlay.classList.add('show');
});

closeNav.addEventListener('click', () => {
    navOverlay.classList.remove('show');
});

// Function to display a category page (or main catalog)
function showPage(pageId, categoryName = null) {
    // Hide all category pages and main areas
    document.querySelectorAll('.category-page').forEach(page => page.classList.remove('show'));
    mainContentArea.style.display = 'none';
    catalogPage.classList.remove('show');

    if (pageId === 'main') {
        mainContentArea.style.display = 'flex';
    } else if (pageId === 'catalog') {
        catalogPage.classList.add('show');
        renderProductCatalog(categoryName);
    } else { // Specific category
        let categoryPage = document.getElementById(`category-${pageId.replace(/\s/g, '-')}`);
        if (!categoryPage) {
            categoryPage = document.createElement('div');
            categoryPage.className = 'category-page';
            categoryPage.id = `category-${pageId.replace(/\s/g, '-')}`;
            categoryPagesContainer.appendChild(categoryPage);
        }
        categoryPage.innerHTML = `
            <div class="category-header">
                <button class="back-to-home"><i class="fas fa-arrow-right"></i></button>
                <h2 class="category-title">${pageId}</h2>
                <div></div> <!-- Placeholder for alignment -->
            </div>
            <div class="product-grid">
                <!-- Products will be displayed here -->
            </div>
        `;
        categoryPage.classList.add('show');
        renderProductsForCategory(pageId, categoryPage.querySelector('.product-grid'));

        categoryPage.querySelector('.back-to-home').addEventListener('click', () => {
            showPage('main');
        });
    }
}

// Function to render products in a specific category (for sidebar menu)
function renderProductsForCategory(categoryName, targetGrid) {
    targetGrid.innerHTML = '';
    const products = productsData[categoryName] || [];

    if (products.length === 0) {
        targetGrid.innerHTML = '<p style="text-align: center; color: #888; margin-top: 50px;">אין מוצרים בקטגוריה זו כרגע.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <button class="favorite-btn" data-product-id="${product.id}"><i class="far fa-heart"></i></button>
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='https://placehold.co/120x120/f0f0f0/333333?text=No+Image';">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <!-- Price removed from here -->
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                הוסף לסל
                <i class="fas fa-cart-plus"></i>
            </button>
            <button class="order-product-btn" data-product-id="${product.id}">
                שלח לוואטסאפ
                <i class="fab fa-whatsapp"></i>
            </button>
        `;
        targetGrid.appendChild(productCard);

        // Add click event for add to cart button
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productToAdd = Object.values(productsData).flat().find(p => p.id === productId);
            if (productToAdd) {
                addToCart(productToAdd);
                // Short feedback animation
                this.innerHTML = '<i class="fas fa-check"></i> נוסף!';
                setTimeout(() => {
                    this.innerHTML = 'הוסף לסל <i class="fas fa-cart-plus"></i>';
                }, 1000);
            }
        });

        // Add click event for direct WhatsApp order button
        productCard.querySelector('.order-product-btn').addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const product = Object.values(productsData).flat().find(p => p.id === productId);
            if (product) {
                const message = `שלום, אני מעוניין להזמין את המוצר:\n*שם*: ${product.name}\n*תיאור*: ${product.description}\nאשמח לפרטים נוספים.`; // Price removed
                const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });

        // Add click event for favorite button
        productCard.querySelector('.favorite-btn').addEventListener('click', function() {
            this.classList.toggle('active');
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
            updateSearchHistory(product.name); // Add to search history
            updateRecommendedProducts(); // Update recommendations
        });
    });
}


// Function to render the main catalog
function renderProductCatalog(filterCategory = null) {
    mainProductGrid.innerHTML = '';
    categoryFilterButtons.innerHTML = '';

    // Create filter buttons
    const allCategories = ['הכל', ...Object.keys(productsData)];
    allCategories.forEach(cat => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.textContent = cat === 'הכל' ? 'כל המוצרים' : cat;
        filterBtn.setAttribute('data-category', cat);
        if (filterCategory === cat || (filterCategory === null && cat === 'הכל')) {
            filterBtn.classList.add('active');
        }
        filterBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');
            renderProductCatalog(cat);
        });
        categoryFilterButtons.appendChild(filterBtn);
    });

    let productsToDisplay = [];
    if (filterCategory === 'הכל' || filterCategory === null) {
        productsToDisplay = Object.values(productsData).flat();
    } else {
        productsToDisplay = productsData[filterCategory] || [];
    }

    if (productsToDisplay.length === 0) {
        mainProductGrid.innerHTML = '<p style="text-align: center; color: #888; margin-top: 50px;">אין מוצרים בקטגוריה זו כרגע.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <button class="favorite-btn" data-product-id="${product.id}"><i class="far fa-heart"></i></button>
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='https://placehold.co/120x120/f0f0f0/333333?text=No+Image';">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <!-- Price removed from here -->
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                הוסף לסל
                <i class="fas fa-cart-plus"></i>
            </button>
            <button class="order-product-btn" data-product-id="${product.id}">
                שלח לוואטסאפ
                <i class="fab fa-whatsapp"></i>
            </button>
        `;
        mainProductGrid.appendChild(productCard);

        // Add click event for add to cart button
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productToAdd = Object.values(productsData).flat().find(p => p.id === productId);
            if (productToAdd) {
                addToCart(productToAdd);
                this.innerHTML = '<i class="fas fa-check"></i> נוסף!';
                setTimeout(() => {
                    this.innerHTML = 'הוסף לסל <i class="fas fa-cart-plus"></i>';
                }, 1000);
            }
        });

        // Add click event for direct WhatsApp order button
        productCard.querySelector('.order-product-btn').addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const product = Object.values(productsData).flat().find(p => p.id === productId);
            if (product) {
                const message = `שלום, אני מעוניין להזמין את המוצר:\n*שם*: ${product.name}\n*תיאור*: ${product.description}\nאשמח לפרטים נוספים.`; // Price removed
                const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });

        // Add click event for favorite button
        productCard.querySelector('.favorite-btn').addEventListener('click', function() {
            this.classList.toggle('active');
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
            updateSearchHistory(product.name); // Add to search history
            updateRecommendedProducts(); // Update recommendations
        });
    });
}


// Handle clicks on navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        if (category === "סניפים") {
            showPopup(branchesPopup);
        } else if (this.id === 'navCatalogBtn') {
            showPage('catalog');
        }
        else {
            showPage(category); // Open specific category page
        }
        navOverlay.classList.remove('show'); // Close navigation menu
    });
});

// Open main catalog page from home button
openCatalogBtn.addEventListener('click', () => {
    showPage('catalog');
});

// Back to home from main catalog
backToMainFromCatalog.addEventListener('click', () => {
    showPage('main');
});

// Main logo returns to home page
mainLogoLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('main');
});

// --- Shopping Cart Logic ---
function loadCart() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartDisplay();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let totalItemsInCart = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">הסל שלך ריק כרגע.</p>';
        // Defensive checks before setting textContent
        if (cartTotalItems) cartTotalItems.textContent = '0';
        if (cartItemCount) cartItemCount.textContent = '0';
        return;
    }

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.onerror=null;this.src='https://placehold.co/60x60/f0f0f0/333333?text=No+Image';">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <!-- Price removed from cart item -->
            </div>
            <div class="cart-item-quantity-controls">
                <button class="quantity-minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-plus" data-id="${item.id}">+</button>
            </div>
            <button class="remove-from-cart-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
        `;
        cartItemsContainer.appendChild(cartItemElement);

        totalItemsInCart += item.quantity;
    });

    // Defensive checks before setting textContent
    if (cartTotalItems) cartTotalItems.textContent = totalItemsInCart;
    if (cartItemCount) cartItemCount.textContent = totalItemsInCart;

    // Attach event listeners for quantity and remove buttons
    cartItemsContainer.querySelectorAll('.quantity-minus').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(this.dataset.id, -1);
        });
    });

    cartItemsContainer.querySelectorAll('.quantity-plus').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(this.dataset.id, 1);
        });
    });

    cartItemsContainer.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(this.dataset.id);
        });
    });
}

function sendOrderToWhatsApp() {
    if (cart.length === 0) {
        // Use a simple message box instead of alert
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #fff; padding: 20px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 2000; text-align: center; font-size: 18px; color: var(--text-dark);
            border: 1px solid var(--border-light);
        `;
        messageBox.textContent = 'סל הקניות שלך ריק!';
        document.body.appendChild(messageBox);
        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 2000);
        return;
    }

    let orderMessage = "שלום, אני מעוניין להזמין את המוצרים הבאים:\n\n";
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.name} (כמות: ${item.quantity})\n`; // Price removed
    });
    orderMessage += `\nסה"כ פריטים: ${cartTotalItems.textContent}\n\n`; // Total items
    orderMessage += "אשמח לקבל הצעת מחיר ופרטים נוספים.";

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Attach event listeners for cart sidebar
cartToggleBtn.addEventListener('click', () => {
    shoppingCartSidebar.classList.add('show');
    updateCartDisplay(); // Ensure cart is updated when opened
});

closeCartBtn.addEventListener('click', () => {
    shoppingCartSidebar.classList.remove('show');
});

sendOrderWhatsappBtn.addEventListener('click', sendOrderToWhatsApp);


// --- Dynamic Contact Form Logic ---
function showDynamicContactForm(initialMessage = '') {
    formNameInput.value = '';
    formPhoneInput.value = '';
    formSubjectInput.value = ''; // Reset subject
    formMessageInput.value = initialMessage;

    // Attempt to infer subject from initialMessage if it's empty
    if (initialMessage) {
        if (initialMessage.includes('מנוף')) {
            formSubjectInput.value = 'הזמנת מנוף';
        } else if (initialMessage.includes('משאית')) {
            formSubjectInput.value = 'הזמנת משאית';
        } else if (initialMessage.includes('מכולה')) {
            formSubjectInput.value = 'הצבת מכולה';
        } else if (initialMessage.includes('חומרי בניין')) {
            formSubjectInput.value = 'שאלה על חומרי בניין';
        } else if (initialMessage.includes('מוצרי איטום')) {
            formSubjectInput.value = 'שאלה על מוצרי איטום';
        } else if (initialMessage.includes('צבעים')) {
            formSubjectInput.value = 'שאלה על צבעים';
        } else if (initialMessage.includes('מרצפות') || initialMessage.includes('עץ לבניין')) {
            formSubjectInput.value = 'שאלה על מרצפות ועץ';
        } else if (initialMessage.includes('ניקיון')) {
            formSubjectInput.value = 'שאלה על חומרי ניקיון';
        } else if (initialMessage.includes('ייעוץ')) {
            formSubjectInput.value = 'בקשת ייעוץ מקצועי';
        } else if (initialMessage.includes('הזמנה')) {
            formSubjectInput.value = 'שאלה/בקשת הזמנה';
        }
    }

    updateFormSummary();
    showPopup(messagePopup);
}

// Update form summary in real-time
function updateFormSummary() {
    summaryName.textContent = `שם: ${formNameInput.value.trim()}`;
    summaryPhone.textContent = `טלפון: ${formPhoneInput.value.trim()}`;
    summarySubject.textContent = `נושא: ${formSubjectInput.value.trim()}`;
    summaryMessage.textContent = `בקשה: ${formMessageInput.value.trim()}`;
}

formNameInput.addEventListener('input', updateFormSummary);
formPhoneInput.addEventListener('input', updateFormSummary);
formSubjectInput.addEventListener('input', updateFormSummary);
formMessageInput.addEventListener('input', updateFormSummary);

closePopup.addEventListener('click', () => hidePopup(messagePopup));

// Copy message from form to clipboard
copyFormMessageBtn.addEventListener('click', function() {
    const message = `שם: ${formNameInput.value.trim()}\nטלפון: ${formPhoneInput.value.trim()}\nנושא: ${formSubjectInput.value.trim()}\nבקשה: ${formMessageInput.value.trim()}`;
    const textarea = document.createElement('textarea');
    textarea.value = message;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.innerHTML = '<i class="fas fa-check ml-2"></i> הועתק!';
    setTimeout(() => {
        this.innerHTML = 'העתק הודעה <i class="far fa-copy"></i>';
    }, 2000);
});

// Send message from form to WhatsApp
sendFormWhatsappBtn.addEventListener('click', function() {
    const message = `שלום, זו פנייה מהאתר:\nשם: ${formNameInput.value.trim()}\nטלפון: ${formPhoneInput.value.trim()}\nנושא: ${formSubjectInput.value.trim()}\nבקשה: ${formMessageInput.value.trim()}`;

    if (!message.trim()) {
        console.warn('Cannot send empty message to WhatsApp.');
        return;
    }

    const originalText = this.innerHTML;
    this.innerHTML = 'נשלח לוואטסאפ! <i class="fas fa-check"></i>';
    this.style.backgroundColor = 'var(--primary-dark)';
    this.style.boxShadow = '0 0 15px rgba(37, 211, 102, 0.6)';

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
        this.innerHTML = originalText;
        this.style.backgroundColor = '';
        this.style.boxShadow = '';
    }, 2000);
});

// --- Branches Logic ---
branchesBtn.addEventListener('click', () => showPopup(branchesPopup));
closeBranchesPopup.addEventListener('click', () => hidePopup(branchesPopup));

// --- WhatsApp Chat Simulation Logic ---
function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}-message`;

    const avatarElement = document.createElement('div');
    avatarElement.className = 'message-avatar';
    if (sender === 'user') {
        avatarElement.innerHTML = '<i class="fas fa-user"></i>';
    }

    messageElement.textContent = message;
    messageElement.appendChild(avatarElement);

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chat suggestions
function renderChatSuggestions() {
    chatSuggestionsContainer.innerHTML = '';
    chatSuggestionsData.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'chat-suggestion-btn';
        btn.textContent = suggestion;
        btn.addEventListener('click', () => {
            chatInput.value = suggestion;
            chatSendBtn.click();
        });
        chatSuggestionsContainer.appendChild(btn);
    });
}

chatSendBtn.addEventListener('click', async () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        addMessageToChat(userMessage, 'user');
        chatInput.value = '';

        // Analyze message and suggest answer/redirection using AI
        setTimeout(async () => {
            const prompt = `המשתמש שאל: "${userMessage}". בהתבסס על השאלות הנפוצות הבאות, האם יש תשובה מתאימה?
            ${JSON.stringify(faqData.map(faq => ({ question: faq.question, answer: faq.answer, keywords: faq.keywords })))}
            אם יש תשובה מתאימה, החזר רק את התשובה. אם השאלה קשורה להזמנה, מנוף, משאית, מכולה, או פרטים על מוצר, החזר את הטקסט "פתח טופס פנייה". אם השאלה קשורה לסניפים או מיקום, החזר את הטקסט "פתח סניפים". אם לא נמצאה התאמה, החזר את הטקסט "כללי".`;

            try {
                const payload = {
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: "text/plain"
                    }
                };
                const apiKey = ""; // API Key is automatically provided by Canvas when left empty
                // Changed model to gemini-2.5-flash-preview-05-20 as per instructions
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                let agentResponseText = 'תודה על פנייתך! נציג שירות יחזור אליך בהקדם.';
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const aiResponse = result.candidates[0].content.parts[0].text.trim();

                    if (aiResponse.includes("פתח טופס פנייה")) {
                        agentResponseText = 'על מנת לטפל בבקשתך בצורה הטובה ביותר, אנא מלא/י את הטופס הבא:';
                        addMessageToChat(agentResponseText, 'agent');
                        setTimeout(() => showDynamicContactForm(userMessage), 1000);
                        return;
                    } else if (aiResponse.includes("פתח סניפים")) {
                        agentResponseText = 'לפרטי הסניפים שלנו, לחץ/י על כפתור "סניפים" בתפריט הראשי או כאן:';
                        addMessageToChat(agentResponseText, 'agent');
                        setTimeout(() => showPopup(branchesPopup), 1000);
                        return;
                    } else if (aiResponse.includes("כללי")) {
                        agentResponseText = 'תודה על פנייתך! נציג שירות יחזור אליך בהקדם. בינתיים, תוכל/י לשלוח את ההודעה הזו בוואטסאפ:';
                    } else {
                        agentResponseText = aiResponse;
                    }
                }

                addMessageToChat(agentResponseText, 'agent');
                // Offer WhatsApp share button with chat history
                setTimeout(() => {
                    const shareBtn = document.createElement('button');
                    shareBtn.className = 'popup-btn popup-btn-send';
                    shareBtn.textContent = 'שלח היסטוריית צ\'אט לוואטסאפ';
                    shareBtn.style.width = 'fit-content';
                    shareBtn.style.marginTop = '10px';
                    shareBtn.style.alignSelf = 'center';
                    shareBtn.addEventListener('click', function() {
                        const originalShareText = this.innerHTML;
                        this.innerHTML = 'נשלח לוואטסאפ! <i class="fas fa-check"></i>';
                        this.style.backgroundColor = 'var(--primary-dark)';
                        this.style.boxShadow = '0 0 15px rgba(37, 211, 102, 0.6)';

                        let chatHistoryText = Array.from(chatMessages.children).map(msg => {
                            const sender = msg.classList.contains('user-message') ? 'אתה' : 'נציג';
                            const text = msg.textContent.replace('שלח היסטוריית צ\'אט לוואטסאפ', '').trim();
                            return `${sender}: ${text}`;
                        }).filter(line => line.trim() !== '').join('\n');

                        if (!chatHistoryText.trim()) {
                            console.warn('Cannot share empty chat history to WhatsApp.');
                            this.innerHTML = originalShareText;
                            this.style.backgroundColor = '';
                            this.style.boxShadow = '';
                            return;
                        }

                        const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent("היסטוריית צ'אט מהאתר:\n" + chatHistoryText)}`;
                        window.open(whatsappUrl, '_blank');

                        setTimeout(() => {
                            this.innerHTML = originalShareText;
                            this.style.backgroundColor = '';
                            this.style.boxShadow = '';
                        }, 2000);
                    });
                    chatMessages.appendChild(shareBtn);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 500);

            } catch (error) {
                console.error('Error fetching AI response:', error);
                addMessageToChat('אני מתנצל, חלה שגיאה במערכת. נציג שירות יחזור אליך בהקדם.', 'agent');
            }
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSendBtn.click();
    }
});

// Open and close chat box
openChatBtn.addEventListener('click', () => {
    whatsappChatContainer.classList.add('show');
});

closeChatBtn.addEventListener('click', () => {
    whatsappChatContainer.classList.remove('show');
});

// --- FAQ Logic ---
function renderFAQs(filter = '') {
    faqList.innerHTML = '';
    // Filter questions by keywords or full text
    const filteredFaqs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(filter.toLowerCase()) ||
        faq.answer.toLowerCase().includes(filter.toLowerCase()) ||
        (faq.keywords && faq.keywords.some(keyword => keyword.toLowerCase().includes(filter.toLowerCase())))
    );

    filteredFaqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="faq-answer">
                <p>${faq.answer}</p>
                <button class="send-new-question-btn" data-question-text="${faq.question}">
                    <i class="fas fa-comment-dots"></i> שלח שאלה חדשה לנציג
                </button>
            </div>
        `;
        faqList.appendChild(faqItem);

        const questionElement = faqItem.querySelector('.faq-question');
        const answerElement = faqItem.querySelector('.faq-answer');
        const sendNewQuestionBtn = faqItem.querySelector('.send-new-question-btn');

        questionElement.addEventListener('click', () => {
            questionElement.classList.toggle('active');
            answerElement.classList.toggle('show');
        });

        // "Send new question to agent" button opens WhatsApp directly
        sendNewQuestionBtn.addEventListener('click', function() {
            const questionText = this.getAttribute('data-question-text');
            const message = `שלום, יש לי שאלה לגבי: "${questionText}". אשמח לקבל עזרה.`;
            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

faqSearchInput.addEventListener('input', (e) => {
    renderFAQs(e.target.value);
});

// --- AI Recommendations Logic ---
function updateSearchHistory(item) {
    if (!searchHistory.includes(item)) {
        searchHistory.push(item);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

function loadSearchHistory() {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
}

async function updateRecommendedProducts() {
    recommendedProductsContainer.innerHTML = '';

    const numberOfRecommendations = 6;
    // Ensure productsData is loaded before creating availableItems
    const allProductNames = Object.values(productsData).flat().map(p => p.name);
    const allCategoryNames = Object.keys(productsData);
    const availableItems = [...allProductNames, ...allCategoryNames];

    if (searchHistory.length === 0) {
        // If no history, show random products/categories
        const randomItems = availableItems.sort(() => 0.5 - Math.random()).slice(0, numberOfRecommendations);
        randomItems.forEach(itemText => {
            const item = document.createElement('div');
            item.className = 'recommended-product-item';
            item.textContent = itemText;
            item.addEventListener('click', () => {
                const message = `שלום, מעוניין בפרטים על: ${itemText}.`;
                showDynamicContactForm(message);
                updateSearchHistory(itemText);
            });
            recommendedProductsContainer.appendChild(item);
        });
        return;
    }

    const prompt = `בהתבסס על היסטוריית החיפושים/צפיות של הלקוח: ${searchHistory.join(', ')}.
    הצע ${numberOfRecommendations} מוצרים או קטגוריות נוספות מתוך הרשימה הבאה שעשויים לעניין אותו, פורמט JSON. נסה לגוון את ההמלצות בין מוצרים ספציפיים לקטגוריות כלליות:
    ${JSON.stringify(availableItems)}
    הפורמט המבוקש הוא מערך של מחרוזות (שמות מוצרים/קטגוריות).`;

    try {
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: { "type": "STRING" }
                }
            }
        };
        const apiKey = ""; // API Key is automatically provided by Canvas when left empty
        // Changed model to gemini-2.5-flash-preview-05-20 as per instructions
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const jsonResponse = result.candidates[0].content.parts[0].text;
            const recommendedItems = JSON.parse(jsonResponse);

            recommendedItems.forEach(itemText => {
                const item = document.createElement('div');
                item.className = 'recommended-product-item';
                item.textContent = itemText;
                item.addEventListener('click', () => {
                    const message = `שלום, מעוניין בפרטים על: ${itemText}.`;
                    showDynamicContactForm(message);
                    updateSearchHistory(itemText);
                });
                recommendedProductsContainer.appendChild(item);
            });
        } else {
            console.error('AI recommendation failed: Unexpected response structure', result);
            // Fallback to random products if AI fails
            const randomItems = availableItems.sort(() => 0.5 - Math.random()).slice(0, numberOfRecommendations);
            randomItems.forEach(itemText => {
                const item = document.createElement('div');
                item.className = 'recommended-product-item';
                item.textContent = itemText;
                item.addEventListener('click', () => {
                    const message = `שלום, מעוניין בפרטים על: ${itemText}.`;
                    showDynamicContactForm(message);
                    updateSearchHistory(itemText);
                });
                recommendedProductsContainer.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error fetching AI recommendations:', error);
        // Fallback to random products on error
        const randomItems = availableItems.sort(() => 0.5 - Math.random()).slice(0, numberOfRecommendations);
        randomItems.forEach(itemText => {
            const item = document.createElement('div');
            item.className = 'recommended-product-item';
            item.textContent = itemText;
            item.addEventListener('click', () => {
                const message = `שלום, מעוניין בפרטים על: ${itemText}.`;
                showDynamicContactForm(message);
                updateSearchHistory(itemText);
            });
            recommendedProductsContainer.appendChild(item);
        });
    }
}

// --- New Products Carousel Logic ---
function renderCarouselImages() {
    carouselImagesContainer.innerHTML = '';
    carouselDotsContainer.innerHTML = '';
    newProductsImages.forEach((image, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-image-wrapper';
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'carousel-image';
        wrapper.appendChild(img);
        carouselImagesContainer.appendChild(wrapper);

        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
        carouselDotsContainer.appendChild(dot);
    });
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentCarouselIndex * 100;
    carouselImagesContainer.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
        if (index === currentCarouselIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function moveToSlide(index) {
    currentCarouselIndex = index;
    if (currentCarouselIndex >= newProductsImages.length) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = newProductsImages.length - 1;
    }
    updateCarousel();
    resetCarouselInterval();
}

carouselPrevBtn.addEventListener('click', () => {
    moveToSlide(currentCarouselIndex + 1); // RTL, so "prev" goes to next index
});

carouselNextBtn.addEventListener('click', () => {
    moveToSlide(currentCarouselIndex - 1); // RTL, so "next" goes to previous index
});

function startCarouselInterval() {
    carouselInterval = setInterval(() => {
        moveToSlide(currentCarouselIndex + 1);
    }, 5000); // Change image every 5 seconds
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselInterval();
}

// --- Smart Agent Popup Logic ---
function showAgentPopup() {
    // Check if popup has already been shown in current session
    if (localStorage.getItem('agentPopupShown') === 'true') {
        return;
    }

    agentPopupOverlay.style.opacity = '1';
    agentPopupOverlay.style.pointerEvents = 'all';

    // Timer animation - fixed to 7 seconds
    agentPopupTimerFill.style.transition = 'width 7s linear';
    agentPopupTimerFill.style.width = '0%';

    let timer = 7; // Fixed to 7 seconds
    const interval = setInterval(() => {
        timer--;
        if (timer <= 0) {
            clearInterval(interval);
            agentPopupOverlay.style.opacity = '0';
            agentPopupOverlay.style.pointerEvents = 'none';
            localStorage.setItem('agentPopupShown', 'true'); // Mark as shown
        }
    }, 1000);
}

openChatFromPopupBtn.addEventListener('click', () => {
    hidePopup(agentPopupOverlay);
    whatsappChatContainer.classList.add('show');
    localStorage.setItem('agentPopupShown', 'true'); // Mark as shown
});

// --- Function to fetch data from Google Sheet via Apps Script ---
async function fetchProductsFromGoogleSheet() {
    // NEW Google Apps Script URL
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyzdkvb4wOMILaPIq-oalk6IRA7UKXCfcsRYW0VPjF5LHO3qYLewgicT8Ua6GCdQnTn/exec';

    try {
        const response = await fetch(appsScriptUrl);
        // Check for non-OK response (e.g., 400, 404, 500)
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} when fetching from Google Apps Script.`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Assuming Apps Script returns JSON
        const data = await response.json();
        
        const fetchedProducts = {}; // Temporary object to store products by category

        // Assuming data is an array of objects, where each object is a row
        if (Array.isArray(data)) {
            data.forEach(row => {
                const product = {};
                // Normalize keys from Apps Script response and trim values
                const normalizedRow = {};
                for (const key in row) {
                    const normalizedKey = key.trim();
                    let value = row[key];
                    if (typeof value === 'string') {
                        value = value.trim(); // Trim all string values
                    }
                    normalizedRow[normalizedKey] = value;
                }

                // Map normalized data to our product structure
                // Use 'department' or 'category' from the normalized row
                const category = normalizedRow.department || normalizedRow.category || 'כללי';
                const name = normalizedRow.title || 'שם לא ידוע';
                const description = normalizedRow.description || '';
                const image = normalizedRow.image || 'https://placehold.co/120x120/f0f0f0/333333?text=No+Image';

                // Use the correct key for SKU from the normalized row
                const id = normalizedRow['מק"ט'] || `prod_${Math.random().toString(36).substr(2, 9)}`;

                if (!fetchedProducts[category]) {
                    fetchedProducts[category] = [];
                }
                fetchedProducts[category].push({
                    id: id,
                    name: name,
                    description: description,
                    image: image,
                    // Price removed as per your request
                });
            });
        } else {
            console.warn('Google Apps Script response is not an array:', data);
        }
        
        return fetchedProducts;

    } catch (error) {
        console.error('Error fetching products from Google Apps Script:', error);
        // Fallback to static data if fetch fails
        console.log('Falling back to static products data.');
        return staticProductsData;
    }
}


// --- Application Initialization ---
window.addEventListener('load', async () => {
    adjustPopupHeight();
    loadSearchHistory();
    renderFAQs(); // Display FAQs on initial load
    renderChatSuggestions(); // Display chat suggestions
    renderCarouselImages(); // Display carousel images
    startCarouselInterval(); // Start automatic carousel

    // Load product data from Google Sheet (via Apps Script)
    productsData = await fetchProductsFromGoogleSheet();
    console.log('Products Data Loaded:', productsData); // For debugging

    updateRecommendedProducts(); // Update recommendations after products are loaded
    loadCart(); // Load shopping cart on page load

    // Handle existing quick message buttons
    document.querySelectorAll('.btn[data-initial-message]').forEach(button => {
        button.addEventListener('click', function() {
            const initialMessage = this.getAttribute('data-initial-message');
            showDynamicContactForm(initialMessage);
        });
    });

    // Handle "Contact Us" button
    document.getElementById('contactBtn').addEventListener('click', function() {
        showDynamicContactForm("שלום, מעוניין בייעוץ מקצועי לגבי המוצרים והשירותים.");
    });

    // Start splash screen countdown
    startSplashCountdown(3); // Start countdown from 3 seconds
});
