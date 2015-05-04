// Namespaces
var miRouter;
var actes;
var serveis;
var previsio;
var noticies;
var condicio;
var guard;

// caché de los elementos jQuery
var botonera = $('#botonera');
var sectionMeteo = $('#section_meteo');
var listado = $("#listado");
var listado2 = $("#listado2");
var contenedor = $('#contenedor');
var instafeed = $('#instafeed');
var sectionInfo = $('#section_info');
var sectionCal = $('#section_cal');
var botoneraInput = $('#botonera input');
var retorn = $('#retorn');

$(document).ready(function(){

    // Instancia del router que tambien esta haciendo de controlador en conjunto con index.php
    miRouter = new Enrutador;
    Backbone.history.start();
    calendar();




    // Transiciones del Header
    sectionCal.click(function(){
        sectionCal.fadeOut(function(){
            botonera.hide()
            sectionMeteo.fadeIn();
            listado.html('');
            listado2.html('');
            contenedor.html('');
            instafeed.hide();
            sectionInfo.hide()
        })
    });
    // Transiciones del Header
    sectionMeteo.click(function(){
        sectionMeteo.fadeOut(function(){
            botonera.show()
            sectionCal.fadeIn();
            sectionInfo.show()
        })
    });

    // Vaciar el html de los contenedores y Crear la vista de los actos
    $('#b1').click(function(){
        limpiarContenedores()
        listado.html('<ul></ul>');
        instafeed.hide()
        var botoActeView = new BotoActeView({el:$('#listado ul'), collection: actes});
        window.scrollTo(0, 430);
        botoneraInput.hide();
        retorn.show()
    });

    // Vaciar el html de los contenedores y Crear la vista de los servicios
    $('#b2').click(function(){
        limpiarContenedores()
        listado2.html('<ul></ul>');
        instafeed.hide()
        var serveiView = new ServeiView({el:$('#listado2 ul'), collection: serveis});
        window.scrollTo(0, 430);
        botoneraInput.hide();
        retorn.show()
    });

    // Vaciar el html de los contenedores y Crear la vista de Noticias
    $('#b3').click(function(){
        limpiarContenedores()
        instafeed.hide()
        var botoNoticiaView = new NoticiaView({el:contenedor, collection: noticies});
        window.scrollTo(0, 430);
        botoneraInput.hide();
        retorn.show()
        
    });

    // Vaciar el html de los contenedores y Crear la vista de las fotos
    $('#b4').click(function(){
        limpiarContenedores();
        instafeed.show();
        window.scrollTo(0, 430);
        botoneraInput.hide();
        retorn.show()
    });

   // Capacidad de llamar por telefono desde el panel de farmacia de guardia
    sectionInfo.click(function(){
        window.location.href='tel:' + $('#b5').html();
    });

    // Boton de retorno al menu y limpieza de contenedores
    retorn.click(function(){
        botoneraInput.show();
        retorn.hide();
        limpiarContenedores();
        instafeed.hide()
    })

    // Peticion ajax para mostrar la noticias del blog ulldecona.cat
    $.ajax({

        url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22www.ulldecona.cat%2Ffeed%2F%22&format=json&diagnostics=true&callback=getRSSUllde"
    });
    // Peticion ajax a yahoo para mostrar el tiempo
    $.ajax({
        url:"//query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid=776252 and u='c'&format=json&callback=getWeather"
    });
    // Creo una instacia de instafeed para traer fotos de instagram
    var feed = new Instafeed({
        get : 'tagged',
        tagName : 'ulldecona',
        clientId : '8a96efaaef1b4e1796d0a2bc1a37f0c6',
        sortBy : 'most-liked',
        resolution : 'low_resolution',
        template: '<img src="{{image}}" />{{model.user.username}}<div class="icon-cor">{{likes}}</div><br>',
        after : function (){
            // foto es una funcion que devuelve un entero random entre un min y un max para elegir una foto al azar
            var foto = function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            // La variable fotos almacena un array de las fotos que nos llegan y le asigna a section_meteo una foto al azar
            fotos = $('#instafeed img').clone();
            sectionMeteo.prepend(fotos[foto(0,fotos.length+1)])
        }
    });
    feed.run();
});

// Funcion para manejar los datos en JSON que llegan desde yahoo weather
var getWeather = function(data) {
    var weather = data.query.results.channel;
    var item = data.query.results.channel.item;
    var condition = data.query.results.channel.item.condition;
    var forecast = data.query.results.channel.item.forecast;
    forecast.length=3;
    // console.log(condition);
    $('#temp_actual').append('<p>'+ condition.temp +'°'+'</p>');

    // Coleccion y vista para la prevision meteo
    var previsioCollection = Backbone.Collection.extend({
        model: Previsio
    });
    previsio = new previsioCollection(forecast);
    var tempsView = new TempsView({el:$('#div_forecast'), collection:previsio});

    // Coleccion y vista para la condicion meteo
    var condicioCollection = Backbone.Collection.extend({
        model: Condicio
    });
    condicio = new condicioCollection(condition);
    var condicioView = new CondicioView({el:$('#meteo_actual'), collection:condicio});
};
// Funcion para manejar los datos que obtengo del ayumtamiento
var getRSSUllde = function(data){
    var items = data.query.results.body.rss.channel.item;

    var noticiesCollection = Backbone.Collection.extend({
        model: Noticia
    });
    noticies = new noticiesCollection(items);
    
};




// Pedir a la base de datos los actos 
function actualizaActes(){
    actes.fetch({
        success: function(){
            console.log('Base de dades per a els actes actualitzada')
        }
    });
};
// Pedir a la base de datos los servicios y mostrar la farmacia de guardia en la pantalla principal
function actualizaServeis(){
    serveis.fetch({
        success: function(){
            console.log('Base de dades per a els serveis actualitzada');
            $('#guardia_nombre').html(serveis.models[guard].get('nombre'));
            $('#b5').html(serveis.models[guard].get('tlf'));

        }
    });
};
// Comparador del programa + impresion de la fecha
function calendar(){
    // Variables para capturar la fecha del navegador
    var fecha = new Date();
    var numero = fecha.getDate();
    var dia = fecha.getDay();
    var mes = fecha.getMonth();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    // Arreglos para a mostrar meses y días en Catalán
    var meses = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre" ,"Novembre", "Desembre"];
    var diasSemana = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
    // Inserción de la fecha
    $('#div_dia').html(diasSemana[dia]);
    $('#div_num').html(numero);
    $('#div_mes').html(meses[mes]);

    // Condicions per a asignar la farmacia de guardia
    if (numero==6||numero==7||numero==8||numero==9||numero==10||numero==11||numero==12||numero==27||numero==28||numero==29||numero==30){

        // Viladot = 0
        guard = 0

    }else if (numero==13||numero==14||numero==15||numero==16||numero==17||numero==18||numero==19) {

        // Puig = 1
        guard = 1

    }else{

        // Soler = 2
        guard = 2
    }

};

function limpiarContenedores(){
    listado.html('');
    listado2.html('');
    contenedor.html('');
}



