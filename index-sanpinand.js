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
console.log(myArray);

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
console.log(sol);