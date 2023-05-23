<svelte:head>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-more.js"></script>
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import Highcharts from 'highcharts';

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
      loadBarChart(data);
      loadAreaChart(data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }

  function loadBarChart(data: any[]) {
    const chartData = [['Provincia', 'Caminando', 'En Bicicleta']];
    const provinceMap: { [key: string]: any[] } = {};

    data.forEach(item => {
      const province = item.province;
      if (!(province in provinceMap)) {
        provinceMap[province] = [province, item.walking, item.bicycle];
      } else {
        provinceMap[province][1] += item.walking;
        provinceMap[province][2] += item.bicycle;
      }
    });
    Object.keys(provinceMap).map(key => provinceMap[key]).forEach(provinceData => {
      chartData.push(provinceData);
    });

    const options: google.visualization.BarChartOptions = {
      title: 'Porcentaje de desplazamiento en Andalucía',
      legend: { position: 'top' },
      chartArea: { width: '50%', height: '70%' },
      hAxis: { title: 'Porcentaje de desplazamiento' },
      vAxis: { title: 'Provincia' },
    };

    const chartContainer = document.getElementById('bar-chart');
    if (!chartContainer) return;
    const chart = new google.visualization.BarChart(chartContainer);
    chart.draw(google.visualization.arrayToDataTable(chartData), options);
  }

  function loadAreaChart(data: any[]) {
    const chartData = data.map(item => ({
      name: item.province,
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
      series: chartData.map(item => ({
        name: item.name,
        type: 'area',
        data: item.data
      }))
    };

    const chartContainer = document.getElementById('area-chart');
    if (!chartContainer) return;
    Highcharts.chart(chartContainer, options);
  }

  onMount(() => {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(getData);
  });
</script>

<div id="bar-chart" style="height: 500px;"></div>
<div id="area-chart" style="height: 800px;"></div>
