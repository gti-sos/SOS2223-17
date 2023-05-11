<svelte:head>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';

  let API = '/api/v1/andalusian-bicycle-plans';
        
  if(dev)
      API = 'http://localhost:8080'+API

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
  if (typeof google === 'undefined') {
    console.error('Google Charts library is not loaded');
    return;
  }

  google.charts.setOnLoadCallback(() => {
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

    const chartContainer = document.getElementById('chart');
if (!chartContainer) return;
const chart = new google.visualization.BarChart(chartContainer);
    chart.draw(google.visualization.arrayToDataTable(chartData), options);
  });
}



  onMount(() => {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(getData);
  });
</script>

<div id="chart" style="height: 500px;"></div>
