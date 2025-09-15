// Clients Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.clients-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const slideWidth = slider.querySelector('.client-item').offsetWidth + 30; // width + margin
    const visibleSlides = Math.floor(slider.parentElement.offsetWidth / slideWidth);
    const totalSlides = slider.querySelectorAll('.client-item').length;
    let currentPosition = 0;
    
    // Initialize slider position
    updateSliderPosition();
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentPosition > 0) {
            currentPosition--;
            updateSliderPosition();
        }
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentPosition < totalSlides - visibleSlides) {
            currentPosition++;
            updateSliderPosition();
        }
    });
    
    // Update slider position
    function updateSliderPosition() {
        slider.style.transform = `translateX(${currentPosition * -slideWidth}px)`;
        
        // Update button states
        prevBtn.classList.toggle('disabled', currentPosition === 0);
        nextBtn.classList.toggle('disabled', currentPosition >= totalSlides - visibleSlides);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newVisibleSlides = Math.floor(slider.parentElement.offsetWidth / slideWidth);
        if (newVisibleSlides !== visibleSlides && currentPosition > totalSlides - newVisibleSlides) {
            currentPosition = Math.max(0, totalSlides - newVisibleSlides);
            updateSliderPosition();
        }
    });
});
