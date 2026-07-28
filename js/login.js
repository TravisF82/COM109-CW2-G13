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
});
