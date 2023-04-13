<script>
    //@ts-nocheck
          import { onMount } from 'svelte';
          import { dev } from '$app/environment';
          import { Alert,Column, Button, Table } from 'sveltestrap';
          import { page } from '$app/stores';


          onMount(async()=>{
            getCall();
          });

  
      //Propiedades de los objetos Json
        let province = $page.params.province;
        let month = $page.params.month;

        let API = '/api/v2/emergency-call-stats/' + province + "/" + month;

        let call = {};

        let updateTelefonica = 'Act. telefonicas';
        let updateTelematica= 'Act. telematicas';
        let updateNumber = 'numero de llamadas';
        let updateYear = 'año';
  
      //Prop. Resultados de las llamdas
  
      let result = "";
      let resultStatus = "";
  
      //Prop. de las alertas 
  
      let flag = false;
      let message = "";
      let color = "";
     
  
  
      if(dev)
              API = 'http://localhost:8080'+API
  
      
    
      async function getCall() {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                call = data;
                
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }	
            const status = await res.status;
            resultStatus = status;
        }
  
          //Actualizar la entrada
        async function updateCall() {
              resultStatus = result = "";
              const res = await fetch(API, {
                  method: 'PUT',
                  headers:{
                    "Content-Type": "application/json"
                  },
                  body:JSON.stringify({
                    province: province,
                    month: month,
                    phone_call_activation_organization: updateTelefonica,
                    telematic_activation_organization : updateTelematica,
                    emergency_call: updateNumber,
                    year: updateYear
                  })
              }); 
              const status = await res.status;
              resultStatus = status;
              if(status==200){
                flag = true;
                color = "success";
                message = "Nueva entrada actualizada con exito";
                getCall();
              } else if(status == 400){
                flag = true;
                color = "danger";
                message = "Datos de entrada no válidos: compruebe las tíldes y mayúsculas en campo provincias y los campos númericos";
              }else if(status == 404){
                flag = true;
                color = "danger";
                message = "Entrada no encontrada";
              }else if(status == 500){
                flag = true;
                color = "danger";
                message = "Error de servidor: intentelo más tarde";
              }
          }
     
    </script>
    
   <body>
    <Alert color={color} isOpen={flag} toggle={() => (flag = false)}>
      {#if message!=""}
        {message}
      {/if}
    </Alert>
  
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
              <td >{call.province}</td>
              <td>{call.month}</td>
              <td><input  bind:value = {updateTelefonica}></td>
              <td><input  bind:value = {updateTelematica}></td>
              <td><input  bind:value = {updateNumber}></td>
              <td><input  bind:value = {updateYear}></td>
              <td><Button color="primary" on:click = {updateCall}>Actualizar</Button></td>
            </tr>
          
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
  