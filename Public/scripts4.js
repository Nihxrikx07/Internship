document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("responseMessage");

  // Load saved form data from localStorage
  if (localStorage.getItem("contactFormData")) {
    const savedData = JSON.parse(localStorage.getItem("contactFormData"));
    form.name.value = savedData.name || "";
    form.email.value = savedData.email || "";
    form.message.value = savedData.message || "";
  }

  // Save form data to localStorage on input
  form.addEventListener("input", function () {
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    localStorage.setItem("contactFormData", JSON.stringify(formData));
  });

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name && email && message) {
      responseMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
      responseMessage.style.color = "green";
      form.reset();
      localStorage.removeItem("contactFormData");
    } else {
      responseMessage.textContent = "Please fill out all fields.";
      responseMessage.style.color = "red";
    }
  });
});
