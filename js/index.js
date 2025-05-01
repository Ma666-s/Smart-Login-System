document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('inEmailId');
    const passwordInput = document.getElementById('inPassId');
    const rememberMe = document.getElementById('rememberMe');
    const togglePassword = document.querySelector('.toggle-password');
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
    }
    
    // Check for remembered credentials
    if (localStorage.getItem('rememberedEmail')) {
        emailInput.value = localStorage.getItem('rememberedEmail');
        rememberMe.checked = true;
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
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Login function
    function handleLogin() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const accounts = JSON.parse(localStorage.getItem('accountsRegistered')) || [];
        
        // Input validation
        if (!email || !password) {
            showAlert('error', 'Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('error', 'Please enter a valid email address');
            return;
        }
        
        // Find user account
        const user = accounts.find(account => 
            account.registerEmail === email && 
            account.registerPassword === password
        );
        
        if (user) {
            // Successful login
            if (rememberMe.checked) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Store user session
            localStorage.setItem('currentUser', JSON.stringify({
                name: user.registerName,
                email: user.registerEmail
            }));
            
            showAlert('success', 'Login successful! Redirecting...', () => {
                window.location.href = 'home.html';
            });
        } else {
            // Failed login
            showAlert('error', 'Invalid email or password');
            passwordInput.value = '';
            passwordInput.focus();
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