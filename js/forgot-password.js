document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const recoveryForm = document.getElementById('recoveryForm');
    const recoveryEmail = document.getElementById('recoveryEmail');
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Toggle Dark Mode';
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
        }
    });
    
    // Form submission
    recoveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePasswordRecovery();
    });
    
    // Password recovery function
    function handlePasswordRecovery() {
        const email = recoveryEmail.value.trim();
        const accounts = JSON.parse(localStorage.getItem('accountsRegistered')) || [];
        
        // Input validation
        if (!email) {
            showAlert('error', 'Please enter your email address');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('error', 'Please enter a valid email address');
            return;
        }
        
        // Check if email exists
        const user = accounts.find(account => account.registerEmail === email);
        
        if (user) {
            // In a real app, you would send an email here
            // For demo, we'll simulate it
            showAlert('success', 'Password reset link sent to your email', () => {
                window.location.href = 'index.html';
            });
        } else {
            showAlert('error', 'Email not found in our system');
        }
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Alert helper function
    function showAlert(icon, title, callback) {
        Swal.fire({
            icon: icon,
            title: title,
            showConfirmButton: icon === 'error',
            timer: icon === 'success' ? 1500 : 3000,
            position: 'center'
        }).then(() => {
            if (callback) callback();
        });
    }
});