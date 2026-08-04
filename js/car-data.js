// DriveAway — shared car data

const CARS = [
    { id: "yaris",   name: "Toyota Yaris",    category: "Economy", seats: 5, transmission: "Manual",    fuel: "Petrol",  colour: "Red",    price: 29,  body: "hatch" },
    { id: "golf",    name: "Volkswagen Golf", category: "Compact", seats: 5, transmission: "Automatic", fuel: "Petrol",  colour: "Silver", price: 45,  body: "hatch" },
    { id: "focus",   name: "Ford Focus",      category: "Compact", seats: 5, transmission: "Manual",    fuel: "Diesel",  colour: "Blue",   price: 39,  body: "saloon" },
    { id: "bmw3",    name: "BMW 3 Series",    category: "Premium", seats: 5, transmission: "Automatic", fuel: "Petrol",  colour: "Black",  price: 89,  body: "saloon" },
    { id: "mokka",   name: "Vauxhall Mokka",  category: "SUV",     seats: 5, transmission: "Automatic", fuel: "Electric",colour: "White",  price: 59,  body: "suv" },
    { id: "leaf",    name: "Nissan Leaf",     category: "Electric",seats: 5, transmission: "Automatic", fuel: "Electric",colour: "Blue",   price: 49,  body: "hatch" },
    { id: "cclass",  name: "Mercedes C-Class",category: "Premium", seats: 5, transmission: "Automatic", fuel: "Petrol",  colour: "Grey",   price: 109, body: "saloon" },
    { id: "zoe",     name: "Renault Zoe",     category: "Electric",seats: 5, transmission: "Automatic", fuel: "Electric",colour: "Green",  price: 42,  body: "hatch" },
];

const COLOUR_HEX = {
    Red: "#d64545", Silver: "#b9bfc7", Blue: "#3d5afe", Black: "#2a2e37",
    White: "#eef0f4", Grey: "#8c93a0", Green: "#2e9e63",
};

const CAR_SVGS = {
    hatch: (fill) => `
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <path class="body-panel" fill="${fill}" d="M8 40 Q10 24 26 20 L44 12 Q56 8 70 12 L92 20 Q108 22 112 36 L112 42 Q112 46 108 46 L14 46 Q8 46 8 42 Z"/>
      <path fill="#dff1fb" opacity="0.85" d="M46 16 L68 14 Q78 16 86 22 L54 22 Z"/>
      <circle cx="30" cy="46" r="9" fill="#20242c"/><circle cx="30" cy="46" r="4" fill="#c9cdd4"/>
      <circle cx="92" cy="46" r="9" fill="#20242c"/><circle cx="92" cy="46" r="4" fill="#c9cdd4"/>
    </svg>`,
    saloon: (fill) => `
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <path class="body-panel" fill="${fill}" d="M6 40 Q8 30 20 28 L34 14 Q44 8 60 8 Q76 8 86 14 L100 28 Q114 30 114 40 L114 42 Q114 46 110 46 L10 46 Q6 46 6 42 Z"/>
      <path fill="#dff1fb" opacity="0.85" d="M38 16 L58 12 Q68 12 78 16 L84 27 L36 27 Z"/>
      <circle cx="28" cy="46" r="9" fill="#20242c"/><circle cx="28" cy="46" r="4" fill="#c9cdd4"/>
      <circle cx="92" cy="46" r="9" fill="#20242c"/><circle cx="92" cy="46" r="4" fill="#c9cdd4"/>
    </svg>`,
    suv: (fill) => `
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <path class="body-panel" fill="${fill}" d="M6 38 Q6 24 22 22 L34 10 Q44 6 60 6 Q76 6 88 10 L100 22 Q116 22 116 38 L116 42 Q116 46 112 46 L10 46 Q6 46 6 42 Z"/>
      <path fill="#dff1fb" opacity="0.85" d="M36 14 L56 10 Q68 10 80 14 L86 24 L34 24 Z"/>
      <circle cx="28" cy="46" r="10" fill="#20242c"/><circle cx="28" cy="46" r="4.5" fill="#c9cdd4"/>
      <circle cx="94" cy="46" r="10" fill="#20242c"/><circle cx="94" cy="46" r="4.5" fill="#c9cdd4"/>
    </svg>`,
    sports: (fill) => `
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <path class="body-panel" fill="${fill}" d="M4 42 Q8 30 24 27 L40 14 Q52 9 66 10 L94 16 Q112 20 116 34 L116 40 Q116 45 111 45 L10 45 Q4 45 4 40 Z"/>
      <path fill="#dff1fb" opacity="0.85" d="M44 16 L64 13 Q76 14 88 19 L92 26 L42 26 Z"/>
      <circle cx="26" cy="45" r="8" fill="#20242c"/><circle cx="26" cy="45" r="3.5" fill="#c9cdd4"/>
      <circle cx="96" cy="45" r="8" fill="#20242c"/><circle cx="96" cy="45" r="3.5" fill="#c9cdd4"/>
    </svg>`,
    van: (fill) => `
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <path class="body-panel" fill="${fill}" d="M8 40 Q8 14 26 14 L96 14 Q112 14 112 30 L112 40 Q112 45 108 45 L12 45 Q8 45 8 40 Z"/>
      <path fill="#dff1fb" opacity="0.85" d="M30 18 L54 18 L54 30 L28 30 Z"/>
      <circle cx="28" cy="45" r="9" fill="#20242c"/><circle cx="28" cy="45" r="4" fill="#c9cdd4"/>
      <circle cx="94" cy="45" r="9" fill="#20242c"/><circle cx="94" cy="45" r="4" fill="#c9cdd4"/>
    </svg>`,
};

function carSvg(car) {
    const fill = COLOUR_HEX[car.colour] || "#9aa1ad";
    const draw = CAR_SVGS[car.body] || CAR_SVGS.hatch;
    return draw(fill);
}

function getCarById(id) {
    return CARS.find(c => c.id === id);
}