// Select the menu toggle and header panel elements
const menuToggle = document.getElementById("menu_toggle");
const headerPanel = document.getElementById("header_panel");

// Helper function to animate height
function animateHeight(element, startHeight, endHeight, duration, callback) {
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // Progress from 0 to 1
    const currentHeight = startHeight + (endHeight - startHeight) * progress;

    element.style.height = `${currentHeight}px`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(step);
}

// Add click event listener to the menu toggle
menuToggle.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior

  if (headerPanel.style.display === "none" || headerPanel.style.height === "0px") {
    // Show the header panel with animation
    headerPanel.style.display = "block";
    const targetHeight = headerPanel.scrollHeight; // Get full height of content
    animateHeight(headerPanel, 0, targetHeight, 300);
  } else {
    // Hide the header panel with animation
    const currentHeight = headerPanel.offsetHeight; // Current visible height
    animateHeight(headerPanel, currentHeight, 0, 300, () => {
      headerPanel.style.display = "none"; // Hide completely after animation
    });
  }
});

// For the video Played

const video = document.getElementById('myVideo');
const soundButton = document.getElementById('soundButton');

// Show controls only when video is visible
function checkVideoVisibility() {
  const rect = video.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    video.play(); // Autoplay the video muted
  } else {
    video.pause();
  }
}

// Toggle sound on button click
function toggleSound() {
  if (video.muted) {
    video.muted = false;
    soundButton.textContent = '🔊'; // Change icon
  } else {
    video.muted = true;
    soundButton.textContent = '🔇'; // Change icon
  }
}

// Toggle fullscreen mode
function toggleFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { // Firefox
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { // IE/Edge
    video.msRequestFullscreen();
  }
}

window.addEventListener('scroll', checkVideoVisibility);
window.addEventListener('load', checkVideoVisibility);