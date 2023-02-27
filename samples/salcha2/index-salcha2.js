const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser")


const app = express();

const BASE_API_URL = "/api/v1"; 

const port = process.env.PORT || 8080;

const API_DOC_PORTAL = "https://documenter.getpostman.com/view/25746364/2s935rL3kj"


app.use(bodyParser.json());


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


var i = contacts
            .filter((n)=>{
            return n.province==="Sevilla";
            }).map((n)=>{
                return n.population;
           });

suma = i.reduce((a,n)=>{
    return a+n;
});

var array = suma/i.length;


app.get(BASE_API_URL+"/docs", (req,res)=>{
    res.redirect(API_DOC_PORTAL);
});

app.get(BASE_API_URL+"/samples/salcha2", (req,res)=>{
    res.send(JSON.stringify(array, null, 2));
});

// app.get(BASE_API_URL+"/samples/YYY/:province", (req,res)=>{

//     var contactName = req.params.name;
//     filteredContacts = contacts.filter((contact)=>{
//         return (contact.name == contactName)
//     });
//     if (filteredContacts == 0){
//         res.sendStatus(404, "NOT FOUND");

//     }else{
//         res.send(JSON.stringify(filteredContacts[0], null, 2));
//     }
// });

// app.post(BASE_API_URL+"/samples/YYY", (req,res)=>{
//     contacts.push(req.body)
//     res.sendStatus(201, "CREATED");
// });

// app.delete(BASE_API_URL+"/samples/YYY", (req,res)=>{
//     contacts = [];
//     res.sendStatus(200, "OK"); 
// });

// app.delete(BASE_API_URL+"/samples/YYY/:province", (req,res)=>{
//     var contactName = req.params.province;
//     contacts = contacts.filter((contact)=>{
//         return (contact.province != contactName);
//     });
//     res.sendStatus(200, "OK"); 
// });



app.listen(port, () => {
     console.log(`Server TRULY ready at port: ${port}`);
 }); 

// //console.log(`Server TRULY ready at port: ${port}`)