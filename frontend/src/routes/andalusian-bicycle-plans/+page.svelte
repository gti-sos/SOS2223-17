<script>
  // @ts-nocheck
  
      import { onMount, onDestroy  } from 'svelte';
      import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

      import { dev } from '$app/environment';
      import { Alert,Column, Button, Table } from 'sveltestrap';
      //import { Router,Link } from 'svelte-routing';


        // Define la función setPage que actualiza la página actual
function setPage(pageNumber) {
  page = pageNumber;
}

// Define la función getPages que calcula el número total de páginas
function getPages(totalItems, itemsPerPage) {
  return Math.ceil(totalItems / itemsPerPage);
}

function getTotalPages() {
return Math.ceil(busqueda.length / itemsPerPage);
}

function updateUrl() {
  const url = new URL(window.location);
  url.searchParams.set("page", currentPage);
  url.searchParams.set("totalPages", getTotalPages);
  window.history.pushState({}, '', url);
}




function goToPage(page) {
currentPage = page;
const offset = (currentPage - 1) * itemsPerPage;
const url = `http://localhost:8080/api/v2/andalusian-bicycle-plans?offset=${offset}&limit=${itemsPerPage}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    busqueda = data;
  })
  .catch(error => {
    console.error('Error fetching bicycle plans:', error);
  })
  .finally(() => {
    updateUrl();
  });
}







let offset = 0;
let limit = 10;

let currentPage = 1;
const itemsPerPage = 10;

const pageSize = 10;

const apiUrl = `http://localhost:8080/api/v2/andalusian-bicycle-plans?offset=${(currentPage - 1) * pageSize}&limit=${pageSize}`;



      
  let search = false; // se ha buscado



      onMount(async () => {
          getBicycles();
      });
      
      let API = '/api/v2/andalusian-bicycle-plans';

      let msgVisible=false;

      let checkMSG="";

      let color="success";

      let province,year,from,to, population_over, walking_over, bicycle_over, motorized_percentage_over;

    //  let offset = 0; // offset actual

      let busqueda = []; // objeto tras la busqueda




      
      if(dev)
          API = 'http://localhost:8080'+API
          
      let contacts = [];

      //let newContact = {};

      let newBicycleProvince = '';
      let newBicyclePopulation = '';
      let newBicycleWalking = '';
      let newBicycleBicycle = '';
      let newBicycleYear = '';
      let newBicycleMotorPercentage = '';




      let message = "";

  
      let result = "";
      let resultStatus = "";

      async function loadContacts() {
  const response = await fetch(apiUrl);
  contacts = await response.json();
}
  
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
    
      async function createBicycle() {
  resultStatus = result = "";

  const requiredFields = ['newBicycleProvince', 'newBicyclePopulation',  'newBicycleWalking', 'newBicycleBicycle', 'newBicycleYear', 'newBicycleMotorPercentage'];

  const missingFields = requiredFields.filter(field => !eval(field));

  if (missingFields.length > 0) {
      msgVisible = true;
      color = "danger";
      checkMSG = `Faltan campos: ${missingFields.join(', ')}`;
      return;
  }

  // Nueva comprobación para cada campo requerido
  const nullFields = requiredFields.filter(field => {
      const value = eval(field);
      return value === null || value === undefined || value === "";
  });

  if (nullFields.length > 0) {
      msgVisible = true;
      color = "danger";
      checkMSG = `Los siguientes campos son obligatorios: ${nullFields.join(', ')}`;
      return;
  }

  try {
      const res = await fetch(API, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              province: newBicycleProvince,
              population: Number(newBicyclePopulation),
              walking: Number(newBicycleWalking),
              bicycle: Number(newBicycleBicycle),
              year: Number(newBicycleYear),
              motorized_percentage: Number(newBicycleMotorPercentage)
          })
      });

      const status = await res.status;
      resultStatus = status;

      if (status === 201) {
          msgVisible = true;
          color = "success";
          checkMSG = "Datos de bicicleta creados con éxito";
          getBicycles();
      } else if (status === 405) {
          msgVisible = true;
          color = "danger";
          checkMSG = "Error al crear los datos de bicicleta, comprueba los campos y vuelve a intentarlo";
      } else if (status === 409){
          msgVisible = true;
          color = "danger";
          checkMSG = "Ya existe un registro para esta provincia y año";
      }else{
        msgVisible = true;
        color = "danger";
        checkMSG = "No se completaron alguno/s de los campos requeridos, comprueba que los sean numericos y mayores que 0";
      } 
  } catch (error) {
      console.error(error);
      msgVisible = true;
      color = "danger";
      checkMSG = "Hubo un error al intentar crear los datos de bicicleta, intenta nuevamente más tarde";
  }
}







      //  async function deleteContact(contactName, contactYear) {
      //     let resultStatus = "";
      //     const res = await fetch(API + "?province=" + contactName + "&year=" + contactYear, {
      //     method: 'DELETE'
      //   });

      //   const status = await res.status;
      //   resultStatus = status;

      //   if (status == 200) {
      //       console.log("El contacto se eliminó correctamente");
      //   } else {
      //     console.log("Se produjo un error al eliminar el contacto");
      //   }
      // }


      async function deleteContact(provinceDelete,yearDelete){
try {
  console.log("Deleting single contact... ");
  const res = await fetch(`${API}/${provinceDelete}/${yearDelete}`, {
    method: "DELETE"
  });
  if (res.status==200) {
    msgVisible = true;
    color = "success";
    checkMSG = `Dato ${provinceDelete}, ${yearDelete} eliminado con éxito`;
  } else {
    msgVisible = true;
    color = "danger";
    checkMSG = `Dato ${provinceDelete}, ${yearDelete} no se pudo eliminar, comprueba si existe`;
  }
  getBicycles();
} catch (error) {
  console.error(error);
  msgVisible = true;
  color = "danger";
  checkMSG = `Hubo un error al intentar eliminar el dato ${provinceDelete}, ${yearDelete}`;
}
}


async function deleteAllContacts() {
const res = await fetch(`${API}`, {
  method: "DELETE",
});
if (res.ok) {
  msgVisible = true;
  color = "success";
  checkMSG = "Todos los datos han sido eliminados con éxito";
} else {
  msgVisible = true;
  color = "danger";
  checkMSG = "No se pudo eliminar todos los datos, comprueba si existen";
}
getBicycles();
}

async function searchContact(province, year, from, to, population_over, motorized_percentage_over, walking_over, bicycle_over) {
  busqueda = [];
  let url = `${API}`;
  let query_params = [];
  if (province) {
    query_params.push(`province=${province}`);
  }
  if (year) {
    query_params.push(`year=${year}`);
  }
  
   
   if(bicycle_over){
    query_params.push(`bicycle_over=${bicycle_over}`);
   }
   if(motorized_percentage_over){
    query_params.push(`motorized_percentage_over=${motorized_percentage_over}`);
   }
   if(population_over){
    query_params.push(`population_over=${population_over}`);
   }
   if(walking_over){
    query_params.push(`walking_over=${walking_over}`);
   }     
   
  if (from !== undefined && to !== undefined) {
    if (from <= to) {
      query_params.push(`from=${from}`);
      query_params.push(`to=${to}`);
    } else {
      msgVisible = true;
      color = "danger";
      checkMSG = `El año de inicio debe ser menor o igual al año de fin`;
      return;
    }
  }
  if (query_params.length > 0) {
    url += `?${query_params.join("&")}`;
  }
  const res = await fetch(url);
  if (res.ok) {
    console.log("Buscando datos...");
    search = true;
    const json = await res.json();
    busqueda = json;
    console.log(busqueda);
    console.log(search);
    msgVisible = true;
    color = "success";
    checkMSG = `Busqueda realizada con exito`;
  } else {
    msgVisible = true;
    color = "danger";
    checkMSG = `No se encontraron resultados para los parametros ingresados`;
  }
}









  
  </script>
  <body>
    <div class="page-container">
  <h1> Bicicletas</h1>
  
  <style>
  /* Tabla Personalizada */
  .table-custom {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    text-align: center;
  }

  .table-custom th {
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    padding: 8px;
    white-space: nowrap;
  }

  .table-custom td {
    border: 1px solid #ddd;
    padding: 8px;
    white-space: nowrap;
  }

  .table-custom input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .btn-search {
    background-color: #007bff;
    border: none;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  /* Tabla Básica */
  table {
    border-collapse: collapse;
    width: 100%;
    font-family: Arial, sans-serif;
    font-size: 14px;
    text-align: left;
  }

  th,
  td {
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

  /* Contenedor de la página */
  .page-container {
    margin: 0 50px; /* aplicar margen de 50px en los laterales */
  }

  /* Encabezado de nivel 1 */
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







<Alert color={color} isOpen={msgVisible} toggle={() => (msgVisible = false)}>
{#if checkMSG!=""}
  {checkMSG}
{/if}
</Alert>
<Table bordered class="w-50 text-center mx-auto table-custom table table-bordered table-striped table-hover">
<thead>
  <tr class="bg-light">
    <th>
      Provincia
    </th>
    <th>
      Año (%XXXX)
    </th>
    <th>
      Desde el Año
    </th>
    <th>
      Hasta el Año
    </th>

    

    

    <th>
      Poblacion
      mayor de
    </th>

    <th>
      Km (bicicleta)
      mayor de
    </th>

    <th>
      Km (caminando)
      mayor de
    </th>

    <th>
      % Pob. mot
      mayor de
    </th>
  </tr>
  <tr>
    <td>
      <input bind:value="{province}">
    </td>
    <td>
      <input bind:value="{year}">
    </td>
    <td>
      <input bind:value="{from}">
    </td>
    <td>
      <input bind:value="{to}">
    </td>
    

    

    <td>
      <input bind:value="{population_over}">
    </td>

    <td>
      <input bind:value="{bicycle_over}">
    </td>

    <td>
      <input bind:value="{walking_over}">
    </td>

    <td>
      <input bind:value="{motorized_percentage_over}">
    </td>
  </tr>
</thead>
</Table>
<th style="text-align: center;">
<Button outline color="primary" on:click="{() => searchContact(province, year, from, to, population_over, motorized_percentage_over, bicycle_over, walking_over)}">Buscar</Button>
</th> 




{#if search}
  {#if busqueda.length > 0}
    <Table bordered class="table-custom">
      <thead>
        <tr>
          <th>Provincia</th>
          <th>Población</th>
          <th>Km caminados</th>
          <th>Km bicicleta</th>
          <th>Año</th>
          <th>Porcentaje motorizado</th>
        </tr>
      </thead>
      <tbody>
        {#if busqueda.constructor === Array}
          {#each busqueda as item}
            <tr>
              <td>{item.province}</td>
              <td>{item.population}</td>
              <td>{item.walking}</td>
              <td>{item.bicycle}</td>
              <td>{item.year}</td>
              <td>{item.motorized_percentage}</td>
            </tr>
          {/each}
        {/if}
        {#if busqueda.constructor === Object}
          <tr>
            <td>{busqueda.province}</td>
            <td>{busqueda.population}</td>
            <td>{busqueda.walking}</td>
            <td>{busqueda.bicycle}</td>
            <td>{busqueda.year}</td>
            <td>{busqueda.motorized_percentage}</td>
          </tr>
        {/if}
      </tbody>
    </Table>
  {:else if busqueda.constructor === Object}
    <Table bordered class="table-custom">
      <thead>
        <tr>
          <th>Provincia</th>
          <th>Población</th>
          <th>Km caminados</th>
          <th>Km bicicleta</th>
          <th>Año</th>
          <th>Porcentaje motorizado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{busqueda.province}</td>
          <td>{busqueda.population}</td>
          <td>{busqueda.walking}</td>
          <td>{busqueda.bicycle}</td>
          <td>{busqueda.year}</td>
          <td>{busqueda.motorized_percentage}</td>
        </tr>
      </tbody>
    </Table>
  {:else}
    <p>No se encontraron resultados para la búsqueda.</p>
  {/if}
{/if}









    
  <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th width="150px">Prov.</th>
          <th width="150px">Pob.</th>
          <th width="150px">Km. Caminados</th>
          <th width="150px">km. Bike</th>
          <th width="150px">Año</th>
          <th width="150px">Motoriz.%</th>
          <th width="100px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input placeholder="Provincia" bind:value={newBicycleProvince} ></td>
          <td><input placeholder="Poblacion" bind:value={newBicyclePopulation} ></td>
          <td><input placeholder="km caminados" bind:value={newBicycleWalking} ></td>
          <td><input placeholder="km bicicleta" bind:value={newBicycleBicycle} ></td>
          <td><input placeholder="Anio" bind:value={newBicycleYear} ></td>
          <td><input placeholder="% Motorizacion" bind:value={newBicycleMotorPercentage} ></td>
          <td><Button on:click={createBicycle} class="btn btn-success">Crear</Button></td>
        </tr>
        {#each contacts.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as contact}
        <tr>
            <td><a href="/andalusian-bicycle-plans/{contact.province}/{contact.year}">{contact.province}</a></td>
            <td>{contact.population}</td>
            <td>{contact.walking}</td>
            <td>{contact.bicycle}</td>
            <td>{contact.year}</td>
            <td>{contact.motorized_percentage}</td>
            <td><Button on:click={deleteContact(contact.province, contact.year)} class="btn btn-danger">Borrar</Button></td>
          </tr>
        {/each}
      </tbody>
    </table>

    
    
    <Button on:click={deleteAllContacts} class="btn btn-danger">Borrar todo</Button>


    <Pagination size="lg" ariaLabel="Page navigation example">
      <PaginationItem>
        <PaginationLink first on:click={() => goToPage(1)} href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous on:click={() => goToPage(currentPage-1)} href="#" />
      </PaginationItem>
      {#each Array.from({ length: Math.ceil(contacts.length/itemsPerPage) }, (_, i) => i+1) as page}
        <PaginationItem>
          <PaginationLink on:click={() => goToPage(page)} href="#">{page}</PaginationLink>
        </PaginationItem>
      {/each}
      <PaginationItem>
        <PaginationLink next on:click={() => goToPage(currentPage+1)} href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last on:click={() => goToPage(Math.ceil(contacts.length/itemsPerPage))} href="#" />
      </PaginationItem>
    </Pagination>
    

    
    
  

  </div>
  </body>