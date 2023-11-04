$(document).ready(() => {
  const selectedAmenities = {};

  const checkboxes = $('.amenity_checkbox');

  checkboxes.on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    console.log('Checkbox Change Event Triggered');
    console.log('Amenity ID:', amenityId);
    console.log('Amenity Name:', amenityName);

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
      console.log('Selected Amenities:', selectedAmenities);
    } else {
      delete selectedAmenities[amenityId];
      console.log('Selected Amenities:', selectedAmenities);
    }

    const amenities = Object.values(selectedAmenities).join(', ');
    console.log('Updated Amenities:', amenities);

    $('.amenities h4').text(amenities);
  });

  $().get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});
