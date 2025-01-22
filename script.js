// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseDiv = document.getElementById('response');
    const buttonsContainer = document.querySelector('.buttons');
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const photos = document.querySelectorAll('.photo-gallery img');
    
    let currentPhotoIndex = 0;
    let canDodge = true; // To prevent rapid dodging

    /**
     * Function to handle "YES!" button click
     */
    function respondYes() {
        // Update response message
        responseDiv.textContent = "YAY! 💖 You've made me the happiest person! Let's make beautiful memories together!";

        // Trigger confetti animation
        createConfetti(150);

        // Disable buttons after response
        yesBtn.disabled = true;
        noBtn.disabled = true;
        yesBtn.style.cursor = 'default';
        noBtn.style.cursor = 'default';

        // Accessibility: Announce response
        responseDiv.setAttribute('aria-label', 'Response: YAY! You have accepted the Valentine proposal.');
    }

    /**
     * Function to handle "No" button dodge
     */
    function dodgeButton() {
        if (!canDodge) return;
        canDodge = false;

        // Get container and button dimensions
        const containerRect = buttonsContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate available space with padding
        const padding = 20; // 20px padding
        const maxX = containerRect.width - btnRect.width - padding;
        const maxY = containerRect.height - btnRect.height - padding;

        // Generate random positions within the container
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Apply transformation with boundary checks
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Re-enable dodging after a short delay
        setTimeout(() => {
            canDodge = true;
        }, 700); // 700ms delay
    }

    /**
     * Function to create confetti
     * @param {number} particleCount - Number of confetti pieces
     */
    function createConfetti(particleCount) {
        const colors = ['#FFC700', '#FF0000', '#2E3192', '#41BBC7', '#FF6B00', '#FF6EFF', '#00FF85'];

        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.innerHTML = '🎉';

            // Random position
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${Math.random() * -10}vh`;

            // Random size between 10px and 20px
            const size = Math.random() * 10 + 10;
            confetti.style.fontSize = `${size}px`;

            // Random color
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];

            // Random animation duration between 4s and 7s
            const duration = Math.random() * 3 + 4;
            confetti.style.animationDuration = `${duration}s`;

            // Random rotation
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Append to body
            document.body.appendChild(confetti);

            // Remove confetti after animation
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    /**
     * Function to open the photo modal
     * @param {string} src - Source of the clicked image
     * @param {string} alt - Alt text of the clicked image
     */
    function openModal(src, alt) {
        modal.style.display = 'block';
        modalImg.src = src;
        captionText.textContent = alt;
        modal.setAttribute('aria-hidden', 'false');
    }

    /**
     * Function to close the photo modal
     */
    function closeModalFunction() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    /**
     * Function to navigate photos in the modal
     * @param {number} direction - Direction to navigate (1 for next, -1 for previous)
     */
    function navigatePhotos(direction) {
        currentPhotoIndex += direction;
        if (currentPhotoIndex < 0) currentPhotoIndex = photos.length - 1;
        if (currentPhotoIndex >= photos.length) currentPhotoIndex = 0;
        const selectedPhoto = photos[currentPhotoIndex];
        modalImg.src = selectedPhoto.src;
        captionText.textContent = selectedPhoto.alt;
    }

    /**
     * Function to initialize event listeners for photos
     */
    function initializePhotoGallery() {
        photos.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentPhotoIndex = index;
                openModal(img.src, img.alt);
            });
        });
    }

    /**
     * Function to handle keyboard navigation within the modal
     */
    function handleModalKeyboardNavigation(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                navigatePhotos(1);
            } else if (e.key === 'ArrowLeft') {
                navigatePhotos(-1);
            } else if (e.key === 'Escape') {
                closeModalFunction();
            }
        }
    }

    /**
     * Function to handle modal clicks (outside image)
     */
    function handleModalClick(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    }

    /**
     * Function to handle keyboard activation for "YES!" button
     */
    function handleYesButtonKeyup(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            respondYes();
        }
    }

    /**
     * Function to prevent "No" button from being focused
     */
    function preventNoButtonFocus() {
        noBtn.setAttribute('tabindex', '-1');
        noBtn.setAttribute('aria-hidden', 'true');
    }

    /**
     * Function to initialize modal event listeners
     */
    function initializeModal() {
        // Close modal when 'X' is clicked
        closeModal.addEventListener('click', closeModalFunction);

        // Close modal when clicking outside the image
        window.addEventListener('click', handleModalClick);

        // Navigate photos when 'prev' and 'next' buttons are clicked
        prevBtn.addEventListener('click', () => navigatePhotos(-1));
        nextBtn.addEventListener('click', () => navigatePhotos(1));

        // Keyboard navigation within modal
        document.addEventListener('keydown', handleModalKeyboardNavigation);
    }

    /**
     * Function to initialize all event listeners
     */
    function initializeEventListeners() {
        // "YES!" button click
        yesBtn.addEventListener('click', respondYes);

        // "YES!" button keyboard activation
        yesBtn.addEventListener('keyup', handleYesButtonKeyup);

        // "No" button hover and touch interactions
        noBtn.addEventListener('mouseover', dodgeButton);
        noBtn.addEventListener('touchstart', dodgeButton); // For touch devices

        // Initialize photo gallery and modal
        initializePhotoGallery();
        initializeModal();

        // Prevent "No" button from being focused
        preventNoButtonFocus();
    }

    /**
     * Initialize all functionalities
     */
    initializeEventListeners();
});
