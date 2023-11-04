$(() => {
    // Sends a post request to fetch places from api
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: JSON.stringify({}),
        contentType: 'application/json',
        success: data => {
            // Loops through the results
            data.forEach(place => {
                const placeTag = $('<article></article>');

                // Creating content for place
                const titleBox = $('<div class="title_box"></div>');
                titleBox.append(`<h2>${place.name}</h2>`);
                titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);

                const information = $('<div class="information"></div>');
                information.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1? 's' : ''}</div>`);
                information.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
                information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);

                const user = `<div class="user"><b>Owner:</b> ${place.user.first_name} ${place.user.last_name}</div>`;
                const description = `<div class="description">${place.description}</div>`;

                placeTag.append(titleBox);
                placeTag.append(information);
                placeTag.append(user);
                placeTag.append(description);

                // Append the place tag to the section.places
                placeTag.appendTo('section.places');
            });
        }
    });
});