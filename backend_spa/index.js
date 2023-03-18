const SANTIAGO = "/emergency-call-stats"
const BASE_API_URL = "/api/v1";

module.exports = (app) =>{

    var datosLlamadas = [{
        province : "Almería",
        month : "january",
        phone_call_activation_organization : 3520,
        telematic_activation_organization : 4826,
        emergency_call : 3786,
        year : 2019
    },
    {
        province : "Cádiz",
        month : "january",
        phone_call_activation_organization : 1016,
        telematic_activation_organization : 8605,
        emergency_call : 6009,
        year : 2019
    },
    {
        province : "Cordoba",
        month : "january",
        phone_call_activation_organization : 997,
        telematic_activation_organization : 5174,
        emergency_call : 3965,
        year : 2019
    },
    {
        province : "Granada",
        month : "january",
        phone_call_activation_organization : 4067,
        telematic_activation_organization : 9577,
        emergency_call : 6693,
        year : 2019
    },
    {
        province : "Huelva",
        month : "january",
        phone_call_activation_organization : 837,
        telematic_activation_organization : 3555,
        emergency_call : 2830,
        year : 2019
    },
    {
        province : "Jaén",
        month : "january",
        phone_call_activation_organization : 2191,
        telematic_activation_organization : 5469,
        emergency_call : 3578,
        year : 2019
    },
    {
        province : "Málaga",
        month : "january",
        phone_call_activation_organization : 1871,
        telematic_activation_organization : 13735,
        emergency_call : 9897,
        year : 2019
    },
    {
        province : "Sevilla",
        month : "january",
        phone_call_activation_organization : 3203,
        telematic_activation_organization : 24597,
        emergency_call : 14903,
        year : 2019
    },
    {
        province : "Almería",
        month : "february",
        phone_call_activation_organization : 3171,
        telematic_activation_organization : 4052,
        emergency_call : 3352,
        year : 2019
    },
    {
        province : "Cádiz",
        month : "february",
        phone_call_activation_organization : 848,
        telematic_activation_organization : 7763,
        emergency_call : 5506,
        year : 2019
    },
    {
        province : "Cordoba",
        month : "february",
        phone_call_activation_organization : 988,
        telematic_activation_organization : 4564,
        emergency_call : 3689,
        year : 2019
    },
    {
        province : "Granada",
        month : "february",
        phone_call_activation_organization : 4267,
        telematic_activation_organization : 8416,
        emergency_call : 5967,
        year : 2019
    },
    {
        province : "Huelva",
        month : "february",
        phone_call_activation_organization : 749,
        telematic_activation_organization : 3263,
        emergency_call : 2586,
        year : 2019
    },
    {
        province : "Jaén",
        month : "february",
        phone_call_activation_organization : 2070,
        telematic_activation_organization : 4902,
        emergency_call : 3208,
        year : 2019
    },
    {
        province : "Málaga",
        month : "february",
        phone_call_activation_organization : 1777,
        telematic_activation_organization : 12482,
        emergency_call : 9218,
        year : 2019
    },
    {
        province : "Sevilla",
        month : "february",
        phone_call_activation_organization : 3270,
        telematic_activation_organization : 22247,
        emergency_call : 13529,
        year : 2019
    },
    {
        province : "Almería",
        month : "march",
        phone_call_activation_organization : 3613,
        telematic_activation_organization : 4714,
        emergency_call : 3666,
        year : 2019
    },
    {
        province : "Cádiz",
        month : "march",
        phone_call_activation_organization : 937,
        telematic_activation_organization : 8952,
        emergency_call : 6201,
        year : 2019
    },
    {
        province : "Cordoba",
        month : "march",
        phone_call_activation_organization : 1184,
        telematic_activation_organization : 5121,
        emergency_call : 3859,
        year : 2019
    },
    {
        province : "Granada",
        month : "march",
        phone_call_activation_organization : 4622,
        telematic_activation_organization : 9437,
        emergency_call : 6499,
        year : 2019
    },
    {
        province : "Huelva",
        month : "march",
        phone_call_activation_organization : 840,
        telematic_activation_organization : 3769,
        emergency_call : 2887,
        year : 2019
    },
    {
        province : "Jaén",
        month : "march",
        phone_call_activation_organization : 2181,
        telematic_activation_organization : 5238,
        emergency_call : 3436,
        year : 2019
    },
    {
        province : "Málaga",
        month : "march",
        phone_call_activation_organization : 2274,
        telematic_activation_organization : 15129,
        emergency_call : 10487,
        year : 2019
    },
    {
        province : "Sevilla",
        month : "march",
        phone_call_activation_organization : 3642,
        telematic_activation_organization : 25339,
        emergency_call : 14691,
        year : 2019
    }
    
    ];
    dataBase =datosLlamadas;

    app.get("/samples/SPA", (request,response)=>{
        response.send(JSON.stringify(arraySanpinand, null, 2));
    });
    
    app.get(BASE_API_URL+SANTIAGO+"/loadInitialData", (request,response)=>{
        
        if (dataBase.length === 0) {
            for (let i = 0; i < 24; i++) {
              dataBase.push(datosLlamadas[i]);
            }
          }
        response.send(JSON.stringify(dataBase));
    });
    
    app.get(BASE_API_URL+SANTIAGO, (request,response)=>{
        response.send(JSON.stringify(dataBase));
    });
    
    
    app.get(BASE_API_URL+SANTIAGO+"/:province", (request, response) => {
        var province = request.params.province;
    
        response.send(JSON.stringify(dataBase.filter(call => call.province == province)));
      });
      
    app.get(BASE_API_URL+SANTIAGO+"/:province/:month", (request, response) => {
        var province = request.params.province;
        var mes = request.params.month;
        
        const obj = dataBase.find(call => call.province === province && call.month === mes );
    
        response.send(obj);
    });
      
    app.get(BASE_API_URL+SANTIAGO, (request, response) => {
        var year = request.query.year; // obtener el año desde el query string
      
    
        var datosFiltrados = dataBase.filter(call => call.year === year);
      
       response.send(JSON.stringify(datosFiltrados));
    });
      
    app.post(BASE_API_URL+SANTIAGO,(request, response) => {
        var newCall = request.body; // obtener el año desde el query string
      
    
        dataBase.push(newCall);
      
       response.sendStatus(201+"CREATED");
    });
    
    app.put(BASE_API_URL+SANTIAGO+"/:province/:month",(request, response) => {
        var provincia = request.params.province;
        var mes = request.params.month;
        var updatedCall = request.body;
       
        dataBase.update({ province: provincia ,month: mes}, { $set: updatedCall }, (err, response) => {
            if (err){
                console.log(`Error put/emergency-call-stats/${province}/${year}: ${err}`);
                response.sendStatus(500);
            }else{
                console.log('Datos actualizados correctamente');
                response.sendStatus(201);
            }
          });
    
      
       response.sendStatus(201+"CREATED");
    });
    
    
}