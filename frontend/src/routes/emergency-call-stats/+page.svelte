<script lang = "ts">
  //@ts-nocheck
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Alert,Column, Button, Table } from 'sveltestrap';
        import { text } from 'svelte/internal';
    
    let API = '/api/v2/emergency-call-stats';
    
    let dataCalls = [];
    let newProvince = 'provincia';
    let newMonth= 'mes';
    let newTelefonica = 'Act. telefonicas';
    let newTelematica= 'Act. telematicas';
    let newNumber = 'numero de llamadas';
    let newYear = 'año';

    let result = "";
    let resultStatus = "";
   


    if(dev)
            API = 'http://localhost:8080'+API

    
    onMount(async()=>{
        getCalls();
    });
    async function getCalls () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                dataCalls = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }	
            const status = await res.status;
            resultStatus = status;
        }
        //Crear una nueva entrada
      async function createCall () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                  "Content-Type": "application/json"
                },
                body:JSON.stringify({
                  province: newProvince,
                  month: newMonth,
                  phone_call_activation_organization: Number(newTelefonica),
                  telematic_activation_organization : Number(newTelematica),
                  emergency_call: Number(newNumber),
                  year: Number(newYear)
                })
            }); 
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                  getCalls();
            }
               
            
        }
   
  </script>
  
 <body>

  <Table hover>
    <colgroup>
        <col span="2" />
        <col span="1" />
      </colgroup>
      <thead>
        <tr>
          <th rowspan="2">Provincia</th>
          <th rowspan="2">Mes</th>
          <th colspan="2" id ="col">Num. de activaciones a organizaciones
          </th>
          <th rowspan="2">Número de llamadas</th>
          <th rowspan="2">Año</th>
          <th rowspan="2" >Action</th>
        </tr>
        <tr>
          <th id="activacion-telefonica">Vía telefónica</th>
          <th id="activacion-telematica">Vía telemática</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td ><input  bind:value = {newProvince}></td>
            <td><input  bind:value = {newMonth}></td>
            <td><input  bind:value = {newTelefonica}></td>
            <td><input  bind:value = {newTelematica}></td>
            <td><input  bind:value = {newNumber}></td>
            <td><input  bind:value = {newYear}></td>
            <td><Button  on:click = {createCall}>Crear</Button></td>
          </tr>
        {#each dataCalls as call}
          <tr>
            <td>{call.province}</td>
            <td>{call.month}</td>
            <td headers="activacion-telefonica">{call.phone_call_activation_organization}</td>
            <td headers="activacion-telematica">{call.telematic_activation_organization}</td>
            <td>{call.emergency_call}</td>
            <td>{call.year}</td>
          </tr>
        {/each}
      </tbody>
  </Table>
  <style>
   Table {
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        font-size: 14px;
        text-align: left;
        margin: 5px; 
        margin : 0 10px ;
      }
    
    thead tr, thead th{
      border: 2px solid #ddd;
      background-color: #f2f2f2;
      font-weight: bold;
    }
    tbody td input {
      width : 110px;
    }
    tbody tr,tbody td{
      padding: 5px;
      border: 1px solid #ddd;
      font-weight: grey;
    }
  
    #col{
      text-align: center;
    }
    
    
  </style>
  
</body>
