/**
 * @file 100-hbnb.js
 * @author TheWatcher01
 * @date 30-05-2024
 * @description This module handles user interaction for the HBNB project. It manages
 * the selection of amenities, states, cities, the status of the API, and the retrieval
 * and display of places from the API.
 */

/* global $ */

$(document).ready(() => {
  /**
   * @type {Object.<string, string>}
   * @description Stores the amenities, states and cities that have been checked. The keys
   * are the IDs and the values are the names.
   */
  const reviewedA = {};

  /**
   * @description Event listener for changes on checkbox inputs. When a checkbox is
   * checked, the ID and name are stored in the reviewedA object. When a checkbox is
   * unchecked, the ID and name are removed from the reviewedA object. The text of the h4
   * element in the amenities div is updated to display the names of the checked items.
   */
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

  /**
   * @description GET request to the API to get the status. If the status is 'OK', the
   * 'available' class is added to the #api_status div. If the status is not 'OK', the
   * 'available' class is removed from the #api_status div.
   */
  $.get('http://localhost:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success') {
      $('#api_status').toggleClass('available', data.status === 'OK');
    }
  });

  /**
   * @description POST request to the API to get places. The places are displayed in the
   * places section. Each place is displayed in an article element with the place's name,
   * price per night, maximum number of guests, number of rooms, number of bathrooms, and
   * description.
   */
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

  /**
   * @description Event listener for click events on the button. When the button is clicked,
   * a POST request is made to the API to get places that match the checked amenities,
   * states and cities. The places are displayed in the places section. Each place is
   * displayed in an article element with the place's name, price per night, maximum number
   * of guests, number of rooms, number of bathrooms, and description.
   */
  $('button').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(reviewedA) }),
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
});
