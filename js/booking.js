document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  const MAX_RENTAL_DAYS = 60;

  const startDate = document.getElementById("start-date");
  const endDate = document.getElementById("end-date");
  const durationLabel = document.getElementById("duration");

  const forename = document.getElementById("forename");
  const surname = document.getElementById("surname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  const forenameError = document.getElementById("forename-error");
  const surnameError = document.getElementById("surname-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");

  const form = document.getElementById("booking-form");

  const confirmationOverlay = document.getElementById("confirmation-overlay");

  const confirmationCarType = document.getElementById("confirmation-car-type");
  const confirmationPickupDate = document.getElementById("confirmation-pickup-date");
  const confirmationReturnDate = document.getElementById("confirmation-return-date");
  const confirmationRentalDuration = document.getElementById("confirmation-rental-duration");

  const homeButton = document.getElementById("go-to-home");
  const viewBookingButton = document.getElementById("go-to-booking");

  startDate.min = today;
  startDate.value = today;
  endDate.value = today;
  endDate.min = today;

  SetMaxEndDate();
  UpdateDuration();

  startDate.addEventListener("change", () => {
    endDate.min = startDate.value;
    if (endDate.value < startDate.value) {
      endDate.value = startDate.value;
    }

    SetMaxEndDate();
    UpdateDuration();
  });

  endDate.addEventListener("change", UpdateDuration);

  forename.addEventListener("change", () => {
    ValidateInputField(forename, forenameError, ValidateForename);
  });

  surname.addEventListener("change", () => {
    ValidateInputField(surname, surnameError, ValidateSurname);
  });

  email.addEventListener("change", () => {
    ValidateInputField(email, emailError, ValidateEmail);
  });

  phone.addEventListener("change", () => {
    ValidateInputField(phone, phoneError, ValidatePhone);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const forenameValid = ValidateInputField(
      forename,
      forenameError,
      ValidateForename,
    );
    const surnameValid = ValidateInputField(
      surname,
      surnameError,
      ValidateSurname,
    );
    const emailValid = ValidateInputField(email, emailError, ValidateEmail);
    const phoneValid = ValidateInputField(phone, phoneError, ValidatePhone);

    if (!forenameValid || !surnameValid || !emailValid || !phoneValid) {
      return;
    }

    const booking = {
      forename: forename.value,
      surname: surname.value,
      email: email.value,
      phone: phone.value,
      startDate: startDate.value,
      endDate: endDate.value,
    };

    SaveBooking(booking);
    SetBookingDetailsForConfirmation();
    ShowConfirmationForm();
    form.reset();
  });

  homeButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  viewBookingButton.addEventListener("click", () => {
    window.location.href = "./login.html";
  });

  function CalculateRentalDurationDays(){
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    const duration = (end - start) / (1000 * 60 * 60 * 24) + 1;
    return duration;
  }

  function FormatDurationInDaysToString(duration){
    return duration === 1 ?
    `Duration: ${duration} day` : `Duration: ${duration} days`;
  }

  function UpdateDuration(){
    const duration = CalculateRentalDurationDays();
    const durationString = FormatDurationInDaysToString(duration);

    durationLabel.textContent = durationString;
  }

  function SetMaxEndDate() {
    const maxEndDate = new Date(startDate.value);

    maxEndDate.setDate(maxEndDate.getDate() + MAX_RENTAL_DAYS);

    endDate.max = maxEndDate.toISOString().split("T")[0];
  }

  function SaveBooking(booking){
    SaveBookingToLocalStorage(booking);
  }

  function ShowConfirmationForm(){
    confirmationOverlay.classList.add("active");
  }

  function SaveBookingToLocalStorage(booking){
    const currentUser = GetCurrentUser();
    const existingBookingsMap = JSON.parse(localStorage.getItem("bookings")) || {};
    const existingBookings = existingBookingsMap[currentUser] || [];

    existingBookings.push(booking);
    existingBookingsMap[currentUser] = existingBookings;

    localStorage.setItem("bookings", JSON.stringify(existingBookingsMap));
  }

  function ValidateInputField(field, errorElement, validationFunc) {
    const result = validationFunc(field.value);

    if (result.valid) {
      ClearError(field, errorElement);
    } else {
      ShowError(field, result.error, errorElement);
    }

    return result.valid;
  }

  function ValidationResult(valid, error = "") {
    return {
      valid: valid,
      error: error,
    };
  }

  function ContainsDigit(str) {
    return /\d/.test(str);
  }

  function ValidateForename(forename) {
    if (forename.trim() === "") {
      return ValidationResult(false, "Forename is required.");
    } else if (forename.trim().length <= 1) {
      return ValidationResult(false, "Forename must be at least 1 character.");
    } else if (ContainsDigit(forename)) {
      return ValidationResult(false, "Please enter a valid forename.");
    }

    return ValidationResult(true);
  }

  function ValidateSurname(surname) {
    if (surname.trim() === "") {
      return ValidationResult(false, "Surname is required.");
    } else if (surname.trim().length <= 1) {
      return ValidationResult(false, "Surname must be at least 2 characters.");
    } else if (ContainsDigit(surname)) {
      return ValidationResult(false, "Please enter a valid surname.");
    }

    return ValidationResult(true);
  }

  function ValidateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === ""){
      return ValidationResult(false, "Email is required.");
    }
    else if (!emailRegex.test(email)) {
      return ValidationResult(false, "Please enter a valid email address.");
    }

    return ValidationResult(true);
  }

  function ValidatePhone(phone) {
    const phoneRegex = /^(?:(?:\+44\s?|0)7\d{3}\s?\d{3}\s?\d{3})$/;

    if (phone.trim() === "") {
      return ValidationResult(false, "Phone number is required.");
    }
    else if (!phoneRegex.test(phone)) {
      return ValidationResult(false, "Please enter a valid UK mobile number.");
    }

    return ValidationResult(true);
  }

  function ShowError(input, message, errorElement) {
    input.classList.add("input-error");
    errorElement.textContent = message;
  }

  function ClearError(input, errorElement) {
    input.classList.remove("input-error");
    errorElement.textContent = "";
  }

  function SetBookingDetailsForConfirmation(){
    //confirmationCarType.value = something that idk yet
    confirmationPickupDate.textContent = startDate.value;
    confirmationReturnDate.textContent = endDate.value;
    confirmationRentalDuration.textContent = FormatDurationInDaysToString(CalculateRentalDurationDays());
  }
});
