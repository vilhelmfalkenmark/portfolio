/**
 * Created by VilleFalkenmark on 15-11-16.
 */
function ZoomControl(controlDiv, map) {
    controlDiv.style.padding = '5px';
    controlDiv.style.margin = '10px 0 0 10px';

    var controlWrapper = document.createElement('div');
    controlDiv.appendChild(controlWrapper);

    var zoomInButton = document.createElement('div');
    zoomInButton.id = "zoomInButton";
    zoomInButton.innerHTML = '+';
    controlWrapper.appendChild(zoomInButton);

    var zoomOutButton = document.createElement('div');
    zoomOutButton.id = "zoomOutButton";
    zoomOutButton.innerHTML = '-';
    controlWrapper.appendChild(zoomOutButton);

    google.maps.event.addDomListener(zoomInButton, 'click', function() {
        map.setZoom(map.getZoom() + 1);
    });
    google.maps.event.addDomListener(zoomOutButton, 'click', function() {
        map.setZoom(map.getZoom() - 1);
    });
}
//  var deviceWidth = screen.width;
var mapStyleLayout = [{
    "elementType": "labels.text",
    "stylers": [{"visibility": "simplified"}, {"invert_lightness": false}, {"color": "#E5E3E0"}]}
    , {"featureType": "landscape", "stylers": [{"color": "#E5E3E0"}]}
    , {"featureType": "landscape", "elementType": "labels", "stylers": [{"visibility": "off"}]}
    , {"featureType": "road", "stylers": [{"color": "#b1b0b0"}]}
    , {"featureType": "water", "stylers": [{"color": "#414141"}]}
    , {"featureType": "road", "elementType": "labels.text", "stylers": [{"color": "#22313F"}]}
    , {"featureType": "road", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}
    , {"featureType": "poi", "stylers": [{"visibility": "off"}]}
    , {"featureType": "transit", "stylers": [{"visibility": "off"}]}];

var myLatlng = new google.maps.LatLng(59.349063, 18.064843);
var  myMapOption = {
    zoom: 12,
    center: myLatlng,
    disableDefaultUI: true,
    zoomControl: false,
    scrollwheel: false,
    draggable: true,
    styles: mapStyleLayout
};
/* var dragMap = false;
 document.getElementById("map-canvas").addEventListener("click", draggable);
 function draggable()
 {
 dragMap = true;
 return dragMap;
 }*/
function initialize() {

    var mapOptions = myMapOption;

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var image = "images/myMarker.png";
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image,
        animation: google.maps.Animation.BOUNCE
    });
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, map);

    zoomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);
}
google.maps.event.addDomListener(window, 'load', initialize);