//Variables
var Datastore = require('nedb');
var db = new Datastore();

const BASE_API_URL = "/api/v1";

module.exports = (app) => {

    var datosFichero = [
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Almería", 
            "employee": 5, 
            "value": 6850, 
            "year": 2019
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Cádiz", 
            "employee": 5, 
            "value": 8325, 
            "year": 2019
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Córdoba", 
            "employee": 5, 
            "value": 4375, 
            "year": 2018
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Granada", 
            "employee": 5, 
            "value": 9650, 
            "year": 2018
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Huelva", 
            "employee": 3, 
            "value": 4425, 
            "year": 2016
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Jaén", 
            "employee": 3, 
            "value": 4525, 
            "year": 2016
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Málaga", 
            "employee": 3, 
            "value": 14525, 
            "year": 2016
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Sevilla", 
            "employee": 3, 
            "value": 10175, 
            "year": 2018
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Cádiz", 
            "employee": 3, 
            "value": 63250, 
            "year": 2018
        },
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Almería", 
            "employee": 3, 
            "value": 8050, 
            "year": 2019
        },
    ];

    app.get(BASE_API_URL+"/self-employed-stats", (request,response) => {
        console.log("New GET to /self-employed-stats");
        db.insert(datosFichero, (err, datosFichero)=>{
            if(err){
                console.log(`Error geting /self-employed-stats: ${err}`);
                response.sendStatus(500);
            }else{
                console.log(`data inserted: ${datosFichero.length}`);
                response.json(datosFichero.map((d)=>{
                    delete d._id;//id propio de mongoDB, no apropiado mostrar al cliente
                    return d;
                }));                           
            }
        });
    });

    app.get(BASE_API_URL+"/self-employed-stats/loadInicialData", (request,response) => {
        console.log("New GET to /self-employed-stats/loadInitialData");
        db.find({}, function(err,data){
            if(err){
                console.log(`Error geting /self-employed-stats/loadInitialData: ${err}`);
                response.sendStatus(500);
            }
            else{
                if(data.length==0){
                    console.log(`data inserted: ${datosFichero.length}`);  
                    db.insert(datosFichero); 
                    response.json(datosFichero.map((d)=>{
                        delete d._id;
                        return d;
                    }));    
                }
                else{
                     console.log(`Data is already inserted: ${data.length}`);
                     response.status(200).send("Data is already inserted");          
                }
            }
        });
    });
    
    app.get(BASE_API_URL+"/self-employed-stats/:territory", (request,response) => {
        var name = request.params.territory;
        if (datosFichero.filter((dato=>dato.territory === name)).length>0){
            response.json(datosFichero.filter(dato=>dato.territory === name));
            response.sendStatus(200).json({ message: "HTTP 200 OK" });
        }else{
            response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
        }
    });
    
    app.get(BASE_API_URL+"/self-employed-stats/:territory/:year", (request,response) => {
        var name = request.params.territory;
        var anyo = parseInt(request.params.year);
    
        if (datosFichero.filter((dato=>dato.territory === name & dato.year === anyo)).length>0){
            response.json(datosFichero.filter(dato=>dato.territory === name & dato.year === anyo));
            response.sendStatus(200).json({ message: "HTTP 200 OK" });
        }else{
            response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
        }
    });
    
    app.get(BASE_API_URL+"/self-employed-stats?year=2016", (request,response) => {
        var anyo = parseInt(request.params.year);
    
        if (datosFichero.filter((dato=>dato.year === anyo)).length>0){
            response.json(datosFichero.filter(dato=>dato.year === anyo));
            response.sendStatus(200).json({ message: "HTTP 200 OK" });
        }else{
            response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
        }
    });
    
    app.get(BASE_API_URL+"/self-employed-stats/:territory?from=year0&to=year1", (request,response) => {
        var territorio = request.params.territory;
        var anyo0 = parseInt(request.params.anyo0);
        var anyo1 = parseInt(request.params.anyo1)
        if (datosFichero.filter((dato=>dato.territory === territorio & dato.year>=anyo0 & dato.year<=anyo1)).length>0){
            response.json(datosFichero.filter(dato=>dato.territory === territorio & dato.year>=anyo0 & dato.year<=anyo1));
            response.sendStatus(200).json({ message: "HTTP 200 OK" });
        }else{
            response.sendStatus(404).json({ message: "HTTP 404 NOT FOUND" });
        }
    });
    
    
    
    app.post(BASE_API_URL+"/self-employed-stats",(req,res)=>{
        var inputPost = req.body;
        if(isNaN(inputPost.year)||isNaN(inputPost.value)||isNaN(inputPost.live_with)||isNaN(inputPost.employee)){
            res.sendStatus(400).json({ message: "HTTP 400 BAD REQUEST" });
        }
        else if (jdatosFichero.find(autonomo => (autonomo.value === inputPost.value)&(autonomo.year === inputPost.year)&
                (autonomo.genre === inputPost.genre)&(autonomo.territory === inputPost.territory)&
                (autonomo.live_with === inputPost.live_with)&(autonomo.employee === inputPost.employee))){
            res.sendStatus(409).json({ message: "HTTP 409 CONFLICT" });
        }else{
            datosFichero.push(inputPost);
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
        if (datosFichero.filter((dato=>dato.territory === territorio & dato.year === anyo)).length>0){
            for (var i = 0; i < datosFichero.filter((dato=>dato.territory === territorio & dato.year === anyo)).length; i++) {
                
            }
        }
            
    });
    
    app.delete(BASE_API_URL +"/self-employed-stats",(request, response)=>{
        datosFichero=[]
        response.status(200).end();
    });
    
    app.delete(BASE_API_URL+"/self-employed-stats/:name", (request,response) => {
        var name = request.params.name;
        console.log(`New DELETE to /self-employed-stats/${name}`);
        var l = datosFichero.filter((dato=>dato.territory === name)).pop();
        response.sendStatus(200)
        
    });
    app.delete('/api/v1/self-employed-stats/:province/:year', (req, res) => {
        const contactProvince = req.params.province;
        const contactYear = parseInt(req.params.year);
        datosFichero = datosFichero.filter((contact) => {
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
};




