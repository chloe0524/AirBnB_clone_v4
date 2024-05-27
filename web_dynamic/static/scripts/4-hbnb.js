/* global $ */
/* A = amenities */
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

  $('button').click(() => {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(reviewedA) }),
      success: function (data) {
        for (const place of data) {
          const article = $('<article></article>');
          const title = $('<div class="title"></div>');
          title.append('<h2>' + place.name + '</h2>');
          title.append('<div class="price_by_night">' + place.price_by_night + '</div>');
          article.append(title);
          article.append('<div class="information"></div>');
          article.append('<div class="description">' + place.description + '</div>');
          $('.places').append(article);
        }
      }
    });
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', (data, textIN) => {
    if (textIN === 'success') {
      $('#api_status').toggleClass('available', data.status === 'OK');
    }
  });
});
