const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");
root.style.setProperty("--marquee-elements", marqueeContent.children.length);
for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
let mainNav = document.querySelector('header');
// MainNav
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
          // alert('No action specified!');
      }
  });
});
document.querySelectorAll('.product_category_card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    window.location.href = `/products/products.html`;
  });
});
// Animation
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
          }else {
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
appearElementV1(".col_social_media_container", "X", -20, 100);
appearElementV1(".app_header", "X", 20, 100);
appearElementV1(".standard_container", "Y", 20, 40);
appearElementV1(".partner_card", "Y", 20, 10);
appearElementV1("#vision", "Y", 20, 100);
// increment : reate
let rateContainer = document.querySelectorAll(".rate_container_main rate");
window.addEventListener('scroll' , ()=> {
  rateContainer.forEach(rate => {
    if(window.scrollY + window.innerHeight > rate.offsetTop) {
      setInterval(() => {
        currentValue += increment;
        if (currentValue >= target) {
            counter.textContent = target;
            clearInterval(interval);
        } else {
            counter.textContent = currentValue;
        }
    }, 50); 
    }
  })
})
function scrollTo() {
  document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
}




document.getElementById('downloadButton').addEventListener('click', function() {
  // Replace 'your-file-url' with the actual URL of the file on the server
  const fileUrl = `/download/doc/Madad_Gate_offered_services.pdf`;
  openFileInNewTab(fileUrl);
});

function openFileInNewTab(fileUrl) {
  // Open the file URL in a new tab
  window.open(fileUrl, '_blank');
}


document.querySelector(".scrollTop").addEventListener("click" , ()=> {

  document.querySelector(".home_section").scrollIntoView({ behavior: 'smooth', block: 'start' });

})