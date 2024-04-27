// JavaScript for theme-switching
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// JavaScript for form validation and submission
const contactForm = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const errorElement = document.getElementById('error');
const successMsg = document.getElementById('success-msg');

// Email validation function
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Form validation function
const validateForm = (e) => {
  let hasErrors = false;

  if (name.value.length < 3) {
    errorElement.textContent = 'Your name should be at least 3 characters long.';
    hasErrors = true;
  }

  if (!emailIsValid(email.value)) {
    errorElement.textContent = 'Please enter a valid email address.';
    hasErrors = true;
  }

  if (password.value.length < 6) {
    errorElement.textContent = 'Password should be at least 6 characters long.';
    hasErrors = true;
  }

  if (password.value !== confirmPassword.value) {
    errorElement.textContent = 'Passwords do not match.';
    hasErrors = true;
  }

  if (hasErrors) {
    e.preventDefault(); // Prevent form submission if there are validation errors
  }
};

// Event listener for form submission
contactForm.addEventListener("submit", (e) => {
  validateForm(e); // Validate the form before proceeding

  if (!e.defaultPrevented) { // If no validation errors
    const formData = new FormData(contactForm);

    fetch("submit_form.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        successMsg.textContent = "Thank you, your form has been submitted.";
        errorElement.textContent = ""; // Clear error messages

        // Reset form after a delay
        setTimeout(() => {
          contactForm.reset();
          successMsg.textContent = ""; // Clear success message
        }, 5000); // 5-second delay before clearing the success message
      } else {
        errorElement.textContent = data.errors.join(", ");
        successMsg.textContent = ""; // Clear success message if there are errors
      }
    })
    .catch(error => {
      console.error("Error:", error);
      errorElement.textContent = "An error occurred during submission.";
      successMsg.textContent = ""; // Clear success message
    });
  }
});
