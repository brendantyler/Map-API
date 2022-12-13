let locationResponse = document.getElementById("service-response");



const checkLocation = document.getElementById("check-location-btn");



/*----------------------------------Map Box Api---------------------------------------*/
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJlbmRhbmdhbG1hbiIsImEiOiJja3hkaDY3ejMwZDhoMnZwZXByMDV2enQ5In0.hHhzrbbSrPpNQbtmaO2b-g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-51.92528, -14.235004],
  zoom: 5
});

map.addControl(new mapboxgl.NavigationControl());

/* Marker */
const marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([-51.92528, -14.235004]) // Marker [lng, lat] coordinates
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

  mapEaseTo(lng, lat);

  setTimeout(changeServiceText, 4000)
}

function updateMarker(lng, lat){
  marker.setLngLat([lng, lat]);
}

function mapEaseTo(lng, lat){
  map.easeTo({
    center: [lng, lat],
    pitch: 60,
    bearing: -70,
    zoom: 14,
    speed: 0.2,
    curve: 1,
    duration: 4000
  });
}

function changeServiceText(){
  locationResponse.innerHTML = "Yes"
  console.log (`Latitude: ${lat}
  Longitude: ${lng}`)
}

function mapSetPitch(){
  map.setPitch(40, {duration:2000});
}

function mapZoomIn(){
  map.zoomIn({duration: 2000});
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