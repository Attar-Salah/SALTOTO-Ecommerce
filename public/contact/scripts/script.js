
// ============================MENU============================ 
let mainNav = document.querySelector('header');
function toggleMenu() {
console.log("nice");
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


document.getElementById('contactForm').addEventListener('submit', async (event) => {
event.preventDefault(); 

const formData = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    product: document.getElementById('product').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
};

try {
    const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
    });

    if (response.success) {
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Form submitted successfully!';
        successMessage.style.color = 'green';
        successMessage.style.marginTop = '10px';
        successMessage.style.fontWeight = 'bold';

        document.getElementById('contactForm').appendChild(successMessage);

        document.getElementById('contactForm').reset();

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    } else {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Failed to submit the form. Please try again.';
        errorMessage.style.color = 'red';
        errorMessage.style.marginTop = '10px';
        errorMessage.style.fontWeight = 'bold';

        document.getElementById('contactForm').appendChild(errorMessage);

        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
} catch (error) {
    console.error('Error:', error);

    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'An error occurred. Please try again.';
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.fontWeight = 'bold';

    document.getElementById('contactForm').appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}
});