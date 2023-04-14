<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Table, Button, Alert } from "sveltestrap";

    onMount(async () => {
        getFiles();
    });

    let API = "/api/v2/self-employed-stats";

    if(dev){
        API = 'http://localhost:8080' + API;
    }

    let datos = [];
    let newFileGenre = "";
    let newFileLive_with = "";
    let newFileTerritory = "";
    let newFileEmployee = "";
    let newFileValue = "";
    let newFileYear = "";

    let result = "";
    let resultStatus = "";
    let message = "";
    let c = "";

    async function getFiles() {
        resultStatus = result = "";
        const res = await fetch(API, {
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
                live_with: newFileLive_with,
                territory: newFileTerritory,
                employee: newFileEmployee,
                value: newFileValue,
                year: newFileYear,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status==201) {
            message = "Fila creada";
            getFiles();
        }else if(status==409){
            message="El dato ya existe (error: 409)"
            c="danger";
        }
        else if(status==400){
            message="Completa los campos (error: 400)"
            c="warning";
        }else if(status == 500){
            message="Error del servidor (error: 500)"
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
            window.alert("Everything is deleted");
        }
    }

    async function view(territory,year) {
        window.location.href = "http://localhost:5173/self-employed-stats/"+territory + "/" + year;
    }

</script>

<main>
    <h1>Estadísticas de autónomos</h1>
    <div class="justify-content-center">
        <Table>
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

    {#if message != ""}
        <Alert color={c}>{message}</Alert>
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
</style>