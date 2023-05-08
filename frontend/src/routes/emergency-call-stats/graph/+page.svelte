<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Highcharts from "highcharts/highcharts";
    import { dev } from "$app/environment";
    import { Alert, Column, Button, Table } from "sveltestrap";

    let API = "/api/v2/emergency-call-stats";

    onMount(async () => {
        getData();
        
    });

    if (dev) API = "http://localhost:8080" + API;

    let dataCalls = [];

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

    // Create the chart
    async function loadChart(dataCalls) {
        console.log(dataCalls);
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
        var tipo = [
            "Activaviones Telefónicas",
            "Activaviones Telemáticas"
        ];


        //Cálculo de las activaciones Totales
        var activacionesTotales = 0;
        var result = [];
        for (i = 0; i < dataCalls.length; i += 1) {
            activacionesTotales +=
                dataCalls[i].phone_call_activation_organization +
                dataCalls[i].telematic_activation_organization;
        }
        console.log(activacionesTotales);

        provinces.forEach((provincia) => {
            // Filtrar los datos por categoriacategoría actual
            const provinceData = dataCalls.filter((d) => d.province === provincia);

            // Calcular la suma de las activaciones telemáticas y las activaciones por teléfono
            const telematicActivations = provinceData.reduce((acc, d) =>
                acc + d.telematic_activation_organization,0);

            const phoneActivations = provinceData.reduce((acc, d) =>
                acc + d.phone_call_activation_organization, 0);

            const sum = telematicActivations+phoneActivations;
            // Agregar la categoría y las sumas correspondientes al arreglo de resultados
            result.push({
                province : provincia,
                porcentaje : Number(((sum/activacionesTotales)*100).toFixed(2)),
                total : sum,
                tipo:[
                telematicActivations,
                phoneActivations
            ]
            });
            console.log(result);
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
                    y: Number(((result[i].porcentaje * result[i].tipo[j])/result[i].total).toFixed(2)),
                    color: colors[i],
                });
                console.log(versionsData);
            }
        }

        Highcharts.chart("container", {
            chart: {
                type: "pie",
            },
            title: {
                text: "Browser market share, January, 2022",
                align: "left",browserData
            },
            subtitle: {
                text: 'Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
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
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            In Highcharts, pies can also be hollow, in which case they are
            commonly referred to as donut charts. This pie also has an inner
            chart, resulting in a hierarchical type of visualization.
        </p>
    </figure>
</main>
