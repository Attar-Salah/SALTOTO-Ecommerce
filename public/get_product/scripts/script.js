document.addEventListener('DOMContentLoaded', () => {
  
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    console.error('No product ID found in URL');
    return;
  }

  fetch(`/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      document.querySelector('#product-name').textContent = product.name;
      document.querySelector('#product-overview-text').textContent = product.description || "/";
      document.querySelector('#available-sizes-text').textContent = product.available_sizes || "/";
      document.querySelector('#standards-text').textContent = product.standards || "/";
      document.querySelector('#category-text').textContent = product.category || "/";
      document.querySelector('#supplier-image').src = `/uploads/${product.supplier_image}`;

      return fetch(`/api/images`);
    })
    .then(response => response.json())
    .then(images => {
      const productImages = images.filter(image => image.product_id == productId);

      const mainImageContainer = document.querySelector('.main_img img');
      const additionalImageContainer = document.querySelector('.additional_img img');

      if (productImages.length > 0) {
        const mainImage = productImages[0].main_image;
        const additionalImage = productImages[0].additional_image;

        if (mainImage) {
          mainImageContainer.src = `/uploads/${mainImage}`;
          mainImageContainer.alt = 'Main product image';
        } else {
          console.warn('Main image not found for this product');
          mainImageContainer.src = 'path/to/default/image.jpg';
        }

        if (additionalImage) {
          additionalImageContainer.src = `/uploads/${additionalImage}`;
        } else {
          console.warn('Additional image not found for this product');
          additionalImageContainer.src = 'path/to/default/image.jpg';
        }
      } else {
        console.warn('No images found for this product');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

let mainNav = document.querySelector('header');

function toggleMenu() {
  const nav = document.querySelector('.sec_main_nav');
  const isHidden = nav.classList.contains('hidden');
  if (isHidden) {
    nav.classList.remove('hidden');
    setTimeout(() => {
      nav.classList.add('active');
    }, 10);
    document.addEventListener('click', handleClickOutside, true);
  } else {
    closeMenu();
  }
}

function closeMenu() {
  const nav = document.querySelector('.sec_main_nav');
  nav.classList.remove('active');
  setTimeout(() => {
    nav.classList.add('hidden');
  }, 300);
  document.removeEventListener('click', handleClickOutside, true);
}

function handleClickOutside(event) {
  const nav = document.querySelector('.sec_main_nav');
  const toggleButton = document.querySelector('.sec_nav');
  if (!nav.contains(event.target) && !toggleButton.contains(event.target)) {
    closeMenu();
  }
}

function scrollTo() {
  console.log("nice");
  document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.nav__links li, .nav__links_sec li , .pages_list li').forEach(item => {
  item.addEventListener('click', () => {
    const url = item.getAttribute('data-url');
    const target = item.getAttribute('data-target');
    if (url) {
      window.location.href = url;
    } else if (target) {
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      alert('No action specified!');
    }
  });
});

document.querySelectorAll('.product_category_card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    window.location.href = `/public/products/products.html`;
  });
});

function appearElementV1(className, direction, position, offset) {
  let container = document.querySelectorAll(`${className}`);
  window.addEventListener("scroll", () => {
    container.forEach(item => {
      item.style.transform = `translate${direction}(${position}px)`;
      item.style.opacity = `0`;
      let itemTop = item.offsetTop;
      let triggerPosition = window.scrollY + window.innerHeight;
      item.style.filter = "blur(10px)";
      if (triggerPosition >= itemTop + offset) {
        item.classList.add("appear");
        console.log("Element appeared");
      } else {
        item.classList.remove("appear");
      }
    });
  });
}

appearElementV1(".rate_container_header", "X", -20, 100);
appearElementV1(".rate_container_main", "Y", 20, 100);
appearElementV1(".product_section_header", "X", 20, 100);
appearElementV1(".product_category_card", "Y", 20, 100);
appearElementV1(".about_text_content", "X", 20, 100);
appearElementV1(".map_container", "X", 20, 100);
appearElementV1(".col_social_media_container", "X", 20, 100);