// Namespaces
var actes;
var serveis;
var previsio;
var noticies;
var condicio;
var guard;
var fecha;
var hoy;
var fotos = {};
var menuLateral = $('#menu_lateral');
var urlWeather = "//query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid=776252 and u='c'&format=json";
var urlRSS = "";

// caché de los elementos jQuery
var botonera = $('#botonera');
var sectionMeteo = $('#section_meteo');
var listado = $("#listado");
var listado2 = $("#listado2");
var contenedor = $('#contenedor');
var instafeed = $('#instafeed');
var sectionInfo = $('#section_info');
var sectionCal = $('#section_cal');
var tempsPortada = $('.temps_portada');
var temp_actual = $('#temp_actual');

$(document).ready(function(){

    calendar();

    // var Actes = Backbone.Collection.extend(
    // {
    //     url: "actes.json",
    //     model: Acte,
    //     findByTipo: function(datos){
    //         filteredTipo = this.filter(function(item){
    //             return item.get('tipo').indexOf(datos) != -1;
    //         });
    //     return new Actes(filteredTipo);
    //     },
    //     findByDia: function(datos){
    //         filteredDia = this.filter(function(item){
    //             return item.get('dia').indexOf(datos) != -1;
    //         });
    //     return new Actes(filteredDia);
    //     }
    // });
    // // asignar Namespaces con la instancia de la coleccion
    // actes = new Actes([]);

    // Crear una coleccion de Servicios (vacia)
    // var Serveis = Backbone.Collection.extend(
    // {
    //     url: "serveis.json",
    //     model: Servei
    // });
    // // asignar Namespaces con la instancia de la coleccion
    // serveis = new Serveis([]);

    // Creo una instacia de instafeed para traer fotos de instagram
    var feed = new Instafeed({
        get : 'tagged',
        tagName : 'ulldecona',
        clientId : '8a96efaaef1b4e1796d0a2bc1a37f0c6',
        sortBy : 'most-liked',
        resolution : 'low_resolution',
        template: '<img src="{{image}}" />{{model.user.username}}<div class="icon-cor">{{likes}}</div><br>',
        after : function (){
            // Foto es una funcion que devuelve un entero random entre un min y un max para elegir una foto al azar
            var foto = function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            // La variable fotos almacena un array de las fotos que nos llegan y le asigna a section_meteo una foto al azar
            fotos = $('#instafeed img').clone();
            sectionMeteo.prepend(fotos[foto(0,fotos.length+1)])
        }
    });
    
    // feed.run();

    $.getJSON(urlWeather, function(data) {
        var weather = data.query.results.channel;
        var item = data.query.results.channel.item;
        var condition = data.query.results.channel.item.condition;
        var forecast = data.query.results.channel.item.forecast;
//        console.log(weather);
        temp_actual.append('<p>'+ condition.temp +'°</p>');

        // Coleccion y vista para la prevision meteo
        var previsioCollection = Backbone.Collection.extend({
            model: Previsio
        });
        previsio = new previsioCollection(forecast);
        var previsioView = new PrevisioView({el:$('#div_forecast'), collection:previsio});

        // Coleccion y vista para la condicion meteo
        var condicioCollection = Backbone.Collection.extend({
            model: Condicio
        });
        condicio = new condicioCollection(condition);
        var condicioView = new CondicioView({el:$('#meteo_actual'), collection:condicio});
    });

});

// Funcion para manejar los datos en JSON que llegan desde yahoo weather

// Funcion para manejar los datos que obtengo del ayuntamiento
$.getJSON(urlRSS, function(data){

    var items = data.query.results.body.rss.channel.item;
    var noticiesCollection = Backbone.Collection.extend({
        model: Noticia
    });

    noticies = new noticiesCollection(items);
    
});



// Comparador del programa + impresion de la fecha
function calendar(){
    // Variables para capturar la fecha del navegador
    fecha = new Date();
    var numero = fecha.getDate();
    var dia = fecha.getDay();
    var mes = fecha.getMonth();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var fixMes = fecha.getMonth()+1;

    // Arreglos para a mostrar meses y días en Catalán
    var meses = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre" ,"Novembre", "Desembre"];
    var diasSemana = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
    // Inserción de la fecha
    $('#div_dia').html(diasSemana[dia]);
    $('#div_num').html(numero);
    $('#div_mes').html(meses[mes]);
    

    // Condicions per a asignar la farmacia de guardia
    // Viladot = 0
    // Puig = 1
    // Soler = 2

    if (numero==1||numero==2||numero==3||numero==4||numero==5||numero==6||numero==7||numero==22||numero==23||numero==24||numero==25||numero==26||numero==27||numero==28){

        guard = 2

    }else if (numero==8||numero==9||numero==10||numero==11||numero==12||numero==13||numero==14||numero==24||numero==29||numero==30) {

        
        guard = 0

    }else{

        
        guard = 1
    }

};





