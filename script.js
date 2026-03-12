// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Mobile menu toggle
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

	
	
    // Form submission
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading spinner
            loadingSpinner.style.display = 'block';
            formMessages.style.display = 'none';
            
            // Create form data
            const formData = new FormData(contactForm);
            
            // Send request to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                loadingSpinner.style.display = 'none';
                
                if (response.ok) {
                    // Success message
                    formMessages.textContent = 'Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.';
                    formMessages.className = 'form-message success';
                    formMessages.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessages.style.display = 'none';
                    }, 5000);
                } else {
                    // Error message
                    formMessages.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.';
                    formMessages.className = 'form-message error';
                    formMessages.style.display = 'block';
                }
            })
            .catch(error => {
                loadingSpinner.style.display = 'none';
                formMessages.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.';
                formMessages.className = 'form-message error';
                formMessages.style.display = 'block';
            });
        });
    }
});