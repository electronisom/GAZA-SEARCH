// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = '☰';
    
    menuButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
    
    nav.insertBefore(menuButton, nav.firstChild);
};

// Check if mobile menu is needed
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add hover effect to section headings
document.querySelectorAll('.section h2').forEach(heading => {
    heading.addEventListener('mouseenter', () => {
        heading.style.transform = 'translateX(-10px)';
    });
    
    heading.addEventListener('mouseleave', () => {
        heading.style.transform = 'translateX(0)';
    });
});

// Book Animation
document.addEventListener('DOMContentLoaded', function() {
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.book-page');
    const prevBtn = document.querySelector('.prev-page');
    const nextBtn = document.querySelector('.next-page');
    let currentPage = 0;

    // Initialize pages
    pages.forEach((page, index) => {
        if (index === 0) {
            page.style.transform = 'rotateY(0deg)';
        } else {
            page.style.transform = 'rotateY(180deg)';
        }
    });

    // Update button states
    function updateButtons() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === pages.length - 1;
    }

    // Turn page animation
    function turnPage(direction) {
        if (direction === 'next' && currentPage < pages.length - 1) {
            pages[currentPage].style.transform = 'rotateY(-180deg)';
            pages[currentPage + 1].style.transform = 'rotateY(0deg)';
            currentPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            pages[currentPage].style.transform = 'rotateY(180deg)';
            pages[currentPage - 1].style.transform = 'rotateY(0deg)';
            currentPage--;
        }
        updateButtons();
    }

    // Event listeners for buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => turnPage('prev'));
        nextBtn.addEventListener('click', () => turnPage('next'));
    }

    // Initialize button states
    updateButtons();

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    book.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    book.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                turnPage('prev');
            } else {
                turnPage('next');
            }
        }
    }
}); 