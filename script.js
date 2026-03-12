/*
  Simple JavaScript to control the basic photo carousel.
  It:
  - Finds all slide elements
  - Tracks which slide is currently active
  - Moves to the previous or next slide when buttons are clicked
*/

// Grab carousel elements from the page
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Only set up the carousel if the elements exist on the page
if (slides.length > 0 && prevButton && nextButton) {
  // Keep track of which slide is currently shown (starting at the first slide)
  let currentIndex = 0;

  /*
    Helper function that:
    - Hides all slides
    - Shows only the slide at the given index
  */
  function showSlide(index) {
    // Make sure the index always stays within the valid range
    if (index < 0) {
      index = slides.length - 1; // Wrap to last slide if we go too far back
    } else if (index >= slides.length) {
      index = 0; // Wrap to first slide if we go too far forward
    }

    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Show the selected slide
    slides[index].classList.add("active");

    // Update the current index so we remember where we are
    currentIndex = index;
  }

  /*
    Event listeners for the previous and next buttons.
    They simply call showSlide with the new index.
  */
  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  /*
    Optional: automatically advance the carousel every few seconds.
    If you do not want automatic movement, you can delete this block.
  */
  const autoAdvanceDelayMs = 5000; // 5 seconds

  setInterval(() => {
    showSlide(currentIndex + 1);
  }, autoAdvanceDelayMs);
}

/*
  Gentle hover delay for the About dropdown.
  This keeps the menu open briefly as the mouse moves toward Board/Bylaws links.
*/
const dropdownParents = document.querySelectorAll(".nav-item.nav-has-dropdown");

if (dropdownParents.length > 0) {
  dropdownParents.forEach((parent) => {
    const dropdown = parent.querySelector(".nav-dropdown");
    if (!dropdown) return;

    let hideTimeout;

    const showDropdown = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      dropdown.style.display = "flex";
    };

    const scheduleHide = () => {
      hideTimeout = setTimeout(() => {
        dropdown.style.display = "none";
      }, 250); // adjust delay as needed
    };

    parent.addEventListener("mouseenter", showDropdown);
    parent.addEventListener("mouseleave", scheduleHide);
    dropdown.addEventListener("mouseenter", showDropdown);
    dropdown.addEventListener("mouseleave", scheduleHide);
  });
}
