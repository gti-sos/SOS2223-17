<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Table, Button, Alert } from "sveltestrap";
    import { page } from "$app/stores";

    onMount(async () => {
        getFile();
    });

    let province = $page.params.province;
    let year = $page.params.year;
    //let BASEURL = 'http://localhost:8080';
    let BASEURL = 'https://sos2223-17.appspot.com';
    let API = "/api/v2/self-employed-stats/" + province + "/" + year;

    if (dev){
        API = BASEURL + API;
    }

    let dato = [];
    let result = "";
    let resultStatus = "";
    let message = "";
    let c = "";

    async function getFile() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dato = data;
            updatedGenre = dato.genre;
            updatedLive_with = dato.live_with;
            updatedProvince = dato.territory;
            updatedEmployee = dato.employee;
            updatedValue = dato.value;
            updatedYear = dato.year;
        }
         catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 500) {
            message = "Error interno";
            c = "danger";
        }
    }
    
    let updatedGenre = "";
    let updatedLive_with =  "";
    let updatedProvince = province;
    let updatedEmployee =  "";
    let updatedValue =  "";
    let updatedYear = year;

    async function updateData() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                genre: updatedGenre,
                live_with: parseInt(updatedLive_with),
                territory: updatedProvince,
                employee: parseInt(updatedEmployee),
                value: parseInt(updatedValue),
                year: updatedYear,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            message = "Éxito al editar";
            c = "success";
            getFile();
        }else if (status == 400) {
            message = "Campos incompletos";
            c = "warning";
        } else if (status == 500) {
            message = "Error servidor";
            c = "danger";
        }
    }

    async function deleteFile(province,year) {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            const elementos = document.getElementsByClassName("elementos");
            for(let i=0; i<elementos.length; i++){
                elementos[i].textContent = "";
            }
            
            message = "Item borrado";
            c = "success";
        }
    }

</script>

<main>
    {#if message != ""}
        <Alert color={c}>{message}</Alert>
    {/if}
    <div class="elementos">
    <h1> Estadística autónomo concreto</h1>
    <hr>
    <Table>
        <thead>
            <tr>
                <th>Género</th>
                <th>Convive con</th>
                <th>Territorio</th>
                <th>Empleado/s</th>
                <th>Valor</th>
                <th>Año</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={updatedGenre}></td>
                <td><input bind:value={updatedLive_with}></td>
                <td>{updatedProvince}</td>
                <td><input bind:value={updatedEmployee}></td>
                <td><input bind:value={updatedValue}></td>
                <td>{updatedYear}</td>
                <td>
                    <Button color="info" on:click={updateData}>Editar dato</Button>
                </td>
            </tr>
        </tbody>
    </Table>

    <div>
        <ul>
            <li>
                Género: {updatedGenre}
            </li>
            <li>
                Convive con: {updatedLive_with}
            </li>
            <li>
                Provincia: {updatedProvince}
            </li>
            <li>
                Empleado/s: {updatedEmployee}
            </li>
            <li>
                Valor: {updatedValue}
            </li>
            <li>
                Año: {updatedYear}
            </li>
        </ul>
    </div>
    <Button id="borrar" color="danger" on:click={deleteFile(updatedProvince,updatedYear)}>Borrar dato concreto</Button>
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
</style>