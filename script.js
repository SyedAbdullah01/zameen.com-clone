// Hardcoded property data (used for Featured Properties)
const properties = [
    {
        id: 1,
        title: "Luxury Villa in DHA Phase 6",
        price: 55000000,
        priceString: "PKR 5.5 Crore",
        location: "Lahore, DHA Phase 6",
        type: "house",
        image: "assets/images/1.webp",
        bedrooms: 5,
        area: 5400,
        category: "Homes",
        subtype: "10 Marla Houses",
        areaSize: "10 Marla"
    },
    {
        id: 2,
        title: "2 Bed Apartment in Gulberg",
        price: 12000000,
        priceString: "PKR 1.2 Crore",
        location: "Lahore, Gulberg",
        type: "apartment",
        image: "assets/images/2.webp",
        bedrooms: 2,
        area: 1200,
        category: "Homes",
        subtype: "Small Houses",
        areaSize: "3 Marla"
    },
    {
        id: 3,
        title: "Residential Plot in Bahria Town",
        price: 8000000,
        priceString: "PKR 80 Lakh",
        location: "Karachi, Bahria Town",
        type: "plot",
        image: "assets/images/3.webp",
        bedrooms: 0,
        area: 2700,
        category: "Plots",
        subtype: "10 Marla Plots",
        areaSize: "10 Marla"
    },
    {
        id: 4,
        title: "Small Office in Clifton",
        price: 15000000,
        priceString: "PKR 1.5 Crore",
        location: "Karachi, Clifton",
        type: "commercial",
        image: "assets/images/4.webp",
        bedrooms: 0,
        area: 800,
        category: "Commercial",
        subtype: "Small Offices",
        areaSize: "Small"
    },
    {
        id: 5,
        title: "5 Marla House in Johar Town",
        price: 25000000,
        priceString: "PKR 2.5 Crore",
        location: "Lahore, Johar Town",
        type: "house",
        image: "assets/images/5.webp",
        bedrooms: 3,
        area: 1350,
        category: "Homes",
        subtype: "5 Marla Houses",
        areaSize: "5 Marla"
    },
    {
        id: 6,
        title: "Plot on Installments in DHA",
        price: 6000000,
        priceString: "PKR 60 Lakh",
        location: "Karachi, DHA",
        type: "plot",
        image: "assets/images/6.webp",
        bedrooms: 0,
        area: 1350,
        category: "Plots",
        subtype: "On Installments",
        areaSize: "5 Marla"
    }
];

// Render properties dynamically
function renderProperties(filteredProperties) {
    const propertyList = document.getElementById('property-list');
    propertyList.innerHTML = '';

    filteredProperties.forEach(property => {
        const card = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card property-card">
                    <img src="${property.image}" class="card-img-top" alt="${property.title}">
                    <div class="card-body">
                        <h5 class="card-title">${property.title}</h5>
                        <p class="card-text"><strong>Price:</strong> ${property.priceString}</p>
                        <p class="card-text"><strong>Location:</strong> ${property.location}</p>
                        <p class="card-text"><strong>Bedrooms:</strong> ${property.bedrooms || 'N/A'}</p>
                        <p class="card-text"><strong>Area:</strong> ${property.area} Sq. Ft.</p>
                        <a href="#" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `;
        propertyList.innerHTML += card;
    });
}

// Search functionality for Buy and Rent forms
function setupSearchForm(formId, purpose) {
    document.getElementById(formId).addEventListener('submit', function (e) {
        e.preventDefault();
        const propertyType = document.getElementById(`property-type-${purpose}`).value;
        const location = document.getElementById(`location-${purpose}`).value.toLowerCase();
        const minPrice = parseFloat(document.getElementById(`min-price-${purpose}`).value) || 0;
        const maxPrice = parseFloat(document.getElementById(`max-price-${purpose}`).value) || Infinity;
        const bedrooms = document.getElementById(`bedrooms-${purpose}`).value;
        const area = parseFloat(document.getElementById(`area-${purpose}`).value) || 0;

        const filteredProperties = properties.filter(property => {
            const matchesPurpose = purpose === 'buy' ? true : property.type !== 'plot';
            const matchesType = propertyType === 'all' || property.type === propertyType;
            const matchesLocation = location === '' || property.location.toLowerCase().includes(location);
            const matchesPrice = property.price >= minPrice && property.price <= maxPrice;
            const matchesBedrooms = bedrooms === 'any' ||
                (bedrooms === '5+' && property.bedrooms >= 5) ||
                property.bedrooms === parseInt(bedrooms);
            const matchesArea = area === 0 || property.area >= area;

            return matchesPurpose && matchesType && matchesLocation && matchesPrice && matchesBedrooms && matchesArea;
        });

        renderProperties(filteredProperties);
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', function () {
    renderProperties(properties);

    // Set up both search forms
    setupSearchForm('search-form-buy', 'buy');
    setupSearchForm('search-form-rent', 'rent');
});