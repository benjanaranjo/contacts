
//CARGA LA DEPENDENCIA DEL EXPRESS PARA EL MOTOR DEL WEBSERVER 
var express = require('express');
var port = 3000;
var BASE_API_PATH="/api/v1";
var bodyParser = require('body-parser');
console.log("Iniciando Servidor de API");

//LEVANTA EL SERVICIO DEL WEBSERVER
var app = express();
app.use(bodyParser.json());
app.listen(port);
console.log("Servidor Listo");

//CARGA LAS DEPENDENCIAS PARA MANIPULAR LA URL PARA BUSCAR CONTACTOS
//LO ENCONTRE EN INTERNET, PERO IGUAL FUNCIONA SIN ESTO, TAL VEZ TIENE UN USO PARA ALGO MAS AVANZADO
//var url = require('url');
//var querystring = require('querystring');
//app.use(bodyParser.urlencoded({extended:false}));




//CARGAR LA DEPENDENCIA DE NEDB, Y CREACION DE LA BASE DE DATOS
var Datastore = require('nedb');
var database = new Datastore('base.db');
//CARGA LA BASE DE DATOS EN MEMORIA AL LEVANTAR LA APLICACION
database.loadDatabase();

//CARGAR DATOS EN LA BASE DE DATOS COMO PRUEBA PARA QUE NO INICIE VACIA
//se usa la variable con la instancia del Datastore, llamada database
//se usa el metodo insert y se define:
//primer parametro: el arreglo que contiene los datos
//segundo parametro: funcion que va a manejar el exito o fallo en la operacion

//database.insert([
//        {"name":"Erica","phone":"123456"},
//        {"name":"Angel","phone":"789456"}],
//           function(err,newDoc){
//                if (!err) {
//                    console.log("se insertaron los registros por default:");
//                } else {
//                console.log('Error en el insert: ' + err);
//                }
//            }
//        );


//ARREGLO USADO EN CLASE ANTES DE LA CREACION DE LA BASE DE DATOS
var contacts = [];
//{"name":"peter","phone":"123456"},
//{"name":"jhon","phone":"789456"}
//];




app.get("/",(req,res) => {
res.send("<html><body><h1>Mi Servidor Node Express</h1></body></html>")
});


/*METODO DE CONSULTA DE TODA LA BASE DE CONTACTOS, DEFINIDO EN LA RAIZ DE /CONTACTS */
/*METODO DE CONSULTA DE TODA LA BASE DE CONTACTOS, DEFINIDO EN LA RAIZ DE /CONTACTS */
/*METODO DE CONSULTA DE TODA LA BASE DE CONTACTOS, DEFINIDO EN LA RAIZ DE /CONTACTS */

app.get(BASE_API_PATH+"/contacts",(req,res)=> {
console.log(Date()+ "- GET /contacts");
//Respuesta anterior con el arreglo de ejemplo
//res.send(contacts);

//NUEVA RESPUESTA QUE DEVUELVE LA BASE DE DATOS
//EL FIND VA VACIO PARA QUE DEVUELVA TODOS LOS REGISTROS
database.find({}, (err,data)=> {
    res.json(data);
})
//FIN DE RESPUESTA

});
/*FIN DE METODO DE CONSULTA*/
/*FIN DE METODO DE CONSULTA*/
/*FIN DE METODO DE CONSULTA*/
/*FIN DE METODO DE CONSULTA*/



/*METODO DE INSERCION DE UN CONTACTOS, DEFINIDO EN LA RAIZ DE /CONTACTS */
/*METODO DE INSERCION DE UN CONTACTOS, DEFINIDO EN LA RAIZ DE /CONTACTS */
/*METODO DE INSERCION DE UN CONTACTOS, DEFINIDO EN LA RAIZ DE /CONTACTS */
app.post(BASE_API_PATH +"/contacts",(req, res) =>{
console.log(Date()+"-POST /Contacts");
var contact = req.body;
//INSERT DE EJEMPLO CON EL ARREGLO
//contacts.push(contact);

//NUEVO INSERT TRABAJANDO CON BASE DE DATOS
database.insert(contact);
//FIN NUEVO INSERT
res.sendStatus(201);
});
/*FIN DE METODO DE INSERT*/
/*FIN DE METODO DE INSERT*/
/*FIN DE METODO DE INSERT*/



/*METODO DE ELIMINAR TODOS CONTACTOS DEFINIDO EN LA RAIZ DE /CONTACTS*/
/*METODO DE ELIMINAR TODOS CONTACTOS DEFINIDO EN LA RAIZ DE /CONTACTS*/
/*METODO DE ELIMINAR TODOS CONTACTOS DEFINIDO EN LA RAIZ DE /CONTACTS*/

app.delete(BASE_API_PATH +"/contacts",(req, res) =>{
    console.log(Date()+"-DELETE /Contacts");
    database.remove({},{multi:true},(err,numRemoved)=>{
        if(!err){
        console.log('Se han removido: ' + numRemoved + 'contactos')
        res.sendStatus(202);
        }
    });
    
});
/*FIN DE METODO DE DELETE*/
/*FIN DE METODO DE DELETE*/
/*FIN DE METODO DE DELETE*/


/*METODO DE CONSULTA DE UN CONTACTO, DEFINIDO EN LA RAIZ DE /CONTACT */
/*METODO DE CONSULTA DE UN CONTACTO, DEFINIDO EN LA RAIZ DE /CONTACT */
/*METODO DE CONSULTA DE UN CONTACTO, DEFINIDO EN LA RAIZ DE /CONTACT */

app.get(BASE_API_PATH+"/contact",(req,res)=> {
    console.log(Date()+ "- GET /contact " + req.query.name );
    //Respuesta anterior con el arreglo de ejemplo
    //res.send(contacts);
    
    //NUEVA RESPUESTA QUE DEVUELVE LA BASE DE DATOS
    //EL FIND VA VACIO PARA QUE DEVUELVA TODOS LOS REGISTROS
    database.find({'name': req.query.name}, (err,data)=> {
        res.json(data);
    })
    //FIN DE RESPUESTA
    
    });
    /*FIN DE METODO DE ELIMINACION DE UN CONTACTO*/
    /*FIN DE METODO DE ELIMINACION DE UN CONTACTO*/
    /*FIN DE METODO DE ELIMINACION DE UN CONTACTO*/


    app.delete(BASE_API_PATH +"/contact",(req, res) =>{
        console.log(Date()+"-DELETE /Contact " + req.query.name);
        database.remove({'name':req.query.name},{multi:true},(err,numRemoved)=>{
            if(!err){
            console.log('Se han removido: ' + numRemoved + 'contactos, que hacen match con' + req.query.name)
            res.sendStatus(202);
            }
        });
        
    });
    /*FIN DE METODO DE DELETE DE UN CONTACTO*/
    /*FIN DE METODO DE DELETE DE UN CONTACTO*/
    /*FIN DE METODO DE DELETE DE UN CONTACTO*/


    app.put(BASE_API_PATH +"/contact",(req, res) =>{
        console.log(Date()+"-PUT /Contact " + req.query.name);
        console.log(Date()+"-PUT /Contact " + req.body.phone);
        database.update({'name':req.query.name},{$set:{phone:req.body.phone}},{multi:true},(err,numReplaced)=>{
            if(!err){
            console.log('Se han actualizado: ' + numReplaced + ' contactos, que hacen match con' + req.query.name)
            res.sendStatus(202);
            }
        });
        
    });
    /*FIN DE METODO DE DELETE DE UN CONTACTO*/
    /*FIN DE METODO DE DELETE DE UN CONTACTO*/
    /*FIN DE METODO DE DELETE DE UN CONTACTO*/