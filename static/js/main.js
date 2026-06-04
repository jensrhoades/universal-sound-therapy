(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      hamburger.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('nav-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Product search and category filter ── */
  var searchInput = document.getElementById('product-search');
  var categoryFilters = document.getElementById('category-filters');
  var grid = document.getElementById('product-grid');
  var noResults = document.getElementById('no-results');
  var visibleCount = document.getElementById('visible-count');

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.product-card'));
  var activeCategory = 'all';
  var searchQuery = '';

  function filterCards() {
    var shown = 0;
    cards.forEach(function (card) {
      var title = (card.dataset.title || '').toLowerCase();
      var desc = (card.dataset.description || '').toLowerCase();
      var cats = (card.dataset.categories || '');

      var matchesSearch = !searchQuery ||
        title.indexOf(searchQuery) !== -1 ||
        desc.indexOf(searchQuery) !== -1;

      var matchesCat = activeCategory === 'all' ||
        cats.split('|').some(function (c) {
          return c.trim() === activeCategory;
        });

      var visible = matchesSearch && matchesCat;
      card.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });

    if (visibleCount) visibleCount.textContent = shown;
    if (noResults) noResults.style.display = shown === 0 ? '' : 'none';
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = this.value.toLowerCase().trim();
      filterCards();
    });
  }

  if (categoryFilters) {
    var pills = Array.prototype.slice.call(
      categoryFilters.querySelectorAll('.category-filter-pill')
    );
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) {
          p.classList.remove('category-filter-pill--active');
        });
        this.classList.add('category-filter-pill--active');
        activeCategory = this.dataset.category;
        filterCards();
      });
    });
  }

  var resetBtn = document.getElementById('reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      searchQuery = '';
      activeCategory = 'all';
      if (searchInput) searchInput.value = '';
      var allPill = categoryFilters &&
        categoryFilters.querySelector('[data-category="all"]');
      if (allPill) allPill.click();
    });
  }

})();
