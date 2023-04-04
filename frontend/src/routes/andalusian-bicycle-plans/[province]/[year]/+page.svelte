<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Column, Button, Table } from 'sveltestrap';
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
                 getBicycle();
             }
         }


        







    
    </script>
    <h1> Bicycles details</h1>
    
    
       
       
      
      <Table class="table table-success table-striped table-auto">
        <thead>
          <th width="8rem">Prov.</th>
        <th width="5rem">Mun.</th>
        <th width="7rem">Pob.</th>
        <th width="9rem">Desp.</th>
        <th width="6rem">Walk.</th>
        <th width="6rem">Car</th>
        <th width="7rem">Acc. Car</th>
        <th width="5rem">Moto</th>
        <th width="5rem">Bike</th>
        <th width="7rem">Pub. Transp.</th>
        <th width="6rem">Oth. Transp.</th>
        <th width="6rem">Año</th>
        <th width="9rem">Motoriz.</th>
        <th width="9rem">Action</th>
        </thead>
        <tbody>

          
          
        </tbody>
      </Table>
      

      <table class="table table-success table-striped table-auto">
        <thead>
          <tr>
            <th width=115px>Prov.</th>
        <th>Mun.</th>
        <th width=89px>Pob.</th>
        <th width=89px>Desp.</th>
        <th>Walk.</th>
        <th>Car</th>
        <th>Acc. Car</th>
        <th>Moto</th>
        <th>Bike</th>
        <th>Pub. Transp.</th>
        <th>Oth. Transp.</th>
        <th width=79px >Año</th>
        <th width=40px>Motoriz.</th>
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
            <td><Button on:click={updateBicycle}>Update</Button></td>
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