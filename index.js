const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");


const app = express(); 

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
var row1  = new makeRow("Almería","january",3520,2019);
var row2  = new makeRow("Cádiz","january",1016,2019);
var row3  = new makeRow("Cordoba","january",997,2019);
var row4  = new makeRow("Granada","january",4067,2019);
var row5  = new makeRow("Huelva","january",837,2019);
var row6  = new makeRow("Jaén","january",2191,2019);
var row7  = new makeRow("Malaga","january",1871,2019);
var row8  = new makeRow("Sevilla","january",3203,2019);

var row9   = new makeRow("Almería","february",3171,2019);
var row10  = new makeRow("Cádiz","february",848,2019);
var row11  = new makeRow("Cordoba","february",988,2019);
var row12  = new makeRow("Granada","february",4267,2019);
var row13  = new makeRow("Huelva","february",749,2019);
var row14  = new makeRow("Jaén","february",2070,2019);
var row15  = new makeRow("Malaga","february",1777,2019);
var row16  = new makeRow("Sevilla","february",3270,2019); 

var row17  = new makeRow("Almería","march",3613,2019);
var row18  = new makeRow("Cádiz","march",937,2019); 
var row19  = new makeRow("Cordoba","march",1184,2019);
var row20 = new makeRow("Granada","march",4622,2019);
var row21  = new makeRow("Huelva","march",840,2019); 
var row22  = new makeRow("Jaén","march",2181,2019);
var row23  = new makeRow("Malaga","march",2274,2019 );
var row24  = new makeRow("Sevilla","march",3642,2019);
  
var row25 = new makeRow("Almería","april",3549,2019);
var row26 = new makeRow("Cádiz","april",1044,2019);
var row27 = new makeRow("Cordoba","april",955,2019);
var row28 = new makeRow("Granada","april",4625,2019);
var row29 = new makeRow("Huelva","april",848,2019);
var row30 = new makeRow("Jaén","april",2225,2019);
var row31 = new makeRow("Malaga","april",2281,2019);
var row32 = new makeRow("Sevilla","april",3499,2019);

var row33 = new makeRow("Almería","may",3594,2019);
var row34 = new makeRow("Cádiz","may",1166,2019);
var row35 = new makeRow("Cordoba","may",1122,2019);
var row36 = new makeRow("Granada","may",5254,2019);
var row37 = new makeRow("Huelva","may",1092,2019);
var row38 = new makeRow("Jaén","may",2278,2019);
var row39 = new makeRow("Malaga","may",2509,2019);
var row40 = new makeRow("Sevilla","may",4028,2019);

var myArray = new Array(row1,row2,row3,row4,row5,row6,row7,row8,row9,row10,row11,row12,row13,row14,row15,row16,row17,row18,row19,row20,row21,row22,row23,row24,row25,row26,row27,row28,row29,row30,row31,row32,row33,row34,row35,row36,row37,row38,row39,row40);


function mediaActivacionesPorTelefono(province,ls){
    var ac = 0;
    var cont = 0;
    var x = ls.filter((n)=>{return province===n.province;});
    for(var i=0;i<x.length;i++){
            ac = ac + x[i].phone_call_activatin_organization;
            cont++;
        }
    return ac/cont;
}
var sol = mediaActivacionesPorTelefono("Cádiz",myArray);


let arraySanpinand = "Media activaciones organizaciones de emergencia por telefono en Cádiz: "+ sol;

app.get("/samples/SPA", (req,res)=>{
    res.send(JSON.stringify(arraySanpinand, null, 2));
});


app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 

