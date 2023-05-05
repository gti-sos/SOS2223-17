<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/modules/drilldown.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    //@ts-nocheck
    import {onMount} from 'svelte';
    import { dev } from '$app/environment';
        
        
    let API = '/api/v2/self-employed-stats';
    if(dev)
        API = 'http://localhost:8080'+API
      
    let data = [];
    let result = "";
    let resultStatus = "";

    async function getData(){
        resultStatus = result = "";
        const res = await fetch(API, {
            method: 'GET'
        });
        try{
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived,null,2);
            data = dataReceived;
            loadChart(data);
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status.toString();
    }

    async function loadChart(graphData){
        //sumatorio del campo 'value' por cada provincia andaluza
        let sevilla = graphData.reduce((acumulador, elemento) => { if (elemento.territory === "Sevilla") { return acumulador + elemento.value; } return acumulador; }, 0);
        let huelva = graphData.reduce((acumulador, elemento) => { if (elemento.territory === "Huelva") { return acumulador + elemento.value; } return acumulador; }, 0);
        let malaga = graphData.reduce((acumulador, elemento) => { if (elemento.territory === "Málaga") { return acumulador + elemento.value; } return acumulador; }, 0);
        let granada = graphData.reduce((acumulador, elemento) => { if (elemento.territory === "Granada") { return acumulador + elemento.value; } return acumulador; }, 0);
        let jaen = graphData.reduce((acumulador, elemento) => { if (elemento.territory === "Jaén") { return acumulador + elemento.value; } return acumulador; }, 0);
        let almeria = graphData.reduce((acumulador, elemento) => { if (elemento.territory === "Almería") { return acumulador + elemento.value; } return acumulador; }, 0);
        let cordoba = graphData.reduce((acumulador, elemento) => { if (elemento.territory === "Córdoba") { return acumulador + elemento.value; } return acumulador; }, 0);
        let total = sevilla + huelva + malaga + granada + jaen + almeria + cordoba;
        
        Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            align: 'center',
            text: 'Browser market shares. January, 2022'
        },
        subtitle: {
            align: 'center',
            text: 'Fuente GitHub: <a href="https://github.com/gti-sos/SOS2223-17" target="_blank">gti-sos/SOS2223-17</a>'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Valor total alcanzado por los autónomos'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b>del total<br/>'
        },

        series: [
            {
                name:"autonomos",
                colorByPoint: true,
                data: [
                    {
                        name:"Sevilla",
                        y: sevilla/total*100
                    },
                    {
                        name: "Huelva",
                        y: huelva/total*100
                    },
                    {
                        name:"Almería",
                        y: almeria/total*100
                    },
                    {
                        name:"Córdoba",
                        y: cordoba/total*100
                    },
                    {
                        name:"Málaga",
                        y: malaga/total*100
                    },
                    {
                        name:"Jaén",
                        y: jaen/total*100
                    },
                    {
                        name:"Granada",
                        y: granada/total*100
                    }
                ]

            }
        ],
    });
    }
    
    onMount(async () => {
        getData();
    });
    

</script>
<main>
    <h1 style="text-align:center">Gráfico Autónomos</h1>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfico que muestra un porcentaje por provincia andaluza.
            Cada porcentaje es del total de valor de las empresas
            autónomas en la comunidad.
        </p>
    </figure>
</main>