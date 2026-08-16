// Contact page interactions: form validation, feedback, and simple placeholders
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('fullName')?.toString().trim();
      const email = fd.get('email')?.toString().trim();
      const subject = fd.get('subject')?.toString().trim();
      const message = fd.get('message')?.toString().trim();
      if (!name || !email || !subject || !message) {
        alert('Please fill required fields: Name, Email, Subject and Message.');
        return;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) { alert('Please enter a valid email.'); return; }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const prevText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate API call
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = prevText;
        if (feedback) {
          feedback.hidden = false;
          feedback.textContent = 'Message sent. We will reply shortly.';
          feedback.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
        }
        contactForm.reset();
        setTimeout(() => { if (feedback) feedback.hidden = true; }, 6000);
      }, 1100);
    });
  }

  // Wire quick action buttons (placeholders)
  document.querySelectorAll('.contact-card .btn, .info-card .btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.info-card, .contact-card');
      const title = parent?.querySelector('h4')?.textContent || 'Support';
      alert(`${title} — This feature will connect you to the selected support channel.`);
    });
  });
});
