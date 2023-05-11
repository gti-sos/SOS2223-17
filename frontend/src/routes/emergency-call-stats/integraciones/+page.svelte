<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Highcharts from "highcharts/highcharts";
    import { dev } from "$app/environment";
  

    let API = "/api/v2/emergency-call-stats";

    let proxy = "http://localhost:8080/proxyspa"


    onMount(async () => {
        loadChart();
    });

    if (dev) API = "http://localhost:8080" + API;

    let dataApi = [];


    //Prop. Resultados de las llamadas
    let result = "";
    let resultStatus = "";

    async function getDataByProxy() {
        resultStatus = result = "";
        const res = await fetch(proxy+"?year=2019", {
            method: "GET",
        });
        try {
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived,null,2);
            dataApi = dataReceived;
            return dataApi;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    async function getData(){
        resultStatus = result = "";
        const res = await fetch(API+"?year=2019", {
            method: 'GET'
        });
        try{
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived,null,2);
            dataApi = dataReceived;
           return dataApi;
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status.toString();
    }


    // Create the chart
    async function loadChart() {
       var dataExt = await getDataByProxy();
       var dataCalls = await getData(); 
       console.log(dataExt);

       var result = [];
       var resultExt = [];
     
        var colors = Highcharts.getOptions().colors;

        var provinces = [
            "Almería",
            "Cádiz",
            "Córdoba",
            "Granada",
            "Huelva",
            "Jaén",
            "Málaga",
            "Sevilla",
        ];
        var tipo = ["Media Activaviones Telefónicas"];
        

        provinces.forEach((provincia) => {
            // Filtrar los datos por provincia
            const provinceData = dataCalls.filter(
                (d) => d.province=== provincia
            );
           var  provinciaNormal = provincia.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            // Filtrar los datos por provincia
            const provinceDataExt = dataExt.filter(
                (d) => d.region === provinciaNormal
            );

            //Sumatorio de las activaciones de cada mes

            const phoneActivations = provinceData.reduce(
                (acc, d) => acc + d.phone_call_activation_organization,
                0
            ); 
            //Sumatorio de las activaciones de cada mes

            const empleadosNum = provinceDataExt.reduce(
                (acc, d) => acc + d.employed_person,
                0
            )

             // Agregar la provincia y la media de empleados

            resultExt.push(empleadosNum);
            //Dividimos entre 12 para la Media
            const media = phoneActivations/12;
            // Agregar la provincia y la media calculada
            result.push(Number (media.toFixed(2)));
        });

        console.log(result);
        console.log(resultExt);

        Highcharts.chart('container', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Media de Actiaciones / Num. Empleados'
    },
    subtitle: {
        text: 'Source:' +
            '<a href="https://sos2223-13.appspot.com/api/v2/employment" ' +
            'target="_blank">API SOS</a>'+"</br>"
            +'<a href="https://sos2223-17.appspot.com/api/v2/emergency-call-stats" ' +
            'target="_blank">API propia</a>'
    },
    xAxis: {
        categories: provinces,
        accessibility: {
            description: 'Provincias de Andalucía'
        }
    },
    yAxis: {
        title: {
            text: 'Number'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'Media de Activaciones Telefónicas al mes',
        marker: {
            symbol: 'square'
        },
        data: result

    }, {
        name: 'Empleados',
        marker: {
            symbol: 'diamond'
        },
        data: resultExt
    }]
});

    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
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
        <div id="container" />
        <p class="highcharts-description">
            La gráfica anterior representa la media de activaciones telefónicas a los organismos de emergencia y el numero de empleados, de las comunidad autónoma de Andalucía del año 2019,
            utilizando todos los datos contenidos en nuestra API.
        </p>
    </figure>

</main>
