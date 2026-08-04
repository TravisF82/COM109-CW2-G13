// Reuses car IDs already defined in js/car-data.js
const POPULAR_PICKS = [
    { carId: "golf", badge: "Most Popular", badgeClass: "badge--popular" },
    { carId: "bmw3", badge: "Top Pick", badgeClass: "badge--top" },
    { carId: "leaf", badge: "Eco Choice", badgeClass: "badge--eco" },
];

const REVIEWS = [
    { stars: 5, quote: "Absolutely seamless from start to finish. The Golf was spotless and the pickup was effortless. Will 100% use DriveAway again for our next trip.", name: "Sarah M.", location: "Belfast" },
    { stars: 5, quote: "Booked the BMW for a weekend away and it was perfect. Pricing was transparent, no hidden charges. Brilliant service all round.", name: "James T.", location: "Derry" },
    { stars: 4, quote: "Really impressed with the electric car option. The Nissan Leaf was great for the city and the booking process took minutes. Highly recommend.", name: "Laura K.", location: "Belfast" },
];

// Render star rating
function starString(count) {
    return "★".repeat(count) + "☆".repeat(5 - count);
}

// Render Popular Picks from shared car data
function renderPicks() {
    const grid = document.getElementById("picksGrid");
    grid.innerHTML = "";

    POPULAR_PICKS.forEach((pick, i) => {
        const car = getCarById(pick.carId);
        if (!car) return;

        const article = document.createElement("article");
        article.className = "pick-card reveal";
        article.style.transitionDelay = `${i * 0.1}s`;

        article.innerHTML = `
      <div class="pick-card__image">
        <span class="badge ${pick.badgeClass}">${pick.badge}</span>
        ${carSvg(car)}
      </div>
      <div class="pick-card__body">
        <div class="pick-card__title-row">
          <h3>${car.name}</h3>
          <span class="badge badge--${car.category}">${car.category}</span>
        </div>
        <div class="pick-card__specs">
          <span>👥 ${car.seats} seats</span>
          <span>⚙️ ${car.transmission}</span>
          <span>⛽ ${car.fuel}</span>
          <span>🎨 ${car.colour}</span>
        </div>
        <div class="pick-card__footer">
          <p class="pick-card__price">£${car.price}<small> / day</small></p>
          <a class="btn btn--primary btn--small" href="./pages/carRental.html">Book Now</a>
        </div>
      </div>
    `;
        grid.appendChild(article);
    });
}

// Render Reviews
function renderReviews() {
    const grid = document.getElementById("reviewsGrid");
    grid.innerHTML = "";

    REVIEWS.forEach((review, i) => {
        const article = document.createElement("article");
        article.className = "review-card reveal";
        article.style.transitionDelay = `${i * 0.1}s`;

        article.innerHTML = `
      <p class="review-stars" aria-label="${review.stars} out of 5 stars">${starString(review.stars)}</p>
      <p class="review-quote">"${review.quote}"</p>
      <div class="review-author">
        <span class="review-avatar">${review.name.charAt(0)}</span>
        <div>
          <p class="review-name">${review.name}</p>
          <p class="review-location">${review.location}</p>
        </div>
      </div>
    `;
        grid.appendChild(article);
    });
}

function setupScrollReveal() {
    const targets = document.querySelectorAll(".reveal, .trust-item");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    targets.forEach((el) => observer.observe(el));
}

$(function () {
    renderPicks();
    renderReviews();
    setupScrollReveal();
});