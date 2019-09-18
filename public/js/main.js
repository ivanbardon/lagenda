// Namespaces
var miRouter;
var actes;
var diasConActos = [];
var serveis;
var previsio;
var noticies;
var condicio;
var guard;
var fecha;
var hoy;
var fotos = {};
var body = $('body,html');
var menuLateral = $('#menu_lateral');

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

$(document).ready(function(){

    // Instancia del router que tambien esta haciendo de controlador en conjunto con index.php
    miRouter = new Enrutador;
    Backbone.history.start();
    calendar();
    headerTransitions();

    $('#datepicker').datepicker({

        dateFormat: "dd/mm/yy",

        onSelect: function (selec, el){
            var actesSelec = actes.findByDia(selec);

            listado.html('<ul><li>'+selec+'</ul>');

            var acteView = new ActeView({el:$('#listado ul'), collection: actesSelec});
            setTimeout(resaltarDias,100);
            body.stop(true,true).animate(
            {
              scrollTop: listado.offset().top
            },300);
        }
    });

    // Vaciar el html de los contenedores y Crear la vista de los actos
    $('#b1').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});
        $('#datepicker').show();

        var actesHoy = actes.findByDia(hoy);

        listado.html('<ul><p>Avui al poble:</p></ul>');
        var acteView = new ActeView({el:$('#listado ul'), collection: actesHoy});
        // Resaltado de los dias a la brava
        resaltarDias();
        body.stop(true,true).animate(
        {
          //realizamos la animacion hacia el ancla
          scrollTop: listado.offset().top
        },300);

    });

    // Vaciar el html de los contenedores y Crear la vista de los servicios
    $('#b2').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});
        listado2.html('<ul></ul>');
        sectionInfo.show();
        var serveiView = new ServeiView({el:$('#listado2 ul'), collection: serveis});
        body.stop(true,true).animate(
        {
          //realizamos la animacion hacia el ancla
          scrollTop: retorn.offset().top
        },300);
    });

    // Vaciar el html de los contenedores y Crear la vista de Noticias
    $('#b3').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});
        var botoNoticiaView = new NoticiaView({el:contenedor, collection: noticies});
        body.stop(true,true).animate(
        {
          //realizamos la animacion hacia el ancla
          scrollTop: listado.offset().top
        },300);
        
    });

    // Vaciar el html de los contenedores y Crear la vista de las fotos
    $('#b4').click(function(){
        limpiarContenedores();
        retorn.toggle('drop', {direction: 'up'});
        if(!fotos.length)feed.run();
        else console.log('vale');
        instafeed.show();
        body.stop(true,true).animate(
        {
          //realizamos la animacion hacia el ancla
          scrollTop: retorn.offset().top
        },300);
    });

    // Capacidad de llamar por telefono desde el panel de farmacia de guardia
    $('#b5').click(function(){
        window.location.href='tel:' + $('#b5').html();
    });

    $('#b7').click(function(){
        window.location.href='social.html';
    });

    // Boton de retorn al menu y limpieza de contenedores
    retorn.click(function(){
        limpiarContenedores();
        botonera.show();
        $('#datepicker').hide();
        body.stop(true,true).animate(
        {
          //realizamos la animacion hacia el ancla
          scrollTop: botonera.offset().top
        },300);

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

    menuLateral.scotchPanel({
        containerSelector: 'body', // As a jQuery Selector
        direction: 'left', // Make it toggle in from the left
        duration: 100, // Speed in ms how fast you want it to be
        transition: 'ease-in', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
        clickSelector: '.toggle-panel', // Enables toggling when clicking elements of this class
        distanceX: '75%', // Size fo the toggle
        enableEscapeKey: true, // Clicking Esc will close the panel
        afterPanelOpen: function(){
            $('header, section, #retorn, #contenedor_principal, #botonera').one('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                menuLateral.close();
            })
        }
    });
});

var headerTransitions = function(){
    // Transiciones del Header
    tempsPortada.click(function(){
        sectionCal.toggle('fade', 'fast', function(){
            sectionMeteo.toggle('drop',{direction:'right'}, 'fast');
            tempsPortada.hide();
            $('.toggle-panel').hide();
            limpiarContenedores();
            $('#datepicker').hide();
        })
    });

    sectionMeteo.click(function(){
        sectionMeteo.toggle('fade', 'fast', function(){
            sectionCal.toggle('drop', 'fast', function(){
                tempsPortada.show();
                $('.toggle-panel').show();
                botonera.show();
                retorn.hide()

            });
        })
    });
};

function limpiarContenedores(){
    listado.html('');
    listado2.html('');
    contenedor.html('');
    instafeed.hide();
    botonera.hide();
    retorn.hide();
    sectionInfo.hide();
};

// Funcion para manejar los datos en JSON que llegan desde yahoo weather
var getWeather = function(data) {
    var weather = data.query.results.channel;
    var item = data.query.results.channel.item;
    var condition = data.query.results.channel.item.condition;
    var forecast = data.query.results.channel.item.forecast;
    forecast.length=3;
    // console.log(condition);
    $('#temp_actual').append('<p>'+ condition.temp +'°</p>');

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

function resaltarDias(){
    $('table a').each(function(){
        if(diasConActos.indexOf(this.text)>=0){
            var a = $(this.parentNode);
            a.addClass('azul')
        }
    })
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
    var fixMes = fecha.getMonth()+1;
    var fixDia = function(){
        if (fecha.getDate()<10){
            return '0'+fecha.getDate();
        }else{
            return fecha.getDate()
        }

    }
    // Arreglos para a mostrar meses y días en Catalán
    var meses = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre" ,"Novembre", "Desembre"];
    var diasSemana = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
    // Inserción de la fecha
    $('#div_dia').html(diasSemana[dia]);
    $('#div_num').html(numero);
    $('#div_mes').html(meses[mes]);



    
    //Arreglo de las fechas para mostrar los actos
    
    if (fixMes<10){
        hoy = fixDia()+'/'+'0'+fixMes+'/'+fecha.getFullYear()
    }else{
        hoy = fixDia()+'/'+fixMes+'/'+fecha.getFullYear()
    }
    

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