/* global $ */
/* A = amenities */
$(document).ready(() => {
  const reviewedA = {};

  $('input[type="checkbox"]').change(function () {
    const AId = $(this).data('id');
    const AName = $(this).data('name');

    $(this).is(':checked') ? reviewedA[AId] = AName : delete reviewedA[AId];
    $('.amenities h4').text(Object.values(reviewedA).join(', '));
  });
});
