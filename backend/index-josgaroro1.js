//Variables
import Datastore from 'nedb';
var db = new Datastore();

const BASE_API_URL = "/api/v1";

function  loadBackend_josgaroro1(app) {

    var datosFichero = [
        {
            "genre": "Hombres", 
            "live_with": 1, 
            "territory": "Almería", 
            "employee": 5, 
            "value": 6850, 
            "year": 2020
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

    db.insert(datosFichero);

    //GET //////////////////////////////////////////////////
    app.get(BASE_API_URL+"/self-employed-stats/docs", (request,response) => {
        response.redirect("https://documenter.getpostman.com/view/26051644/2s93RNyacK");
    });

    app.get(BASE_API_URL + "/self-employed-stats", (request, response) => {

        console.log("New GET to self-employed-stats");
        const limit = parseInt(request.query.limit) || 10;
        const offset = parseInt(request.query.offset) || 0;
        var genre = request.query.genre;
        var live_with = request.query.live_with;
        var territory = request.query.territory;
        var employee = request.query.employee;
        var value = request.query.value;
        var year = request.query.year;

        var parametros = request.query;//obtenemos la consulta campo1=valor1&campo2=valor2...
        
        delete parametros.limit;
        delete parametros.offset;

        var claves = Object.keys(parametros); // creamos una variable con todos las claves de cada consulta

        var filtros = {}; // inizializamos el array con el que vamos a filtrar

        claves.forEach(clave =>{
            if (clave === 'from') {
                //creamos el filtro con la clave time y añadimo con el valor el comparador >=
                filtros['year'] = { $gte: parseInt(parametros[clave]) };
            } else if (clave === 'to') {
                if (filtros['year']) {
                //añadimos al objeto ya creado el comparador menor que y el valor a comparar <=
                  filtros['year']['$lte'] = parseInt(parametros[clave]);
            } else {
                //creamos el filtro con la clave time y añadimo con el valor el comparador <=
                  filtros['year'] = { $lte: parseInt(parametros[clave]) };

            } }else if(!isNaN(parametros[clave])){//Si el valor es un numero lo parseamos
                //Añadimos al valor del filtro un comparador >=
                filtros[clave] = {$gte: Number(parametros[clave]) }; 
            }else{
                filtros[clave] = parametros[clave];
            }
        });

        if(filtros['_id']){
          response.status(400).send('El campo _id no está permitido.' );
        }
        else{

        db.find(filtros).skip(offset).limit(limit).exec((err, datos)  => {
          if(err){
            console.log(err);
            response.sendStatus(500);
        } else if (datos.length==0){
            response.sendStatus(404);
        } else if (genre != null){//Busqueda por genre
            var datos = datos.filter((reg)=>{
                return (reg.genre == genre);
            });

            if (datos==0){
                console.log(`Data not found /self-emplyed-stats: ${err}`);
                response.status(404).send("Data not found");
            }else if(datos.length==1){
                delete datos[0]._id;
                response.json(datos[0]);
            }else{
                response.json(datos.map((d)=>{
                    delete d._id;
                    return d;
                }));}
        }else if (live_with != null){//Busqueda por live_with
            var datos = datos.filter((reg)=>{
                return (reg.live_with == live_with);
            });

            if (datos==0){
                console.log(`Data not found /self-emplyed-stats: ${err}`);
                response.status(404).send("Data not found");
            }else if(datos.length==1){
                delete datos[0]._id;
                response.json(datos[0]);
            }else{
                response.json(datos.map((d)=>{
                    delete d._id;
                    return d;
                }));}
        }else if (territory != null){//Busqueda por territory
            var datos = datos.filter((reg)=>{
                return (reg.territory == territory);
            });

            if (datos==0){
                console.log(`Data not found /self-emplyed-stats: ${err}`);
                response.status(404).send("Data not found");
            }else if(datos.length==1){
                delete datos[0]._id;
                response.json(datos[0]);
            }else{
                response.json(datos.map((d)=>{
                    delete d._id;
                    return d;
                }));}
        }else if (employee != null){//Busqueda por employee
            var datos = datos.filter((reg)=>{
                return (reg.employee == employee);
            });

            if (datos==0){
                console.log(`Data not found /self-emplyed-stats: ${err}`);
                response.status(404).send("Data not found");
            }else if(datos.length==1){
                delete datos[0]._id;
                response.json(datos[0]);
            }else{
                response.json(datos.map((d)=>{
                    delete d._id;
                    return d;
                }));}
        }else if (value != null){//Busqueda por value
            var datos = datos.filter((reg)=>{
                return (reg.value == value);
            });

            if (datos==0){
                console.log(`Data not found /self-emplyed-stats: ${err}`);
                response.status(404).send("Data not found");
            }else if(datos.length==1){
                delete datos[0]._id;
                response.json(datos[0]);
            }else{
                response.json(datos.map((d)=>{
                    delete d._id;
                    return d;
                }));}
        }else if (year != null){//Busqueda por año
            var datos = datos.filter((reg)=>{
                return (reg.year == year);
            });

            if (datos==0){
                console.log(`Data not found /self-emplyed-stats: ${err}`);
                response.status(404).send("Data not found");
            }else if(datos.length==1){
                delete datos[0]._id;
                response.json(datos[0]);
            }else{
                response.json(datos.map((d)=>{
                    delete d._id;
                    return d;
                }));}
        }else{
            console.log(datos);
            response.status(200).json(datos.map((d=>{
                delete d._id;
                return d;
            })));
          }
        });
      }
      });
            
    /*app.get(BASE_API_URL+"/self-employed-stats", (request,response) => {
        console.log("New GET to self-employed-stats");

        var limit = request.query.limit;
        var offset = request.query.offset;

        var genre = request.query.genre;
        var live_with = request.query.live_with;
        var territory = request.query.territory;
        var employee = request.query.employee;
        var value = request.query.value;
        var year = request.query.year;

        if(limit==null){//si no hay paginacion
            db.find({},function(err, data){
                if(err){
                    console.log(`Error geting /self-emplyed-stats: ${err}`);
                    response.sendStatus(500);
                }else{
                    if (genre != null){
                        var data = data.filter((reg)=>{
                            return (reg.genre == genre);
                        });
            
                        if (data==0){
                            console.log(`Data not found /self-emplyed-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }else{
                        response.json(data.map((d)=>{
                            delete d._id;
                            return d;
                        }));}
                    }
                    if (live_with != null){
                        var data = data.filter((reg)=>{
                            return (reg.live_with == live_with);
                        });
            
                        if (data==0){
                            console.log(`Data not found /self-emplyed-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }else{
                            response.json(data.map((d)=>{
                                delete d._id;
                                return d;
                            }));}
                    }
                    if (territory != null){
                        var data = data.filter((reg)=>{
                            return (reg.territory == territory);
                        });
            
                        if (data==0){
                            console.log(`Data not found /self-emplyed-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }else{
                            response.json(data.map((d)=>{
                                delete d._id;
                                return d;
                            }));}
                    }
                    if (employee != null){
                        var data = data.filter((reg)=>{
                            return (reg.employee == employee);
                        });
            
                        if (data==0){
                            console.log(`Data not found /self-emplyed-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }else{
                            response.json(data.map((d)=>{
                                delete d._id;
                                return d;
                            }));}
                    }
                    if (value != null){
                        var data = data.filter((reg)=>{
                            return (reg.value == value);
                        });
            
                        if (data==0){
                            console.log(`Data not found /self-emplyed-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }else{
                            response.json(data.map((d)=>{
                                delete d._id;
                                return d;
                            }));}
                    }
                    if (year != null){
                        var data = data.filter((reg)=>{
                            return (reg.year == year);
                        });
            
                        if (data==0){
                            console.log(`Data not found /self-emplyed-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }else{
                            response.json(data.map((d)=>{
                                delete d._id;
                                return d;
                            }));}
                    }
                    
                }
            });
        }else{
            db.find({}).skip(parseInt(offset)).limit(parseInt(limit)).exec(function (err, data) {//PAGINACION
                if(err){
                    console.log(`Error geting /self-employed-stats/: ${err}`);
                    response.sendStatus(500);
                }else{
                    if(data.length > 0){
                        console.log(`data returned ${data.length}`);
                        response.json(data.map((d)=>{
                            delete d._id;
                            return d;
                        }));
                    }else{
                        console.log(`Data not found /self-employed-stats: ${err}`);
                        response.status(404).send("Data not found");
                    }
                }
            });
        }
        

    });*/
      

    app.get(BASE_API_URL+"/self-employed-stats/loadInitialData", (request,response) => {
        console.log("New GET to /self-employed-stats/loadInitialData");
        db.find({}, function(err,data){
            if(err){
                console.log(`Error geting /self-employed-stats/loadInitialData: ${err}`);
                response.sendStatus(500);
            }else{
                if(data.length==0){
                    console.log(`data inserted: ${data.length}`);  
                    db.insert(datosFichero); 
                    response.json(datosFichero.map((d)=>{
                        delete d._id;
                        return d;
                    }));    
                }else{
                    console.log(`Data is already inserted: ${datosFichero.length}`);
                    response.status(200).send("Data is already inserted");  
                }
            }
        });
    });
    
    
    
    //recurso concreto
    app.get(BASE_API_URL+"/self-employed-stats/:territory/:year", (request,response) => {
        var name = request.params.territory;
        var anyo = parseInt(request.params.year);
        
        console.log(`New GET to /self-employed-stats/${name}/${anyo}`);
        
        db.find({"territory":name, "year":anyo},function(err,data){
            if(err){
                console.log(`Error geting /self-employed-stats/${name}/${anyo}: ${err}`);
                response.sendStatus(500);
            }else{
                if(data.length!=0){
                    console.log(`data returned ${data.length}`);
                    delete data[0]._id;
                    response.json(data[0]);
                }
                else{
                    console.log(`Data not found /self-employed-stats/${name}/${anyo}: ${err}`);
                    response.status(404).send("Data not found");
                }
            }
        });
    });

    
    
    //POST //////////////////////////////////////////////////
    app.post(BASE_API_URL+"/self-employed-stats",(req,res)=>{
        var inputPost = req.body;
        if(!inputPost.genre || !inputPost.live_with || !inputPost.territory || !inputPost.employee || 
            !inputPost.value || !inputPost.year){
            res.sendStatus(400).send("HTTP 400 BAD REQUEST");
        }
        else if (datosFichero.find(autonomo => (autonomo.value === inputPost.value)&(autonomo.year === inputPost.year)&
                (autonomo.genre === inputPost.genre)&(autonomo.territory === inputPost.territory)&
                (autonomo.live_with === inputPost.live_with)&(autonomo.employee === inputPost.employee))){
            res.sendStatus(409).send("HTTP 409 CONFLICT");
        }else{
            db.insert(inputPost);
            res.sendStatus(201).send("HTTP 201 CREATED" );
        }
        console.log("New POST to /self-employed")
    });
    
    app.post(BASE_API_URL+"/self-employed-stats/:territory", (req,res)=>{
        res.sendStatus(405);
    });
    
    app.post(BASE_API_URL+"/self-employed-stats/:territory/:year", (req,res)=>{
        res.sendStatus(405);
    });
    
    //PUT //////////////////////////////////////////////////

    //db.update({ planet: 'Jupiter' }, { planet: 'Pluton'}, {}, function (err, numReplaced) {} remplaza jupiter por pluton
    app.put(BASE_API_URL+"/self-employed-stats", (req,res)=>{
        res.sendStatus(405).send("HTTP 405 METHOD NOT ALLOWED" );
    });

    //id no coincidente
    /*app.put(BASE_API_URL+"/self-employed-stats/:province/:year", (req,res)=>{
        const province = req.params.province;
        const year = req.params.year;
        const id = `${province}/${year}`
        if (req.body.id !== id){
            res.sendStatus(400).send("HTTP 400 BAD REQUEST" );
        }
    });*/
    
    app.put(BASE_API_URL+"/self-employed-stats/:territory/:year", (request,response)=>{
        let newFile = request.body;
        var territorio = request.params.territory;
        var año = parseInt(request.params.year);

        if(!newFile.genre || !newFile.live_with || !newFile.territory || !newFile.employee || 
            !newFile.value || !newFile.year || Object.keys(newFile).length!==6){
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad request");
        }else{
            db.update({$and: [{"territory":territorio}, {"year":año}]}, {$set: newFile},{},function(err, data){
                if(err){
                    console.log(`Error put /self-employed-stats/${territorio}/${año}: ${err}`);
                    response.sendStatus(500);
                }else{
                    if(data==0){
                        console.log("Data not found");
                        response.sendStatus(404);
                    }
                    else{
                        console.log(`Resources updated: ${data}`);
                        response.sendStatus(201);}
                    }
            });
        }
            
    });
    
    //DELETE //////////////////////////////////////////////////
    app.delete(BASE_API_URL +"/self-employed-stats", (request, response)=>{
        //usando el parametro options -> db.remove(query, options, callback)
        db.remove({},{multi:true},(err,numRemoved)=>{
            if(err){
                console.log(`Error deleting /self-employed-stats: ${err}`);
                response.sendStatus(500);
            }else{
                if(numRemoved==0){
                    response.sendStatus(404).send("HTTP 404 NOT FOUND");
                }else{
                    console.log(`Files removed ${numRemoved}`);
                    response.sendStatus(200);
                }    
            }
        });
    });
    
    app.delete(BASE_API_URL+"/self-employed-stats/:name", (request,response) => {//quita por territorio
        var name = request.params.name;

        console.log(`New DELETE to /self-employed/stats/${name}`);

        db.remove({"territory": name}, {multi:true}, (err,numRemoved)=>{
            if(err){
                console.log(`Error deleting /self-employed-stats/${name}: ${err}`);
                response.sendStatus(500);
            }else{
                if (numRemoved==0){
                    response.sendStatus(404);
                }else{
                    console.log(`Self-employed removed: ${numRemoved}`);
                    response.sendStatus(200);
                }
            }
        });
    });
    
    app.delete(BASE_API_URL+"/self-employed-stats/:territory/:year",(request, response)=>{
        var territorio = request.params.territory;
        var anyo = parseInt(request.params.year);
    
        console.log(`New DELETE to /self-employed-stats/${territorio}/${anyo}`);
    
        db.remove({"territory":territorio, "year":anyo},{multi:true},(err, numRemoved)=>{
            if(err){
                console.log(`Error deleting /self-employed-stats/${territorio}/${anyo}: ${err}`);
                response.sendStatus(500);
            }else{
                if(numRemoved==0){
                    response.sendStatus(404).send("Not Found");
                }else{
                    console.log(`Files removed ${numRemoved}`);
                    response.sendStatus(200);
                }
            }      
        });
    });

};


export {loadBackend_josgaroro1};



