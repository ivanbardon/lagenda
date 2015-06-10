// Controlador de las vistas a traves de urls: funciones
var Enrutador = Backbone.Router.extend({
    routes:{                                     
        ""                  : "index"
    },
    initialize: function(){
        console.log("Aplicando enrutador");
    },
    index: onInit
 });

// Crear colecciones y actualizar sus datos
function onInit(){
    
    // Crear una coleccion de Actos (vacia)
    var Actes = Backbone.Collection.extend(
    {
        url: "index.php/actes",
        model: Acte,
        findByTipo: function(datos){
            filteredTipo = this.filter(function(item){
                return item.get('tipo').indexOf(datos) != -1;
            });
        return new Actes(filteredTipo);
        },
        findByDia: function(datos){
            filteredDia = this.filter(function(item){
                console.log(datos)
                return item.get('dia').indexOf(datos) != -1;
            });
        return new Actes(filteredDia);
        }
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

    // Actualizar la BD
    actualizaActes();
    actualizaServeis();

};
