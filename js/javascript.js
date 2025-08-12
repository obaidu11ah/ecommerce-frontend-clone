  const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
  const selectedFiltersDiv = document.getElementById('selectedFilters');

  function updateFilters() {
    selectedFiltersDiv.innerHTML = ''; // Clear current

    let hasFilters = false;

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const label = checkbox.parentElement.textContent.trim();
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `${label} <span class="remove-tag">&times;</span>`;

        // "X" to uncheck
        tag.querySelector('.remove-tag').addEventListener('click', () => {
          checkbox.checked = false;
          updateFilters();
        });

        selectedFiltersDiv.appendChild(tag);
        hasFilters = true;
      }
    });

    // Show/hide the full filter tag div
    selectedFiltersDiv.classList.toggle('hidden', !hasFilters);
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
  });

  // Initialize
  updateFilters();

 //liked color red heart
 
function toggleHeart(el) {
    const icon = el.querySelector('i');
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
    el.classList.toggle('liked');
  }

  function toggleWishlist(el) {
    const icon = el.querySelector('i');
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
    el.classList.toggle('liked');
  }
  // tramnsfer to second page 
  // This part runs on the product card listing page
// Setup click event on product cards
function setupProductCardClickEvents() {
  const links = document.querySelectorAll('.details-link');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const productCard = this.closest('.product-card-1');
      const imgSrc = productCard.querySelector('.product-image').getAttribute('src');
      const productName = productCard.querySelector('h3').innerText;

      // Save to localStorage
      localStorage.setItem('productImage', imgSrc);
      localStorage.setItem('productName', productName);

      // Redirect to detail page
      window.location.href = 'product-details.html';
    });
  });
}

// Load product details on second page
function loadProductDetails() {
  const imgSrc = localStorage.getItem('productImage');
  const productName = localStorage.getItem('productName');

  if (imgSrc && productName) {
    const imageElement = document.getElementById('product-image');
    const nameElement = document.getElementById('product-name');

    if (imageElement) imageElement.src = imgSrc;
    if (nameElement) nameElement.textContent = productName;
  } else {
    console.warn("No product data found in localStorage");
  }
}

// Automatically detect which page you're on
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.details-link')) {
    setupProductCardClickEvents();
  }

  if (document.getElementById('product-image')) {
    loadProductDetails();
  }
});

