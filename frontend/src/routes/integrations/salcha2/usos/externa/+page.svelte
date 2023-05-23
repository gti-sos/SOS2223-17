<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let repositories = [];

    onMount(async () => {
        try {
            const response = await fetch('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=5');
            const data = await response.json();

            repositories = data.items.map((repo) => ({
                name: repo.name,
                stars: repo.stargazers_count
            }));

            renderChart();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    });

    
    function renderChart() {
        const ctx = document.getElementById('chart').getContext('2d');
        const labels = repositories.map((repo) => repo.name);
        const data = repositories.map((repo) => repo.stars);

        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Estrellas',
                    data: data,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
</script>

<style>
    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>

<main>
    <h1>Gráfico de Repositorios Populares en GitHub</h1>
    <div class="chart-container">
        <div style="width: 500px; height: 500px;">
            <canvas id="chart"></canvas>
        </div>
    </div>

    <ul>
        {#each repositories as repo}
            <li>{repo.name} - {repo.stars} estrellas</li>
        {/each}
    </ul>
</main>