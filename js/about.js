// About page simple interactions: animate stats
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-count');
  counters.forEach((el) => {
    const target = Number(el.dataset.target || '0');
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + (target >= 1000 ? '+' : '');
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 16);
  });
});
