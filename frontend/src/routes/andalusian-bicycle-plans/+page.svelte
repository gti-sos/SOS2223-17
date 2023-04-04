<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Column, Button, Table } from 'sveltestrap';
    import { each } from 'svelte/internal';
        
        


        onMount(async () => {
            getBicycles();
        });
        
        let API = '/api/v2/andalusian-bicycle-plans';
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let contacts = [];

        //let newContact = {};

        let newBicycleProvince = 'province';
        let newBicycleMunicipality = 'municipality';
        let newBicyclePopulation = 'population';
        let newBicycleAllDispacement = 'all_displacement';
        let newBicycleWalking = 'walking';
        let newBicycleCarDriver = 'car_driver';
        let newBicycleAccompaningCar = 'accompanying_car';
        let newBicycleMotorcycle = 'motorcycle';
        let newBicycleBicycle = 'bicycle';
        let newBicyclePublicTransport = 'public_transport';
        let newBicycleOtherTransport = 'other_transportation';
        let newBicycleYear = 'year';
        let newBicycleMotorPercentage = 'motorized_percentage';




        let message = "";

    
        let result = "";
        let resultStatus = "";
    
        async function getBicycles () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                contacts = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
      
         async function createBicycle () {
             resultStatus = result = "";
             const res = await fetch(API, {
                 method: 'POST',
                 headers:{
                     "Content-Type" : "application/json"
                 },
                 body:JSON.stringify({
                     province: newBicycleProvince,
                     municipality: newBicycleMunicipality,
                     population: newBicyclePopulation,
                     all_displacement: newBicycleAllDispacement,
                     walking: newBicycleWalking,
                     car_driver: newBicycleCarDriver,
                     accompanying_car: newBicycleAccompaningCar,
                     motorcycle: newBicycleMotorcycle,
                     bicycle: newBicycleBicycle,
                     public_transport: newBicyclePublicTransport,
                     other_transportation: newBicycleOtherTransport,
                     year: newBicycleYear,
                     motorized_percentage: newBicycleMotorPercentage
                     
                 })
             });
             const status = await res.status;
             resultStatus = status;	           
             if(status==201){
                 getBicycles();
             }
         }


        // async function deleteContacts (contactName) {
        //     resultStatus = result = "";
        //     const res = await fetch(API+"/" + contactName, {
        //         method: 'DELETE'
        //     });
            
        //     const status = await res.status;
        //     resultStatus = status;
            
        //     if(status==200){
        //         message = "Se ha producido un error"
        //         getContacts();
        //     }	
        // }
    
    </script>
    <h1> Bicycles</h1>
    
    
      
    <!-- <Table  class="table table-success table-striped table-auto" >
      <thead>
          <tr>
            <th class="text-nowrap">Province</th>
      <th class="text-nowrap">Municipality</th>
      <th class="text-nowrap">Population</th>
      <th class="text-nowrap">All_displ</th>
      <th class="text-nowrap">Walking</th>
      <th class="text-nowrap">Car_driver</th>
      <th class="text-nowrap">Accomp_car</th>
      <th class="text-nowrap">Motorcycle</th>
      <th class="text-nowrap">Bicycle</th>
      <th class="text-nowrap">Public_transport</th>
      <th class="text-nowrap">Other_transport</th>
      <th class="text-nowrap">Year</th>
      <th class="text-nowrap">Mot_%</th>
      <th class="text-nowrap">Action</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-nowrap"><input  bind:value={newBicycleProvince}></td>
            <td class="text-nowrap"><input  bind:value={newBicycleMunicipality}></td>
            <td class="text-nowrap"><input bind:value={newBicyclePopulation}></td>
            <td class="text-nowrap"><input bind:value={newBicycleAllDispacement}></td>
            <td class="text-nowrap"><input  bind:value={newBicycleWalking}></td>
            <td class="text-nowrap"><input bind:value={newBicycleCarDriver}></td>
            <td class="text-nowrap"><input  bind:value={newBicycleAccompaningCar}></td>
            <td class="text-nowrap"><input  bind:value={newBicycleMotorcycle}></td>
            <td class="text-nowrap"><input bind:value={newBicycleBicycle}></td>
            <td class="text-nowrap"><input bind:value={newBicyclePublicTransport}></td>
            <td class="text-nowrap"><input bind:value={newBicycleOtherTransport}></td>
            <td class="text-nowrap"><input  bind:value={newBicycleYear}></td>
            <td class="text-nowrap"><input bind:value={newBicycleMotorPercentage}></td>
            <td><Button on:click={createBicycle} >Create</Button></td>
            
        </tr>
          {#each contacts as contact}
            
          
          <tr>
            <td>{contact.province}</td>
            <td>{contact.municipality}</td>
            <td>{contact.population}</td>
            <td>{contact.all_displacement}</td>

            <td>{contact.walking}</td>
            <td>{contact.car_driver}</td>
            <td>{contact.accompanying_car}</td>
            <td>{contact.motorcycle}</td>

            <td>{contact.bicycle}</td>
            <td>{contact.public_transport}</td>
            <td>{contact.other_transportation}</td>
            <td>{contact.year}</td>

            <td>{contact.motorized_percentage}</td>
            
          </tr>
          
          {/each}
        </tbody>
      </Table>
       -->
       
       
      
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
        </thead>
        <tbody>

          
          {#each contacts as row}
            <tr>
              <Column>{row.province}</Column>
              <Column>{row.municipality}</Column>
              <Column>{row.population}</Column>
              <Column>{row.all_displacement}</Column>
              <Column>{row.walking}%</Column>
              <Column>{row.car_driver}%</Column>
              <Column>{row.accompanying_car}%</Column>
              <Column>{row.motorcycle}%</Column>
              <Column>{row.bicycle}%</Column>
              <Column>{row.public_transport}%</Column>
              <Column>{row.other_transportation}%</Column>
              <Column>{row.year}</Column>
              <Column>{row.motorized_percentage}%</Column>
            </tr>
          {/each}
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" bind:value={newBicycleProvince} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleMunicipality} class="form-control"></td>
            <td><input type="text" bind:value={newBicyclePopulation} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleAllDispacement} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleWalking} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleCarDriver} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleAccompaningCar} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleMotorcycle} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleBicycle} class="form-control"></td>
            <td><input type="text" bind:value={newBicyclePublicTransport} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleOtherTransport} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleYear} class="form-control"></td>
            <td><input type="text" bind:value={newBicycleMotorPercentage} class="form-control"></td>
            <td><Button on:click={createBicycle}>Create</Button></td>
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