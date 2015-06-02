// Namespaces
var miRouter;
var actes;
var serveis;
var previsio;
var noticies;
var condicio;
var guard;
var fecha;
var hoy;
var fotos = {};

// caché de los elementos jQuery
var botonera = $('#botonera');
var sectionMeteo = $('#section_meteo');
var listado = $("#listado");
var listado2 = $("#listado2");
var contenedor = $('#contenedor');
var instafeed = $('#instafeed');
var sectionInfo = $('#section_info');
var sectionCal = $('#section_cal');
var retorn = $('#retorn');
var tempsPortada = $('.temps_portada');
var iconoInfo = $('.icon-info');

$(document).ready(function(){

    // Instancia del router que tambien esta haciendo de controlador en conjunto con index.php
    miRouter = new Enrutador;
    Backbone.history.start();
    calendar();
    hoy = fecha.toLocaleDateString();

    $('#datepicker').datepicker({
        dateFormat: "d/m/yy",
        firstDay: 1,
        autoSize: true,

        onSelect: function (selec){
            var actesSelec = actes.findByDia(selec);
            limpiarContenedores();
            retorn.toggle('drop', {direction: 'up'});
            listado.html('<ul></ul>');
            $('#datepicker').show();

            var botoActeView = new BotoActeView({el:$('#listado ul'), collection: actesSelec});
            window.scrollTo(0, 700);
        }
    });

    

    // Transiciones del Header
    tempsPortada.click(function(){
        sectionCal.toggle('fade', 'fast', function(){
            sectionMeteo.toggle('drop',{direction:'right'}, 'fast');
            limpiarContenedores();
        })
    });

    // Transiciones del Header
    iconoInfo.click(function(){
        // $('#section_menu2').toggle('drop', 'fast');
    });

    // Transiciones del Header
    sectionMeteo.click(function(){
        sectionMeteo.toggle('fade', 'fast', function(){
            sectionCal.toggle('drop', 'fast', function(){
                botonera.show()
            });
        })
    });

    // Vaciar el html de los contenedores y Crear la vista de los actos
    $('#b1').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});

        var actesHoy = actes.findByDia(hoy);

        listado.html('<ul><p>Avui al poble:</p></ul>'+hoy);
        var botoActeView = new BotoActeView({el:$('#listado ul'), collection: actesHoy});
        window.scrollTo(0, 430);
    });

    // Vaciar el html de los contenedores y Crear la vista de los servicios
    $('#b2').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});
        listado2.html('<ul></ul>');
        sectionInfo.show();
        sectionInfo.appendTo('#listado2');
        var serveiView = new ServeiView({el:$('#listado2 ul'), collection: serveis});
        window.scrollTo(0, 430);
    });

    // Vaciar el html de los contenedores y Crear la vista de Noticias
    $('#b3').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});
        var botoNoticiaView = new NoticiaView({el:contenedor, collection: noticies});
        window.scrollTo(0, 430);
        
    });

    // Vaciar el html de los contenedores y Crear la vista de las fotos
    $('#b4').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});
        if(!fotos.length)feed.run();
        else console.log('vale');
        instafeed.show();
        window.scrollTo(0, 430);
    });

    // Capacidad de llamar por telefono desde el panel de farmacia de guardia
    $('#b5').click(function(){
        window.location.href='tel:' + $('#b5').html();
    });

    $('#b7').click(function(){
        window.location.href='social.html';
    });

    // Boton de retorno al menu y limpieza de contenedores
    retorn.click(function(){
        limpiarContenedores();
        botonera.show();
        
    });

    //Peticion ajax para mostrar la noticias del blog ulldecona.cat
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
            // Foto es una funcion que devuelve un entero random entre un min y un max para elegir una foto al azar
            var foto = function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            // La variable fotos almacena un array de las fotos que nos llegan y le asigna a section_meteo una foto al azar
            fotos = $('#instafeed img').clone();
            sectionMeteo.prepend(fotos[foto(0,fotos.length+1)])
        }
    });
});

function limpiarContenedores(){
    listado.html('');
    listado2.html('');
    contenedor.html('');
    instafeed.hide();
    botonera.hide();
    sectionInfo.hide();
    retorn.hide();
    $('#datepicker').hide();

};

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
    var previsioView = new PrevisioView({el:$('#div_forecast'), collection:previsio});

    // Coleccion y vista para la condicion meteo
    var condicioCollection = Backbone.Collection.extend({
        model: Condicio
    });
    condicio = new condicioCollection(condition);
    var condicioView = new CondicioView({el:$('#meteo_actual'), collection:condicio});
};
// Funcion para manejar los datos que obtengo del ayuntamiento
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
            console.log('Base de dades per a els actes actualitzada');
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
    fecha = new Date();
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
    // Viladot = 0
    // Puig = 1
    // Soler = 2

    if (numero==1||numero==4||numero==5||numero==6||numero==7||numero==8||numero==9||numero==10||numero==26||numero==27||numero==28||numero==29||numero==30||numero==31){

        guard = 1

    }else if (numero==2||numero==3||numero==16||numero==17||numero==18||numero==19||numero==20||numero==21||numero==22||numero==23||numero==24) {

        
        guard = 0

    }else{

        
        guard = 2
    }

};





