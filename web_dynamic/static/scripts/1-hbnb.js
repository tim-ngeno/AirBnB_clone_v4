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
});
