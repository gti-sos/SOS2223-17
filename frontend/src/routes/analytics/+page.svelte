<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let API_Santi = "/api/v2/emergency-call-stats";
    let API_Salim = "/api/v2/andalusian-bicycle-plans";
    let API_Jose = "/api/v2/self-employed-stats";

    onMount(async () => {
        loadMorrisChart();
    });

    let apiData = [];

    //Prop. Resultados de las llamadas
    let result = "";
    let resultStatus = "";

    async function getDataAPI(url) {
        if (dev) url = "http://localhost:8080" + url;
        resultStatus = result = "";
        const res = await fetch(url, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            apiData = data;
            return apiData;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function loadMorrisChart() {
        let sanpinand = await getDataAPI(API_Santi);
        let salcha = await getDataAPI(API_Salim);
        let josgaroro = await getDataAPI(API_Jose);

        const provinces = [
            "Sevilla",
            "Malaga",
            "Jaen",
            "Cordoba",
            "Huelva",
            "Cadiz",
            "Almeria",
            "Granada",
        ];

        //Mapeo en cada api por provincias

        const combinedData = provinces.map((provincia) => {
            //Filtramos por provincias

            const llamadas = sanpinand.filter((call) => {
                var provinciaNormal = call.province
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                return provinciaNormal === provincia;
            });
            //Reducimos el array a un solo valor
            const valor1 = llamadas.reduce(
                (acc, d) => acc + d.phone_call_activation_organization,
                0
            );
            //filtramos datos SALIM
            const populacion = salcha.filter(
                (bici) => bici.province === provincia
            );
            //reducimos datis SALIM
            const valor2 =
                populacion.reduce((acc, d) => acc + d.population, 0) / 100;

            //filtramos datos JOSE
            const valores = josgaroro.filter((auto) => {
                var provinciaNormal = auto.territory
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                return provinciaNormal === provincia;
            });
            //reducimos datos JOSE
            const valor3 = valores.reduce((acc, d) => acc + d.value, 0);

            // valor de la nueva entrada, 0 si no exite tal entrada
            const newItem = {
                month: provincia,
                value1: llamadas ? valor1 : 0,
                value2: populacion ? valor2 : 0,
                value3: valores ? valor3 : 0,
            };
            return newItem;
        });
       

        Morris.Bar({
            element: "mychart",
            data: combinedData,
            xkey: "month",
            ykeys: ["value1", "value2", "value3"],
            labels: ["sanpinand", "salcha2", "jogaroro"],
            barColors: ["Red", "Green", "blue"],
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
        <div id="mychart" />
        <p class="highcharts-description">
            La gráfica anterior recolecta todos datos de todos cada api de los
            miembros del grupo, las agrupa en provincias y las muestras. En el
            caso de sanpinand, los datos mostrados son el sumatorio de campo
            activaciones via teléfono a los organismos de emergencia, los datos
            de salcha muestran el sumatorio del campo poblacion, y en el caso de
            josgaroro muestra el sumatorio del campo value, represantando el
            valor monetarios de las empresas.
        </p>
    </figure>
</main>
