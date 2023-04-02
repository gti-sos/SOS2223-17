<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Table } from 'sveltestrap';
        
        


        onMount(async () => {
            getBicycles();
        });
        
        let API = '/api/v1/andalusian-bicycle-plans';
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let contacts = [];
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
      
        // async function createContact () {
        //     resultStatus = result = "";
        //     const res = await fetch(API, {
        //         method: 'POST',
        //         headers:{
        //             "Content-Type" : "application/json"
        //         },
        //         body:JSON.stringify({
        //             name: newContactName,
        //             phone: newContactPhone
        //         })
        //     });
        //     const status = await res.status;
        //     resultStatus = status;	           
        //     if(status==201){
        //         getContacts();
        //     }
        // }


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
    
    <Table>
        <thead>
          <tr>
            <th>Province</th>
            <th>Municipality</th>
            <th>Population</th>
            <th>All_displacement</th>
            <th>Walking</th>
            <th>Car_driver</th>
            <th>Accompanying_car</th>
            <th>Motorcycle</th>
            <th>Bicycle</th>
            <th>Public_transport</th>
            <th>Other_transportation</th>
            <th>Year</th>
            <th>Motorized_percentage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
           <tr>
                <td><input bind:value={newBicycleProvince}></td>
                <td><input bind:value={newBicycleMunicipality}></td>
                <td><input bind:value={newBicyclePopulation}></td>
                <td><input bind:value={newBicycleAllDispacement}></td>
                <td><input bind:value={newBicycleWalking}></td>
                <td><input bind:value={newBicycleCarDriver}></td>
                <td><input bind:value={newBicycleAccompaningCar}></td>
                <td><input bind:value={newBicycleMotorcycle}></td>
                <td><input bind:value={newBicycleBicycle}></td>
                <td><input bind:value={newBicyclePublicTransport}></td>
                <td><input bind:value={newBicycleOtherTransport}></td>
                <td><input bind:value={newBicycleYear}></td>
                <td><input bind:value={newBicycleMotorPercentage}></td>
                
            </tr>
    
        {#each contacts as contact}
          <li>{contact.province}</li>
          {/each} 
        </tbody>
      </Table>


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