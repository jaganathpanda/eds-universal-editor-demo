export default function decorate(block) {
    debugger;
    if (!window.location.href.includes("author-")) {
    // Create a wrapper div for the carousel
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-container');
  
    // Create an inner div for slides
    const carouselSlides = document.createElement('div');
    carouselSlides.classList.add('carousel-slides');
  
    // Get all slides (each div inside the block)
    const slides = [...block.children];
  
    slides.forEach((slide) => {
      const imageDiv = slide.querySelector('picture');
      const textDiv = slide.querySelector('div:last-child');
  
      if (imageDiv && textDiv) {
        // Create a new slide div
        const slideWrapper = document.createElement('div');
        slideWrapper.classList.add('carousel-slide');
  
        // Move image inside slide
        slideWrapper.appendChild(imageDiv);
  
        // Create text overlay div
        const overlay = document.createElement('div');
        overlay.classList.add('carousel-overlay');
        overlay.appendChild(textDiv);
  
        // Append overlay inside slide
        slideWrapper.appendChild(overlay);
  
        // Add slide to carousel
        carouselSlides.appendChild(slideWrapper);
      }
    });
  
    // Add navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-btn', 'prev');
    prevBtn.innerHTML = '&#10094;'; // Left arrow
  
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-btn', 'next');
    nextBtn.innerHTML = '&#10095;'; // Right arrow
  
    // Append elements to the carousel wrapper
    carouselWrapper.appendChild(carouselSlides);
    carouselWrapper.appendChild(prevBtn);
    carouselWrapper.appendChild(nextBtn);
  
    // Replace block content with the new structure
    block.innerHTML = '';
    block.appendChild(carouselWrapper);
  
    // Initialize carousel functionality
    let currentSlide = 0;
    const totalSlides = carouselSlides.children.length;
  
    function showSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1; // Loop back to last slide
      } else if (index >= totalSlides) {
        currentSlide = 0; // Loop back to first slide
      } else {
        currentSlide = index;
      }
      
      // Apply transform for sliding effect
      carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  
    // Button event listeners
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  }
}