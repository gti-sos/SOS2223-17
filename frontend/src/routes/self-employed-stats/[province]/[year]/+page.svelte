<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Table, Button, Alert } from "sveltestrap";
    import { page } from "$app/stores";

    onMount(async () => {
        getFile();
    });

    let province = $page.params.territory;
    let year = $page.params.year;
    let API = "/api/v2/self-employed-stats/" + province + "/" + year;

    if (dev){
        API = "http://localhost:8080" + API;
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
            message = "Error 500, Error interno";
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
                live_with: updatedLive_with,
                territory: updatedProvince,
                employee: updatedEmployee,
                value: updatedValue,
                year: updatedYear,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            message = "Éxito";
            c = "success";
            getFile();
        }else if (status == 400) {
            message = "Error 400, campos incompletos";
            c = "warning";
        } else if (status == 500) {
            message = "Error 500, Error servidor";
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

    <h1 style="text-align:cente"> Autónomo concreto</h1>
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
            <tr>
                <td><input bind:value={updatedGenre}></td>
                <td><input bind:value={updatedLive_with}></td>
                <td>{updatedProvince}</td>
                <td><input bind:value={updatedEmployee}></td>
                <td><input bind:value={updatedValue}></td>
                <td>{updatedYear}</td>
                <td>
                    <Button color="info" on:click={updateData}>Actualizar dato</Button>
                </td>
            </tr>
        </tbody>
    </Table>

    <div class="elementos">
        <ul>
            <li>
                Genre:{updatedGenre}
            </li>
            <li>
                Live_with{updatedLive_with}
            </li>
            <li>
                Territory: {updatedProvince}
            </li>
            <li>
                Employee: {updatedEmployee}
            </li>
            <li>
                Value:{updatedValue}
            </li>
            <li>
                Year: {updatedYear}
            </li>
        </ul>
    </div>
    <Button id="borrar" color="danger" on:click={deleteFile(updatedProvince,updatedYear)}>Borrar dato concreto</Button>
</main>