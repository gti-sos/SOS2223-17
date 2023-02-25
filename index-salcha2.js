//var algo = console.log("Hello world !");

function log(msg){
    console.log(msg);
}

//log("Mi fantastico log");

//var array = [1,2,3,4,5]



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
    }
];

//province	municipality	population	all_displacement	walking	car_driver	accompanying_car	motorcycle	bicycle	public_transport	other_ transportation	year	motorized_percentage
//Málaga	32	1294982	2775480	30,4	45,8	10,5	6,5	0,5	6,2	0,4	2016	62,8
//Sevilla	50	1543901	3405252	24,0	48,1	13,6	3,3	1,9	9,2	0,4	2016	65,0
//Sevilla	52	1543902	3405253	25,0	48,1	13,7	3,4	2,1	9,3	0,5	2016	65,1

// for(var i = 0; i<numbers.length; i++){
//     log(numbers[i]);
// }

var i = contacts
            .filter((n)=>{
            return n.province==="Sevilla";
            }).map((n)=>{
                return n.population;
           });

suma = i.reduce((a,n)=>{
    return a+n;
});

log(suma/i.length);
// }).reduce((a,n)=>{
//     return a+n;

