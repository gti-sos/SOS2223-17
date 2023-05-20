<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let repositories = [];
  
    onMount(async () => {
      try {
        // Autenticación OAuth con GitHub
        const clientId = '7091a208d8dc789ceb95';
        const redirectUri = '819adef573a839f75078614057d4530817be3ac4';
        const scopes = 'repo';
  
        // Generar URL de autorización
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;
  
        // Redirigir al usuario a la página de autorización de GitHub
        window.location.href = authUrl;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    });
  </script>
  
  <main>
    <h1>Autorizando con GitHub...</h1>
  </main>
  