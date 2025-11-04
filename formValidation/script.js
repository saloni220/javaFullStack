// Get elements
const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  formControl.querySelector("small").textContent = message;
}

// Show success state
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  formControl.querySelector("small").textContent = "";
}

// Validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

// Validate on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Name validation
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required");
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  // Email validation
  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "Enter a valid email");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  // Password validation
  if (passwordInput.value.trim() === "") {
    showError(passwordInput, "Password is required");
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    showError(passwordInput, "At least 6 characters");
    isValid = false;
  } else {
    showSuccess(passwordInput);
  }

  // Confirm password validation
  if (confirmPasswordInput.value.trim() === "") {
    showError(confirmPasswordInput, "Confirm your password");
    isValid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    showError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
  } else {
    showSuccess(confirmPasswordInput);
  }

  // If everything valid
  if (isValid) {
    alert("Form submitted successfully!");
    form.reset();
    document.querySelectorAll(".form-control").forEach((fc) => fc.classList.remove("success"));
  }
});
