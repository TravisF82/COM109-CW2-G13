document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const messageInput = document.getElementById("message");
    const charCounter = document.getElementById("charCounter");
    const successMessage = document.getElementById("successMessage");
    const maxLength = 500;

    // Character counter for message field
    messageInput.addEventListener("input", () => {
        const currentLength = messageInput.value.length;
        charCounter.textContent = `${currentLength} / ${maxLength} characters`;
        
        if (currentLength >= maxLength) {
            charCounter.classList.add("limit-reached");
        } else {
            charCounter.classList.remove("limit-reached");
        }
    });

    // Form submission validation
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Name validation
        const nameInput = document.getElementById("name");
        const nameError = document.getElementById("nameError");
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your full name.";
            nameError.classList.add("visible");
            nameInput.setAttribute("aria-invalid", "true");
            isValid = false;
        } else {
            nameError.classList.remove("visible");
            nameInput.setAttribute("aria-invalid", "false");
        }

        // Email validation
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            emailError.classList.add("visible");
            emailInput.setAttribute("aria-invalid", "true");
            isValid = false;
        } else {
            emailError.classList.remove("visible");
            emailInput.setAttribute("aria-invalid", "false");
        }

        // Message validation
        const messageError = document.getElementById("messageError");
        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please enter a message.";
            messageError.classList.add("visible");
            messageInput.setAttribute("aria-invalid", "true");
            isValid = false;
        } else {
            messageError.classList.remove("visible");
            messageInput.setAttribute("aria-invalid", "false");
        }

        if (isValid) {
            // Animate button and show success message
            const submitBtn = contactForm.querySelector(".submit-btn");
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                charCounter.textContent = `0 / ${maxLength} characters`;
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
                
                successMessage.style.display = "block";
                successMessage.textContent = "Thank you! Your message has been sent successfully.";
                
                // Hide success message after a few seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000);
            }, 1000); // Simulate network delay
        }
    });
});
