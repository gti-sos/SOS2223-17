<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let provincesData = [];

  onMount(async () => {
    try {
      const response = await fetch('https://sos2223-17.appspot.com/api/v2/andalusian-bicycle-plans');
      const data = await response.json();

      provincesData = data.map((province) => ({
        name: province.province,
        population: province.population,
        walking: province.walking,
        bicycle: province.bicycle,
        year: province.year,
        motorized_percentage: province.motorized_percentage
      }));

      renderChart();
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  });

  function renderChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    const labels = provincesData.map((province) => province.name);
    const populationData = provincesData.map((province) => province.population);
    const walkingData = provincesData.map((province) => province.walking);
    const bicycleData = provincesData.map((province) => province.bicycle);
    const yearData = provincesData.map((province) => province.year);
    const motorizedData = provincesData.map((province) => province.motorized_percentage);

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Population',
            data: populationData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Walking',
            data: walkingData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Bicycle',
            data: bicycleData,
            backgroundColor: 'rgba(255, 205, 86, 0.6)',
            borderColor: 'rgba(255, 205, 86, 1)',
            borderWidth: 1,
          },
          {
            label: 'Year',
            data: yearData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Motorized',
            data: motorizedData,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
          },
        },
      },
    });
  }
</script>

<main style="max-width: 600px; overflow: auto;">
  <h1>Gráfico de Propiedades de las Provincias</h1>
  <div style="width: 100%;">
    <canvas id="chart"></canvas>
  </div>
</main>
