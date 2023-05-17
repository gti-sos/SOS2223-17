<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Highcharts from "highcharts/highcharts";
    import { dev } from "$app/environment";

    let API = "/api/v2/emergency-call-stats";

    let proxy = "https://sos2223-17.appspot.com/proxyspa";
    let APISOS =
        "https://sos2223-19.appspot.com/api/v2/occupancy-of-accomodation-in-rural-tourism";

    onMount(async () => {
        loadChart();
        createMorrisLineChart();
    });
    if (dev) API = "http://localhost:8080" + API;

    //Array auxiliares
    let dataApi = [];
    let arrayAux = [];
    let arrayAux2 = [];

    //Prop. Resultados de las llamadas
    let result = "";
    let resultStatus = "";

    //Obtener datos de la api externa atraves del proxy
    async function getDataByProxy() {
        resultStatus = result = "";
        const res = await fetch(proxy + "?year=2019", {
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
    //Obtener datos de mi API
    async function getData() {
        resultStatus = result = "";
        const res = await fetch(API + "?year=2019", {
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
        resultStatus = status.toString();
    }

    async function getDataSOS() {
        resultStatus = result = "";
        const res = await fetch(APISOS + "?province=Almeria", {
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

    //Obtener datos de mi API
    async function getData2() {
        resultStatus = result = "";
        const res = await fetch(API + "?year=2019&province=Almería", {
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
        resultStatus = status.toString();
    }

    //Morris.line integrations
    async function createMorrisLineChart() {
        const data = await getDataSOS();

        const data2 = await getData2();
       
        const months = [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
        ];
        const meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        const mapeoMonths = {
            january: "01",
            february: "02",
            march: "03",
            april: "04",
            may: "05",
            june: "06",
            july: "07",
            august: "08",
            september: "09",
            october: "10",
            november: "11",
            december: "12",
        };

        months.forEach((mes) => {
            // Filtrar los datos por provincia
            const provinceData = data2.filter((d) => d.month === mes);
           

            if (provinceData.length > 0) {
                arrayAux2.push({
                    month: mes,
                    valor: provinceData[0].emergency_call,
                });
            } else {
                arrayAux2s.push({
                    month: mes,
                    valor: 0,
                });
            }
        });

        meses.forEach((mes) => {
            // Filtrar los datos por provincia
            const provinceData = data.filter((d) => d.month === mes);
           
            // Agregar la provincia y la media calculada
            if (provinceData.length > 0) {
                arrayAux.push({
                    month: mes,
                    valorSOS: Number(provinceData[0].traveller.toFixed(2)),
                });
            } else {
                arrayAux.push({
                    month: mes,
                    valorSOS: 0,
                });
            }
        });


        // Unir los dos arrays y obtener la estructura deseada
        const lineChartData = arrayAux.map((element, index) => {
            const mes = arrayAux2[index].month;
            const num = mapeoMonths[mes];
            const year = "2019";

            return {
                year: `${year}-${num}`,
                value1: element.valorSOS,
                value2: arrayAux2[index].valor,
            };
        });

       
        // Configuración del gráfico
        const config = {
            element: "chart",
            data: lineChartData,
            xkey: "year",
            ykeys: ["value2", "value1"],
            labels: ["Número de llamadas al 112", "Número de Turistas"],
            lineColors: ["#FF6384", "#36A2EB"],
        };

        // Crear el gráfico
        new Morris.Line(config);
    }

    // Create the chart
    async function loadChart() {
        var dataExt = await getDataByProxy();
        var dataCalls = await getData();
        // console.log(dataExt);

        var result = [];
        var resultExt = [];

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

        provinces.forEach((provincia) => {
            // Filtrar los datos por provincia
            const provinceData = dataCalls.filter(
                (d) => d.province === provincia
            );
            //normalizarlo quitandole las tildes
            var provinciaNormal = provincia
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

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
            );

            // Agregar la provincia y la media de empleados
            resultExt.push(empleadosNum);

            //Dividimos entre 12 para la Media
            const media = phoneActivations / 12;
            // Agregar la provincia y la media calculada
            result.push(Number(media.toFixed(2)));
        });

        Highcharts.chart("container", {
            chart: {
                type: "spline",
            },
            title: {
                text: "Media de Actiaciones / Num. Empleados",
            },
            subtitle: {
                text:
                    "Source:" +
                    '<a href="https://sos2223-13.appspot.com/api/v2/employment" ' +
                    'target="_blank">API SOS</a>' +
                    "</br>" +
                    '<a href="https://sos2223-17.appspot.com/api/v2/emergency-call-stats" ' +
                    'target="_blank">API propia</a>',
            },
            xAxis: {
                categories: provinces,
                accessibility: {
                    description: "Provincias de Andalucía",
                },
            },
            yAxis: {
                title: {
                    text: "Number",
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    },
                },
            },
            tooltip: {
                crosshairs: true,
                shared: true,
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: "#666666",
                        lineWidth: 1,
                    },
                },
            },
            series: [
                {
                    name: "Media de Activaciones Telefónicas al mes",
                    marker: {
                        symbol: "square",
                    },
                    data: result,
                },
                {
                    name: "Empleados",
                    marker: {
                        symbol: "diamond",
                    },
                    data: resultExt,
                },
            ],
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
    <figure class="chart-figure">
        <div id="chart" />
        <p class="chart-description">
            La gráfica anterior representa la media de turistas y el número de
            llamadas de emergencias de cada mes durante el año 2019 en la
            provincia de ALmeríaf
        </p>
    </figure>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            La gráfica anterior representa la media de activaciones telefónicas
            a los organismos de emergencia y el numero de empleados, de las
            comunidad autónoma de Andalucía del año 2019, utilizando todos los
            datos contenidos en nuestra API.
        </p>
    </figure>
</main>
