const carousel = document.querySelector('.carousel');
const cards = Array.from(document.querySelectorAll('.card')); //storing all cards in array

let isDragging = false;
let startY = 0;

const updateCardStyles = () => {
    cards.forEach((card, index) => {
        if (index === 0) {
            card.style.transform = "translateY(-150px) scale(0.7)"; //first card is moved up
            card.style.opacity = "0.6";
            card.style.zIndex = "1";
        } else if (index === 1) {
            card.style.transform = "translateY(0) scale(1)"; //second card is moved to center
            card.style.opacity = "1";
            card.style.zIndex = "2";
        } else {
            card.style.transform = "translateY(150px) scale(0.7)"; //third card is moved down
            card.style.opacity = "0.6";
            card.style.zIndex = "1";
        }
    });
};

const reorderCards = () => {
    const movedCard = cards.shift(); // Move the first card to the end of the array
    cards.push(movedCard);
    updateCardStyles();
};

// Dragging logic
const startDrag = (e) => {
    isDragging = true;
    startY = e.clientY || e.touches[0].clientY; //getting the starting y position of the mouse or touch
};

const drag = (e) => {
    if (!isDragging) return;

    const currentY = e.clientY || e.touches[0].clientY;
    const diffY = currentY - startY;

    if (Math.abs(diffY) > 150) {

        reorderCards();// If dragged sufficiently, reorder the cards
        isDragging = false; // Prevent further dragging until the next interaction

    } else {
        // Move the active card vertically
        cards[1].style.transform = `translateY(${diffY}px) scale(1)`;
    }
};

const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    // Snap back to the original position if not dragged enough
    updateCardStyles();
};

cards.forEach(card => {
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('mousemove', drag);
    card.addEventListener('mouseup', endDrag);
    card.addEventListener('mouseleave', endDrag);
    card.addEventListener('touchstart', startDrag);
    card.addEventListener('touchmove', drag);
    card.addEventListener('touchend', endDrag);
});

updateCardStyles();
