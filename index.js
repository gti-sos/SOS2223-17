import express from "express";

import cors from "cors";


import {loadBackend_salcha2 } from "./backend-slc/index.js";

import { loadBackend_josgaroro1_v2 } from "./backend/v2/index-josgaroro1.js";

// import { loadBackend_sanpinand } from "./backend/index-sanpinand-v2.js";


import { handler } from "./frontend/build/handler.js";

import Datastore from 'nedb';


//var backendJose = require("./backend/index-josgaroro1");
var db = new Datastore();


const app = express(); //constructor
const BASE_API_URL = "/api/v1";

//app.use("/" , express.static("./public"))



app.use(express.json());





//backendJose(app);









const port = process.env.PORT || 8080;

app.use(cors());



loadBackend_josgaroro1_v2(app);


const API_DOC_PORTAL_salim = "https://documenter.getpostman.com/view/25746364/2s93JxsMEP"

//codigo sanpinand/////////////////////////////////////////////////////////////

//var backend_spa = require("./backend");
// loadBackend_sanpinand(app);



//(app);




//codigo salim /////////////////////////////////////////////////////////////


//var backend_slc = require("./backend-slc");
loadBackend_salcha2(app);


  

//  antiguo sitio codigo josgaroro1 /////////////////////////////////////////////////////////////////////



app.use(handler);

app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 