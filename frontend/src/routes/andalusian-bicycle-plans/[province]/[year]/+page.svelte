<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Alert, Column, Button, Table } from 'sveltestrap';
        import { page } from '$app/stores';


    let search = false; // se ha buscado



        onMount(async () => {
            getBicycle();
        });
        let province = $page.params.province;
        let year = $page.params.year;

        let API = '/api/v2/andalusian-bicycle-plans/' + province + "/" + year;

        let msgVisible=false;

        let checkMSG="";

        let color="success";


        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let contacts = [];
        let contact = {};


        // let provnce = "Sevilla";
        // let year = "2016"
        let newContact = {};

        let updatedBicycleProvince = province;
        let updatedBicycleMunicipality = 'municipality';
        let updatedBicyclePopulation = 'population';
        let updatedBicycleAllDispacement = 'all_displacement';
        let updatedBicycleWalking = 'walking';
        let updatedBicycleCarDriver = 'car_driver';
        let updatedBicycleAccompaningCar = 'accompanying_car';
        let updatedBicycleMotorcycle = 'motorcycle';
        let updatedBicycleBicycle = 'bicycle';
        let updatedBicyclePublicTransport = 'public_transport';
        let updatedBicycleOtherTransport = 'other_transportation';
        let updatedBicycleYear = year;
        let updatedBicycleMotorPercentage = 'motorized_percentage';




        let message = "";

    
        let result = "";
        let resultStatus = "";
    
        async function getBicycle () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                updatedBicycleProvince = data.province;
                updatedBicycleMunicipality = data.municipality;
                updatedBicyclePopulation = data.population;
                updatedBicycleAllDispacement = data.all_displacement;
                updatedBicycleWalking = data.walking;
                updatedBicycleCarDriver = data.car_driver;
                updatedBicycleAccompaningCar = data.accompanying_car;
                updatedBicycleMotorcycle = data.motorcycle;
                updatedBicycleBicycle = data.bicycle;
                updatedBicyclePublicTransport = data.public_transport;
                updatedBicycleOtherTransport = data.other_transportation;
                updatedBicycleYear = data.year;
                updatedBicycleMotorPercentage = data.motorized_percentage;
                
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
      
        async function updateBicycle () {
    resultStatus = result = "";
    try {
        const res = await fetch(API, {
            method: 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                province: updatedBicycleProvince,
                municipality: Number(updatedBicycleMunicipality),
                population: Number(updatedBicyclePopulation),
                all_displacement: Number(updatedBicycleAllDispacement),
                walking: Number(updatedBicycleWalking),
                car_driver: Number(updatedBicycleCarDriver),
                accompanying_car: Number(updatedBicycleAccompaningCar),
                motorcycle: Number(updatedBicycleMotorcycle),
                bicycle: Number(updatedBicycleBicycle),
                public_transport: Number(updatedBicyclePublicTransport),
                other_transportation: Number(updatedBicycleOtherTransport),
                year: Number(updatedBicycleYear),
                motorized_percentage: Number(updatedBicycleMotorPercentage)
            })
        });
        const status = await res.status;
        resultStatus = status;
        if(status==200){
            msgVisible = true;
            color = "success";
            checkMSG = "Datos de bicicleta actualizados con éxito";
            getBicycle();
        } else {
            msgVisible = true;
            color = "danger";
            checkMSG = "Error al actualizar los datos de bicicleta, comprueba que hayas completado todos los campos y que los campos numericos son mayores que 0 y vuelve a intentarlo";
        }
    } catch (error) {
        console.error(error);
        msgVisible = true;
        color = "danger";
        checkMSG = "Hubo un error al intentar actualizar los datos de bicicleta, intenta nuevamente más tarde";
    }
}


        







    
    </script>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
    font-family: Arial, sans-serif;
    font-size: 14px;
    text-align: left;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }

  
  body {
margin: 0 20px; /* Cambia el valor de 20px según tus necesidades */
}

.page-container {
        margin: 0 50px; /* aplicar margen de 50px en los laterales */
      }

      h1 {
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        color: #333;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: normal;

      } 
  

</style>


    <body>
      <div class="page-container">
    <h1> Bicicleta concreta</h1>
    
    
       
    
    
    
      
    <Alert color={color} isOpen={msgVisible} toggle={() => (msgVisible = false)}>
      {#if checkMSG!=""}
        {checkMSG}
      {/if}
    </Alert>
      
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th width="115px">Prov.</th>
          <th>Mun.</th>
          <th width="89px">Pob.</th>
          <th width="89px">Desp.</th>
          <th>Walk.</th>
          <th>Car</th>
          <th>Acc. Car</th>
          <th>Moto</th>
          <th>Bike</th>
          <th>Pub. Transp.</th>
          <th>Oth. Transp.</th>
          <th width="79px">Año</th>
          <th width="40px">Motoriz.</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updatedBicycleProvince}</td>
          <td><input type="text" bind:value={updatedBicycleMunicipality} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicyclePopulation} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicycleAllDispacement} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicycleWalking} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicycleCarDriver} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicycleAccompaningCar} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicycleMotorcycle} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicycleBicycle} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicyclePublicTransport} class="form-control"></td>
          <td><input type="text" bind:value={updatedBicycleOtherTransport} class="form-control"></td>
          <td>{updatedBicycleYear}</td>
          <td><input type="text" bind:value={updatedBicycleMotorPercentage} class="form-control"></td>
          <td><Button on:click={updateBicycle} class="bg-warning font-weight-bold">Editar</Button></td>
        </tr>
      </tbody>
    </table>
    
      
      

      {#if message != ""}
        <h1 style="color :red">{message}</h1>
    {/if}

      
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
{resultStatus}
{result}
        </pre>
    {/if}
  </div>
    </body>