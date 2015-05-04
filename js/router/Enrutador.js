// Controlador de las vistas a traves de urls: funciones
var Enrutador = Backbone.Router.extend({
    routes:{                                     
        ""                  : "index",
        "actes"             :"mostraActes",
        "serveis"           :"mostraServeis",
        "actes/:id"         : "mostraActe"
    },
    initialize: function(){
        console.log("Aplicando enrutador");
    },
    index: onInit,
    mostraActes: function(){
       
    },
    mostraServeis: function(){

    },
    mostraActe: function(id){
        var item = actes.get(id);
        var acteView = new ActeView({el:$('#contenedor'), model: item});
    }
 });

// Crear colecciones + actualizar sus datos
function onInit(){
    
    // Crear una coleccion de Actos (vacia)
    var Actes = Backbone.Collection.extend(
    {
        url: "index.php/actes",
        model: Acte
    });
    // asignar Namespaces con la instancia de la coleccion
    actes = new Actes([]);

    // Crear una coleccion de Servicios (vacia)
    var Serveis = Backbone.Collection.extend(
    {
        url: "index.php/serveis",
        model: Servei
    });
    // asignar Namespaces con la instancia de la coleccion
    serveis = new Serveis([]);

    // actes.on({"add":onChangeActes, "remove":onChangeActes});

    // Actualiza los datos desde la BD
    actualizaActes();
    actualizaServeis();

}
