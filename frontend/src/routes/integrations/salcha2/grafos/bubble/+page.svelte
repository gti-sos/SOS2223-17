<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import Highcharts from 'highcharts/highcharts';

  let API = '/api/v1/andalusian-bicycle-plans';

  if (dev)
    API = 'http://localhost:8080' + API;

  let data = [];

  async function getData() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const dataReceived = await res.json();
      data = dataReceived;
      loadChart(data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }

  function loadChart(data: any[]) {
    const chartData: Highcharts.SeriesOptionsType[] = data.map(item => ({
      name: item.province,
      type: 'area',
      data: [
        item.walking,
        item.car_driver,
        item.accompanying_car,
        item.motorcycle,
        item.bicycle,
        item.public_transport,
        item.other_transportation
      ]
    }));

    const options: Highcharts.Options = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Comparación de Métodos de Transporte en Provincias de Andalucía'
      },
      xAxis: {
        categories: [
          'Caminando',
          'Conducir (Coche)',
          'Acompañante (Coche)',
          'Motocicleta',
          'Bicicleta',
          'Transporte Público',
          'Otros Transportes'
        ]
      },
      yAxis: {
        title: {
          text: 'Porcentaje de Uso'
        }
      },
      plotOptions: {
        area: {
          fillOpacity: 0.5
        }
      },
      series: chartData
    };

    const chartContainer = document.getElementById('chart');
    if (!chartContainer) return;
    Highcharts.chart(chartContainer, options);
  }

  onMount(() => {
    getData();
  });
</script>

<div id="chart" style="height: 800px;"></div>
