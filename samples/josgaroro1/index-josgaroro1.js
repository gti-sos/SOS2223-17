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

console.log("Media empleados en Almería:", ac/contador);