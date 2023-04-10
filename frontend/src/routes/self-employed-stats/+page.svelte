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
                live_with: parseInt(newFileLive_with),
                territory: newFileTerritory,
                employee: parseInt(newFileEmployee),
                value: parseInt(newFileValue),
                year: parseInt(newFileYear),
            }),
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dato = data;
            
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status==201) {
            getFiles();
        }else if(status==409){
            message="Error 409, Conflict, data already exists"
            c="danger";
        }
        else if(status==400){
            message="Error 400, Bad Request, complete all the fields"
            c="warning";
        }else if(status == 500){
            message="Error 500, Internal Error"
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
    <h1 style=text-align:center>Self-employed Stats</h1>

    <Table>
        <thead>
            <tr>
                <th>Genre</th>
                <th>Live_with</th>
                <th>Territory</th>
                <th>Employee</th>
                <th>Value</th>
                <th>Year</th>
                <th>Action</th>
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
                        <Button color="info" on:click={view(dato.province, dato.year)}>Ir al dato</Button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <h3>Create a data</h3>
    <div>
        <input placeholder="Genre" bind:value={newFileGenre} />
        <input placeholder="Live with" bind:value={newFileLive_with} />
        <input placeholder="Territory" bind:value={newFileTerritory} />
        <input placeholder="Employee" bind:value={newFileEmployee} />
        <input placeholder="Value" bind:value={newFileValue} />
        <input placeholder="Year" bind:value={newFileYear} />
        <Button color="warning" on:click={createFile}>Crear dato</Button>
    </div>

    {#if message != ""}
        <Alert color={c}>{message}</Alert>
    {/if}
    <div id="delete-all">
        <p>Do you want to delete all data?</p>
        <Button color="danger" on:click={deleteAll}>Borrar todo</Button>
    </div>

</main>