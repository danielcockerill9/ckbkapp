// script.js
// This script animates the statistic counters on the landing page. When the
// DOM is ready it iterates over each counter element and counts up from 0
// to the specified data-target. A minimum delay is enforced to prevent
// extremely fast updates on large numbers.

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('#hero .number');
  const animationDuration = 2000; // overall duration for the count animation

  /**
   * Animate a single counter from 0 to its target value. The function
   * calculates the update interval based on the desired duration and
   * the target number. Thousands separators are applied for legibility.
   *
   * @param {HTMLElement} counter The element whose numeric text should animate
   */
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    // Guard against non‑numeric targets
    if (!target || target <= 0) {
      counter.textContent = '0';
      return;
    }
    // Compute how much to increment per frame such that the counter
    // completes within animationDuration (approx 60 updates per second).
    const frameDuration = 16; // ~60fps
    const steps = Math.floor(animationDuration / frameDuration);
    const incrementValue = Math.ceil(target / steps);
    let current = 0;

    const update = () => {
      current += incrementValue;
      if (current >= target) {
        current = target;
      }
      counter.textContent = current.toLocaleString();
      if (current < target) {
        setTimeout(update, frameDuration);
      }
    };
    update();
  }

  // Initiate the animation for each counter element immediately
  counters.forEach((counter) => {
    animateCounter(counter);
  });
});