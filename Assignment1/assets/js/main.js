/* Global JavaScript (jQuery) */

$(function () {

  /* ── Mobile nav toggle ── */
  $('#burgerBtn').on('click', function () {
    $('#mobileNav').toggleClass('open');
  });

  /* ── Search on Enter ── */
  $('#searchInput').on('keydown', function (e) {
    if (e.key === 'Enter') {
      var q = $.trim($(this).val());
      if (q) window.location.href = 'category.html?q=' + encodeURIComponent(q);
    }
  });

  /* ── Newsletter footer ── */
  $('#footerNewsletterBtn').on('click', function () {
    var email = $.trim($('#footerEmail').val());
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      $('#footerEmail').css('border-color', '#cc0000');
    } else {
      $('#footerEmail').css('border-color', '');
      alert('Thank you for subscribing!');
      $('#footerEmail').val('');
    }
  });

  /* ── Carousel ("Customers Who Viewed") ── */
  if ($('.carousel-track').length) {
    var current  = 0;
    var total    = $('.carousel-track .carousel-item').length;

    function visibleCount() {
      if ($(window).width() < 480) return 1;
      if ($(window).width() < 768) return 2;
      return 4;
    }

    function maxIndex() { return Math.max(0, total - visibleCount()); }

    function updateCarousel() {
      var pct = (100 / visibleCount()) * current;
      $('.carousel-track').css('transform', 'translateX(-' + pct + '%)');
    }

    $('#carouselNext').on('click', function () {
      if (current < maxIndex()) { current++; updateCarousel(); }
    });
    $('#carouselPrev').on('click', function () {
      if (current > 0) { current--; updateCarousel(); }
    });

    $(window).on('resize', function () {
      if (current > maxIndex()) current = maxIndex();
      updateCarousel();
    });
  }

  /* ── Form validation helper ── */
  window.HS = window.HS || {};

  HS.validate = {
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($.trim(v)); },
    required: function (v) { return $.trim(v) !== ''; },
    minLen: function (v, n) { return v.length >= n; },
    maxLen: function (v, n) { return v.length <= n; },
    phone: function (v) { return /^[\d\s\-\+\(\)]{7,20}$/.test($.trim(v)); },
    zip: function (v) { return /^\d{5}(-\d{4})?$/.test($.trim(v)); }
  };

  HS.showError = function (fieldId, errId, msg) {
    $('#' + fieldId).addClass('error');
    var $err = $('#' + errId);
    if (msg) $err.text(msg);
    $err.show();
  };

  HS.clearError = function (fieldId, errId) {
    $('#' + fieldId).removeClass('error');
    $('#' + errId).hide();
  };

  HS.liveValidate = function (fieldId, errId) {
    $('#' + fieldId).on('input change', function () {
      HS.clearError(fieldId, errId);
    });
  };

  /* ── Product image thumbnails (product page) ── */
  $(document).on('click', '.thumb-gallery img', function () {
    var src = $(this).attr('src');
    $('#mainProductImg').attr('src', src);
    $('.thumb-gallery img').removeClass('active');
    $(this).addClass('active');
  });

  /* ── Tabs (product page) ── */
  $(document).on('click', '.tab-btn', function () {
    var target = $(this).data('tab');
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#tab-' + target).addClass('active');
  });

  /* ── Hero slider ── */
  if ($('.hero-slide').length) {
    var slideIndex = 0;
    var slides = $('.hero-slide');
    var dots   = $('.hero-dot');

    function showSlide(n) {
      slides.removeClass('active');
      dots.removeClass('active');
      slideIndex = (n + slides.length) % slides.length;
      slides.eq(slideIndex).addClass('active');
      dots.eq(slideIndex).addClass('active');
    }

    dots.on('click', function () { showSlide($(this).index()); });

    // Auto-advance
    setInterval(function () { showSlide(slideIndex + 1); }, 5000);
  }

  /* ── Qty update in cart ── */
  $(document).on('change', '.qty-select', function () {
    var price = parseFloat($(this).closest('tr').find('.item-unit-price').data('price'));
    var qty   = parseInt($(this).val());
    $(this).closest('tr').find('.item-total').text('$' + (price * qty).toFixed(2));
    updateCartTotal();
  });

  function updateCartTotal() {
    var total = 0;
    $('.item-total').each(function () {
      total += parseFloat($(this).text().replace('$', '')) || 0;
    });
    $('.cart-total-amount').text('$' + total.toFixed(2));
    $('.cart-item-count').text($('.qty-select').length + ' item' + ($('.qty-select').length !== 1 ? 's' : ''));
  }

  /* ── Remove cart item ── */
  $(document).on('click', '.btn-remove-item', function () {
    if (confirm('Remove this item from cart?')) {
      $(this).closest('tr').fadeOut(300, function () {
        $(this).remove();
        updateCartTotal();
      });
    }
  });

  /* ── Price calculator (product page) ── */
  $(document).on('change', '.calc-select, #calcQty', function () {
    var base = parseFloat($('#basePrice').val()) || 0;
    var qty  = parseInt($('#calcQty').val()) || 1;
    var extra = 0;
    $('.calc-select').each(function () {
      extra += parseFloat($(this).val()) || 0;
    });
    var total = (base + extra) * qty;
    $('#calcTotal').text('$' + total.toFixed(2));
  });

  /* ── Add to cart animation ── */
  $(document).on('click', '.btn-add-cart', function () {
    var $btn = $(this);
    var origText = $btn.html();
    $btn.html('<i class="fa-solid fa-check"></i> Added!').prop('disabled', true);
    setTimeout(function () {
      $btn.html(origText).prop('disabled', false);
    }, 1500);

    // Update header cart count (demo)
    var count = parseInt($('#cartCount').text()) || 0;
    $('#cartCount').text(count + 1);
    $('.cart-widget').addClass('pulse');
    setTimeout(function () { $('.cart-widget').removeClass('pulse'); }, 500);
  });

  /* ── Wishlist toggle ── */
  $(document).on('click', '.btn-wishlist', function () {
    $(this).toggleClass('active');
    var isActive = $(this).hasClass('active');
    $(this).find('i').toggleClass('fa-regular', !isActive).toggleClass('fa-solid', isActive);
  });

  /* ── Shipping address toggle (checkout) ── */
  $('#shipToDifferent').on('change', function () {
    $('#shippingAddressForm').toggle(this.checked);
  });

  /* ── Smooth scroll ── */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 400);
    }
  });

});
