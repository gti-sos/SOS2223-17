console.log("F");

const BASE_API_URL = "/api/v2";

//const salim = require("./andalusian-bicycles-plans");

//const salim = require("./andalusian-bicycles-plans");

const API_DOC_PORTAL_salim = "https://documenter.getpostman.com/view/25746364/2s93JxsMEP"

console.log("G");

const API_DOC_PORTAL_salim1 = "https://sos2223-17-381423.ew.r.appspot.com/"


import { response } from 'express';
import Datastore from 'nedb';
var db = new Datastore();
console.log("H");


function loadBackend_salcha2(app) {

    //codigo salim /////////////////////////////////////////////////////////////




var datos_auxilio = 
  [  
    {    "province": "Almeria",    "population": 508657,    "walking": 32.1,    "bicycle": 2.2,    "year": 2015,    "motorized_percentage": 53.1  }, 
    {    "province": "Cadiz",    "population": 1240155,    "walking": 27.2,    "bicycle": 1.7,    "year": 2015,    "motorized_percentage": 59.6  }, 
    {    "province": "Cordoba",    "population": 803038,    "walking": 34.8,    "bicycle": 1.6,    "year": 2015,    "motorized_percentage": 55.9  },  
    {    "province": "Granada",    "population": 924550,    "walking": 32.9,    "bicycle": 1.4,    "year": 2015,    "motorized_percentage": 54.2  }, 
    {    "province": "Huelva",    "population": 520505,    "walking": 27.1,    "bicycle": 1.7,    "year": 2015,    "motorized_percentage": 60.5  },  
    {    "province": "Jaen",    "population": 670872,    "walking": 30.2,    "bicycle": 1.6,    "year": 2015,    "motorized_percentage": 56.7  }, 
    {    "province": "Malaga",    "population": 1661788,    "walking": 28.9,    "bicycle": 1.8,    "year": 2015,    "motorized_percentage": 58.5  }, 
    {    "province": "Sevilla",    "population": 1950213,    "walking": 25.1,    "bicycle": 1.5,    "year": 2015,    "motorized_percentage": 63.4  },
    {    "province": "Almeria",    "population": 508657,    "walking": 32.1,    "bicycle": 2.2,    "year": 2016,    "motorized_percentage": 53.1  }, 
    {    "province": "Cadiz",    "population": 1240155,    "walking": 27.2,    "bicycle": 1.7,    "year": 2016,    "motorized_percentage": 59.6  }, 
    {    "province": "Cordoba",    "population": 803038,    "walking": 34.8,    "bicycle": 1.6,    "year": 2016,    "motorized_percentage": 55.9  },  
    {    "province": "Granada",    "population": 924550,    "walking": 32.9,    "bicycle": 1.4,    "year": 2016,    "motorized_percentage": 54.2  }, 
    {    "province": "Huelva",    "population": 520505,    "walking": 27.1,    "bicycle": 1.7,    "year": 2016,    "motorized_percentage": 60.5  },  
    {    "province": "Jaen",    "population": 670872,    "walking": 30.2,    "bicycle": 1.6,    "year": 2016,    "motorized_percentage": 56.7  }, 
    {    "province": "Malaga",    "population": 1661788,    "walking": 28.9,    "bicycle": 1.8,    "year": 2016,    "motorized_percentage": 58.5  }, 
    {    "province": "Sevilla",    "population": 1950213,    "walking": 25.1,    "bicycle": 1.5,    "year": 2016,    "motorized_percentage": 63.4  },
    {    "province": "Almeria",    "population": 508657,    "walking": 32.1,    "bicycle": 2.2,    "year": 2017,    "motorized_percentage": 53.1  }, 
    {    "province": "Cadiz",    "population": 1240155,    "walking": 27.2,    "bicycle": 1.7,    "year": 2017,    "motorized_percentage": 59.6  }, 
    {    "province": "Cordoba",    "population": 803038,    "walking": 34.8,    "bicycle": 1.6,    "year": 2017,    "motorized_percentage": 55.9  },  
    {    "province": "Granada",    "population": 924550,    "walking": 32.9,    "bicycle": 1.4,    "year": 2017,    "motorized_percentage": 54.2  }, 
    {    "province": "Huelva",    "population": 520505,    "walking": 27.1,    "bicycle": 1.7,    "year": 2017,    "motorized_percentage": 60.5  },  
    {    "province": "Jaen",    "population": 670872,    "walking": 30.2,    "bicycle": 1.6,    "year": 2017,    "motorized_percentage": 56.7  }, 
    {    "province": "Malaga",    "population": 1661788,    "walking": 28.9,    "bicycle": 1.8,    "year": 2017,    "motorized_percentage": 58.5  }, 
    {    "province": "Sevilla",    "population": 19502,    "walking": 25.1,    "bicycle": 1.5,    "year": 2017,    "motorized_percentage": 63.4  }
  ]



//db.insert(datos_Salim);
db.insert(datos_auxilio);


    
    
    app.get(BASE_API_URL+"/andalusian-bicycle-plans/docs", (req,res)=>{
        res.redirect(API_DOC_PORTAL_salim);
    });
    
    

    app.get(BASE_API_URL + "/andalusian-bicycle-plans/loadInitialData", (req, res) => {
      db.find({}, { _id: 0 }, (err, docs) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error obteniendo los datos de la base de datos');
        } else if (docs.length == 0) {
          db.insert(datos_auxilio, (err, newDocs) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error insertando los datos en la base de datos');
            } else {
              const transformedDocs = newDocs.map((doc) => {
                const { _id, ...docWithoutId } = doc;
                return docWithoutId;
              });
              res.json(transformedDocs);
              console.log("Se han creado los datos");
            }
          });
        } else {
          const transformedDocs = docs.map((doc) => {
            const { _id, ...docWithoutId } = doc;
            return docWithoutId;
          });
          res.json(transformedDocs);
          console.log('Datos obtenidos correctamente');
        }
      });
    });
  

  
    app.get('/api/v2/andalusian-bicycle-plans', (req, res) => {
      const { province, year, from, to, population_over, municipality_over, all_dispacement_over, walking_over, car_driver_over, accompanying_car_over, motorcycle_over, bicycle_over, public_transport_over, other_transport_over, motorized_percentage_over, limit, offset } = req.query;
    
      if (req.headers['content-type'] && req.headers['content-type'] !== 'application/json') {
        return res.sendStatus(415);
      }
    
      let query = {};
    
      if (province) {
        query.province = province;
      }
      if (year) {
        query.year = Number(year);
      }
      if (population_over) {
        query.population = { $gt: Number(population_over) };
      }
      
      
      if (walking_over) {
        query.walking = { $gt: Number(walking_over) };
      }
      
      if (accompanying_car_over) {
        query.accompanying_car = { $gt: Number(accompanying_car_over) };
      }
      
      if (bicycle_over) {
        query.bicycle = { $gt: Number(bicycle_over) };
      }
      if (public_transport_over) {
        query.public_transport = { $gt: Number(public_transport_over) };
      }
      if (motorized_percentage_over) {
        query.motorized_percentage = { $gt: Number(motorized_percentage_over) };
      }
      
    
      if (from && to) {
        query.year = { $gte: Number(from), $lte: Number(to) };
      } else if (from) {
        query.year = { $gte: Number(from) };
      } else if (to) {
        query.year = { $lte: Number(to) };
      }
    
      let limitValue = limit ? Number(limit) : 0;
      let offsetValue = offset ? Number(offset) : 0;
    
      let queryResult = db.find(query, { _id: 0 });
    
      if (limitValue > 0) {
        queryResult = queryResult.limit(limitValue);
      }
    
      if (offsetValue > 0) {
        queryResult = queryResult.skip(offsetValue);
      }
    
      queryResult.exec((err, docs) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (docs.length === 1) {
          return res.json(docs[0]);
        } else {
          return res.json(docs);
        }
        
      console.log("I");

      });
    });
    console.log("J");

    
      
    
    app.post(BASE_API_URL + "/andalusian-bicycle-plans", (req, res) => {
      const inputPost = req.body;


      console.log("K");

      if (inputPost.hasOwnProperty('id')) {
      const errorMessage = `Property 'id' is not allowed in POST requests`;
      console.log(errorMessage);
      return res.status(400).json({ message: errorMessage });
    }
    
      
    
      const requiredFields = ['province', 'population', 'walking', 'bicycle', 'year', 'motorized_percentage'];
    
      const missingFields = requiredFields.filter(field => !inputPost.hasOwnProperty(field) || inputPost[field] === "");
    
      if (missingFields.length > 0) {
        const errorMessage = `Missing or empty fields: ${missingFields.join(', ')}`;
        console.log(errorMessage);
        return res.status(400).json({ message: errorMessage });
      }
      console.log("L");

      console.log("M");

      const numericFields = ['population', 'walking', 'bicycle', 'year', 'motorized_percentage'];
      for (const field of numericFields) {
        if (typeof req.body[field] === 'number' && (req.body[field] === 0 || req.body[field] === null)) {
          return res.sendStatus(400);
        }
      }
      console.log("N");

      const query = { province: inputPost.province, year: inputPost.year };
    
      console.log("O");

      db.find(query, (err, docs) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (docs.length > 0) {
          console.log("P");

          return res.status(409).json({ message: 'HTTP 409 CONFLICT: Data with same province and year already exists.' });
          console.log("Q");

        } else {
          // Add null verification here
          if (!Object.values(inputPost).some(value => value === null)) {
            db.insert(inputPost, (err, newDoc) => {
              if (err) {
                return res.status(500).json({ error: 'Internal server error' });
              }
              return res.status(201).json({ message: 'HTTP 201 CREATED' });
            });
          } else {
            return res.status(400).json({ message: 'Null values are not allowed' });
          }
        }
      });
    
      console.log("New POST to /andalusian-bicycle-plans");
    });
    
    
    
    


    
    
      app.post(BASE_API_URL+"/andalusian-bicycle-plans/:province", (req,res)=>{
        res.sendStatus(405).json({ message: "HTTP 405 METHOD NOT ALLOWED" });
    });
    
      
      
    app.put('/api/v2/andalusian-bicycle-plans/:province/:year', (req, res) => {
      const { province, year } = req.params;
      const expectedId = `${province}/${year}`;
    
      if (parseInt(year) >= 2020) {
        return res.sendStatus(404);
      }
    
      if(parseInt(year) <= 2013){
        return res.sendStatus(400);
      }

      if (req.body.hasOwnProperty('population') && req.body.population === null) {
        return res.sendStatus(400);
      }
      
      if (req.body.hasOwnProperty('walking') && req.body.walking === null) {
        return res.sendStatus(400);
      }
      
      if (req.body.hasOwnProperty('bicycle') && req.body.bicycle === null) {
        return res.sendStatus(400);
      }
      
      if (req.body.hasOwnProperty('motorized_percentage') && req.body.motorized_percentage === null) {
        return res.sendStatus(400);
      }
      


      const numericFields = ['population', 'walking', 'bicycle', 'year', 'motorized_percentage'];
for (const field of numericFields) {
  if (req.body.hasOwnProperty(field) && req.body[field] !== null && typeof req.body[field] === 'number' && (req.body[field] === 0 || req.body[field] === null)) {
    return res.sendStatus(400);
  }
}


    
      if (req.params.province && req.params.year) {
        if (req.params.province !== province || req.params.year !== year.toString()) {
          return res.sendStatus(400);
        }
      } else if (req.body.id !== expectedId) {
        return res.sendStatus(400);
      }

      
    
      const query = { province, year: parseInt(year) };
      const update = { $set: { ...req.body, province, year: parseInt(year) } };
      const options = { returnUpdatedDocs: true };
    
      db.update(query, update, options, (err, numAffected, updatedDoc) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (numAffected === 0) {
          return res.sendStatus(404);
        }
        const response = Object.assign({}, updatedDoc);
        delete response._id;
        return res.status(200).json(response);
      });
    });
    
      
    
      
      
    
      app.put('/api/v2/andalusian-bicycle-plans', (req, res) => {
        res.sendStatus(405);
      });
    
      
      
      app.delete(BASE_API_URL + '/andalusian-bicycle-plans', (req, res) => {
        db.count({}, (err, count) => {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }
          if (count === 0) {
            return res.status(400).json({ error: 'No documents to delete' });
          }
          db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
              return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(200).end();
          });
          console.log('All data deleted from /andalusian-bicycle-plans');
        });
      });
      
      
    
      

      app.get(BASE_API_URL+"/andalusian-bicycle-plans/:province/:year", (request,response) => {
        const { province, year } = request.params;
        const { from, to } = request.query;
    
        // Check if necessary route parameters are provided
        if (!province || !year) {
            return response.status(400).json({ error: 'Missing route parameters' });
        }
    
        // // Validate parameter values
        // const validProvinces = ['sevilla', 'malaga', 'cadiz', 'huelva', 'cordoba', 'jaen', 'almeria', 'granada'];
        // if (!validProvinces.includes(province.toLowerCase())) {
        //     return response.status(404).json({ error: 'Invalid province' });
        // }
    
        if (isNaN(year) || year < 2000 || year > 2023) {
            return response.status(400).json({ error: 'Invalid year' });
        }
    
        const query = { province, year: parseInt(year) };
        console.log(`New GET to /andalusian-bicycle-plans/${province}/${year}`);
        db.findOne(query, (err, plan)=>{
            if(err){
                console.log(`Error getting /andalusian-bicycle-plans/${province}/${year}: ${err}`);
                response.sendStatus(500);
            }else{
                console.log(`Plan returned ${plan}`);
                if (plan) {
                    delete plan._id;
                    response.json(plan);
                } else {
                    response.sendStatus(404);
                }
            }
        });
    });
    
    


    app.delete(BASE_API_URL + "/andalusian-bicycle-plans/:province/:year", (req,res)=>{ //borrar todos los recursos bien
      var data = req.params;
  
      db.remove({province:data.province,year:parseInt(data.year)},{},(err,docs) =>{
          if(err){
              res.sendStatus(500);
          }
          else{
              if(docs == 0){
                  res.sendStatus(404);
              }
              else{
                  res.sendStatus(200);
              }
          }
      })
  });

  app.get(BASE_API_URL + "/data", (req,res)=>{
    console.log('New GET to /data')
    console.log("R");

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    console.log("H");

    function v(){
      return getRandomInt(1,100);
    }

    var data = new Array();
    
    for (var i=0; i<10; i++){
      data.push(v());
    }

    res.json(data);

  });


}


export {loadBackend_salcha2} 