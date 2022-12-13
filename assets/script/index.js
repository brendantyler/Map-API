let locationResponse = document.getElementById("service-response");



const checkLocation = document.getElementById("check-location-btn");



/*----------------------------------Map Box Api---------------------------------------*/
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJlbmRhbmdhbG1hbiIsImEiOiJja3hkaDY3ejMwZDhoMnZwZXByMDV2enQ5In0.hHhzrbbSrPpNQbtmaO2b-g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-97.14111, 49.89953],
  zoom: 5
});

map.addControl(new mapboxgl.NavigationControl());

/* Marker */
const marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([-97.14111, 49.89953]) // Marker [lng, lat] coordinates
  .addTo(map);

checkLocation.addEventListener('click', getUserLocation);

/* Get LongLat & push text */

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    locationResponse.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  updateMarker(lng, lat);
  locationResponse.innerHTML = "Yes"
  console.log (`Latitude: ${lat}
  Longitude: ${lng}`)
}

function updateMarker(lng, lat){
  marker.setLngLat([lng, lat]);
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      locationResponse.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      locationResponse.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      locationResponse.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      locationResponse.innerHTML = "An unknown error occurred."
      break;
  }
}