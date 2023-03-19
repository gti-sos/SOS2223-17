const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
var Datastore = require('nedb');
var db = new Datastore();

const app = express(); //constructor
const BASE_API_URL = "/api/v1";

app.use("/" , express.static("./public"))

app.use(bodyParser.json());
var backend_spa = require("./backend_spa");
backend_spa(app);






const port = process.env.PORT || 8080;


const jose = require("./index-josgaroro1");

//const salim = require("./andalusian-bicycles-plans");

const API_DOC_PORTAL_salim = "https://documenter.getpostman.com/view/25746364/2s93JxsMEP"


//código caras /////////////////////////////////////////////////////////////
app.get("/cool", (req,res)=>{
    res.send(JSON.stringify(cool(), null, 2));
});

//codigo salim /////////////////////////////////////////////////////////////


var backend_slc = require("./backend-slc");
backend_slc(app);

  
  

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

app.put(BASE_API_URL+"/self-employed-stats/:territory/:year", (request,response)=>{
    var newFile = request.body;
        var territorio = request.params.territory;
        var anyo = parseInt(request.params.year);

        db.update({territory:territorio, year:anyo}, {$set: newFile}, {}, function(err, data){
            if(err){
                console.log(`Error put /apartment-occupancy-surveys/${territorio}/${anyo}: ${err}`);
                response.sendStatus(500);
            }
            else{
                 console.log(`Numero de documentos actualizados: ${data}`);
                 response.sendStatus(201);            
            }
        });
});

app.delete(BASE_API_URL +"/self-employed-stats",(request, response)=>{
    db.remove({},function (err, dbRemoved){
        if(err){
            console.log(`Error deleting /self-employed-stats: ${err}`);
            response.sendStatus(500);
        }else{
            console.log(`Files removed ${dbRemoved}`);
            response.sendStatus(200);               
        }
    });
});

app.delete(BASE_API_URL+"/self-employed-stats/:territory", (request,response) => {
    var name = request.params.territory;
    console.log(`New DELETE to /self-employed-stats/${name}`);
    
    db.remove({"name" : name},{},(err, numRemoved)=>{
        if(err){
            console.log(`Error deleting /contacts/${name}: ${err}`);
            response.sendStatus(500);
        }else{
            console.log(`Contacts removed ${numRemoved}`);
            response.sendStatus(200);
        }
        
    });
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