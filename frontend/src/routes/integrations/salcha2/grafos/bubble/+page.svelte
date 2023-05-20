<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import Highcharts from 'highcharts/highcharts';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsExporting from 'highcharts/modules/exporting';
    import HighchartsExportData from 'highcharts/modules/export-data';
    import HighchartsAccessibility from 'highcharts/modules/accessibility';
    import { dev } from '$app/environment';

    let API = '/api/v1/andalusian-bicycle-plans';

    if (dev) {
        API = 'http://localhost:8080' + API;
    }

    let data = [];
    let result = "";
    let resultStatus = "";

    async function getData() {
  try {
    const response = await fetch(API, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const dataReceived = await response.json();
    result = JSON.stringify(dataReceived, null, 2);
    data = dataReceived;
    loadChart(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    resultStatus = 'Error';
  }
}


    /**
     * @param {any[]} graphData
     */
    function loadChart(graphData) {
        const options = Highcharts.getOptions();
        const darkUnica = options.chart && options.chart.style && options.chart.style.name === 'dark-unica' ? options.chart.style : undefined;
        Highcharts.chart('container', {
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                style: darkUnica
            },
            title: {
                text: 'Highcharts bubbles with radial gradient fill',
                align: 'left',
            },
            xAxis: {
              title: {
                text: 'Porcentaje de Uso de Vehículos Motorizados',
              },
                gridLineWidth: 1,
                accessibility: {
                    rangeDescription: 'Range: 0 to 100.'
                }
            },
            yAxis: {
                title: {
        text: 'Uso de Bicicletas',
      },
                startOnTick: false,
                endOnTick: false,
                accessibility: {
                    rangeDescription: 'Range: 0 to 100.'
                }
            },
            series: [{
                type: 'bubble',
                data: graphData.map((obj) => ({
                    x: obj.motorized_percentage,
                    y: obj.bicycle,
                    z: obj.population,
                    marker: {
                        radius: Math.sqrt(obj.population) / 3,
                    }
                })),
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.color((options.colors || [])[1] || '#000000').setOpacity(0.5).get('rgba').toString()]
                        ]
                    }
                }
            }, {
                type: 'bubble',
                data: graphData.map((obj) => ({
                    x: obj.motorized_percentage,
                    y: obj.population,
                    z: obj.bicycle,
                    marker: {
                        radius: obj.walking * 10,
                    }
                })),
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.color((options.colors || [])[2] || '#000000').setOpacity(0.5).get('rgba').toString()]
                        ]
                    }
                }
            }]
        });
    }

    onMount(async () => {
        HighchartsMore(Highcharts);
        HighchartsExporting(Highcharts);
        HighchartsExportData(Highcharts);
        HighchartsAccessibility(Highcharts);
        await getData();
    });
</script>

<main>
    <h1>Gráfico de Burbujas</h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          Gráfico de burbujas que muestra la relación entre el porcentaje de uso de vehículos motorizados y el uso de bicicletas.
        </p>
    </figure>

   
</main>
