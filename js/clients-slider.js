document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.clients-slider');
  const wrapper = document.querySelector('.clients-slider-container'); // Changed from .clients-slider-wrapper
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const items = document.querySelectorAll('.client-item');

  if (!slider || !wrapper || items.length === 0) {
    return; // Exit if elements don't exist
  }

  let itemWidth = calcItemWidth();
  let visibleCount = calcVisibleCount();
  let currentIndex = 0;
  let maxIndex = Math.max(0, items.length - visibleCount);

  function calcItemWidth() {
    if (items.length === 0) return 0;
    
    const firstItem = items[0];
    const style = window.getComputedStyle(firstItem);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    
    return firstItem.offsetWidth + marginLeft + marginRight;
  }

  function calcVisibleCount() {
    if (itemWidth === 0) return 1;
    
    const wrapperWidth = wrapper.offsetWidth;
    const possibleCount = Math.floor(wrapperWidth / itemWidth);
    
    return Math.max(1, possibleCount);
  }

  function moveSlider() {
    const translateX = -currentIndex * itemWidth;
    slider.style.transform = `translateX(${translateX}px)`;
    updateButtons();
  }

  function updateButtons() {
    if (prevBtn) {
      prevBtn.classList.toggle('disabled', currentIndex === 0);
    }
    if (nextBtn) {
      nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);
    }
  }

  function changeSlide(direction) {
    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex > maxIndex) return;
    
    currentIndex = newIndex;
    moveSlider();
  }

  function handleResize() {
    itemWidth = calcItemWidth();
    visibleCount = calcVisibleCount();
    maxIndex = Math.max(0, items.length - visibleCount);
    
    // Adjust current index if needed
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    moveSlider();
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => changeSlide(-1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => changeSlide(1));
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  });

  // Initialize
  moveSlider();
});