<script>
    //@ts-nocheck
    import { Table, Button, Alert } from "sveltestrap";
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    //let BASEURL = 'http://localhost:8080';
    let BASEURL = 'https://sos2223-17.appspot.com';
    let API = "/api/v2/self-employed-stats"
    if(dev){
        API = BASEURL + API;
    }

    let datos = [];
    let nameField="";
    let nameEmployee="";
    let nameProvince="";
    let nameGenre="";
    let nameValue="";
    let nameLive_with="";
    let q="";
    let from ;
    let to;
    /*onMount(async () => {
        searchField(nameField);
    });*/
    let result = "";
    let resultStatus = "";
    let message = "";
    let c = "";
    
    async function searchField(genre, live_with, territory, employee, value, year) {
        
        resultStatus = result = "";
        if(territory!="" && year!=""){
            parseInt(year);
            q = `/${territory}/${year}`;
        } else{
            if(employee!="" && genre==="" && value==="" && live_with==="" && territory==="" && year===""){
                parseInt(employee);
                q = `?employee=${employee}`;
            }
            else if(employee==="" && genre!="" && value==="" && live_with==="" && territory==="" && year===""){
                q = `?genre=${genre}`;
            }
            else if(employee==="" && genre==="" && value!="" && live_with==="" && territory==="" && year===""){
                parseInt(value);
                q = `?value=${value}`;
            }
            else if(employee==="" && genre==="" && value==="" && live_with!="" && territory==="" && year===""){
                parseInt(live_with);
                q = `?live_with=${live_with}`;
            }
            else if(employee==="" && genre==="" && value==="" && live_with==="" && territory!="" && year===""){
                q = `?territory=${territory}`;
            }
            else if(employee==="" && genre==="" && value==="" && live_with==="" && territory==="" && year!=""){
                parseInt(year);
                q = `?year=${year}`;
            }

        }
        const res = await fetch(API + q, {
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
        if(status == 200){
            message = "Dato encontrado";
            c="success";
        }
        else if(status == 404){
            datos=[];
            message = "No existe este dato";
            c="warning";
        }
    }
    async function fromTo(from, to){
        parseInt(from);parseInt(to);
        resultStatus = result = "";
        const res = await fetch(API +`?from=${from}&to=${to}`, {
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
        if(status == 200){
            message = "Dato encontrado";
            c="success";
        }
        else if(status == 404){
            datos=[];
            message = "No existe este dato";
            c="warning";
        }
    }
    
</script>

<main>
    {#if message != ""}
        <Alert color={c} dismissible>{message}</Alert>
    {/if}
    <h4 style="text-align: center">Busca en un intervalo de años</h4>
    <Table>
        <thead>
            <tr>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={from} /></td>
                <td><input bind:value={to} /></td>
                <td>
                    <Button color="info" on:click={fromTo(from, to)}>Buscar intervalo</Button>
                </td>
            </tr>
        </tbody>
    </Table>
    <h4 style="text-align: center;">Busca un recurso</h4>
    <div>
        <Table bordered class="w-25 text-center mx-auto table table-sm">
            <thead>
            <tr class="bg-light">
                <th>Género</th>
                <th>Convivvientes</th>
                <th>Provincia</th>
                <th>Empleado/s</th>
                <th>Valor</th>
                <th>Año</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                <input bind:value={nameGenre}></td>
                <td><input bind:value={nameLive_with}></td>
                <td><input bind:value={nameProvince}></td>
                <td><input bind:value={nameEmployee}></td>
                <td><input bind:value={nameValue}></td>
                <td><input bind:value={nameField}>
                </td>
                <td>
                    <Button color="info" on:click={searchField(nameGenre, nameLive_with, nameProvince, 
                    nameEmployee, nameValue, nameField)}>Buscar</Button>
                </td>
            </tr>
            </tbody>
        </Table>
    </div>

    <Table bordered>
        <thead>
            <tr>
                <th>Género</th>
                <th>Convive con</th>
                <th>Provincia</th>
                <th>Empleado/s</th>
                <th>Valor</th>
                <th>Año</th>
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
                </tr>
            {/each}
        </tbody>
    </Table>
</main>