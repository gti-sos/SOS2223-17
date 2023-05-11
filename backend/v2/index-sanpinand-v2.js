
const BASE_API_URL = "/api/v2";
const SANTIAGO = "/emergency-call-stats"

import Datastore from 'nedb';

var db = new Datastore();



function loadBackend_sanpinand_v2(app){

    var datosLlamadas = [{
        province: "Almería",
        month: "january",
        phone_call_activation_organization: 3520,
        telematic_activation_organization: 4826,
        emergency_call: 3786,
        year: 2019
    },
    {
        province: "Cádiz",
        month: "january",
        phone_call_activation_organization: 1016,
        telematic_activation_organization: 8605,
        emergency_call: 6009,
        year: 2019
    },
    {
        province: "Córdoba",
        month: "january",
        phone_call_activation_organization: 997,
        telematic_activation_organization: 5174,
        emergency_call: 3965,
        year: 2019
    },
    {
        province: "Granada",
        month: "january",
        phone_call_activation_organization: 4067,
        telematic_activation_organization: 9577,
        emergency_call: 6693,
        year: 2019
    },
    {
        province: "Jaén",
        month: "january",
        phone_call_activation_organization: 2191,
        telematic_activation_organization: 5469,
        emergency_call: 3578,
        year: 2019
    },
    {
        province: "Almería",
        month: "february",
        phone_call_activation_organization: 3171,
        telematic_activation_organization: 4052,
        emergency_call: 3352,
        year: 2019
    },
    {
        province: "Cádiz",
        month: "february",
        phone_call_activation_organization: 848,
        telematic_activation_organization: 7763,
        emergency_call: 5506,
        year: 2019
    },
    {
        province: "Córdoba",
        month: "february",
        phone_call_activation_organization: 988,
        telematic_activation_organization: 4564,
        emergency_call: 3689,
        year: 2019
    },
    {
        province: "Granada",
        month: "february",
        phone_call_activation_organization: 4267,
        telematic_activation_organization: 8416,
        emergency_call: 5967,
        year: 2019
    },
    {
        province: "Huelva",
        month: "february",
        phone_call_activation_organization: 749,
        telematic_activation_organization: 3263,
        emergency_call: 2586,
        year: 2019
    },
    {
        province: "Jaén",
        month: "february",
        phone_call_activation_organization: 2070,
        telematic_activation_organization: 4902,
        emergency_call: 3208,
        year: 2019
    },
    {
        province: "Málaga",
        month: "february",
        phone_call_activation_organization: 1777,
        telematic_activation_organization: 12482,
        emergency_call: 9218,
        year: 2019
    },
    {
        province: "Sevilla",
        month: "february",
        phone_call_activation_organization: 3270,
        telematic_activation_organization: 22247,
        emergency_call: 13529,
        year: 2019
    },
    {
        province: "Almería",
        month: "march",
        phone_call_activation_organization: 3613,
        telematic_activation_organization: 4714,
        emergency_call: 3666,
        year: 2019
    },
    {
        province: "Cádiz",
        month: "march",
        phone_call_activation_organization: 937,
        telematic_activation_organization: 8952,
        emergency_call: 6201,
        year: 2019
    },
    {
        province: "Córdoba",
        month: "march",
        phone_call_activation_organization: 1184,
        telematic_activation_organization: 5121,
        emergency_call: 3859,
        year: 2019
    },
    {
        province: "Granada",
        month: "march",
        phone_call_activation_organization: 4622,
        telematic_activation_organization: 9437,
        emergency_call: 6499,
        year: 2019
    },
    {
        province: "Huelva",
        month: "march",
        phone_call_activation_organization: 840,
        telematic_activation_organization: 3769,
        emergency_call: 2887,
        year: 2019
    },
    {
        province: "Jaén",
        month: "march",
        phone_call_activation_organization: 2181,
        telematic_activation_organization: 5238,
        emergency_call: 3436,
        year: 2019
    },
    {
        province: "Málaga",
        month: "march",
        phone_call_activation_organization: 2274,
        telematic_activation_organization: 15129,
        emergency_call: 10487,
        year: 2019
    },
    {
        province: "Sevilla",
        month: "march",
        phone_call_activation_organization: 3642,
        telematic_activation_organization: 25339,
        emergency_call: 14691,
        year: 2019
    },
    {
      province: "Almería",
      month: "april",
      phone_call_activation_organization: 3549,
      telematic_activation_organization: 4635,
      emergency_call: 3557,
      year: 2019
  },
  {
      province: "Cádiz",
      month: "april",
      phone_call_activation_organization: 1044,
      telematic_activation_organization: 9051,
      emergency_call: 6141,
      year: 2019
  },
  {
      province: "Córdoba",
      month: "april",
      phone_call_activation_organization: 955,
      telematic_activation_organization: 4713,
      emergency_call: 3621,
      year: 2019
  },
  {
      province: "Granada",
      month: "april",
      phone_call_activation_organization: 4625,
      telematic_activation_organization: 9128,
      emergency_call: 6279,
      year: 2019
  },
  {
      province: "Huelva",
      month: "april",
      phone_call_activation_organization: 848,
      telematic_activation_organization: 3467,
      emergency_call: 2725,
      year: 2019
  },
  {
      province: "Jaén",
      month: "april",
      phone_call_activation_organization: 2225,
      telematic_activation_organization: 5195,
      emergency_call: 3417,
      year: 2019
  },
  {
      province: "Málaga",
      month: "april",
      phone_call_activation_organization: 2281,
      telematic_activation_organization: 13795,
      emergency_call: 9980,
      year: 2019
  },
 {
    province: "Almería",
    month: "may",
    phone_call_activation_organization: 3594,
    telematic_activation_organization: 4803,
    emergency_call: 3713,
    year: 2019
},
{
    province: "Cádiz",
    month: "may",
    phone_call_activation_organization: 1166,
    telematic_activation_organization: 10511,
    emergency_call: 7056,
    year: 2019
},
{
    province: "Córdoba",
    month: "may",
    phone_call_activation_organization: 1122,
    telematic_activation_organization: 5551,
    emergency_call: 4186,
    year: 2019
},
{
    province: "Granada",
    month: "may",
    phone_call_activation_organization: 5254,
    telematic_activation_organization: 9476,
    emergency_call: 6680,
    year: 2019
},
{
    province: "Huelva",
    month: "may",
    phone_call_activation_organization: 1092,
    telematic_activation_organization: 4388,
    emergency_call: 3179,
    year: 2019
},
{
    province: "Jaén",
    month: "may",
    phone_call_activation_organization: 2278,
    telematic_activation_organization: 5374,
    emergency_call: 3462,
    year: 2019
},
{
    province: "Málaga",
    month: "may",
    phone_call_activation_organization: 2509,
    telematic_activation_organization: 15864,
    emergency_call: 11028,
    year: 2019
},
{
    province: "Sevilla",
    month: "may",
    phone_call_activation_organization: 4028,
    telematic_activation_organization: 29910,
    emergency_call: 16393,
    year: 2019
},{
  province: "Almería",
  month: "june",
  phone_call_activation_organization: 4416,
  telematic_activation_organization: 5515,
  emergency_call: 4318,
  year: 2019
},
{
  province: "Cádiz",
  month: "june",
  phone_call_activation_organization: 1044,
  telematic_activation_organization: 10461,
  emergency_call: 7060,
  year: 2019
},
{
  province: "Córdoba",
  month: "june",
  phone_call_activation_organization: 1284,
  telematic_activation_organization: 5459,
  emergency_call: 4096,
  year: 2019
},
{
  province: "Granada",
  month: "june",
  phone_call_activation_organization: 5847,
  telematic_activation_organization: 9760,
  emergency_call: 6863,
  year: 2019
},
{
  province: "Huelva",
  month: "june",
  phone_call_activation_organization: 1275,
  telematic_activation_organization: 4781,
  emergency_call: 3631,
  year: 2019
},
{
  province: "Jaén",
  month: "june",
  phone_call_activation_organization: 2592,
  telematic_activation_organization: 5668,
  emergency_call: 3540,
  year: 2019
},
{
  province: "Málaga",
  month: "june",
  phone_call_activation_organization: 2761,
  telematic_activation_organization: 16792,
  emergency_call: 11703,
  year: 2019
},
{
  province: "Sevilla",
  month: "june",
  phone_call_activation_organization: 4479,
  telematic_activation_organization: 28349,
  emergency_call: 15473,
  year: 2019
},{
  province: "Almería",
  month: "july",
  phone_call_activation_organization: 5428,
  telematic_activation_organization: 6710,
  emergency_call: 5157,
  year: 2019
},
{
  province: "Cádiz",
  month: "july",
  phone_call_activation_organization: 1505,
  telematic_activation_organization: 12652,
  emergency_call: 8565,
  year: 2019
},
{
  province: "Córdoba",
  month: "july",
  phone_call_activation_organization: 1326,
  telematic_activation_organization: 5714,
  emergency_call: 4141,
  year: 2019
},
{
  province: "Granada",
  month: "july",
  phone_call_activation_organization: 6660,
  telematic_activation_organization: 10148,
  emergency_call: 7408,
  year: 2019
},
{
  province: "Huelva",
  month: "july",
  phone_call_activation_organization: 1368,
  telematic_activation_organization: 5102,
  emergency_call: 3874,
  year: 2019
},
{
  province: "Jaén",
  month: "july",
  phone_call_activation_organization: 2937,
  telematic_activation_organization: 6598,
  emergency_call: 3979,
  year: 2019
},
{
  province: "Málaga",
  month: "july",
  phone_call_activation_organization: 3665,
  telematic_activation_organization: 19551,
  emergency_call: 13863,
  year: 2019
},
{
  province: "Sevilla",
  month: "july",
  phone_call_activation_organization: 4591,
  telematic_activation_organization: 28077,
  emergency_call: 15537,
  year: 2019
},{
  province: "Almería",
  month: "august",
  phone_call_activation_organization: 5740,
  telematic_activation_organization: 6949,
  emergency_call: 5490,
  year: 2019
},
{
  province: "Cádiz",
  month: "august",
  phone_call_activation_organization: 1552,
  telematic_activation_organization: 13694,
  emergency_call: 9281,
  year: 2019
},
{
  province: "Córdoba",
  month: "august",
  phone_call_activation_organization: 1540,
  telematic_activation_organization: 5838,
  emergency_call: 4296,
  year: 2019
},
{
  province: "Granada",
  month: "august",
  phone_call_activation_organization: 7376,
  telematic_activation_organization: 10837,
  emergency_call: 7814,
  year: 2019
},
{
  province: "Huelva",
  month: "august",
  phone_call_activation_organization: 1469,
  telematic_activation_organization: 5954,
  emergency_call: 4479,
  year: 2019
},
{
  province: "Jaén",
  month: "august",
  phone_call_activation_organization: 3276,
  telematic_activation_organization: 6473,
  emergency_call: 3989,
  year: 2019
},
{
  province: "Málaga",
  month: "august",
  phone_call_activation_organization: 3838,
  telematic_activation_organization: 21035,
  emergency_call: 14923,
  year: 2019
},
{
  province: "Sevilla",
  month: "august",
  phone_call_activation_organization: 4858,
  telematic_activation_organization: 28525,
  emergency_call: 15753,
  year: 2019
},{
  province: "Almería",
  month: "september",
  phone_call_activation_organization: 4988,
  telematic_activation_organization: 5673,
  emergency_call: 4745,
  year: 2019
},
{
  province: "Cádiz",
  month: "september",
  phone_call_activation_organization: 1513,
  telematic_activation_organization: 10301,
  emergency_call: 7135,
  year: 2019
},
{
  province: "Córdoba",
  month: "september",
  phone_call_activation_organization: 1632,
  telematic_activation_organization: 5465,
  emergency_call: 4184,
  year: 2019
},
{
  province: "Granada",
  month: "september",
  phone_call_activation_organization: 7325,
  telematic_activation_organization: 9761,
  emergency_call: 7277,
  year: 2019
},
{
  province: "Huelva",
  month: "september",
  phone_call_activation_organization: 1116,
  telematic_activation_organization: 4142,
  emergency_call: 3177,
  year: 2019
},
{
  province: "Jaén",
  month: "september",
  phone_call_activation_organization: 2799,
  telematic_activation_organization: 5518,
  emergency_call: 3564,
  year: 2019
},
{
  province: "Málaga",
  month: "september",
  phone_call_activation_organization: 3635,
  telematic_activation_organization: 16235,
  emergency_call: 11786,
  year: 2019
},
{
  province: "Sevilla",
  month: "september",
  phone_call_activation_organization: 5522,
  telematic_activation_organization: 28267,
  emergency_call: 15873,
  year: 2019
},{
  province: "Almería",
  month: "october",
  phone_call_activation_organization: 3604,
  telematic_activation_organization: 5262,
  emergency_call: 4186,
  year: 2019
},
{
  province: "Cádiz",
  month: "october",
  phone_call_activation_organization: 899,
  telematic_activation_organization: 9768,
  emergency_call: 6548,
  year: 2019
},
{
  province: "Córdoba",
  month: "october",
  phone_call_activation_organization: 1221,
  telematic_activation_organization: 5578,
  emergency_call: 4177,
  year: 2019
},
{
  province: "Granada",
  month: "october",
  phone_call_activation_organization: 5672,
  telematic_activation_organization: 9438,
  emergency_call: 6769,
  year: 2019
},
{
  province: "Huelva",
  month: "october",
  phone_call_activation_organization: 803,
  telematic_activation_organization: 4106,
  emergency_call: 2916,
  year: 2019
},
{
  province: "Jaén",
  month: "october",
  phone_call_activation_organization: 2368,
  telematic_activation_organization: 6032,
  emergency_call: 3707,
  year: 2019
},
{
  province: "Málaga",
  month: "october",
  phone_call_activation_organization: 2779,
  telematic_activation_organization: 15170,
  emergency_call: 10740,
  year: 2019
},
{
  province: "Sevilla",
  month: "october",
  phone_call_activation_organization: 4414,
  telematic_activation_organization: 29652,
  emergency_call: 16448,
  year: 2019
},{
  province: "Almería",
  month: "november",
  phone_call_activation_organization: 3060,
  telematic_activation_organization: 4942,
  emergency_call: 3881,
  year: 2019
},
{
  province: "Cádiz",
  month: "november",
  phone_call_activation_organization: 903,
  telematic_activation_organization: 9267,
  emergency_call: 6311,
  year: 2019
},
{
  province: "Córdoba",
  month: "november",
  phone_call_activation_organization: 1161,
  telematic_activation_organization: 5326,
  emergency_call: 4088,
  year: 2019
},
{
  province: "Granada",
  month: "november",
  phone_call_activation_organization: 5144,
  telematic_activation_organization: 9216,
  emergency_call: 6516,
  year: 2019
},
{
  province: "Huelva",
  month: "november",
  phone_call_activation_organization: 871,
  telematic_activation_organization: 3866,
  emergency_call: 2927,
  year: 2019
},
{
  province: "Jaén",
  month: "november",
  phone_call_activation_organization: 2461,
  telematic_activation_organization: 5548,
  emergency_call: 3526,
  year: 2019
},
{
  province: "Málaga",
  month: "november",
  phone_call_activation_organization: 2521,
  telematic_activation_organization: 14754,
  emergency_call: 10454,
  year: 2019
},
{
  province: "Sevilla",
  month: "november",
  phone_call_activation_organization: 3920,
  telematic_activation_organization: 27524,
  emergency_call: 15608,
  year: 2019
},{
  province: "Almería",
  month: "december",
  phone_call_activation_organization: 3503,
  telematic_activation_organization: 5362,
  emergency_call: 4248,
  year: 2019
},
{
  province: "Cádiz",
  month: "december",
  phone_call_activation_organization: 997,
  telematic_activation_organization: 11102,
  emergency_call: 7349,
  year: 2019
},
{
  province: "Córdoba",
  month: "december",
  phone_call_activation_organization: 1546,
  telematic_activation_organization: 6367,
  emergency_call: 4728,
  year: 2019
},
{
  province: "Granada",
  month: "december",
  phone_call_activation_organization: 5906,
  telematic_activation_organization: 10249,
  emergency_call: 7181,
  year: 2019
},
{
  province: "Huelva",
  month: "december",
  phone_call_activation_organization: 1055,
  telematic_activation_organization: 4314,
  emergency_call: 3362,
  year: 2019
},
{
  province: "Jaén",
  month: "december",
  phone_call_activation_organization: 3151,
  telematic_activation_organization: 6720,
  emergency_call: 4445,
  year: 2019
},
{
  province: "Málaga",
  month: "december",
  phone_call_activation_organization: 2439,
  telematic_activation_organization: 15419,
  emergency_call: 11029,
  year: 2019
},
{
  province: "Sevilla",
  month: "december",
  phone_call_activation_organization: 5202,
  telematic_activation_organization: 31801,
  emergency_call: 17777,
  year: 2019
}];
    //Añadir los datos al comienzo
    db.insert(datosLlamadas);
   // Redirect a la lista de Postman
    app.get(BASE_API_URL+SANTIAGO+"/docs", (request,response) => {
      response.redirect("https://documenter.getpostman.com/view/25995736/2s93XwxiYr");
  });

  function validateId(request, response, next) {
    const { _id } = request.body;
    if (_id) {
      return response.status(400).json({ error: 'El campo _id no está permitido.' });
    }
    next();
  }
    

    app.get(BASE_API_URL + SANTIAGO + "/loadInitialData", (request, response) => {
        db.count({}, (err, count) => {
          if(err){
            response.sendStatus(500);
         } else if (count === 0) {
                console.log('Base de datos vacia, insertando datos...');
                db.insert(datosLlamadas,(err,datos)=>{
                    console.log("Datos insertados");
                    response.status(200).json(datos.map((e=>{
                        delete e._id;
                        return e;
                    })));
                });  
            }else{
                db.find({},(err,datos)=>{
                    console.log(`Base de datos con ${count} elementos`);
                    response.status(200).json(datos.map((e=>{
                        delete e._id;
                        return e;
                    })));
                });
            }
        })

    });

   //Obtener un dato concreto
    app.get(BASE_API_URL + SANTIAGO + "/:province/:month", (request, response) => {
        console.log("New GET to emergency-call-stats");
        var mes = request.params.month;
        var provincia = request.params.province;
        db.findOne({province: provincia, month : mes }, (err, datos) => {
          if(err){
            console.log(err);
            response.sendStatus(500);
          } else if(!datos) {
            console.log("Datos no encontrado")
            response.sendStatus(404);
          } else {
            console.log(datos);
            delete datos._id;
            response.status(200).json(datos);
          }
        });
    });
      
      //Borrar todos los recursos
      app.delete(BASE_API_URL + SANTIAGO, (request, response) => {
        console.log("New DELETE to emergency-call-stats");
      //seleccionamos todos los recursos de la base de datos con multi:true
        db.remove({}, { multi: true }, (err, numDelete) => {
          if (err) {
            console.log(err);
            response.sendStatus(500);
          } else {
            console.log(`Se han eliminado ${numDelete} elementos `);
            response.sendStatus(200);
          }
        });
      });

      //Borrar datos por provincias
      app.delete(BASE_API_URL + SANTIAGO +"/:value", (request, response) => {
        var valor = request.params.value;
        console.log("New DELETE to emergency-call-stats");
      //Seleccionamos el elemento a eliminar
      var filtros = {
        $or: [
            { year: parseInt(valor) },
            { month: valor },
            { province: valor }
          ]
        };
        db.remove(filtros,{ multi: true }, (err, numDelete) => {
          if (err) {
            console.log(err);
            response.sendStatus(500);
          } else {
            console.log(`Elemenetos eleminados`);
            response.sendStatus(200);
          }
        });
      });

      //Borrar un recurso concreto
      app.delete(BASE_API_URL + SANTIAGO +"/:province/:month", (request, response) => {
        var mes = request.params.month;
        var provincia = request.params.province;
        console.log("New DELETE to emergency-call-stats");
        
        //Seleccionamos el elemento a eliminar
        db.remove({province: provincia, month : mes }, {}, (err, numDelete) => {
          if (err) {
            console.log(err);
            response.sendStatus(500);
          } else if(numDelete == 0) {
            console.log("Elemento no encontrado");
            response.sendStatus(404);
           }else {
            console.log(`Elemeneto eleminado`);
            response.sendStatus(200);
          }
        });
      });

      //PROHIBIDO METODO POST A UN RECURSO CONCRETO
      app.post(BASE_API_URL + SANTIAGO +"/:province/:month", (request, response) => {
        // Enviamos una respuesta con el código de estado 405 Method Not Allowed
        response.sendStatus(405);
      });

      //PROHIBIDO LOS PUT A SOBRE LA LISTA DE RECURSOS
      app.put(BASE_API_URL + SANTIAGO, (request, response) => {
        // Enviamos una respuesta con el código de estado 405 Method Not Allowed
        response.status(405).send('Method Not Allowed');
      });
      app.put(BASE_API_URL + SANTIAGO+"/:var", (request, response) => {
        // Enviamos una respuesta con el código de estado 405 Method Not Allowed
        response.sendStatus(405);
      });

      //Actualizar una entrada concreta
      app.put(BASE_API_URL + SANTIAGO + "/:province/:month",validateId , (request, response) => {
        var mes = request.params.month;
        var provincia = request.params.province;
        var body = request.body;
        var provinciasAndalucia = ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'];
        var meses = ["january", "february", "march", "april", "may", "june",
                               "july", "august", "september", "october", "november", "december"];
        //checkear que esta todos los campos implementados correctamente
        const tam = Object.keys(request.body).length;
        if (tam != 6) {
          response.sendStatus(400);
        }else if (!(mes==body.month) || !(provincia==body.province)) {
          response.sendStatus(400);
        } else if (!body.province ||!provinciasAndalucia.includes(body.province)) {
          response.sendStatus(400);
        }else if (!body.month || !meses.includes(body.month.toLowerCase())) {
          response.sendStatus(400);
        }else if(isNaN(body.phone_call_activation_organization) || body.phone_call_activation_organization < 0) {
          response.sendStatus(400);
        }else if (isNaN(body.telematic_activation_organization) || body.telematic_activation_organization < 0) {
          response.sendStatus(400);
        }else if (isNaN(body.emergency_call) || body.emergency_call < 0) {
          response.sendStatus(400);
        }else if (isNaN(body.year) || body.year < 0) {
          response.sendStatus(400);
        } else {
            //actualizar el recurso especificados
         db.update({province: provincia, month : mes}, body, {}, (err, update) => {
          if (err) {
            console.error(err);
            response.sendStatus(500);
              } else if (update == 0) {
                response.sendStatus(404);
              } else {
                console.log("Campos actualizados")
                response.sendStatus(200);
              }
          });
        }
      });


    app.get(BASE_API_URL + SANTIAGO + "/:value", (request, response) => {
        console.log("New GET to emergency-call-stats");
        var valor = request.params.value;
        const limit = parseInt(request.query.limit) || 10;
        const offset = parseInt(request.query.offset) || 0;

        //Creamos los filtros para cada campo con el valor especificado
        var filtros = {
          $or: [
              { year: parseInt(valor) },
              { month: valor },
              { province: valor }
            ]
          };
        
        db.find(filtros).skip(offset).limit(limit).exec((err, datos) => {
          if(err){
            console.log(err);
            response.sendStatus(500);
          } else if(datos==0){
            console.log("Datos no encontrados");
            response.sendStatus(404);
          }else{
            console.log(datos);
            response.status(200).json(datos.map((e=>{
                delete e._id;
                return e;
            })));
          }
        });
      });
      app.get(BASE_API_URL + SANTIAGO, (request, response) => {
        console.log("New GET to emergency-call-stats");
        const limit = parseInt(request.query.limit) ;
        const offset = parseInt(request.query.offset) || 0;

        var parametros = request.query;//obtenemos la consulta campo1=valor1&campo2=valor2...

        delete parametros.limit;
        delete parametros.offset;

        var claves = Object.keys(parametros); // creamos una variable con todos las claves de cada consulta

        var filtros = {}; // inizializamos el array con el que vamos a filtrar

        claves.forEach(clave =>{
            if (clave === 'from') {
                //creamos el filtro con la clave year y añadimo con el valor el comparador >=
                filtros['year'] = { $gte: parseInt(parametros[clave]) };
            } else if (clave === 'to') {
                if (filtros['year']) {
                //añadimos al objeto ya creado el comparador menor que y el valor a comparar <=
                  filtros['year']['$lte'] = parseInt(parametros[clave]);
            } else {
                //creamos el filtro con la clave year y añadimo con el valor el comparador <=
                  filtros['year'] = { $lte: parseInt(parametros[clave]) };

            } }else if(!isNaN(parametros[clave])){//Si el valor es un numero lo parseamos
                //Añadimos al valor del filtro un comparador >=
                filtros[clave] = {$gte: Number(parametros[clave]) }; 
            }else{
                filtros[clave] = parametros[clave];
            }
        });

        if(filtros['_id']){
          response.status(400).json({ error: 'El campo _id no está permitido.' });
        }else{

        db.find(filtros).skip(offset).limit(limit).exec((err, datos)  => {
          if(err){
            console.log(err);
            response.sendStatus(500);
          }else{
            console.log(datos);
            response.status(200).json(datos.map((e=>{
                delete e._id;
                return e;
            })));
          }
        });
      }
      });
  

   

  
    app.post(BASE_API_URL + SANTIAGO,validateId , (request, response) => {
        console.log("New POST to emergency-call-stats");
      
        var provinciasAndalucia = ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'];
        var meses = ["january", "february", "march", "april", "may", "june",
                               "july", "august", "september", "october", "november", "december"];

        const body = request.body;
        const tam = Object.keys(request.body).length;
       //Comprobar que todos los campos estan presentes y verificar sus valores
       if (tam != 6) {
        response.sendStatus(400);
      }else if (!body.province ||!provinciasAndalucia.includes(body.province)) {
          response.sendStatus(400);
        }else if (!body.month || !meses.includes(body.month.toLowerCase())) {
          response.sendStatus(400);
        }else if(isNaN(body.phone_call_activation_organization) || body.phone_call_activation_organization < 0) {
          response.sendStatus(400);
        }else if (isNaN(body.telematic_activation_organization) || body.telematic_activation_organization < 0) {
          response.sendStatus(400);
        }else if (isNaN(body.emergency_call) || body.emergency_call < 0) {
          response.sendStatus(400);
        }else if (isNaN(body.year) || body.year < 0) {
          response.sendStatus(400);
        } else {
          db.find({province: body.province, month: body.month}, (err, datos) => {
          if (err) {
              console.error(err);
              response.status(500);
          } else if(datos.length > 0) {
                  console.log("El recurso ya existe");
                  response.sendStatus(409); // Codido de estado conflict
          } else {
            db.insert(body, (err, newEntry) => {
              if (err) {
                console.log(err);
                response.sendStatus(500);
              } else {
                console.log(newEntry);
                response.sendStatus(201);//Ok Created
              }
            });
          }
        });
      }
      });
};

export {loadBackend_sanpinand_v2};