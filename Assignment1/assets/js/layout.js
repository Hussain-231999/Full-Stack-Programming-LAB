window.HS = window.HS || {};

HS.layout = {

  header: function(activePage){
    return `
<!-- UTIL BAR -->
<div class="util-bar">
  <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
    <span>Call for Customer support: <a href="tel:051 602289565" style="color:#cc0000;font-weight:600;">051 602289565</a></span>
    <div style="display:flex;gap:16px;">
      <a href="my-account.html">My Account</a>
      <a href="wishlist.html">Wishlist</a>
      <a href="checkout.html">To Checkout</a>
    </div>
  </div>
</div>
<!-- HEADER -->
<header class="site-header">
  <div class="container" style="display:flex;align-items:center;justify-content:space-between;">
    <a href="index.html" style="text-decoration:none;">
      <div class="logo-brand">HOTSPRING<sup style="font-size:.55rem;vertical-align:super;">®</sup></div>
      <div class="logo-sub">Portable Spas</div>
    </a>
    <div style="display:flex;align-items:center;gap:10px;">
      <div class="cart-widget">
        <i class="fa-solid fa-cart-shopping cart-icon"></i>
        <span>My Cart: <strong>0 Items (0)</strong></span>
        <i class="fa-solid fa-chevron-down" style="font-size:.7rem;color:#aaa;"></i>
      </div>
      <button id="burgerBtn" style="display:none;background:none;border:none;font-size:1.3rem;cursor:pointer;color:#333;" aria-label="Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </div>
</header>
<!-- PRIMARY NAV -->
<nav class="nav-primary">
  <div class="container" style="display:flex;align-items:stretch;">
    <div id="navLinks" style="display:flex;">
      <a href="category.html">CATEGORY</a>
      <a href="category.html">BRAND</a>
      <a href="contact.html">INFO</a>
    </div>
    <div class="nav-search" style="flex:1;">
      <input type="text" id="searchInput" placeholder="Search" aria-label="Search"/>
      <button type="button">SEARCH</button>
    </div>
  </div>
  <div class="mobile-nav" id="mobileNav">
    <a href="category.html">CATEGORY</a>
    <a href="category.html">BRAND</a>
    <a href="contact.html">INFO</a>
  </div>
</nav>`;
  },

  brandStrip: function(){
    return `
<div class="brand-strip">
  <div class="container"><div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:36px;padding:0 16px;">
    <div class="brand-badge">
      <div class="save">SAVE $1,000'S</div>
      <div class="sub">ON THE TOP SPA BRANDS</div>
      <div class="discount">HUGE DISCOUNTS</div>
      <div class="sub">SHOP EARLY FOR THE BEST SELECTION</div>
    </div>
    <div class="brand-oceanic">OCEANIC<span style="font-weight:300;">Spa</span></div>
    <div class="brand-caldera">Caldera<span>Spas</span></div>
    <div class="brand-island">Island<span style="font-weight:300;color:#555;">Spas</span><span class="sub">by ARTESIAN</span></div>
  </div></div>
</div>`;
  },

  viewedCarousel: function(){
    var items = '';
    var products = [
      {price:'$2,549.15', name:'Bosch 22 Cu. Ft Stainless Refrigerator', sku:'B22CS30SNS5'},
      {price:'$2,549.15', name:'Bosch 22 Cu. Ft Stainless Refrigerator', sku:'B22CS30SNS5'},
      {price:'$2,549.15', name:'Bosch 22 Cu. Ft Stainless Refrigerator', sku:'B22CS30SNS5'},
      {price:'$2,549.15', name:'Bosch 22 Cu. Ft Stainless Refrigerator', sku:'B22CS30SNS5'},
      {price:'$2,549.15', name:'Bosch 22 Cu. Ft Stainless Refrigerator', sku:'B22CS30SNS5'},
    ];
    products.forEach(function(p){
      items += `<div class="carousel-item">
        <div class="carousel-item-inner">
          <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&q=60" alt="${p.name}"/>
          <div class="carousel-price">${p.price}</div>
          <div class="carousel-name">${p.name}</div>
          <div class="carousel-sku">${p.sku}</div>
        </div>
      </div>`;
    });
    return `
<section class="viewed-section">
  <div class="container">
    <div class="sub-heading" style="margin-bottom:14px;">Customers Who Viewed This Item Also</div>
    <div style="display:flex;align-items:center;gap:8px;">
      <button class="carousel-btn" id="carouselPrev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
      <div class="carousel-wrap" style="flex:1;"><div class="carousel-track">${items}</div></div>
      <button class="carousel-btn" id="carouselNext" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </div>
</section>`;
  },

  footer: function(){
    return `
<footer>
  <div class="container">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:28px;" class="footer-grid">
      <div>
        <h4>Contact Us</h4>
        <p>hotspring.com<br>CALL 24/7: 888 · 201 · 8899<br>Our Address:<br>E9<br>Islamabad 00000<br>Pakistan<br>Email: <a href="mailto:servicemail@hotspring.com">servicemail@hotspring.com</a></p>
        <div class="footer-social">
          <a href="#" class="social-btn" style="background:#38bdf8;" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-btn" style="background:#1d4ed8;" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-btn" style="background:#0284c7;" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="social-btn" style="background:#dc2626;" aria-label="Google+"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social-btn" style="background:#b91c1c;" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="#" class="social-btn" style="background:#be185d;" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
        </div>
      </div>
      <div>
        <h4>Information</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Customer Service</a></li>
          <li><a href="terms.html">Privacy Policy</a></li>
          <li><a href="#">Site Map</a></li>
          <li><a href="#">Search Terms</a></li>
          <li><a href="contact.html">Contact Us</a></li>
          <li><a href="about.html">About Us</a></li>
        </ul>
      </div>
      <div>
        <h4>My Account</h4>
        <ul>
          <li><a href="login.html">Sign In</a></li>
          <li><a href="cart.html">View Cart</a></li>
          <li><a href="wishlist.html">My Wishlist</a></li>
        </ul>
      </div>
      <div>
        <h4>Signup for a Newsletter</h4>
        <p style="font-size:.75rem;margin-bottom:8px;">Sign up for our news letter:</p>
        <div class="footer-newsletter">
          <input type="email" id="footerEmail" placeholder="Your email" aria-label="Newsletter email"/>
          <button id="footerNewsletterBtn">GO</button>
        </div>
        <p style="font-size:.72rem;margin-top:14px;margin-bottom:6px;color:#9ca3af;">Payment Solutions</p>
        <div class="payment-badges">
          <span>VISA</span><span>MC</span><span>AMEX</span><span>DISC</span><span>PayPal</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">© 2014 Hotubspaservice.com. All Rights Reserved.</div>
</footer>`;
  },

  init: function(){
    // Responsive footer grid
    function fixFooter(){
      var cols = $(window).width() < 600 ? '1fr' : $(window).width() < 900 ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
      $('.footer-grid').css('grid-template-columns', cols);
    }
    fixFooter();
    $(window).on('resize', fixFooter);

    // Burger visibility
    function checkBurger(){
      if($(window).width() < 700){ $('#burgerBtn').show(); $('#navLinks').hide(); }
      else { $('#burgerBtn').hide(); $('#navLinks').show(); }
    }
    checkBurger();
    $(window).on('resize', checkBurger);
  }
};
