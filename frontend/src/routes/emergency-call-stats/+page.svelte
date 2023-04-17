<script>
  //@ts-nocheck
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { Alert, Column, Button, Table } from "sveltestrap";

  let API = "/api/v2/emergency-call-stats";

  //Propiedades de los objetos Json

  let dataCalls = [];
  let newProvince = "provincia";
  let newMonth = "mes";
  let newTelefonica = "Act. telefonicas";
  let newTelematica = "Act. telematicas";
  let newNumber = "numero de llamadas";
  let newYear = "año";

  //Prop. Resultados de las llamadas

  let result = "";
  let resultStatus = "";

  //Prop. de las alertas

  let flag = false;
  let message = "";
  let color = "";

  //Propiedades de la paginación
  let limit = 10;
  let offset = 0;
  let queary = `?limit=${limit}&offset=${offset}`;
 

  if (dev) API = "https://sos2223-17.appspot.com" + API;

  onMount(async () => {
    getCalls();
  });

  //Obtener el conjunto de llamadas
  async function getCalls() {
    resultStatus = result = "";
    const res = await fetch(API + queary ,{
      method: "GET",
    });
    try {
      const data = await res.json();
      result = JSON.stringify(data, null, 2);
      dataCalls = data;
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
  }
  //funciones de paginación
  async function previousPage() {
        offset = offset - limit;
        if(offset<0){
            offset = offset + limit;
        }
        else {
            queary = `?limit=${limit}&offset=${offset}`;
            getCalls();
        }
    }

    async function nextPage() {
        offset = offset + limit;
        if(offset>dataCalls.length){
            offset = offset - limit;
            flag = true;
            color = "warning";
            message = "última pagina";
        }
        else{
          
          queary = `?limit=${limit}&offset=${offset}`;
            getCalls();            
        }        
    }

  //Borrar todos los recursos
  async function deleteAllCall() {
    resultStatus = result = "";
    const res = await fetch(API, {
      method: "DELETE",
    });

    const status = await res.status;
    resultStatus = status;
    if (status == 200) {
      flag = true;
      color = "success";
      message = "Todos los datos borrados con exito";
      getCalls();
    }
  }

  //Borrar un recurso en concreto
  async function deleteCall(province, month) {
    resultStatus = result = "";
    const res = await fetch(API + "/" + province + "/" + month, {
      method: "DELETE",
    });

    const status = await res.status;
    resultStatus = status;
    if (status == 200) {
      flag = true;
      color = "success";
      message = "Entrada borrada con exito";
      getCalls();
    }
  }
  //Crear una nueva entrada
  async function createCall() {
    resultStatus = result = "";
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        province: newProvince,
        month: newMonth,
        phone_call_activation_organization: Number(newTelefonica),
        telematic_activation_organization: Number(newTelematica),
        emergency_call: Number(newNumber),
        year: Number(newYear),
      }),
    });
    const status = await res.status;
    resultStatus = status;
    if (status == 201) {
      flag = true;
      color = "success";
      message = "Nueva entrada creada con exito";
      getCalls();
    } else if (status == 400) {
      flag = true;
      color = "danger";
      message =
        "Datos de entrada no válidos: compruebe las tíldes y mayúsculas en campo provincias y los campos númericos";
    } else if (status == 409) {
      flag = true;
      color = "danger";
      message = "Datos de entrada duplicados";
    } else if (status == 500) {
      flag = true;
      color = "danger";
      message = "Error de servidor: intentelo más tarde";
    }
  }
</script>

<body>
  <Alert {color} isOpen={flag} toggle={() => (flag = false)}>
    {#if message != ""}
      {message}
    {/if}
  </Alert>
  <a href="/emergency-call-stats/searching"
              ><Button color="info">Ir a Busquedas</Button></a
            >
  <sub>(*) Elementos identificativos únicos</sub>
  <Table hover>
    <colgroup>
      <col span="2" />
      <col span="1" />
    </colgroup>
    <thead>
      <tr>
        <th rowspan="2">Provincia*</th>
        <th rowspan="2">Mes*</th>
        <th colspan="2" id="col">Num. de activaciones a organizaciones </th>
        <th rowspan="2">Número de llamadas</th>
        <th rowspan="2">Año</th>
        <th rowspan="2">Accion</th>
      </tr>
      <tr>
        <th id="activacion-telefonica">Vía telefónica</th>
        <th id="activacion-telematica">Vía telemática</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input bind:value={newProvince} /></td>
        <td><input bind:value={newMonth} /></td>
        <td><input bind:value={newTelefonica} /></td>
        <td><input bind:value={newTelematica} /></td>
        <td><input bind:value={newNumber} /></td>
        <td><input bind:value={newYear} /></td>
        <td><Button color="primary" on:click={createCall}>Crear</Button></td>
      </tr>
      {#each dataCalls as call}
        <tr>
          <td>{call.province}</td>
          <td>{call.month}</td>
          <td headers="activacion-telefonica"
            >{call.phone_call_activation_organization}</td
          >
          <td headers="activacion-telematica"
            >{call.telematic_activation_organization}</td
          >
          <td>{call.emergency_call}</td>
          <td>{call.year}</td>
          <td
            ><a href="/emergency-call-stats/{call.province}/{call.month}"
              ><Button color="info">Editar</Button></a
            >
            <Button
              color="danger"
              on:click={deleteCall(call.province, call.month)}>Borrar</Button
            ></td
          >
        </tr>
      {/each}
    </tbody>
    <Button color="danger" on:click={deleteAllCall}>Borrar Todo</Button> <br/>  <br/>
   
  </Table>


  <div id="buttons">
    <Button color="light" on:click={previousPage}>Anterior</Button>
    <Button color="light" on:click={nextPage}>Siguiente</Button>
</div>
  <style>
    td Button {
      width: 70px;
    }
    Table {
      border-collapse: collapse;
      font-family: Arial, sans-serif;
      font-size: 14px;
      text-align: left;
      margin: 5px;
      margin: 0 10px;
    }

    thead tr,
    thead th {
      border: 2px solid #ddd;
      background-color: #f2f2f2;
      font-weight: bold;
    }
    tbody td input {
      width: 110px;
    }
    tbody tr,
    tbody td {
      padding: 5px;
      border: 1px solid #ddd;
      font-weight: grey;
    }

    #col {
      text-align: center;
    }
  </style>
</body>
