const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
var Datastore = require('nedb');
var db = new Datastore();

const app = express(); //constructor
const BASE_API_URL = "/api/v1";
const SANTIAGO = "/emergency-call-stats"

const port = process.env.PORT || 8080;

const API_DOC_PORTAL = "https://documenter.getpostman.com/view/25746364/2s935rL3kj"

const jose = require("./index-josgaroro1");

app.use(bodyParser.json());

//código caras /////////////////////////////////////////////////////////////
app.get("/cool", (req,res)=>{
    res.send(JSON.stringify(cool(), null, 2));
});

//codigo salim /////////////////////////////////////////////////////////////

var contacts = [
  {
      "province":"Almeria",
      "municipality":19,
      "population":508657,
      "all_displacement":1099878,
      "walking":"32,1",
      "car_driver":"47,2",
      "accompanying_car":"14,7",
      "motorcycle":"5,4",
      "bicycle":"2,2",
      "public_transport":"7,6",
      "other_ transportation":"1,5",
      "year":2015,
      "motorized_percentage":"53,1"
  },
  {
      "province":"Cadiz",
      "municipality":12,
      "population":807793,
      "all_displacement":2176140,
      "walking":"28,6",
      "car_driver":"42,4",
      "accompanying_car":"14,7",
      "motorcycle":"6,5",
      "bicycle":"1,6",
      "public_transport":4,
      "other_ transportation":"0,8",
      "year":2015,
      "motorized_percentage":"65,0"
  },
  {
      "province":"Cordoba",
      "municipality":16,
      "population":398762,
      "all_displacement":902612,
      "walking":"33,3",
      "car_driver":"40,9",
      "accompanying_car":"13,8",
      "motorcycle":"2,9",
      "bicycle":"2,1",
      "public_transport":"6,2",
      "other_ transportation":"0,5",
      "year":2015,
      "motorized_percentage":"65,2"
  },
  {
      "province":"Granada",
      "municipality":50,
      "population":566830,
      "all_displacement":1382297,
      "walking":"31,8",
      "car_driver":"48,1",
      "accompanying_car":"10,5",
      "motorcycle":"3,5",
      "bicycle":"2,2",
      "public_transport":"9,3",
      "other_ transportation":"0,8",
      "year":2015,
      "motorized_percentage":"62,8"
  },
  {
      "province":"Huelva",
      "municipality":21,
      "population":398584,
      "all_displacement":959108,
      "walking":"30,1",
      "car_driver":"48,1",
      "accompanying_car":"10,6",
      "motorcycle":"5,2",
      "bicycle":"2,1",
      "public_transport":4,
      "other_ transportation":"0,4",
      "year":2015,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Jaen",
      "municipality":14,
      "population":218264,
      "all_displacement":439574,
      "walking":"38,4",
      "car_driver":"47,2",
      "accompanying_car":"10,6",
      "motorcycle":"5,2",
      "bicycle":"0,8",
      "public_transport":"9,3",
      "other_ transportation":"0,4",
      "year":2015,
      "motorized_percentage":"62,6"
  },
  {
      "province":"Malaga",
      "municipality":32,
      "population":1294982,
      "all_displacement":2775480,
      "walking":"30,4",
      "car_driver":"48,2",
      "accompanying_car":"13,5",
      "motorcycle":"3,5",
      "bicycle":"2,5",
      "public_transport":4,
      "other_ transportation":"0,4",
      "year":2015,
      "motorized_percentage":"62,8"
  },
  {
      "province":"Sevilla",
      "municipality":50,
      "population":1543901,
      "all_displacement":3405252,
      "walking":"24,0",
      "car_driver":"39,6",
      "accompanying_car":"13,7",
      "motorcycle":"1,7",
      "bicycle":"0,8",
      "public_transport":"8,2",
      "other_ transportation":"1,5",
      "year":2015,
      "motorized_percentage":"57,4"
  },
  

  {
      "province":"Almeria",
      "municipality":18,
      "population":508658,
      "all_displacement":1099878,
      "walking":"32,1",
      "car_driver":"48,2",
      "accompanying_car":"13,5",
      "motorcycle":"3,3",
      "bicycle":"2,5",
      "public_transport":"8,2",
      "other_ transportation":"0,1",
      "year":2016,
      "motorized_percentage":"64,1"
  },
  {
      "province":"Cadiz",
      "municipality":11,
      "population":807792,
      "all_displacement":2176140,
      "walking":"28,6",
      "car_driver":"42,4",
      "accompanying_car":"11,8",
      "motorcycle":"3,1",
      "bicycle":"1,3",
      "public_transport":"9,2",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Cordoba",
      "municipality":15,
      "population":398763,
      "all_displacement":902612,
      "walking":"33,3",
      "car_driver":"47,2",
      "accompanying_car":"13,8",
      "motorcycle":"3,4",
      "bicycle":"2,1",
      "public_transport":"9,2",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"53,1"
  },
  {
      "province":"Granada",
      "municipality":49,
      "population":566831,
      "all_displacement":1382297,
      "walking":"31,8",
      "car_driver":"45,8",
      "accompanying_car":"13,8",
      "motorcycle":"1,7",
      "bicycle":"2,5",
      "public_transport":"4,8",
      "other_ transportation":"0,1",
      "year":2016,
      "motorized_percentage":"62,6"
  },
  {
      "province":"Huelva",
      "municipality":50,
      "population":398584,
      "all_displacement":959108,
      "walking":"30,1",
      "car_driver":"45,8",
      "accompanying_car":"9,2",
      "motorcycle":"5,4",
      "bicycle":"1,9",
      "public_transport":"9,4",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"65,0"
  },
  {
      "province":"Jaen",
      "municipality":51,
      "population":218264,
      "all_displacement":439574,
      "walking":"38,4",
      "car_driver":"40,9",
      "accompanying_car":"10,5",
      "motorcycle":"2,9",
      "bicycle":"1,5",
      "public_transport":"5,6",
      "other_ transportation":"0,5",
      "year":2016,
      "motorized_percentage":"62,8"
  },
  {
      "province":"Malaga",
      "municipality":32,
      "population":1294986,
      "all_displacement":2775480,
      "walking":"30,4",
      "car_driver":"48,1",
      "accompanying_car":"13,6",
      "motorcycle":"6,5",
      "bicycle":"1,6",
      "public_transport":"9,4",
      "other_ transportation":"0,5",
      "year":2016,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Sevilla",
      "municipality":50,
      "population":1543900,
      "all_displacement":3405252,
      "walking":"24,0",
      "car_driver":"48,1",
      "accompanying_car":"9,2",
      "motorcycle":"3,4",
      "bicycle":"2,2",
      "public_transport":"7,2",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"64,1"
  },
  
  {
      "province":"Alameda",
      "municipality":11,
      "population":398765,
      "all_displacement":1099878,
      "walking":"32,1",
      "car_driver":"48,2",
      "accompanying_car":"10,6",
      "motorcycle":"3,1",
      "bicycle":"1,5",
      "public_transport":"4,8",
      "other_ transportation":"0,6",
      "year":2017,
      "motorized_percentage":"60,8"
  },
  {
      "province":"Cadiz",
      "municipality":15,
      "population":566833,
      "all_displacement":2176140,
      "walking":"28,6",
      "car_driver":"43,0",
      "accompanying_car":"13,7",
      "motorcycle":"3,3",
      "bicycle":"2,1",
      "public_transport":"5,6",
      "other_ transportation":"0,8",
      "year":2017,
      "motorized_percentage":"65,1"
  },
  {
      "province":"Cordoba",
      "municipality":49,
      "population":398586,
      "all_displacement":902612,
      "walking":"33,3",
      "car_driver":"44,8",
      "accompanying_car":"11,0",
      "motorcycle":"3,5",
      "bicycle":"0,8",
      "public_transport":"5,6",
      "other_ transportation":"0,1",
      "year":2017,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Granada",
      "municipality":50,
      "population":218269,
      "all_displacement":1382297,
      "walking":"31,8",
      "car_driver":"39,6",
      "accompanying_car":"13,7",
      "motorcycle":"6,5",
      "bicycle":"1,9",
      "public_transport":"7,2",
      "other_ transportation":"0,4",
      "year":2017,
      "motorized_percentage":"60,8"
  },
  {
      "province":"Huelva",
      "municipality":51,
      "population":1294987,
      "all_displacement":959108,
      "walking":"30,1",
      "car_driver":"43,0",
      "accompanying_car":"13,6",
      "motorcycle":"5,4",
      "bicycle":"2,1",
      "public_transport":"9,4",
      "other_ transportation":"0,6",
      "year":2017,
      "motorized_percentage":"64,1"
  },
  {
      "province":"Jaen",
      "municipality":32,
      "population":1543901,
      "all_displacement":439574,
      "walking":"38,4",
      "car_driver":"48,1",
      "accompanying_car":"10,5",
      "motorcycle":"8,1",
      "bicycle":"1,6",
      "public_transport":"7,2",
      "other_ transportation":"0,6",
      "year":2017,
      "motorized_percentage":"65,1"
  },
  {
      "province":"Malaga",
      "municipality":50,
      "population":1543908,
      "all_displacement":2775480,
      "walking":"30,4",
      "car_driver":"39,6",
      "accompanying_car":"11,0",
      "motorcycle":"8,1",
      "bicycle":"1,9",
      "public_transport":"9,2",
      "other_ transportation":"1,1",
      "year":2017,
      "motorized_percentage":"65,2"
  },
  {
      "province":"Sevilla",
      "municipality":52,
      "population":1543905,
      "all_displacement":3405252,
      "walking":"24,0",
      "car_driver":"48,1",
      "accompanying_car":"11,8",
      "motorcycle":"3,1",
      "bicycle":"1,3",
      "public_transport":"8,2",
      "other_ transportation":"0,4",
      "year":2017,
      "motorized_percentage":"65,1"
  },
  

]



var i = contacts
            .filter((n)=>{
                return n.province === "Sevilla";
            }).map((n)=>{
                return n.population;
            });

var suma = i.reduce((a, n)=>{
    return a + n;
});

var media = suma / i.length;

var arraySalcha2 = "Media de la población de Sevilla en los diferentes periodos: " + media;


app.get("/samples/SCC", (req, res)=>{
    res.send(JSON.stringify(arraySalcha2, null, 2));
});

app.get(BASE_API_URL + "/andalusian-bicycle-plans/loadInitialData", (req, res) => {
  if (contacts.length==0){
    contacts.push({
      "province":"Almeria",
      "municipality":19,
      "population":508657,
      "all_displacement":1099878,
      "walking":"32,1",
      "car_driver":"47,2",
      "accompanying_car":"14,7",
      "motorcycle":"5,4",
      "bicycle":"2,2",
      "public_transport":"7,6",
      "other_ transportation":"1,5",
      "year":2015,
      "motorized_percentage":"53,1"
  },
  {
      "province":"Cadiz",
      "municipality":12,
      "population":807793,
      "all_displacement":2176140,
      "walking":"28,6",
      "car_driver":"42,4",
      "accompanying_car":"14,7",
      "motorcycle":"6,5",
      "bicycle":"1,6",
      "public_transport":4,
      "other_ transportation":"0,8",
      "year":2015,
      "motorized_percentage":"65,0"
  },
  {
      "province":"Cordoba",
      "municipality":16,
      "population":398762,
      "all_displacement":902612,
      "walking":"33,3",
      "car_driver":"40,9",
      "accompanying_car":"13,8",
      "motorcycle":"2,9",
      "bicycle":"2,1",
      "public_transport":"6,2",
      "other_ transportation":"0,5",
      "year":2015,
      "motorized_percentage":"65,2"
  },
  {
      "province":"Granada",
      "municipality":50,
      "population":566830,
      "all_displacement":1382297,
      "walking":"31,8",
      "car_driver":"48,1",
      "accompanying_car":"10,5",
      "motorcycle":"3,5",
      "bicycle":"2,2",
      "public_transport":"9,3",
      "other_ transportation":"0,8",
      "year":2015,
      "motorized_percentage":"62,8"
  },
  {
      "province":"Huelva",
      "municipality":21,
      "population":398584,
      "all_displacement":959108,
      "walking":"30,1",
      "car_driver":"48,1",
      "accompanying_car":"10,6",
      "motorcycle":"5,2",
      "bicycle":"2,1",
      "public_transport":4,
      "other_ transportation":"0,4",
      "year":2015,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Jaen",
      "municipality":14,
      "population":218264,
      "all_displacement":439574,
      "walking":"38,4",
      "car_driver":"47,2",
      "accompanying_car":"10,6",
      "motorcycle":"5,2",
      "bicycle":"0,8",
      "public_transport":"9,3",
      "other_ transportation":"0,4",
      "year":2015,
      "motorized_percentage":"62,6"
  },
  {
      "province":"Malaga",
      "municipality":32,
      "population":1294982,
      "all_displacement":2775480,
      "walking":"30,4",
      "car_driver":"48,2",
      "accompanying_car":"13,5",
      "motorcycle":"3,5",
      "bicycle":"2,5",
      "public_transport":4,
      "other_ transportation":"0,4",
      "year":2015,
      "motorized_percentage":"62,8"
  },
  {
      "province":"Sevilla",
      "municipality":50,
      "population":1543901,
      "all_displacement":3405252,
      "walking":"24,0",
      "car_driver":"39,6",
      "accompanying_car":"13,7",
      "motorcycle":"1,7",
      "bicycle":"0,8",
      "public_transport":"8,2",
      "other_ transportation":"1,5",
      "year":2015,
      "motorized_percentage":"57,4"
  },
  

  {
      "province":"Almeria",
      "municipality":18,
      "population":508658,
      "all_displacement":1099878,
      "walking":"32,1",
      "car_driver":"48,2",
      "accompanying_car":"13,5",
      "motorcycle":"3,3",
      "bicycle":"2,5",
      "public_transport":"8,2",
      "other_ transportation":"0,1",
      "year":2016,
      "motorized_percentage":"64,1"
  },
  {
      "province":"Cadiz",
      "municipality":11,
      "population":807792,
      "all_displacement":2176140,
      "walking":"28,6",
      "car_driver":"42,4",
      "accompanying_car":"11,8",
      "motorcycle":"3,1",
      "bicycle":"1,3",
      "public_transport":"9,2",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Cordoba",
      "municipality":15,
      "population":398763,
      "all_displacement":902612,
      "walking":"33,3",
      "car_driver":"47,2",
      "accompanying_car":"13,8",
      "motorcycle":"3,4",
      "bicycle":"2,1",
      "public_transport":"9,2",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"53,1"
  },
  {
      "province":"Granada",
      "municipality":49,
      "population":566831,
      "all_displacement":1382297,
      "walking":"31,8",
      "car_driver":"45,8",
      "accompanying_car":"13,8",
      "motorcycle":"1,7",
      "bicycle":"2,5",
      "public_transport":"4,8",
      "other_ transportation":"0,1",
      "year":2016,
      "motorized_percentage":"62,6"
  },
  {
      "province":"Huelva",
      "municipality":50,
      "population":398584,
      "all_displacement":959108,
      "walking":"30,1",
      "car_driver":"45,8",
      "accompanying_car":"9,2",
      "motorcycle":"5,4",
      "bicycle":"1,9",
      "public_transport":"9,4",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"65,0"
  },
  {
      "province":"Jaen",
      "municipality":51,
      "population":218264,
      "all_displacement":439574,
      "walking":"38,4",
      "car_driver":"40,9",
      "accompanying_car":"10,5",
      "motorcycle":"2,9",
      "bicycle":"1,5",
      "public_transport":"5,6",
      "other_ transportation":"0,5",
      "year":2016,
      "motorized_percentage":"62,8"
  },
  {
      "province":"Malaga",
      "municipality":32,
      "population":1294986,
      "all_displacement":2775480,
      "walking":"30,4",
      "car_driver":"48,1",
      "accompanying_car":"13,6",
      "motorcycle":"6,5",
      "bicycle":"1,6",
      "public_transport":"9,4",
      "other_ transportation":"0,5",
      "year":2016,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Sevilla",
      "municipality":50,
      "population":1543900,
      "all_displacement":3405252,
      "walking":"24,0",
      "car_driver":"48,1",
      "accompanying_car":"9,2",
      "motorcycle":"3,4",
      "bicycle":"2,2",
      "public_transport":"7,2",
      "other_ transportation":"0,4",
      "year":2016,
      "motorized_percentage":"64,1"
  },
  
  {
      "province":"Alameda",
      "municipality":11,
      "population":398765,
      "all_displacement":1099878,
      "walking":"32,1",
      "car_driver":"48,2",
      "accompanying_car":"10,6",
      "motorcycle":"3,1",
      "bicycle":"1,5",
      "public_transport":"4,8",
      "other_ transportation":"0,6",
      "year":2017,
      "motorized_percentage":"60,8"
  },
  {
      "province":"Cadiz",
      "municipality":15,
      "population":566833,
      "all_displacement":2176140,
      "walking":"28,6",
      "car_driver":"43,0",
      "accompanying_car":"13,7",
      "motorcycle":"3,3",
      "bicycle":"2,1",
      "public_transport":"5,6",
      "other_ transportation":"0,8",
      "year":2017,
      "motorized_percentage":"65,1"
  },
  {
      "province":"Cordoba",
      "municipality":49,
      "population":398586,
      "all_displacement":902612,
      "walking":"33,3",
      "car_driver":"44,8",
      "accompanying_car":"11,0",
      "motorcycle":"3,5",
      "bicycle":"0,8",
      "public_transport":"5,6",
      "other_ transportation":"0,1",
      "year":2017,
      "motorized_percentage":"57,4"
  },
  {
      "province":"Granada",
      "municipality":50,
      "population":218269,
      "all_displacement":1382297,
      "walking":"31,8",
      "car_driver":"39,6",
      "accompanying_car":"13,7",
      "motorcycle":"6,5",
      "bicycle":"1,9",
      "public_transport":"7,2",
      "other_ transportation":"0,4",
      "year":2017,
      "motorized_percentage":"60,8"
  },
  {
      "province":"Huelva",
      "municipality":51,
      "population":1294987,
      "all_displacement":959108,
      "walking":"30,1",
      "car_driver":"43,0",
      "accompanying_car":"13,6",
      "motorcycle":"5,4",
      "bicycle":"2,1",
      "public_transport":"9,4",
      "other_ transportation":"0,6",
      "year":2017,
      "motorized_percentage":"64,1"
  },
  {
      "province":"Jaen",
      "municipality":32,
      "population":1543901,
      "all_displacement":439574,
      "walking":"38,4",
      "car_driver":"48,1",
      "accompanying_car":"10,5",
      "motorcycle":"8,1",
      "bicycle":"1,6",
      "public_transport":"7,2",
      "other_ transportation":"0,6",
      "year":2017,
      "motorized_percentage":"65,1"
  },
  {
      "province":"Malaga",
      "municipality":50,
      "population":1543908,
      "all_displacement":2775480,
      "walking":"30,4",
      "car_driver":"39,6",
      "accompanying_car":"11,0",
      "motorcycle":"8,1",
      "bicycle":"1,9",
      "public_transport":"9,2",
      "other_ transportation":"1,1",
      "year":2017,
      "motorized_percentage":"65,2"
  },
  {
      "province":"Sevilla",
      "municipality":52,
      "population":1543905,
      "all_displacement":3405252,
      "walking":"24,0",
      "car_driver":"48,1",
      "accompanying_car":"11,8",
      "motorcycle":"3,1",
      "bicycle":"1,3",
      "public_transport":"8,2",
      "other_ transportation":"0,4",
      "year":2017,
      "motorized_percentage":"65,1"
  },
    );
    res.json(contacts)
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
    const { province, year, from, to } = req.query;
  
    // Filtramos por provincia, si se especificó
    let planesFiltrados = contacts;
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
  
    let planesFiltrados = contacts.filter(plan => plan.province === province);
  
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
  
    let planesFiltrados = contacts.filter(plan => plan.province === province && plan.year == year);
  
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
  
    let planesFiltrados = contacts;
  
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

    if (contacts.find(autonomo => (autonomo.province === inputPost.province && autonomo.year === inputPost.year))) {
        res.status(409).json({ message: "HTTP 409 CONFLICT: The contact already exists." });
    } else {
        contacts.push(inputPost);
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
  
    const index = contacts.findIndex(contact => contact.province === province && contact.year === parseInt(year));
    if (index === -1) {
      return res.sendStatus(404);
    }
  
    contacts[index] = {
      ...contacts[index],
      ...req.body,
      province,
      year: parseInt(year),
    };
  
    res.status(200).json(contacts[index]);
  });
  
  

  
  

  app.put('/api/v1/andalusian-bicycle-plans', (req, res) => {
    res.sendStatus(405);
  });

  
  
  app.delete('/api/v1/andalusian-bicycle-plans', (req, res) => {
    // Aquí se podría eliminar todos los datos de una base de datos o de un arreglo
    contacts = [];
  
    res.status(200).end();
  });

  

  app.delete('/api/v1/andalusian-bicycle-plans/:province/:year', (req, res) => {
    const contactProvince = req.params.province;
    const contactYear = parseInt(req.params.year); // parseInt is used to convert the year parameter to an integer
    contacts = contacts.filter((contact) => {
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
function makeRow(province, month, phone_call_activatin_organization,year){
    this.province = province;
    this.month = month;
    this.phone_call_activatin_organization = phone_call_activatin_organization;
    this.year = year;
}

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




var ls = datosLlamadas
            .filter((n)=>{
            return n.province==="Cádiz";
            }).map((n)=>{
                return n.phone_call_activation_organization;
           });

ac = ls.reduce((a,n)=>{
    return a+n;
});

var sol = ac/ls.length;
const dataBase =  [];



let arraySanpinand = "Media activaciones organizaciones de emergencia por telefono en Cádiz: "+ sol;

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
  
// app.get(BASE_API_URL+SANTIAGO+"/:province/:year", (request, response) => {
//     var province = request.params.province;
//     var year = request.params.year;
    
//     var ls = datosLlamadas.filter(call => call.province == province && call.year == year );

//     response.send(JSON.stringify(ls[0]));
// });

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


app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 

