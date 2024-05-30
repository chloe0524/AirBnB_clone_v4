/**
 * @file 3-hbnb.js
 * @author TheWatcher01
 * @date 30-05-2024
 * @description Script that loads places from the API using jQuery and AJAX
 */


$(document).ready(() => {
  const reviewedA = {};

  $('input[type="checkbox"]').change(function () {
    const AId = $(this).data('id');
    const AName = $(this).data('name');

    if ($(this).is(':checked')) {
      reviewedA[AId] = AName;
    } else {
      delete reviewedA[AId];
    }
    $('.amenities h4').text(Object.values(reviewedA).join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success') {
      $('#api_status').toggleClass('available', data.status === 'OK');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    dataType: 'json',
    success: (data) => {
      $('section.places').empty();
      data.forEach((place) => {
        $('section.places').append(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`
        );
      });
    }
  });
});
