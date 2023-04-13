import express from "express";

import cors from "cors";


import {loadBackend_salcha2 } from "./backend-slc/v2/index.js";


import {loadBackend_salcha2_2 } from "./backend-slc/v1/index.js";

import { loadBackend_josgaroro1 } from "./backend/index-josgaroro1.js";

import { loadBackend_sanpinand } from "./backend/index-sanpinand-v1.js";

import { loadBackend_sanpinand_v2 } from "./backend/v2/index-sanpinand-v2.js";



import { handler } from "./frontend/build/handler.js";

import Datastore from 'nedb';


//var backendJose = require("./backend/index-josgaroro1");
var db = new Datastore();


const app = express(); //constructor

//app.use("/" , express.static("./public"))



app.use(express.json());





//backendJose(app);









const port = process.env.PORT || 8080;

app.use(cors());



loadBackend_josgaroro1(app);


const API_DOC_PORTAL_salim = "https://documenter.getpostman.com/view/25746364/2s93JxsMEP"

//codigo sanpinand/////////////////////////////////////////////////////////////

loadBackend_sanpinand(app);

loadBackend_sanpinand_v2(app);




//(app);




//codigo salim /////////////////////////////////////////////////////////////


//var backend_slc = require("./backend-slc");
loadBackend_salcha2(app);

loadBackend_salcha2_2(app);


  

//  antiguo sitio codigo josgaroro1 /////////////////////////////////////////////////////////////////////



app.use(handler);

app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 