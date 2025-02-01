
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

appearElementV1(".fab_info", "X", 20, 10);


let fabricationServiceContainer = document.querySelector('.fabrication_service_pic');

function generateFabricationPics() {
  fetch(`/api/fabrication-pics`)
  .then(res => res.json())
  .then(data => {
    
    data.forEach(pic => {
      let picWrapper = document.createElement('div');
      picWrapper.className = 'fab_pic_wrapper';
      let fabImg = document.createElement('img');
      fabImg.src = `/IMG/${pic.image_path}`;      
      fabImg.alt = pic.description;

      picWrapper.appendChild(fabImg);
      fabricationServiceContainer.appendChild(picWrapper);
    })
  })
  .catch(err => {
    console.error("error : " + err);
  })
}

generateFabricationPics();


//Scroll Animation 


function scrollAnim(className) {
  window.addEventListener('scroll', () => {
    let containers = document.querySelectorAll(`.${className}`); // Re-fetch elements
    containers.forEach(item => {
      if (window.innerHeight + window.scrollY > item.offsetTop + 30) {
        item.classList.add('appear');
      } else {
        item.classList.remove('appear');
      }
    });
  });
}

scrollAnim("fab_pic_wrapper");
window.addEventListener('scroll' , ()=> {
  if(window.scrollY>100) {
    document.querySelector(".scroll_tag").style.opacity = "0";
  }else {
    document.querySelector(".scroll_tag").style.opacity = "1";
  }
})