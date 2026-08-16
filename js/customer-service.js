// Customer service page interactions: quick-cards, faq, and support form
document.addEventListener('DOMContentLoaded', () => {
  // Quick help cards navigation
  document.querySelectorAll('.support-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const target = card.dataset.target;
      if (!target) return;
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else {
        // fallback: show a small toast / highlight area
        card.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 350 });
      }
    });
  });

  // Smooth details toggle (enhance accordion)
  document.querySelectorAll('.faq-list details').forEach((det) => {
    det.addEventListener('toggle', () => {
      if (det.open) det.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Support form validation and success message
  const supportForm = document.getElementById('supportForm');
  const supportSuccess = document.getElementById('supportSuccess');
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(supportForm);
      const name = fd.get('name')?.toString().trim();
      const email = fd.get('email')?.toString().trim();
      const message = fd.get('message')?.toString().trim();
      if (!name || !email || !message) {
        alert('Please complete required fields: Name, Email and Message.');
        return;
      }
      // Basic email pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // If attachment present, check size (5MB limit)
      const attachment = document.getElementById('attachment');
      if (attachment?.files?.[0] && attachment.files[0].size > 5 * 1024 * 1024) {
        alert('Attachment too large. Maximum 5MB allowed.');
        return;
      }

      // Show success without sending to backend (placeholder)
      if (supportSuccess) {
        supportSuccess.hidden = false;
        supportSuccess.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350 });
      }
      supportForm.reset();
      setTimeout(() => {
        if (supportSuccess) supportSuccess.hidden = true;
      }, 6000);
    });
  }

  // Contact action buttons placeholders
  document.querySelectorAll('.contact-card .btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.contact-card');
      const title = parent?.querySelector('h4')?.textContent || 'Contact';
      alert(`${title} — This will open the selected support channel.`);
    });
  });
});
