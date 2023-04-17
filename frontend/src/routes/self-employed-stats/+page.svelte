<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Table, Button, Alert } from "sveltestrap";

    onMount(async () => {
        getFiles();
    });

    //let BASEURL = 'http://localhost:8080';
    let BASEURL = 'https://sos2223-17.appspot.com';
    let API = "/api/v2/self-employed-stats";

    if(dev){
        API = BASEURL + API;
    }

    let datos = [];
    let newFileGenre = "";
    let newFileLive_with = "";
    let newFileTerritory = "";
    let newFileEmployee = "";
    let newFileValue = "";
    let newFileYear = "";

    let limit = 10;
    let offset = 0;
    let pag = `?limit=${limit}&offset=${offset}`;

    let result = "";
    let resultStatus = "";
    let message = "";
    let c = "";

    async function getFiles() {
        resultStatus = result = "";
        const res = await fetch(API + pag, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function createFile() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                genre: newFileGenre,
                live_with: parseInt(newFileLive_with),
                territory: newFileTerritory,
                employee: parseInt(newFileEmployee),
                value: parseInt(newFileValue),
                year: parseInt(newFileYear),
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status==201) {
            message = "Fila creada";
            getFiles();
        }else if(status==409){
            message="El dato ya existe"
            c="danger";
        }
        else if(status==400){
            message="Completa los campos"
            c="warning";
        }else if(status == 500){
            message="Error del servidor"
            c="danger";
        }
    }

    async function deleteAll() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status==200) {
            location.reload();
            window.alert("Borrado todos los elementos");
        }
    }

    async function previousPage() {
        offset = offset - limit;
        if(offset<0){
            message = "Estás en el principio";
            c = "warning";
            offset = offset + limit;
        }
        else {
            pag = `?limit=${limit}&offset=${offset}`;
            getFiles();
        }
    }

    async function nextPage() {
        //offset = 0;
        offset = offset + limit;
        if(offset>datos.length){
            message = "Has llegado al final";
            c = "warning";
            offset = offset - limit;
        }
        else{
            pag = `?limit=${limit}&offset=${offset}`;
            getFiles();            
        }        
    }

    async function view(territory,year) {
        window.location.href = "https://sos2223-17.appspot.com/self-employed-stats/" + territory + "/" + year;
    }
    async function searchPage() {
        window.location.href = "https://sos2223-17.appspot.com/self-employed-stats/search";
    }

</script>

<main>
    <h1>Estadísticas de autónomos</h1>
    <div class="justify-content-center">
        <Table bordered>
            <thead>
                <tr>
                    <th>Género</th>
                    <th>Convive con</th>
                    <th>Provincia</th>
                    <th>Empleado/s</th>
                    <th>Valor</th>
                    <th>Año</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {#each datos as dato}
                    <tr>
                        <td>{dato.genre}</td>
                        <td>{dato.live_with}</td>
                        <td>{dato.territory}</td>
                        <td>{dato.employee}</td>
                        <td>{dato.value}</td>
                        <td>{dato.year}</td>
                        <td>
                            <Button color="info" on:click={view(dato.territory, dato.year)}>Ir al dato</Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    </div>

    <div id="buttons">
        <Button color="dark" on:click={previousPage}>Anterior</Button>
        <Button color="dark" on:click={nextPage}>Siguiente</Button>
    </div>

    <hr>
    <h4>Añade un dato</h4>
    <div class="createData">
        <input placeholder="Género" bind:value={newFileGenre} />
        <input placeholder="Convive con" bind:value={newFileLive_with} />
        <input placeholder="Provincia" bind:value={newFileTerritory} />
        <input placeholder="Empleado/s" bind:value={newFileEmployee} />
        <input placeholder="Valor" bind:value={newFileValue} />
        <input placeholder="Año" bind:value={newFileYear} />
        <Button color="warning" on:click={createFile}>Crear dato</Button>
    </div>
    <hr>
    <div id="search">
    <h4>Busca por un campo determinado</h4>
    <Button color="secondary" on:click={searchPage}>Ir a búscqueda</Button>
    </div>
    {#if message != ""}
        <Alert color={c} dismissible>{message}</Alert>
    {/if}
    <div id="delete-all">
        <hr>
        <h4>¿Quieres borrar todos los datos?</h4>
        <Button color="danger" on:click={deleteAll}>Borrar todo</Button>
    </div>

</main>

<style>
    h1 {
        font-weight: bold;
        text-align: center;
        color: #333;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: normal;

      }
      h4 {
        font-weight: bold;
        text-align: center;
        color: #333;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: normal;

      }
      #delete-all{
        text-align: center;
      }
      #search{
        text-align: center;
      }
      #buttons{
        text-align: center;
      }
</style>