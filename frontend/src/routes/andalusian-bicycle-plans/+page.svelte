<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Alert,Column, Button, Table } from 'sveltestrap';
        
    let search = false; // se ha buscado



        onMount(async () => {
            getBicycles();
        });
        
        let API = '/api/v2/andalusian-bicycle-plans';

        let msgVisible=false;

        let checkMSG="";

        let color="success";

        let province,year;

        let offset = 0; // offset actual

        let busqueda = {}; // objeto tras la busqueda




        
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
      
        async function createBicycle() {
    resultStatus = result = "";

    const requiredFields = ['newBicycleProvince', 'newBicycleMunicipality', 'newBicyclePopulation', 'newBicycleAllDispacement', 'newBicycleWalking', 'newBicycleCarDriver', 'newBicycleAccompaningCar', 'newBicycleMotorcycle', 'newBicycleBicycle', 'newBicyclePublicTransport', 'newBicycleOtherTransport', 'newBicycleYear', 'newBicycleMotorPercentage'];

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
                municipality: Number(newBicycleMunicipality),
                population: Number(newBicyclePopulation),
                all_displacement: Number(newBicycleAllDispacement),
                walking: Number(newBicycleWalking),
                car_driver: Number(newBicycleCarDriver),
                accompanying_car: Number(newBicycleAccompaningCar),
                motorcycle: Number(newBicycleMotorcycle),
                bicycle: Number(newBicycleBicycle),
                public_transport: Number(newBicyclePublicTransport),
                other_transportation: Number(newBicycleOtherTransport),
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
          checkMSG = "No se completaron alguno/s de los campos requeridos";
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

async function searchContact(province,year){
		offset = 0;
		const res = await fetch(API+"/" + province + "/" + year);

		if(res.ok){
			console.log("Buscando data... ");
			search = true;
			const json =  await res.json();
			busqueda = json;
			console.log(busqueda);
			console.log(search);
			msgVisible = true;
			color = "success";
			checkMSG = `Busqueda realizada con exito`;
		}
		else {
			msgVisible = true;
			color = "danger";
			checkMSG = `No se encontro el pais ${province} con los datos del anyo ${year}`;
		}

	}








    
    </script>
    <body>
      <div class="page-container">
    <h1> Bicicletas</h1>
    
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



<Alert color={color} isOpen={msgVisible} toggle={() => (msgVisible = false)}>
  {#if checkMSG!=""}
    {checkMSG}
  {/if}
</Alert>
<Table bordered class="w-50 text-center mx-auto">
  <thead>
    <tr class="bg-light">
      <th>
        Provincia
      </th>
      <th>
        Año
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
        <Button outline color="primary" on:click="{searchContact(province,year)}">Buscar</Button>
      </td>
    </tr>
    
    
  </thead>
</Table>
{#if search}
  <Table bordered class="w-50 mx-auto">
    <tr>
      <th>
        Provincia
      </th>
      <th>
        Municipio
      </th>
      <th>
        Poblacion
      </th>
      <th>
        Despazamiento
      </th>
      <th>
        Km caminados
      </th>
      <th>
        Gasolina coche
      </th>
      <th>
        Acompañante. coche
      </th>
      <th>
        Gasolina motor
      </th>
      <th>
        Km bicicleta
      </th>
      <th>
        Transporte publico
      </th>
      <th>
        Otro trasporte
      </th>
      <th>
        Año
      </th>
      <th>
        Porcentaje motorizado
      </th>
    </tr>
    <tr>
      <td>
        {busqueda.province}
      </td>
      <td>
        {busqueda.municipality}
      </td>
      <td>
        {busqueda.population}
      </td>
      <td>
        {busqueda.all_displacement}
      </td>
      <td>
        {busqueda.walking}
      </td>
      <td>
        {busqueda.car_driver}
      </td>
      <td>
        {busqueda.accompanying_car}
      </td>
      <td>
        {busqueda.motorcycle}
      </td>
      <td>
        {busqueda.bicycle}
      </td>
      <td>
        {busqueda.public_transport}
      </td>
      <td>
        {busqueda.other_transportation}
      </td>
      <td>
        {busqueda.year}
      </td>
      <td>
        {busqueda.motorized_percentage}
      </td>
    </tr>
  </Table>
{/if}

      
    <table class="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th width="115px">Prov.</th>
            <th>Mun.</th>
            <th width="89px">Pob.</th>
            <th width="89px">Desp.</th>
            <th>Km. Caminados</th>
            <th>Car</th>
            <th>Km. Coche</th>
            <th>km. Moto</th>
            <th>km. Bike</th>
            <th>Transp. Publ</th>
            <th>Otr. Transp.</th>
            <th width="79px">Año</th>
            <th width="40px">Motoriz.%</th>
            <th>Action</th>
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
            <td><Button on:click={createBicycle} class="btn btn-success">Crear</Button></td>
          </tr>
          {#each contacts as contact}
            <tr>
              <td><a href="/andalusian-bicycle-plans/{contact.province}/{contact.year}">{contact.province}</a></td>
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
              <td><Button on:click={deleteContact(contact.province, contact.year)} class="btn btn-danger">Borrar</Button></td>
            </tr>
          {/each}
        </tbody>
      </table>
      
      <Button on:click={deleteAllContacts} class="btn btn-danger">Borrar todo</Button>


      
      
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