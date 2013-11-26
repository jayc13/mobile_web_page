var listoHome = 0;
var listoInfo = 0;
var refreshIdHome;
var refreshIdinfo;
/* Funcion que encapsula todo el desarrollo */
/* Esta es una función  USANDO EL PATRON MODULO */

$(function() {
    /* Variable Glogal con el nombre del proyecto. Metodo de Proyeccion */
    /* Variable Glogal LA USO PARA QUE NO TENGAMOS NUESTRO PROPIO NAME SPACE Y NO HALLA COLISIONES DE NOMBRES */
    var hoteles = {};
    /* funcion .app, dentro de esta van las funciones autoejecutables */
    (function(app) {
        app.init = function() {

            app.bindings(); // funcion donde se colocan las llamadas para el desarrollo
            app.crearListadoHoteles();

        };
        // Dentro de la funcion Bindings van las llamadas a las funciones del desarrollo integro
        app.bindings = function() {
            $("#info_hotel").on("pagebeforeshow", function() {
                var url = $(this).data("absUrl");
                var hotel = url.split("=")[1];
                app.crearInfoHotel(hotel);
            });
        };
        /******************************** Desarrollo de Funciones */

        app.crearInfoHotel = function(idHotel) {

            $.getJSON("http://hotelserver-54636.sae1.actionbox.io:3000/hotels/" + idHotel, function(item) {
                $('#info_hotel_titulo').html(item.nombre);
                $('#info_hotel_imagen').attr({
                    src: item.imagen,
                    onload: "img_ok()"
                });
                $('#info_hotel_descripcion').html(item.descripcion);
                $('#show_map').attr({
                    href: "#page_map?id=" + item["_id"]
                });
                listoInfo++;
                if (listoInfo > 1) {
                    readyInfo();
                }
            });
        };
        app.crearListadoHoteles = function() {
            var contenidoLista = '';
            $.getJSON("http://hotelserver-54636.sae1.actionbox.io:3000/hotels/estrella/5", function(data) {
                if (isArray(data)) {
                    $.each(data, function(index, item) {
                        contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + item["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + item.nombre + '</span></span></a>';
                    });
                } else {
                    contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + data["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + data.nombre + '</span></span></a>';
                }
                acomodar(5, contenidoLista);
                contenidoLista = '';
                listoHome++;
            });
            $.getJSON("http://hotelserver-54636.sae1.actionbox.io:3000/hotels/estrella/4", function(data) {
                if (isArray(data)) {
                    $.each(data, function(index, item) {
                        contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + item["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + item.nombre + '</span></span></a>';
                    });
                } else {
                    contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + data["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + data.nombre + '</span></span></a>';
                }
                acomodar(4, contenidoLista);
                contenidoLista = '';
                listoHome++;
            });
            $.getJSON("http://hotelserver-54636.sae1.actionbox.io:3000/hotels/estrella/3", function(data) {
                if (isArray(data)) {
                    $.each(data, function(index, item) {
                        contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + item["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + item.nombre + '</span></span></a>';
                    });
                } else {
                    contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + data["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + data.nombre + '</span></span></a>';
                }
                acomodar(3, contenidoLista);
                contenidoLista = '';
                listoHome++;
            });
            $.getJSON("http://hotelserver-54636.sae1.actionbox.io:3000/hotels/estrella/2", function(data) {
                if (isArray(data)) {
                    $.each(data, function(index, item) {
                        contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + item["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + item.nombre + '</span></span></a>';
                    });
                } else {
                    contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + data["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + data.nombre + '</span></span></a>';
                }
                acomodar(2, contenidoLista);
                contenidoLista = '';
                listoHome++;
            });
            $.getJSON("http://hotelserver-54636.sae1.actionbox.io:3000/hotels/estrella/1", function(data) {
                if (isArray(data)) {
                    $.each(data, function(index, item) {
                        contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + item["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + item.nombre + '</span></span></a>';
                    });
                } else {
                    contenidoLista += '<a data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c boton-listado" href="#info_hotel?id=' + data["_id"] + '" data-transition="slide" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> <span class="ui-btn-inner ui-btn-corner-all ui-corner-bottom"> <span class="ui-btn-text">' + data.nombre + '</span></span></a>';
                }
                acomodar(1, contenidoLista);
                listoHome++;
            });
            if (listoHome > 6) {
                ready();
            }
        };
        app.init();
        //LOS DOBLES PARENTISIS ARRANCA LA EJECUCION DE  LA FUNCIÓN AUTOEJECUTABLE, Y PASO COMO PARAMETRO LA VARIABLE 
    })(hoteles);
});


function isArray(object) {
    return object != null && typeof object === "object" &&
            'splice' in object && 'join' in object;
}

function acomodar(estrella, contenidoLista) {
    switch (estrella) {
        case 5:
            $("#contenido_5e").html(contenidoLista);
            break;
        case 4:
            $("#contenido_4e").html(contenidoLista);
            break;
        case 3:
            $("#contenido_3e").html(contenidoLista);
            break;
        case 2:
            $("#contenido_2e").html(contenidoLista);
            break;
        case 1:
            $("#contenido_1e").html(contenidoLista);
    }
}
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
function cargaHome() {
    listoHome++;
}
function readyHome() {
    if (listoHome > 5) {
        $("#page_home div").each(function() {
            $(this).show("size", 2000, 500);
        });
        $("#text_loaderHome").hide("size", 1000);
        $("#img_loaderHome").hide("size", 1000);
        clearInterval(refreshIdHome);
        listoHome = 0;
    }

}
$(function() {
    refreshIdHome = setInterval(readyHome, 500);
});

function readyInfo() {
    if (listoInfo > 2) {
        $("#info_hotel div").each(function() {
            $(this).show("size", 2000, 500);
        });
        $("#text_loaderInfo").hide("size", 1000);
        $("#img_loaderInfo").hide("size", 1000);
        clearInterval(refreshIdInfo);
        listoInfo = 0;
    }
}
$(function() {
    $("#info_hotel").on("pageshow", function() {
        listoInfo++;
        refreshIdInfo = setInterval(readyInfo, 500);
    });
});

function img_ok() {
    listoInfo++;
    readyInfo();
}