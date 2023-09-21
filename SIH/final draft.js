
var map;
var userMarker;
var service;
var infowindow;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10,
  });
  navigator.geolocation.getCurrentPosition(showPosition);
  infowindow = new google.maps.InfoWindow();
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.addListener("bounds_changed", function () {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", function () {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
      });
      markers.push(marker);
      marker.addListener("click", function () {
        showInfoWindow(place);
      });
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);

    if (map.getCenter()) {
      performNearbySearch(map.getCenter());
    }
  });
}

function showPosition(position) {
  var userLat = position.coords.latitude;
  var userLng = position.coords.longitude;
  var userLatLng = new google.maps.LatLng(userLat, userLng);
  userMarker = new google.maps.Marker({
    position: userLatLng,
    map: map,
    title: "Your location",
  });
  map.setCenter(userLatLng);
  service = new google.maps.places.PlacesService(map);
  performNearbySearch(userLatLng);
}

function performNearbySearch(location) {
  service.nearbySearch(
    {
      location: location,
      radius: 10000,
      keyword: "e-waste recycling",
    },
    showResults
  );
}

function showResults(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var icon = {
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25),
  };
  var marker = new google.maps.Marker({
    map: map,
    icon: icon,
    title: place.name,
    position: place.geometry.location,
  });
  marker.addListener("click", function () {
    showInfoWindow(place);
  });
  markers.push(marker);
}

function showInfoWindow(place) {
  document.getElementById("place-name").textContent = place.name;
  document.getElementById("place-address").textContent = place.vicinity;
  document.getElementById("place-rating").textContent = place.rating || "N/A";
  infowindow.setContent(place.name);
  infowindow.open(map, this);
}
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAdnsPzGhy7jUu1UgQoVooNYA0E_Yn3OIg&callback=initMap&libraries=places"


function getUserLocation() {
  if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const mapIframe = document.getElementById('map-iframe');
          mapIframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5253491094895!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b5dfc565%3A0xf8df43ebe1103f35!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1630424858994!5m2!1sen!2sin`;
      });
  } else {
      alert('Geolocation is not available in your browser.');
  }
}

let prevScrollPos = window.pageYOffset;
const titleBar = document.querySelector(".title-bar");
let scrollDirection = "down"; 
let sensitivity = 50;

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;

 
  if (currentScrollPos > prevScrollPos) {
      scrollDirection = "down";
  } else {
      scrollDirection = "up";
  }

 
  if (scrollDirection === "up" && prevScrollPos - currentScrollPos >= 3) {
      titleBar.style.top = "0";
  } else {
      titleBar.style.top = "-80px"; 
  }

  prevScrollPos = currentScrollPos;
});
