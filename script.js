// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// File-input label update
const fileInput = document.getElementById('fileInput');
const fileLabel = document.getElementById('fileLabel');
fileInput?.addEventListener('change', () => {
  const name = fileInput.files[0]?.name || 'No file chosen';
  fileLabel.textContent = name;
});

// Contact form validation & submission
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const message = form.elements['message'].value.trim();

  if (!name || !email || !message) {
    alert('Please fill in your name, email and message.');
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert('Thank you! Your message has been sent.');
      form.reset();
      fileLabel.textContent = 'No file chosen';
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  } catch (err) {
    alert('Oops! There was a problem submitting your form.');
  }
});
