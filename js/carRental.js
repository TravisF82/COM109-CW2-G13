
// DriveAway — Available Cars listing page

const FILTER_KEY = "driveaway_last_filter"; // sessionStorage — only for this tab session

// Render car cards
function renderCars(filter) {
    const grid = document.getElementById("carGrid");
    const noResults = document.getElementById("noResults");
    grid.innerHTML = "";

    const filtered = filter === "all" ? CARS : CARS.filter(c => c.category === filter);
    noResults.hidden = filtered.length !== 0;

    filtered.forEach((car, i) => {
        const article = document.createElement("article");
        article.className = "car-card";
        article.style.animationDelay = `${i * 0.05}s`;

        article.innerHTML = `
      <div class="car-card__image">${carSvg(car)}</div>
      <div class="car-card__body">
        <div class="car-card__title-row">
          <h2>${car.name}</h2>
          <span class="badge badge--${car.category}">${car.category}</span>
        </div>
        <div class="car-card__specs">
          <span>👥 ${car.seats} seats</span>
          <span>⚙️ ${car.transmission}</span>
          <span>⛽ ${car.fuel}</span>
          <span>🎨 ${car.colour}</span>
        </div>
        <div class="car-card__footer">
          <p class="car-card__price">£${car.price}<small> / day</small></p>
          <a class="book-btn" href="booking.html?car=${car.id}">Book Now</a>
        </div>
      </div>
    `;
        grid.appendChild(article);
    });
}

// Filter buttons
$(function () {
    const savedFilter = sessionStorage.getItem(FILTER_KEY) || "all";
    $(`.filter-btn[data-filter="${savedFilter}"]`).addClass("active").siblings().removeClass("active");
    renderCars(savedFilter);

    $(".filter-btn").on("click", function () {
        const filter = $(this).data("filter");
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
        sessionStorage.setItem(FILTER_KEY, filter); // remembered only for this browser tab session
        renderCars(filter);
    });
});