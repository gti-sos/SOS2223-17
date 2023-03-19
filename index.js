const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
var Datastore = require('nedb');

var db = new Datastore();

const app = express(); //constructor
const BASE_API_URL = "/api/v1";

app.use(bodyParser.json());
var backend_spa = require("./backend_spa");




const port = process.env.PORT || 8080;


const jose = require("./index-josgaroro1");

const salim = require("./andalusian-bicycles-plans");

const API_DOC_PORTAL_salim = "https://documenter.getpostman.com/view/25746364/2s93JxsMEP"

//backend_spa////

backend_spa(app);

//código caras /////////////////////////////////////////////////////////////
app.get("/cool", (req,res)=>{
    res.send(JSON.stringify(cool(), null, 2));
});

//codigo salim /////////////////////////////////////////////////////////////







app.get("/samples/SCC", (req, res)=>{
    res.send(JSON.stringify(arraySalcha2, null, 2));
});

app.get(BASE_API_URL+"/andalusian-bicycle-plans/docs", (req,res)=>{
    res.redirect(API_DOC_PORTAL_salim);
});

app.get(BASE_API_URL + "/andalusian-bicycle-plans/loadInitialData", (req, res) => {
  if (salim.datosSLC.length==0){
    salim.datosSLC = salim.datosAux;
    res.json(salim.datosSLC)
    console.log("Se han creado los datos")

} else {
  res.send('Ya existen datos');
    console.log('Ya existen datos')
}
});
  

// app.get(BASE_API_URL + "/andalusian-bicycle-plans", (req, res)=>{
//     res.send(JSON.stringify(contacts, null, 2));
// });


app.get('/api/v1/andalusian-bicycle-plans', (req, res) => {
    const { province, year, from, to ,population_over, municipality_over, all_dispacement_over, walking_over, car_driver_over, accompanying_car_over, motorcycle_over, bicycle_over, public_transport_over, other_transport_over, motorized_percentage_over} = req.query;
  
    // Filtramos por provincia, si se especificó
    let planesFiltrados = salim.datosSLC;
    if (province) {
      planesFiltrados = planesFiltrados.filter(plan => plan.province === province);
    }
  
    // Filtramos por año, si se especificó
    if (year) {
      const parsedYear = Number(year); // Parseamos el año a número
      if (isNaN(parsedYear)) {
        // Si el año no es un número válido, devolvemos un código de estado 400
        return res.status(400).json({ error: 'Año inválido' });
      }
      planesFiltrados = planesFiltrados.filter(plan => plan.year === parsedYear);
    }

    if (population_over) {
        const parsedPop = Number(population_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.population > parsedPop);
      }

      if (municipality_over) {
        const parsedPop = Number(municipality_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.municipality > parsedPop);
      }

      if (all_dispacement_over) {
        const parsedPop = Number(all_dispacement_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.all_displacement > parsedPop);
      }

      
    
      if (walking_over) {
        const parsedPop = Number(walking_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.walking > parsedPop);
      }

      if (car_driver_over) {
        const parsedPop = Number(car_driver_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.car_driver > parsedPop);
      }

      if (accompanying_car_over) {
        const parsedPop = Number(accompanying_car_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.accompanying_car > parsedPop);
      }

      if (motorcycle_over) {
        const parsedPop = Number(motorcycle_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.motorcycle > parsedPop);
      }


      if (bicycle_over) {
        const parsedPop = Number(bicycle_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.bicycle > parsedPop);
      }

      if (public_transport_over) {
        const parsedPop = Number(public_transport_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.public_transport > parsedPop);
      }

      if (motorized_percentage_over) {
        const parsedPop = Number(motorized_percentage_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.motorized_percentage > parsedPop);
      }

      if (other_transport_over) {
        const parsedPop = Number(other_transport_over); // Parseamos el año a número
        if (isNaN(parsedPop)) {
          // Si el año no es un número válido, devolvemos un código de estado 400
          return res.status(400).json({ error: 'Numero invalido' });
        }
        planesFiltrados = planesFiltrados.filter(plan => plan.other_transportation > parsedPop);
      }


      
      
  
    // Filtramos por rango de años, si se especificó
    if (from && to) {
      const parsedFrom = Number(from); // Parseamos el año de inicio a número
      const parsedTo = Number(to); // Parseamos el año de fin a número
      if (isNaN(parsedFrom) || isNaN(parsedTo)) {
        // Si alguno de los años no es un número válido, devolvemos un código de estado 400
        return res.status(400).json({ error: 'Rango de años inválido' });
      }
      planesFiltrados = planesFiltrados.filter(plan => plan.year >= parsedFrom && plan.year <= parsedTo);
    }
  
    // Si se especificó provincia o rango de años y no se encontraron planes, devolvemos un código de estado 404
    if ((province || (from && to)) && planesFiltrados.length === 0) {
      return res.status(404).json({ error: 'No se encontraron planes para los parámetros especificados' });
    }
  
    // Devolvemos los planes filtrados con un código de estado 200
    res.status(200).json(planesFiltrados);
  });
  
  app.get('/api/v1/andalusian-bicycle-plans/:province', (req, res) => {
    const { province } = req.params;
    const { from, to } = req.query;
  
    let planesFiltrados = salim.datosSLC.filter(plan => plan.province === province);
  
    if (from !== undefined && to !== undefined) {
      const parsedFrom = Number(from);
      const parsedTo = Number(to);
      if (isNaN(parsedFrom) || isNaN(parsedTo)) {
        return res.status(400).json({ error: 'Rango de años inválido' });
      }
      planesFiltrados = planesFiltrados.filter(plan => plan.year >= parsedFrom && plan.year <= parsedTo);
    }
  
    if (planesFiltrados.length === 0) {
      return res.status(404).json({ error: 'No se encontraron planes para los parámetros especificados' });
    }
  
    res.json(planesFiltrados);
  });
  
  app.get('/api/v1/andalusian-bicycle-plans/:province/:year', (req, res) => {
    const { province, year } = req.params;
    const { from, to } = req.query;
  
    // Verificar si se proporcionan los parámetros de ruta necesarios
    if (!province || !year) {
      return res.status(400).json({ error: 'Faltan parámetros de ruta' });
    }
  
    // Validar que los valores de los parámetros sean correctos
    const validProvinces = ['sevilla', 'malaga', 'cadiz', 'huelva', 'cordoba', 'jaen', 'almeria'];
    if (!validProvinces.includes(province.toLowerCase())) {
      return res.status(400).json({ error: 'Provincia inválida' });
    }
  
    if (isNaN(year) || year < 2000 || year > 2023) {
      return res.status(400).json({ error: 'Año inválido' });
    }
  
    let planesFiltrados = salim.datosSLC.filter(plan => plan.province === province && plan.year == year);
  
    if (from !== undefined && to !== undefined) {
      const parsedFrom = Number(from);
      const parsedTo = Number(to);
      if (isNaN(parsedFrom) || isNaN(parsedTo) || parsedFrom < 2000 || parsedTo > 2023 || parsedFrom > parsedTo) {
        return res.status(400).json({ error: 'Rango de años inválido' });
      }
      planesFiltrados = planesFiltrados.filter(plan => plan.year >= parsedFrom && plan.year <= parsedTo);
    }
  
    res.json(planesFiltrados);
  });
  
  
  
  
  app.get('/api/v1/andalusian-bicycle-plans', (req, res) => {
    const { from, to } = req.query;
  
    let planesFiltrados = salim.datosSLC;
  
    if (from !== undefined && to !== undefined) {
      const parsedFrom = Number(from);
      const parsedTo = Number(to);
      if (isNaN(parsedFrom) || isNaN(parsedTo)) {
        return res.status(400).json({ error: 'Rango de años inválido' });
      }
      planesFiltrados = planesFiltrados.filter(plan => plan.year >= parsedFrom && plan.year <= parsedTo);
    }
  
    if (planesFiltrados.length === 0) {
      return res.status(404).json({ error: 'No se encontraron planes para los parámetros especificados' });
    }
  
    res.json(planesFiltrados);
  });
  
  

  app.post(BASE_API_URL+"/andalusian-bicycle-plans",(req,res)=>{
    var inputPost = req.body;

    if (salim.datosSLC.find(autonomo => (autonomo.province === inputPost.province && autonomo.year === inputPost.year))) {
        res.status(409).json({ message: "HTTP 409 CONFLICT: The contact already exists." });
    } else {
        salim.datosSLC.push(inputPost);
        res.status(201).json({ message: "HTTP 201 CREATED" });
    }

    console.log("New POST to /andalusian-bicycle-plans");
});



  app.post(BASE_API_URL+"/andalusian-bicycle-plans/:province", (req,res)=>{
    res.sendStatus(405).json({ message: "HTTP 405 METHOD NOT ALLOWED" });
});

  
  
  
  
  
  
  
  

 
  
  
  

  app.put('/api/v1/andalusian-bicycle-plans/:province/:year', (req, res) => {
    const { province, year } = req.params;
    const expectedId = `${province}/${year}`;
    if (parseInt(year) >= 2020) {
      return res.sendStatus(404);
    }
    if(parseInt(year) <= 2013){
            return res.sendStatus(400);
    }


    if (req.params.province && req.params.year) {
      if (req.params.province !== province || req.params.year !== year.toString()) {
        return res.sendStatus(400);
      }
    } else if (req.body.id !== expectedId) {
      return res.sendStatus(400);
    }
  
    const index = salim.datosSLC.findIndex(contact => contact.province === province && contact.year === parseInt(year));
    if (index === -1) {
      return res.sendStatus(404);
    }
  
    salim.datosSLC[index] = {
      ...salim.datosSLC[index],
      ...req.body,
      province,
      year: parseInt(year),
    };
  
    res.status(200).json(salim.datosSLC[index]);
  });
  
  

  
  

  app.put('/api/v1/andalusian-bicycle-plans', (req, res) => {
    res.sendStatus(405);
  });

  
  
  app.delete('/api/v1/andalusian-bicycle-plans', (req, res) => {
    // Aquí se podría eliminar todos los datos de una base de datos o de un arreglo
    salim.datosSLC = [];
  
    res.status(200).end();
  });

  

  app.delete('/api/v1/andalusian-bicycle-plans/:province/:year', (req, res) => {
    const contactProvince = req.params.province;
    const contactYear = parseInt(req.params.year); // parseInt is used to convert the year parameter to an integer
    salim.datosSLC = salim.datosSLC.filter((contact) => {
        return (contact.province !== contactProvince || contact.year !== contactYear);
    });
    res.sendStatus(200);
});

  
  

// codigo josgaroro1 /////////////////////////////////////////////////////////////////////



app.get("/samples/JGO", (req,res)=>{
    res.send(JSON.stringify(jose.datosJGO, null, 2));
});

app.get(BASE_API_URL+"/self-employed-stats", (request,response) => {
    response.json(jose.datosJGO);
    console.log("New GET to /self-employed-stats");
    response.sendStatus(200).json({ message: "HTTP 200 OK" });
});

app.get(BASE_API_URL+"/self-employed-stats/:territory", (request,response) => {
    var name = request.params.territory;
    if (jose.datosJGO.filter((dato=>dato.territory === name)).length>0){
        response.json(jose.datosJGO.filter(dato=>dato.territory === name));
        response.sendStatus(200).json({ message: "HTTP 200 OK" });
    }else{
        response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
    }
});

app.get(BASE_API_URL+"/self-employed-stats/:territory/:year", (request,response) => {
    var name = request.params.territory;
    var anyo = parseInt(request.params.year);

    if (jose.datosJGO.filter((dato=>dato.territory === name & dato.year === anyo)).length>0){
        response.json(jose.datosJGO.filter(dato=>dato.territory === name & dato.year === anyo));
        response.sendStatus(200).json({ message: "HTTP 200 OK" });
    }else{
        response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
    }
});

app.get(BASE_API_URL+"/self-employed-stats?year=2016", (request,response) => {
    var anyo = parseInt(request.params.year);

    if (jose.datosJGO.filter((dato=>dato.year === anyo)).length>0){
        response.json(jose.datosJGO.filter(dato=>dato.year === anyo));
        response.sendStatus(200).json({ message: "HTTP 200 OK" });
    }else{
        response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
    }
});

app.get(BASE_API_URL+"/self-employed-stats/:territory?from=year0&to=year1", (request,response) => {
    var territorio = request.params.territory;
    var anyo0 = parseInt(request.params.anyo0);
    var anyo1 = parseInt(request.params.anyo1)
    if (jose.datosJGO.filter((dato=>dato.territory === territorio & dato.year>=anyo0 & dato.year<=anyo1)).length>0){
        response.json(jose.datosJGO.filter(dato=>dato.territory === territorio & dato.year>=anyo0 & dato.year<=anyo1));
        response.sendStatus(200).json({ message: "HTTP 200 OK" });
    }else{
        response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
    }
});

app.get(BASE_API_URL+"/self-employed-stats/loadInitialData", (req,res) => {
    const autonomo = [];
    const provincias = ["Sevilla", "Huelva", "Córdoba", "Granada", "Almería", "Málaga", "Jaén", "Cádiz", 
        "Sevilla", "Huelva"];
        for (let i = 0; i < 10; i++) {
        const autonomo_iesimo = {
            genre: "Mujeres",
            live_with: 1 + (i + 1),
            territory: provincias[i],
            employee: 50 * (i + 1),
            value: 1000 * (i + 1),
            year: 2013 + (i + 1),
        };
        autonomo.push(autonomo_iesimo);
        }
    res.json(autonomo);
      
});

app.post(BASE_API_URL+"/self-employed-stats",(req,res)=>{
    var inputPost = req.body;
    if(isNaN(inputPost.year)||isNaN(inputPost.value)||isNaN(inputPost.live_with)||isNaN(inputPost.employee)){
        res.sendStatus(400).json({ message: "HTTP 400 BAD REQUEST" });
    }
    else if (jose.datosJGO.find(autonomo => (autonomo.value === inputPost.value)&(autonomo.year === inputPost.year)&
            (autonomo.genre === inputPost.genre)&(autonomo.territory === inputPost.territory)&
            (autonomo.live_with === inputPost.live_with)&(autonomo.employee === inputPost.employee))){
        res.sendStatus(409).json({ message: "HTTP 409 CONFLICT" });
    }else{
        jose.datosJGO.push(inputPost);
        res.sendStatus(201).json({ message: "HTTP 201 CREATED" });
    }


    console.log("New POST to /self-employed")
});

app.post(BASE_API_URL+"/self-employed-stats/:territory", (req,res)=>{
    res.sendStatus(405).json({ message: "HTTP 405 METHOD NOT ALLOWED" });
});

app.post(BASE_API_URL+"/self-employed-stats/:year", (req,res)=>{
    res.sendStatus(405).json({ message: "HTTP 405 METHOD NOT ALLOWED" });
});

app.put(BASE_API_URL+"/self-employed-stats", (req,res)=>{
    res.sendStatus(405).json({ message: "HTTP 405 METHOD NOT ALLOWED" });
});

app.put(BASE_API_URL+"/self-employed-stats/:province/:year", (req,res)=>{
    const province = req.params.province;
    const year = req.params.year;
    const id = `${province}/${year}`
    if (req.body.id !== id){
        res.sendStatus(400).json({ message: "HTTP 400 BAD REQUEST" });
    }
});

app.put(BASE_API_URL+"/self-employed-stats/:territory/:year", (request,response)=>{
    var territorio = request.params.territory;
    var anyo = parseInt(request.params.year);
    if (jose.datosJGO.filter((dato=>dato.territory === territorio & dato.year === anyo)).length>0){
        for (var i = 0; i < jose.datosJGO.filter((dato=>dato.territory === territorio & dato.year === anyo)).length; i++) {
            
        }
    }
        
});

app.delete(BASE_API_URL +"/self-employed-stats",(request, response)=>{
    jose.datosJGO=[]
    response.status(200).end();
});

app.delete(BASE_API_URL+"/self-employed-stats/:name", (request,response) => {
    var name = request.params.name;
    console.log(`New DELETE to /self-employed-stats/${name}`);
    var l = jose.datosJGO.filter((dato=>dato.territory === name)).pop();
    response.sendStatus(200)
    
});
app.delete('/api/v1/self-employed-stats/:province/:year', (req, res) => {
    const contactProvince = req.params.province;
    const contactYear = parseInt(req.params.year);
    jose.datosJGO = jose.datosJGO.filter((contact) => {
        return (contact.territory !== contactProvince || contact.year !== contactYear);
    });
    res.sendStatus(200);
});

app.delete(BASE_API_URL +"/self-employed-stats/:year",(request, response)=>{
    var anyo = parseInt(request.params.year);

    console.log(`New DELETE to /self-employed-stats//${anyo}`);

    db.remove({year:anyo},{},function (err, dbRemoved){
        if(err){
            console.log(`Error deleting /self-employed-stats/${anyo}: ${err}`);
            response.sendStatus(500);
        }else{
            console.log(`Files removed ${dbRemoved}`);
            response.sendStatus(200);               
        }
    });
});

app.delete(BASE_API_URL +"/self-employed-stats/:territory/:year",(request, response)=>{
    var territorio = request.params.territory;
    var anyo = parseInt(request.params.year);

    console.log(`New DELETE to /self-employed-stats/${territorio}/${anyo}`);

    db.remove({territory:territorio, year:anyo},{},function (err, dbRemoved){
        if(err){
            console.log(`Error deleting /self-employed-stats/${territorio}/${anyo}: ${err}`);
            response.sendStatus(500);
        }else{
            console.log(`Files removed ${dbRemoved}`);
            response.sendStatus(200);               
        }
    });
});


// código sanpinand /////////////////////////////////////////////////////////////////////


// app.get(BASE_API_URL+SANTIAGO+"/:province/:year", (request, response) => {
//     var province = request.params.province;
//     var year = request.params.year;
    
//     var ls = datosLlamadas.filter(call => call.province == province && call.year == year );

//     response.send(JSON.stringify(ls[0]));
// });
////////////////////////


app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 