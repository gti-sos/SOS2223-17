<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let launches = [];
  
    onMount(async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v4/launches');
        const data = await response.json();
  
        launches = data.map((launch) => ({
          flightNumber: launch.flight_number,
          missionName: launch.name,
          success: launch.success,
          launchDate: new Date(launch.date_unix * 1000),
          coordinateX: Math.random() * 2000 - 1000, // Asigna las coordenadas X
          coordinateY: Math.random() * 2000 - 1000, // Asigna las coordenadas Y
        }));
  
        renderChart();
      } catch (error) {
        console.error('Error al obtener los lanzamientos:', error);
      }
    });
  
    function renderChart() {
      const ctx = document.getElementById('chart').getContext('2d');
  
      const datasets = launches.map((launch) => ({
        label: launch.missionName,
        data: [{
          x: launch.coordinateX,
          y: launch.coordinateY,
          r: 10,
          mission: launch,
        }],
        backgroundColor: launch.success ? 'rgba(255, 255, 0, 0.8)' : 'rgba(255, 99, 132, 0.8)',
        borderColor: '#000',
      }));
  
      new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: datasets,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              min: -1000,
              max: 1000,
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: 'Posición en el universo (Eje X)',
                font: {
                  size: 12,
                  weight: 'bold',
                },
              },
            },
            y: {
              min: -1000,
              max: 1000,
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: 'Posición en el universo (Eje Y)',
                font: {
                  size: 12,
                  weight: 'bold',
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Misiones de SpaceX como estrellas en el universo',
              font: {
                size: 18,
                weight: 'bold',
              },
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  const index = context[0].dataIndex;
                  return context[0].dataset.data[index].mission.missionName;
                },
                label: (context) => {
                  const index = context.dataIndex;
                  const flightNumber = context.dataset.data[index].mission.flightNumber;
                  const success = context.dataset.data[index].mission.success ? 'Exitoso' : 'Fracasado';
                  const launchDate = context.dataset.data[index].mission.launchDate.toLocaleDateString();
                  return `Número de vuelo: ${flightNumber}, Resultado: ${success}, Fecha de lanzamiento: ${launchDate}`;
                },
              },
            },
          },
        },
      });
    }
  </script>
  
  <style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #000;
    }
  
    .chart-container {
      width: 800px;
      height: 800px;
      background-color: #000;
    }
  </style>
  
  <main>
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
  </main>
  