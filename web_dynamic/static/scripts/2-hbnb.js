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
});
$(document).ready(() => {
  $.get('http://localhost:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success') {
      $('#api_status').toggleClass('available', data.status === 'OK');
    }
  });
});
