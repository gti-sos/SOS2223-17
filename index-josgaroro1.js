//Variables
//let datosFichero = new Array();
let ac = 0;
let contador = 0;

const datosFichero = [
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

const media = ac/contador;
//console.log("Media empleados en Almería:", ac/contador);

exports.datosJGO = datosFichero;
exports.mediaJGO = media;