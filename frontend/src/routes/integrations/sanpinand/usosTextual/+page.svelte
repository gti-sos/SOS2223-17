<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Table } from "sveltestrap";

    let API = "/api/v2/emergency-call-stats";

    let proxy = "https://sos2223-17.appspot.com/proxyspa";

    onMount(async () => {
        getDataUse2();
        getDataUse();
    });

    if (dev) API = "http://localhost:8080" + API;

    let dataApi = [];
    let APIExterna = "https://pokeapi.co/api/v2/pokemon";
    let SWAPIExterna = "http://swapi.dev/api/people";
    let usoArray = [];
    let usoArray2 = [];
    let auxArray = [];
    let auxArray2 = [];

    //Prop. Resultados de las llamadas
    let result = "";
    let resultStatus = "";
    //Obtener Datos de la SWAPI externa (Morris.PIE)
    async function getDataUse2() {
        try {
            const res = await fetch(SWAPIExterna, {
                method: "GET",
            });
            const dataReceived = await res.json();
            const results = dataReceived.results;
            for (const result of results) {
                const res = await fetch(result.homeworld, {
                    method: "GET",
                });
                const results2 = await res.json();
                auxArray2.push({
                    nombre: result.name,
                    altura: Number(result.height),
                    pelo: result.hair_color,
                    genero: result.gender,
                    origen: results2.name,
                });
            }
            console.log(auxArray2);
            usoArray2 = auxArray2;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }

    //Get Data API Ext Use
    async function getDataUse() {
        try {
            const res = await fetch(APIExterna + "?limit=10&offset=20", {
                method: "GET",
            });
            const dataReceived = await res.json();
            const results = dataReceived.results;
            for (const result of results) {
                const res = await fetch(result.url, {
                    method: "GET",
                });
                const dataReceived2 = await res.json();
                const weight = dataReceived2.weight;
                const height = dataReceived2.height;
                const exp = dataReceived2.base_experience;
                const clase = dataReceived2.types.map((obj) => obj.type.name);
                auxArray.push({
                    nombre: result.name,
                    altura: Number((weight * 0.1).toFixed(2)),
                    peso: Number(height),
                    experiencia: exp,
                    tipos: clase,
                });
            }
            usoArray = auxArray;
            //  morrisAPIExt(auxArray);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }

    //Obtener datos de la api externa atraves del proxy
    async function getDataByProxy() {
        resultStatus = result = "";
        const res = await fetch(proxy, {
            method: "GET",
        });
        try {
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived, null, 2);
            dataApi = dataReceived;
            return dataApi;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    
</script>

<svelte:head />
<body>
    <Table hover>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Peso(hg)</th>
                <th>Altura(dm)</th>
                <th>Experiencia Base</th>
                <th>Tipo/s</th>
            </tr>
        </thead>
        <tbody>
            {#each usoArray as pokemon}
                <tr>
                    <td>{pokemon.nombre}</td>
                    <td>{pokemon.peso}</td>
                    <td>{pokemon.altura}</td>
                    <td>{pokemon.experiencia}</td>
                    <td>{pokemon.tipos}</td>
                </tr>
            {/each}
        </tbody>
        <br />
    </Table>
    <Table hover>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Altura(cm)</th>
                <th>Color de Pelo</th>
                <th>Genero</th>
                <th>Planeta Origen</th>
            </tr>
        </thead>
        <tbody>
            {#each usoArray2 as personaje}
                <tr>
                    <td>{personaje.nombre}</td>
                    <td>{personaje.altura}</td>
                    <td>{personaje.pelo}</td>
                    <td>{personaje.genero}</td>
                    <td>{personaje.origen}</td>
                </tr>
            {/each}
        </tbody>
        <br />
    </Table>
</body>

<main />
