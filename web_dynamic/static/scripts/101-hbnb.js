$(() => {
    const selectedStates = [];
    const selectedCities = [];

    const updateLocations = () => {
        $('div.Locations h4').text(selectedStates.concat(selectedCities).join(', '));
    };

    // Handles changes in state checkboxes
    $('.state_checkbox').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        if (this.checked) {
            selectedStates.push(name);
        } else {
            selectedStates.splice(selectedStates.indexOf(name), 1);
        }
        updateLocations();
    });

    // Handles changes in city checkboxes
    $('.city_checkbox').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        if (this.checked) {
            selectedCities.push(name);
        } else {
            selectedCities.splice(selectedCities.indexOf(name), 1);
        }
        updateLocations();
    });

    // Handles button click event
    $('button').click(() => {
        const amenitiesList = $('.amenity_checkbox:checked').map(function() {
            return $(this).data('id');
        }).get();

        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            data: JSON.stringify({
                amenities: amenitiesList,
                states: selectedStates,
                cities: selectedCities
            }),
            contentType: 'application/json',
            success: data => {
                // Handles the response data (e.g., update the displayed places)
                data.forEach(place => {
                    const placeTag = $('<article></article>');
                    
                    // Creates content for place
                    const titleBox = $('<div class="title_box"></div>');
                    titleBox.append(`<h2>${place.name}</h2>`);
                    titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
    
                    const information = $('<div class "information"></div>');
                    information.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1? 's' : ''}</div>`);
                    information.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
                    information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);
    
                    const user = `<div class="user"><b>Owner:</b> ${place.user.first_name} ${place.user.last_name}</div>`;
                    const description = `<div class="description">${place.description}</div>`;
    
                    placeTag.append(titleBox);
                    placeTag.append(information);
                    placeTag.append(user);
                    placeTag.append(description);
                    placeTag.appendTo('section.places');
                });
            }
        });
    });

    // Review show/hide functionality
    let reviewsVisible = false;

    // Functions to fetch and display reviews
    const fetchReviews = () => {
        $.ajax({
            type: 'GET',
            url: 'http://0.0.0.0:5001/api/v1/reviews/',
            success: (data) => {
                const reviewsList = $('.reviews');
                reviewsList.empty();

                data.forEach((review) => {
                    const reviewElement = $('<p></p>');
                    reviewElement.text(review.text);
                    reviewsList.append(reviewElement);
                });

                reviewsVisible = true;
            },
        });
    };

    // Functions to hide reviews
    const hideReviews = () => {
        const reviewsList = $('.reviews');
        reviewsList.empty();
        reviewsVisible = false;
    };

    // Handles the click event on the "show" span
    $('span.show-reviews').click(() => {
        if (reviewsVisible) {
            hideReviews();
            $('span.show-reviews').text('show');
        } else {
            fetchReviews();
            $('span.show-reviews').text('hide');
        }
    });
});
