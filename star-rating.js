function initRating(container) {
    const starsContainer = container.querySelector('.stars');
    if (!starsContainer) return;

    const stars = starsContainer.querySelectorAll('.star');
    const outputDiv = container.querySelector('.output');
    
    function updateStars(rating) {
        stars.forEach((star, index) => {
            const starValue = index + 1;
            if (starValue <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        outputDiv.textContent = `Ваша оценка: ${rating} из 5 звезд`;
        starsContainer.setAttribute('data-rating', rating);
    }

    const savedRating = localStorage.getItem(container.id + '_rating');
    if (savedRating) {
        updateStars(parseInt(savedRating));
    } else {
        updateStars(0);
    }

    stars.forEach((star, index) => {
        const ratingValue = index + 1;
        
        star.addEventListener('click', function(e) {
            e.stopPropagation();
            updateStars(ratingValue);
            localStorage.setItem(container.id + '_rating', ratingValue);
        });
        
        star.addEventListener('mouseenter', function() {
            stars.forEach((s, i) => {
                if (i + 1 <= ratingValue) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    starsContainer.addEventListener('mouseleave', function() {
        const currentRating = parseInt(starsContainer.getAttribute('data-rating')) || 0;
        stars.forEach((star, index) => {
            if (index + 1 <= currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const ratingContainers = document.querySelectorAll('.rating-container');
    ratingContainers.forEach(container => {
        initRating(container);
    });
});