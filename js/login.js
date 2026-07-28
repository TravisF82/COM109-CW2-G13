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
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const confirmPassword = document.getElementById('reg-confirm-password');
    const confirmError = document.getElementById('reg-confirm-error');

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
});
