var map = null;
var HotelLatLng;
var center = new google.maps.LatLng(-32.87, -68.853);

var my_position;
var markerHotel;

var routes = [];

var Hotel;

$(function() {
    $("#page_map").on("pagebeforeshow", function() {
        var url = $(this).data("absUrl");
        var hotel = url.split("=")[1];
        initialize();
        posicionHotel(hotel);
        //geolocalizacion();
        $(this).on('pageshow', function() {
            google.maps.event.trigger(map, 'resize');
        });
    });
});





function initialize() {
    routes = [];

    var mapOptions = {
        zoom: 12,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
}

function posicionHotel(idhotel) {
    var latitud;
    var longitud;
    $.getJSON("http://hotelserver-54636.sae1.actionbox.io:3000/hotels/" + idhotel, function(item) {

        Hotel = item;
        latitud = Hotel.latitud;
        longitud = Hotel.longitud;
        HotelLatLng = new google.maps.LatLng(latitud, longitud);
        map.center = HotelLatLng;
        var icon = {
            url: 'http://caballerojavier13.site11.com/images/hotel/estrella'+Hotel.estrella+'/hotel_'+Hotel.estrella+'stars.png'
        };
        markerHotel = new google.maps.Marker({
            position: HotelLatLng,
            map: map,
            icon: icon,
            title: 'Hotel'
        });
        listenerMarket();

    });

}

function geolocalizacion() {

    if (navigator.geolocation) {
        function success(pos) {
            my_position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

            markerMyPosition();
        }
        function fail(error) {
            // Failed to find location, show default map
            alert("No se pudo geolocalizar.");
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy: true, timeout: 6000});
    } else {

    }
}
function markerMyPosition() {
    var MyMarker = new google.maps.Marker({
        position: my_position,
        map: map,
        title: 'Mi ubicación'
    });

}
function drawPoliline() {
    var polyline = new google.maps.Polyline({
        map: map,
        path: routes,
        strokeColor: '#0000FF',
        strokeOpacity: 0.7,
        strokeWeight: 2
    });
    polyline.setMap(map);
    routes = [];
}


function steps() {
    var destino = HotelLatLng.lat() + "," + HotelLatLng.lng();
    var origen = my_position.lat() + "," + my_position.lng();
    $.getJSON("http://maps.googleapis.com/maps/api/directions/json?origin=" + origen + "&destination=" + destino + "&sensor=false", function(data) {

        pasos = data.routes[0].legs[0].steps;

        for (x in pasos) {
            if (pasos.length > 1) {
                var lat = pasos[x].start_location.lat;
                var lon = pasos[x].start_location.lng;
                var lat2 = pasos[x].end_location.lat;
                var lon2 = pasos[x].end_location.lng;

                var pointStart = new google.maps.LatLng(lat, lon);
                var pointEnd = new google.maps.LatLng(lat2, lon2);

                routes.push(pointStart);
                routes.push(pointEnd);
            }
        }
        drawPoliline();
    });
}

function listenerMarket() {
    google.maps.event.addListener(markerHotel, 'click', function() {

        // First we create the container for the content of the InfoWindow
        var content = document.createElement('div');
        content.className = 'info_map';

        // We then create a paragraph element that will contain some text
        var p = document.createElement('p');
        p.innerHTML = Hotel.nombre;

        // We then create a second paragraph element that will contain the clickable link
        var p2 = document.createElement('p');

        // Creating the clickable link
        var a = document.createElement('a');
        a.innerHTML = '';
        a.href = '#';

        var img2 = document.createElement('img');

        img2.alt = "";
        img2.src = "css/images/zoom_icon.png";

        var img = document.createElement('img');

        img.alt = "";
        img.src = Hotel.logo;

        // Adding a click event to the link that performs
        // the zoom in, and cancels its default action
        a.onclick = function() {

            // Setting the center of the map to the same as the clicked marker
            map.setCenter(markerHotel.getPosition());

            // Setting the zoom level to 17
            map.setZoom(17);


            map.setMapTypeId(google.maps.MapTypeId.SATELLITE)

            // Canceling the default action
            return false;
        };

        a.appendChild(img2);
        // Appending the link to the second paragraph element
        p2.appendChild(a);

        // Appending the two paragraphs to the content container
        content.appendChild(p);
        content.appendChild(img);
        content.appendChild(p2);

        infoWindow = new google.maps.InfoWindow();

//            // We set the content of the InfoWindow to our content container
        infoWindow.setContent(content);
//
//            // Lastly we open the InfoWindow
        infoWindow.open(map, markerHotel);
    });
}