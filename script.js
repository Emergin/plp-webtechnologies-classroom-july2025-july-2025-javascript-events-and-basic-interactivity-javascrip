// ===========================================
// INTERACTIVE WEB PAGE - JAVASCRIPT FUNCTIONALITY
// ===========================================

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // PART 1: THEME TOGGLE (Dark/Light Mode)
    // ===========================================
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // Function to set theme and save preference
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('theme', theme);
    }
    
    
    // ===========================================
    // PART 2: INTERACTIVE COUNTER GAME
    // ===========================================
    
    const counterValue = document.getElementById('counterValue');
    const increaseBtn = document.getElementById('increaseBtn');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const counterMessage = document.getElementById('counterMessage');
    
    let count = 0;
    
    // Increase counter event
    increaseBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        showCounterMessage();
    });
    
    // Decrease counter event
    decreaseBtn.addEventListener('click', function() {
        count--;
        updateCounter();
        showCounterMessage();
    });
    
    // Reset counter event
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
        showMessage(counterMessage, 'Counter reset! 🔄', 'success');
    });
    
    // Function to update counter display
    function updateCounter() {
        counterValue.textContent = count;
        
        // Add visual effects based on count value
        if (count > 0) {
            counterValue.style.color = 'var(--success-color)';
        } else if (count < 0) {
            counterValue.style.color = 'var(--danger-color)';
        } else {
            counterValue.style.color = 'var(--primary-color)';
        }
    }
    
    // Function to show context-based messages
    function showCounterMessage() {
        let message, type;
        
        if (count === 0) {
            message = "Back to zero! 🎯";
            type = 'success';
        } else if (count > 0 && count <= 5) {
            message = `Positive vibes! (+${count}) 😊`;
            type = 'success';
        } else if (count > 5) {
            message = `You're on fire! (+${count}) 🔥`;
            type = 'success';
        } else if (count < 0 && count >= -5) {
            message = `Going negative... (${count}) 😅`;
            type = 'warning';
        } else {
            message = `Deep in the negatives! (${count}) 🥶`;
            type = 'warning';
        }
        
        showMessage(counterMessage, message, type);
    }
    
    
    // ===========================================
    // PART 3: COLLAPSIBLE FAQ SECTION
    // ===========================================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add event listeners to all FAQ questions
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items first
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    
    // ===========================================
    // PART 4: TABBED INTERFACE
    // ===========================================
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Add event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    
    // ===========================================
    // PART 5: FORM VALIDATION
    // ===========================================
    
    const contactForm = document.getElementById('contactForm');
    const formInputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        message: document.getElementById('message'),
        agreeTerms: document.getElementById('agreeTerms')
    };
    
    const errorElements = {
        nameError: document.getElementById('nameError'),
        emailError: document.getElementById('emailError'),
        phoneError: document.getElementById('phoneError'),
        passwordError: document.getElementById('passwordError'),
        messageError: document.getElementById('messageError'),
        termsError: document.getElementById('termsError')
    };
    
    const formSuccess = document.getElementById('formSuccess');
    
    // Real-time validation on input
    Object.keys(formInputs).forEach(key => {
        if (formInputs[key] && key !== 'agreeTerms') {
            formInputs[key].addEventListener('input', function() {
                validateField(key);
            });
            
            formInputs[key].addEventListener('blur', function() {
                validateField(key);
            });
        }
    });
    
    // Form submission event
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Validate all fields
        let isValid = true;
        Object.keys(formInputs).forEach(key => {
            if (!validateField(key)) {
                isValid = false;
            }
        });
        
        // If all fields are valid, show success message
        if (isValid) {
            showFormSuccess();
            resetForm();
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Field validation function
    function validateField(fieldName) {
        const field = formInputs[fieldName];
        const errorElement = errorElements[fieldName + 'Error'];
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous validation classes
        field.classList.remove('error', 'success');
        
        switch (fieldName) {
            case 'fullName':
                if (!field.value.trim()) {
                    errorMessage = 'Full name is required';
                    isValid = false;
                } else if (field.value.trim().length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(field.value.trim())) {
                    errorMessage = 'Name should only contain letters and spaces';
                    isValid = false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!field.value.trim()) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(field.value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'phone':
                // Phone is optional, but if provided, should be valid
                if (field.value.trim()) {
                    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
                    if (!phoneRegex.test(field.value.trim())) {
                        errorMessage = 'Please enter a valid phone number (at least 10 digits)';
                        isValid = false;
                    }
                }
                break;
                
            case 'password':
                const password = field.value;
                if (!password) {
                    errorMessage = 'Password is required';
                    isValid = false;
                } else if (password.length < 8) {
                    errorMessage = 'Password must be at least 8 characters long';
                    isValid = false;
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                    errorMessage = 'Password must contain uppercase, lowercase, and number';
                    isValid = false;
                }
                break;
                
            case 'message':
                // Message is optional, but if provided, should have minimum length
                if (field.value.trim() && field.value.trim().length < 10) {
                    errorMessage = 'Message should be at least 10 characters long';
                    isValid = false;
                }
                break;
                
            case 'agreeTerms':
                if (!field.checked) {
                    errorMessage = 'You must agree to the terms and conditions';
                    isValid = false;
                }
                break;
        }
        
        // Show/hide error message
        if (isValid) {
            errorElement.classList.remove('show');
            if (fieldName !== 'agreeTerms') {
                field.classList.add('success');
            }
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            if (fieldName !== 'agreeTerms') {
                field.classList.add('error');
            }
        }
        
        return isValid;
    }
    
    // Function to show form success message
    function showFormSuccess() {
        const successMessage = `
            <strong>🎉 Success!</strong><br>
            Your message has been received! We'll get back to you soon.
        `;
        
        formSuccess.innerHTML = successMessage;
        formSuccess.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Function to reset form
    function resetForm() {
        contactForm.reset();
        
        // Remove all validation classes and error messages
        Object.keys(formInputs).forEach(key => {
            const field = formInputs[key];
            const errorElement = errorElements[key + 'Error'];
            
            if (field && errorElement) {
                field.classList.remove('error', 'success');
                errorElement.classList.remove('show');
            }
        });
    }
    
    
    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================
    
    // Generic function to show messages with animation
    function showMessage(element, text, type = 'success') {
        element.textContent = text;
        element.className = `message ${type} show`;
        
        // Hide message after 3 seconds
        setTimeout(() => {
            element.classList.remove('show');
        }, 3000);
    }
    
    
    // ===========================================
    // KEYBOARD NAVIGATION ENHANCEMENTS
    // ===========================================
    
    // Add keyboard support for FAQ items
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
        
        // Make FAQ questions focusable
        question.setAttribute('tabindex', '0');
    });
    
    // Add keyboard support for tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    
    // ===========================================
    // COUNTER KEYBOARD SHORTCUTS
    // ===========================================
    
    // Add keyboard shortcuts for counter (when counter section is focused)
    document.addEventListener('keydown', function(event) {
        // Only activate when not typing in form fields
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (event.key) {
            case '+':
            case '=':
                event.preventDefault();
                increaseBtn.click();
                showMessage(counterMessage, 'Keyboard shortcut used! (+) 🎹', 'success');
                break;
            case '-':
                event.preventDefault();
                decreaseBtn.click();
                showMessage(counterMessage, 'Keyboard shortcut used! (-) 🎹', 'success');
                break;
            case '0':
                event.preventDefault();
                resetBtn.click();
                break;
        }
    });
    
    
    // ===========================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ===========================================
    
    // Add smooth scrolling to any internal links (if added in future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ===========================================
    // LOADING ANIMATIONS AND TRANSITIONS
    // ===========================================
    
    // Add loading animation to form submission button
    const submitButton = document.querySelector('.btn-submit');
    let originalButtonText = submitButton.textContent;
    
    contactForm.addEventListener('submit', function() {
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate processing time (in real app, this would be actual API call)
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 2000);
    });
    
    
    // ===========================================
    // ACCESSIBILITY IMPROVEMENTS
    // ===========================================
    
    // Add ARIA attributes for better screen reader support
    function initializeAccessibility() {
        // FAQ items
        faqQuestions.forEach((question, index) => {
            const targetId = question.getAttribute('data-target');
            const answer = document.getElementById(targetId);
            
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', targetId);
            answer.setAttribute('aria-hidden', 'true');
            
            // Update aria attributes when FAQ is opened/closed
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const isActive = mutation.target.classList.contains('active');
                        question.setAttribute('aria-expanded', isActive.toString());
                        answer.setAttribute('aria-hidden', (!isActive).toString());
                    }
                });
            });
            
            observer.observe(question.parentElement, { attributes: true });
        });
        
        // Tab panels
        tabButtons.forEach(button => {
            const targetTab = button.getAttribute('data-tab');
            const panel = document.getElementById(targetTab);
            
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-controls', targetTab);
            panel.setAttribute('role', 'tabpanel');
        });
    }
    
    // Initialize accessibility features
    initializeAccessibility();
    
    
    // ===========================================
    // PERFORMANCE OPTIMIZATIONS
    // ===========================================
    
    // Debounce function for input validation
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to input validation for better performance
    Object.keys(formInputs).forEach(key => {
        if (formInputs[key] && key !== 'agreeTerms') {
            const debouncedValidation = debounce(() => validateField(key), 500);
            formInputs[key].removeEventListener('input', () => validateField(key));
            formInputs[key].addEventListener('input', debouncedValidation);
        }
    });
    
    
    // ===========================================
    // CONSOLE WELCOME MESSAGE
    // ===========================================
    
    console.log(`
    🎉 Interactive Web Page Loaded Successfully!
    
    Features implemented:
    ✅ Dark/Light theme toggle
    ✅ Interactive counter with keyboard shortcuts (+, -, 0)
    ✅ Collapsible FAQ section
    ✅ Tabbed interface
    ✅ Comprehensive form validation
    ✅ Accessibility features
    ✅ Smooth animations and transitions
    ✅ Keyboard navigation support
    
    Try the keyboard shortcuts:
    • Press + or = to increase counter
    • Press - to decrease counter  
    • Press 0 to reset counter
    • Use Tab to navigate through interactive elements
    • Press Enter or Space on FAQ questions to toggle them
    
    Happy exploring! 🚀
    `);
    
}); // End of DOMContentLoaded event listener

// ===========================================
// ADDITIONAL EVENT LISTENERS (Outside DOMContentLoaded)
// ===========================================

// Handle page visibility change to pause/resume any animations if needed
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page is now hidden - pausing animations');
    } else {
        console.log('Page is now visible - resuming animations');
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(function() {
    console.log('Window resized - adjusting responsive elements');
    // Add any responsive JavaScript adjustments here if needed
}, 250));

// ===========================================
// ERROR HANDLING
// ===========================================

// Global error handler for any uncaught errors
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
    
    // In a production app, you might want to send this to an error tracking service
    // For now, we'll just log it and show a user-friendly message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message show';
    errorMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #f5c6cb;
        z-index: 9999;
        max-width: 300px;
    `;
    errorMessage.textContent = 'Something went wrong. Please refresh the page and try again.';
    
    document.body.appendChild(errorMessage);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
});

// Prevent default behavior for drag and drop (optional enhancement)
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.addEventListener(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
});