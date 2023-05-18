<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let API = "/api/v2/emergency-call-stats";

    onMount(async () => {
        getDataExterna();

        getDataExterna2();
    });

    if (dev) API = "http://localhost:8080" + API;

    let dataApi = [];
    let APIExterna = "https://pokeapi.co/api/v2/pokemon";
    let SWAPIExterna = "https://swapi.dev/api/films";
    let auxArray = [];
    let auxArray2 = [];
    //Prop. Resultados de las llamadas
    let result = "";
    let resultStatus = "";

    //Obtener Datos de la SWAPI externa (Morris.PIE)
    async function getDataExterna2() {
        try {
            const res = await fetch(SWAPIExterna, {
                method: "GET",
            });
            const dataReceived = await res.json();
            const results = dataReceived.results;
            for (const result of results) {
                auxArray2.push({
                    nombre: result.title,
                    numberCharaters: result.characters.length,
                });
            }
            dataApi = auxArray2;
            morriSWAPI(dataApi);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }
    //Funcion Widget Morris/donut con SWAPI
    async function morriSWAPI(dataAPI) {
        let dataSet = [];
        let sum = dataAPI.reduce((acc, film) => acc + film.numberCharaters, 0);

        for (const film of dataAPI) {
            dataSet.push({
                label: film.nombre,
                value: Number(((film.numberCharaters / sum) * 100).toFixed(2)),
            });
        }

        Morris.Donut({
            element: "donutChart",
            data: dataSet,
            colors: [
                "#FFD700",
                "#F0E68C",
                "#FFAC33",
                "#FFA500",
                "#FF8C00",
                "#FF4500",
            ],
            formatter: function (value) {
                return value + "%";
            },
        });
    }

    //Obtener Datos de la POKEAPI externa (Morris.Bar)
    async function getDataExterna() {
        try {
            const res = await fetch(APIExterna + "?limit=6&offset=30", {
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
                auxArray.push({
                    nombre: result.name,
                    altura: Number((weight * 0.1).toFixed(2)),
                    peso: Number(height),
                });
            }
            //console.log(auxArray);
            morrisAPIExt(auxArray);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }

    //Widget de API Externa
    async function morrisAPIExt(datosExternos) {
        Morris.Bar({
            element: "barMorris",
            data: datosExternos,
            xkey: "nombre",
            ykeys: ["altura", "peso"],
            labels: ["altura(dm)", "peso(kg)"],
            barColors: ["Red", "Green"],
            gridTextSize: 9,
            resize: true,
        });
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css"
    />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js"
    ></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"
    ></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="donutChart" />
        <p class="highcharts-description">
            La gráfica anterior representa el porcentaje de numero de personajes
            que han aparecido en cada saga de star wars, solo contando las 6
            primeras peliculas
        </p>
    </figure>
    <figure class="chart-figure">
        <div id="barMorris" />
        <p class="chart-description">
            La gráfica anterior representa la altura en decimetros y el peso en
            kg de cada pokemon
        </p>
    </figure>
</main>
