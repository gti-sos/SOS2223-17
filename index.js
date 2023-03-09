const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");


const app = express(); //constructor
const BASE_API_URL = "api/v1";

const port = process.env.PORT || 8080;

const API_DOC_PORTAL = "https://documenter.getpostman.com/view/25746364/2s935rL3kj"


app.use(bodyParser.json());

//código caras /////////////////////////////////////////////////////////////
app.get("/cool", (req,res)=>{
    res.send(JSON.stringify(cool(), null, 2));
});

//codigo salim /////////////////////////////////////////////////////////////

var contacts = [
    {
        province: "Sevilla",
        municipality: 50,
        population: 1543901,
        all_displacement:3405252,	
        walking:24.0,	
        car_driver:48.1,
        accompanying_car:13.6,
        motorcycle:3.3,
        bicycle:1.9,
        public_transport:9.2,
        other_transportation:0.4,	
        year:2016,	
        motorized_percentage:65.0


    },
    {
        province: "Málaga",
        municipality: 32,
        population: 1294982,
        all_displacement:2775480,	
        walking:30.4,	
        car_driver:45.8,
        accompanying_car:10.5,
        motorcycle:6.5,
        bicycle:0.5,
        public_transport:6.2,
        other_transportation:0.4,	
        year:2016,	
        motorized_percentage:62.8


    },
    

    {
        province: "Sevilla",
        municipality: 52,
        population: 1543902,
        all_displacement:3405253,	
        walking:25.0,	
        car_driver:48.1,
        accompanying_car:13.7,
        motorcycle:3.4,
        bicycle:2.1,
        public_transport:9.3,
        other_transportation:0.5,	
        year:2016,	
        motorized_percentage:65.1
    },

    {
        province: "Sevilla",
        municipality: 53,
        population: 1543903,
        all_displacement:3405254,	
        walking:25.1,	
        car_driver:48.2,
        accompanying_car:13.8,
        motorcycle:3.5,
        bicycle:2.2,
        public_transport:9.4,
        other_transportation:0.6,	
        year:2015,	
        motorized_percentage:65.2
    },


    {
        province: "Jaén",
        municipality: 14,
        population: 218264,
        all_displacement:439574,	
        walking:38.4,	
        car_driver:39.6,
        accompanying_car:10.6,
        motorcycle:2.9,
        bicycle:0.8,
        public_transport:7.6,
        other_transportation:0.1,	
        year:2017,	
        motorized_percentage:53.1
    },

    {
        province: "Huelva",
        municipality: 21,
        population: 398584,
        all_displacement:959108,	
        walking:30.1,	
        car_driver:44.8,
        accompanying_car:14.7,
        motorcycle:3.1,
        bicycle:2.5,
        public_transport:4.8,
        other_transportation:0.1,	
        year:2017,	
        motorized_percentage:62.6
    },

    {
        province: "Granada",
        municipality: 50,
        population: 566830,
        all_displacement:1382297,	
        walking:31.8,	
        car_driver:43.0,
        accompanying_car:9.2,
        motorcycle:5.2,
        bicycle:1.5,
        public_transport:8.2,
        other_transportation:1.1,	
        year:2018,	
        motorized_percentage:57.4
    },

    {
        province: "Córdoba",
        municipality: 16,
        population: 398762,
        all_displacement:902612,	
        walking:33.3,	
        car_driver:40.9,
        accompanying_car:11.0,
        motorcycle:5.4,
        bicycle:2.1,
        public_transport:7.2,
        other_transportation:0.8,	
        year:2018,	
        motorized_percentage:57.4
    },

    {
        province: "Cádiz",
        municipality: 12,
        population: 807793,
        all_displacement:2176140,	
        walking:28.6,	
        car_driver:42.4,
        accompanying_car:13.5,
        motorcycle:8.1,
        bicycle:1.3,
        public_transport:5.6,
        other_transportation:0.4,	
        year:2019,	
        motorized_percentage:64.1
    },

    {
        province: "Almería",
        municipality: 19,
        population: 508657,
        all_displacement:1099878,	
        walking:32.1,	
        car_driver:47.2,
        accompanying_car:11.8,
        motorcycle:1.7,
        bicycle:1.6,
        public_transport:4.0,
        other_transportation:1.5,	
        year:2019,	
        motorized_percentage:60.8
    },
];


var i = contacts
            .filter((n)=>{
            return n.province==="Sevilla";
            }).map((n)=>{
                return n.population;
           });

suma = i.reduce((a,n)=>{
    return a+n;
});

var arraySalcha2 = suma/i.length;


app.get("/samples/SAL", (req,res)=>{
    res.send(JSON.stringify(arraySalcha2, null, 2));
});

// codigo josgaroro1 /////////////////////////////////////////////////////////////////////

//Variables
let datosFichero = new Array();
let ac = 0;
let contador = 0;

datosFichero = [["Hombres", 1, "Almería", 5, 6850, 2019], ["Hombres", 1, "Cádiz", 5, 8325, 2019], 
["Hombres", 1, "Córdoba", 5, 4375, 2018], ["Hombres", 1, "Granada", 5, 9650, 2018], 
["Hombres", 1, "Huelva", 3, 4425, 2016], ["Hombres", 1, "Jaén", 3, 4525, 2016], 
["Hombres", 1, "Málaga", 3, 14525, 2016], ["Hombres", 1, "Sevilla", 3, 10175, 2018], 
["Hombres", 1, "Cádiz", 3, 63250, 2018], ["Hombres", 1, "Almería", 3, 8050, 2019]];

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}


datosFichero.forEach(elemento=>{
    if(contains(elemento, "Almería")){
        ac += elemento[3];
        contador++;
    }
});

let arrayJosgaroro1 = "Media empleados en Almería: "+ ac /contador;

app.get("/samples/JGO", (req,res)=>{
    res.send(JSON.stringify(arrayJosgaroro1, null, 2));
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



let arraySanpinand = "Media activaciones organizaciones de emergencia por telefono en Cádiz: "+ sol;

app.get("/samples/SPA", (req,res)=>{
    res.send(JSON.stringify(arraySanpinand, null, 2));
});


app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 

