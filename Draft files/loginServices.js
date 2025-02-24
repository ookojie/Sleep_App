const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("toggle-password");

togglePasswordButton.addEventListener("click", togglePassword);

const togglePassword = () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordButton.textContent = "Hide password";
    togglePasswordButton.setAttribute("aria-label", "Hide password");
  } else {
    passwordInput.type = "password";
    togglePasswordButton.textContent = "Show password";
    togglePasswordButton.setAttribute(
      "aria-label",
      "Show password as plain text." +
        "Warning: this will display your password on the screen."
    );
  }
};
