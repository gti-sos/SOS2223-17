<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>



</svelte:head>


<script>

    // @ts-check
    import { onMount } from 'svelte';
    import Highcharts from 'highcharts/highcharts';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsExporting from 'highcharts/modules/exporting';
    import HighchartsExportData from 'highcharts/modules/export-data';
    import HighchartsAccessibility from 'highcharts/modules/accessibility';
    import { dev } from '$app/environment';

        
    let API = '/api/v2/andalusian-bicycle-plans';
        
        if(dev)
            API = 'http://localhost:8080'+API


  
        let data = []
        let result = "";
    let resultStatus ="";


        async function getData () {
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


    

    
    
/**
 * @param {any[]} graphData
 */
 async function loadChart(graphData) {
  const options = Highcharts.getOptions();
  Highcharts.chart('container', {
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
    },
    title: {
      text: 'Highcharts bubbles with radial gradient fill',
      align: 'left'
    },
    xAxis: {
      gridLineWidth: 1,
      accessibility: {
        rangeDescription: 'Range: 0 to 100.'
      }
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      accessibility: {
        rangeDescription: 'Range: 0 to 100.'
      }
    },
    series: [{
      type: 'bubble',
      data: graphData.map((/** @type {{ motorized_percentage: any; bicycle: any; population: any; walking: any; }} */ obj) => ({
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
      data: graphData.map((/** @type {{ motorized_percentage: any; bicycle: any; population: any; walking: any; }} */ obj) => ({
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
            getData();
        });






</script>


<main>
    <h1>Graph</h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Bubble chart demonstrating a decorative 3D rendering effect using
            gradient fills on the bubbles.
        </p>
    </figure>

    {#if resultStatus != ""}
    <p>
        Result:
    </p>
    <pre>
{resultStatus}
{result}
    </pre>
{/if}

</main>

