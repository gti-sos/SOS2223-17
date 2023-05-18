<script>
    import { onMount } from 'svelte';
  
    let stats = {};
  
    // Realizar una petición Fetch al servidor para obtener los datos de las estadísticas
    fetch('/profile')
      .then(response => response.json())
      .then(data => {
        // Asignar los datos de las estadísticas a la variable "stats"
        stats = data;
      })
      .catch(error => {
        console.error('Error al obtener las estadísticas:', error);
      });
  
    onMount(() => {
      // Crear el gráfico utilizando los datos de las estadísticas
      const ctx = document.getElementById('statsChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(stats),
          datasets: [
            {
              label: 'Estadísticas',
              data: Object.values(stats),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        options: {
          // Configuración adicional del gráfico
        },
      });
    });
  </script>
  
  <!-- Sección head -->
  <head>
    <title>Perfil del usuario</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  
  <!-- Cuerpo de la página -->
  <body>
    <h1>Perfil del usuario</h1>
  
    <!-- Aquí puedes usar los datos de las estadísticas para mostrar gráficos -->
    <!-- Puedes utilizar librerías de gráficos como Chart.js o D3.js -->
  
    <!-- Ejemplo de uso de Chart.js -->
    <canvas id="statsChart"></canvas>
  </body>
  