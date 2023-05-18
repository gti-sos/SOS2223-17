import express from "express";

import request from "request";

import cors from "cors";



import axios from 'axios';


import {loadBackend_salcha2 } from "./backend-slc/v2/index.js";


import {loadBackend_salcha2_2 } from "./backend-slc/v1/index.js";

import { loadBackend_josgaroro1_v2 } from "./backend/v2/index-josgaroro1.js";
import { loadBackend_josgaroro1 } from "./backend/index-josgaroro1.js"

import { loadBackend_sanpinand } from "./backend/index-sanpinand-v1.js";

import { loadBackend_sanpinand_v2 } from "./backend/v2/index-sanpinand-v2.js";



import { handler } from "./frontend/build/handler.js";

import Datastore from 'nedb';


var db = new Datastore();


const app = express(); //constructor



app.use(express.json());

const port = process.env.PORT || 8080;

app.use(cors());



//proxy Jose
var paths = "/proxyjgo"
var apiServerHost = "https://sos2223-12.appspot.com/api/v2/agroclimatic"
app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
 });
loadBackend_josgaroro1(app);
loadBackend_josgaroro1_v2(app);


const API_DOC_PORTAL_salim = "https://documenter.getpostman.com/view/25746364/2s93JxsMEP"

//codigo sanpinand/////////////////////////////////////////////////////////////
//proxy Santiago///////////////////
var prox = "/proxyspa"
var api_ext = "https://sos2223-13.appspot.com/api/v2/employment"

app.use(prox, async (request, response) => {
  try {
    // Llamada a la API externa
    const responseApi = await axios.get(api_ext+request.url);

    response.json(responseApi.data);

  } catch (error) {
      response.status(500).json({ error: "Error en el proxy" });
  }
});

loadBackend_sanpinand(app);

loadBackend_sanpinand_v2(app);








//codigo salim /////////////////////////////////////////////////////////////
var paths = "/proxyscc"
var apiServerHost = "https://sos2223-14.appspot.com/api/v2/andalusia-tourism-situation-surveys"
app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
 });

loadBackend_salcha2(app);

loadBackend_salcha2_2(app);


  

//  antiguo sitio codigo josgaroro1 /////////////////////////////////////////////////////////////////////



app.use(handler);

app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 