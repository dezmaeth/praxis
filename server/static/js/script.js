// Fix This!

window.map;

var _ajaxRequest = function( parameters ) {
    console.assert(parameters, "NO PARAMETERS ON AJAX CALL");
    parameters.method = parameters.method !== undefined ? parameters.method : "GET";
    parameters.async = parameters.async !== undefined ? parameters.async : false;
    
    var request = new XMLHttpRequest;
    request.onreadystatechange=function(){
      if (this.readyState == 4 && this.status == 200 ) {
        parameters.callback(this.responseText);
      }
    }
    request.open(parameters.method, parameters.url, parameters.async);
    request.send();
}


function addMarker(position) {
  var marker = new google.maps.Marker({
    map:map,
    clickable: true,
    icon:'img/icon_wrench.png',
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(position.lat, position.lon)
  });

  var infowindow = new google.maps.InfoWindow({
      content:  '<div id="content"><p><img src="img/pothole.jpg" width="200" /></p><hr /><p>Bache en calle</p></div>',
      maxWidth: 350
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

}

function setListeners() {

  document.getElementById("getMarkersBtn").onclick = getMarkerList;
  window.onresize = function() { 
    google.maps.event.trigger(window.map, 'resize'); 
  };

}

function geoLocated(position) {
  var position = position.coords;
  var latLng =  new google.maps.LatLng(position.latitude, position.longitude);
  var marker = new google.maps.Marker({
      map: window.map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      position:latLng
  });
  window.map.setZoom(18);
  window.map.setCenter(latLng);
}

function getMarkerList() {

  _ajaxRequest({
      url: '/marker/list.json',
      async: true,
      callback: function (data) {
        var markers = JSON.parse(data);
        for (var i in markers) {
          addMarker(markers[i]);
        }
      },
      error: function(err) {
       console.error(err); 
      }
  });

}


function initialize() {
  var _mapCanvas = document.getElementById("map_canvas");

  window.map = new google.maps.Map(_mapCanvas,{
    center: new google.maps.LatLng(0,0),
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(geoLocated); }

  setListeners();
}

initialize();