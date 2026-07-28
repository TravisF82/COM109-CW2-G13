document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Dual-Form Toggle Logic
    // ----------------------------------------------------
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const authContainer = document.getElementById('auth-view');

    signUpButton.addEventListener('click', () => {
        authContainer.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        authContainer.classList.remove('right-panel-active');
    });

    // ----------------------------------------------------
    // 2. Real-Time Password Strength Validation
    // ----------------------------------------------------
    const regPassword = document.getElementById('reg-password');
    const regPasswordError = document.getElementById('reg-password-error');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const confirmPassword = document.getElementById('reg-confirm-password');
    const confirmError = document.getElementById('reg-confirm-error');
    const regUsername = document.getElementById('reg-username');
    const regUsernameError = document.getElementById('reg-username-error');

    regPassword.addEventListener('input', () => {
        const val = regPassword.value;
        let score = 0;

        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        let color = '#e0e0e0';
        let text = '';
        let width = '0%';

        switch (score) {
            case 1:
                width = '25%';
                color = '#ff4b4b';
                text = 'Weak';
                break;
            case 2:
                width = '50%';
                color = '#f9a826';
                text = 'Fair';
                break;
            case 3:
                width = '75%';
                color = '#2ecc71';
                text = 'Good';
                break;
            case 4:
                width = '100%';
                color = '#27ae60';
                text = 'Strong';
                break;
            default:
                width = '0%';
                text = '';
        }

        strengthBar.style.width = width;
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    });

    // Confirm Password check
    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== regPassword.value && confirmPassword.value.length > 0) {
            confirmError.textContent = "Passwords do not match.";
        } else {
            confirmError.textContent = "";
        }
    });

    // Username special char check
    regUsername.addEventListener('input', () => {
        if (/[^a-zA-Z0-9]/.test(regUsername.value)) {
            regUsernameError.textContent = "No special characters allowed.";
        } else {
            regUsernameError.textContent = "";
        }
    });

    // ----------------------------------------------------
    // 3. Storage and Session Management (Sign Up & Sign In)
    // ----------------------------------------------------
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const dashboardView = document.getElementById('dashboard-view');
    const welcomeMessage = document.getElementById('welcome-message');
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        if (/[^a-zA-Z0-9]/.test(regUsername.value)) {
            regUsernameError.textContent = "No special characters allowed.";
            isValid = false;
        }
        
        const pwd = regPassword.value;
        const hasUpper = /[A-Z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
        
        if (pwd.length < 8 || !hasUpper || !hasNumber || !hasSpecial) {
            regPasswordError.style.color = 'red';
            regPasswordError.textContent = "Password does not meet the minimum requirements.";
            isValid = false;
        } else {
            regPasswordError.style.color = '#666';
            regPasswordError.textContent = "Password meets requirements.";
        }
        
        if (confirmPassword.value !== pwd || confirmPassword.value.length === 0) {
            confirmError.textContent = "Passwords do not match.";
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const username = regUsername.value;
        const email = document.getElementById('reg-email').value;
        // Mock obfuscation for report (Base64 encoding)
        const password = btoa(regPassword.value);

        const userData = { username, email, password };
        
        // Save to localStorage as our mock database
        localStorage.setItem(`user_${username}`, JSON.stringify(userData));
        alert("Account created successfully! Please sign in.");
        
        // Switch to sign in panel
        authContainer.classList.remove('right-panel-active');
        signupForm.reset();
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = btoa(document.getElementById('login-password').value);
        const rememberMe = document.getElementById('remember-me').checked;

        const storedUser = localStorage.getItem(`user_${username}`);

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.password === password) {
                // Successful login
                loginError.textContent = "";
                
                // Store active session depending on remember me
                if (rememberMe) {
                    localStorage.setItem('active_session', username);
                } else {
                    sessionStorage.setItem('active_session', username);
                }

                showDashboard(username);
            } else {
                loginError.textContent = "Invalid password.";
            }
        } else {
            loginError.textContent = "User not found.";
        }
    });

    // ----------------------------------------------------
    // 4. Dynamic Dashboard Injection & Logout
    // ----------------------------------------------------
    const logoutBtn = document.getElementById('logout-btn');

    function showDashboard(username) {
        authContainer.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        welcomeMessage.textContent = `Welcome back, ${username}!`;
    }

    function checkActiveSession() {
        const activeLocal = localStorage.getItem('active_session');
        const activeSession = sessionStorage.getItem('active_session');

        if (activeLocal) {
            showDashboard(activeLocal);
        } else if (activeSession) {
            showDashboard(activeSession);
        }
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('active_session');
        sessionStorage.removeItem('active_session');
        
        dashboardView.classList.add('hidden');
        authContainer.classList.remove('hidden');
        loginForm.reset();
    });

    // Initialize check on page load
    checkActiveSession();
});
