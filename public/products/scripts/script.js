const productsWrapper = document.querySelector('.products_wrapper');
let products = []; 

async function fetchProductsAndImages() {
  const productsResponse = await fetch(`/api/products`);
  const productsData = await productsResponse.json();

  const imagesResponse = await fetch(`/api/images`);
  const imagesData = await imagesResponse.json();

  products = productsData.map(product => {
      const productImages = imagesData.filter(image => image.product_id === product.id);

      const mainImage = productImages.find(image => image.main_image)?.main_image || '';
      const additionalImages = productImages.map(image => image.additional_image).filter(image => image !== mainImage);

      return {
          id: product.id,
          name: product.name,
          category: product.category,
          description: product.description,
          availableSizes: product.available_sizes,
          standards: product.standards,
          supplierImage: product.supplier_image,
          images: {
              mainImage: mainImage ? `${mainImage}` : '', // Ensure this is just the file name
              additionalImages: additionalImages, // Ensure these are just file names
          }
      };
  });

  generateProductCards(products);
}



function generateProductCards(products) {
  productsWrapper.innerHTML = ''; // Clear the wrapper before adding new cards

  products.forEach(product => {
      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('product_card_wrapper');
      cardWrapper.setAttribute('data-id', product.id);

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('product_card_img');

      const img = document.createElement('img');

      // Use the server URL to load the image
      img.src = `/uploads/${product.images.mainImage}`; // Example: http://localhost:3000/uploads/image
      img.alt = `${product.name} - Main Image`;
      img.onload = () => {
          img.style.display = 'block'; // Show the image once it's loaded
      };

      imgWrapper.appendChild(img);

      const productName = document.createElement('strong');
      productName.id = "product_name";
      productName.textContent = product.name;

      cardWrapper.appendChild(imgWrapper);
      cardWrapper.appendChild(productName);

      cardWrapper.addEventListener('click', () => showPopup(product.id));
      productsWrapper.appendChild(cardWrapper);

      imgWrapper.addEventListener("click", () => {
        window.location = `/get_product/product.html?id=${product.id}`;
      });
  });
}


const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach(item => {
    item.addEventListener('click', function () {
        const selectedCategory = item.getAttribute('data-category');

        let filteredProducts;
        if (selectedCategory === 'all') {
            filteredProducts = products; 
        } else {
            filteredProducts = products.filter(product => product.category === selectedCategory);
        }
        generateProductCards(filteredProducts);
    });
});

fetchProductsAndImages();


// menu 



let mainNav = document.querySelector('header');
// main nav 

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






// menu 

document.querySelectorAll('.nav__links li').forEach(item => {
  item.addEventListener('click', () => {
      const url = item.getAttribute('data-url'); 
      if (url) {
          window.location.href = url; 
      } else {
          alert('No URL specified!');
      }
  });
});

document.querySelectorAll('.nav__links_sec li').forEach(item => {
  item.addEventListener('click', () => {
      const url = item.getAttribute('data-url'); 
      if (url) {
          window.location.href = url; 
      } else {
          alert('No URL specified!');
      }
  });
});





const urlParams = new URLSearchParams(window.location.search);
const categoryFromUrl = urlParams.get('category');
categoryItems.forEach(item => {
  const category = item.getAttribute('data-category'); 
  if (category === categoryFromUrl) {
    item.classList.add('selected');
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});















