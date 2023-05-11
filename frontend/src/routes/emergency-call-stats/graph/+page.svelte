<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Highcharts from "highcharts/highcharts";
    import { dev } from "$app/environment";
  

    let API = "/api/v2/emergency-call-stats";

    onMount(async () => {
        getData();
        loadMorrisChart();
    });

    if (dev) API = "http://localhost:8080" + API;

    let dataCalls = [];
    let numberDataCalls = [];

    //Prop. Resultados de las llamadas
    let result = "";
    let resultStatus = "";

    async function getData() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dataCalls = data;
            loadChart(dataCalls);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    async function getNumberCallsJaén() {
        resultStatus = result = "";
        const res = await fetch(API + "?province=Jaén", {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            numberDataCalls = data;
            return numberDataCalls;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function getNumberCallsGranada() {
        resultStatus = result = "";
        const res = await fetch(API + "?province=Granada", {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            numberDataCalls = data;
            return numberDataCalls;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    // Create the chart
    async function loadChart(dataCalls) {
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
        var tipo = ["Activaviones Telefónicas", "Activaviones Telemáticas"];

        //Cálculo de las activaciones Totales
        var activacionesTotales = 0;
        var result = [];
        for (i = 0; i < dataCalls.length; i += 1) {
            activacionesTotales +=
                dataCalls[i].phone_call_activation_organization +
                dataCalls[i].telematic_activation_organization;
        }

        provinces.forEach((provincia) => {
            // Filtrar los datos por categoriacategoría actual
            const provinceData = dataCalls.filter(
                (d) => d.province === provincia
            );

            // Calcular la suma de las activaciones telemáticas y las activaciones por teléfono
            const telematicActivations = provinceData.reduce(
                (acc, d) => acc + d.telematic_activation_organization,
                0
            );

            const phoneActivations = provinceData.reduce(
                (acc, d) => acc + d.phone_call_activation_organization,
                0
            );

            const sum = telematicActivations + phoneActivations;
            // Agregar la categoría y las sumas correspondientes al arreglo de resultados
            result.push({
                province: provincia,
                porcentaje: Number(
                    ((sum / activacionesTotales) * 100).toFixed(2)
                ),
                total: sum,
                tipo: [telematicActivations, phoneActivations],
            });
        });

        var browserData = [];
        var versionsData = [];
        var i;
        var j;
        var dataLen = result.length;
        var drillDataLen;
        var brightness;

        // Build the data arrays
        for (i = 0; i < dataLen; i += 1) {
            // add browser data
            browserData.push({
                name: provinces[i],
                y: result[i].porcentaje,
                color: colors[i],
            });

            //  add version data
            for (j = 0; j < 2; j += 1) {
                brightness = 0.2 - j / 2 / 5;
                versionsData.push({
                    name: tipo[j],
                    y: Number(
                        (
                            (result[i].porcentaje * result[i].tipo[j]) /
                            result[i].total
                        ).toFixed(2)
                    ),
                    color: colors[i],
                });
            }
        }

        Highcharts.chart("container", {
            chart: {
                type: "pie",
            },
            title: {
                text: "Num. activaciones de organismos de emergencia(Via telematica/telefónica), 2019",
                align: "left",
                browserData,
            },
            subtitle: {
                text: 'Source: <a href="https://www.juntadeandalucia.es/datosabiertos/portal/dataset/f52d27eb-4005-4393-a4e6-d9b3fa1944a5/resource/3ca4747f-ad0d-451d-b673-5a5a5a04e602/download/estadistica-emergencias-112-andalucia.ods" target="_blank">emergency-call-stats</a>',
                align: "left",
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ["50%", "50%"],
                },
            },
            tooltip: {
                valueSuffix: "%",
            },
            series: [
                {
                    name: "Browsers",
                    data: browserData,
                    size: "60%",
                    dataLabels: {
                        formatter: function () {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: "#ffffff",
                        distance: -30,
                    },
                },
                {
                    name: "Versions",
                    data: versionsData,
                    size: "80%",
                    innerSize: "60%",
                    dataLabels: {
                        formatter: function () {
                            // display only if larger than 1
                            return this.y > 1
                                ? "<b>" +
                                      this.point.name +
                                      ":</b> " +
                                      this.y +
                                      "%"
                                : null;
                        },
                    },
                    id: "versions",
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 400,
                        },
                        chartOptions: {
                            series: [
                                {},
                                {
                                    id: "versions",
                                    dataLabels: {
                                        enabled: false,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        });
    }

    async function loadMorrisChart() {
        let jaenData = await getNumberCallsJaén();
        let granadaData = await getNumberCallsGranada();
        console.log(jaenData);
        console.log(granadaData);

        const monthsInOrder = [
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
//Mapeo en el orden declardo en monthsInOrder, si coinciden empieza el mapeo
        const combinedData = monthsInOrder.map((month) => {
            const jaenItem = jaenData.find((item) => item.month === month);
            const granadaItem = granadaData.find(
                (item) => item.month === month
            );
// valor de la nueva entrada, 0 si no exite tal entrada
            const newItem = {
                month: month,
                numberCalls1: jaenItem ? jaenItem.emergency_call : 0,
                numberCalls2: granadaItem ? granadaItem.emergency_call : 0,
            };
            return newItem;
        });
        console.log(combinedData);

        Morris.Bar({
            element: "mychart",
            data: combinedData,
            xkey: "month",
            ykeys: ["numberCalls1", "numberCalls2"],
            labels: ["Jaén", "Granada"],
            barColors: ["Red", "Green"],
            gridTextSize: 9,
            resize:true,
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
            La gráfica anterior representa el número de activaciones a organismos 
            de emergencia tanto telemática como telefónica, de las comunidad autónoma de Andalucía del año 2019,
            utilizando todos los datos contenidos en nuestra API.
        </p>
    </figure>
    <figure class="highcharts-figure">
        <div id="mychart" />
        <p class="highcharts-description">
            La gráfica anterior representa el número de activaciones de llamadas totales al 112 en cada mes del año 2019,
            la verde representa los datos de Granada y al roja de Jaén.
        </p>
    </figure>
</main>
