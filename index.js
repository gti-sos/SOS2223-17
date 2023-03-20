const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
var Datastore = require('nedb');
var backendJose = require("./backend/index-josgaroro1");
var db = new Datastore();

const app = express(); //constructor
const BASE_API_URL = "/api/v1";

app.use("/" , express.static("./public"))

app.use(bodyParser.json());

backendJose(app);

var backend_spa = require("./backend_spa");








const port = process.env.PORT || 8080;


<<<<<<< HEAD
///const jose = require("./index-josgaroro1");
=======
>>>>>>> 8210fc0c27e4729d3ae4e9ad923238deeab47f89

//const salim = require("./andalusian-bicycles-plans");

const API_DOC_PORTAL_salim = "https://documenter.getpostman.com/view/25746364/2s93JxsMEP"

//backend_spa////

backend_spa(app);

//código caras /////////////////////////////////////////////////////////////
app.get("/cool", (req,res)=>{
    res.send(JSON.stringify(cool(), null, 2));
});

//codigo salim /////////////////////////////////////////////////////////////


var backend_slc = require("./backend-slc");
backend_slc(app);

  
  

//  antiguo sitio codigo josgaroro1 /////////////////////////////////////////////////////////////////////






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