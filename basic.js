window.addEventListener('load', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var image = document.querySelector('#image');
    image.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
  });
});
