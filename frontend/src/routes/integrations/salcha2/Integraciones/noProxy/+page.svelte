<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";
    let API_13 = "https://sos2223-13.appspot.com/api/v2/evolution";
    let API_17 = "https://sos2223-17.appspot.com/api/v2/andalusian-bicycle-plans";
    let datos_13_R = [];
    let datos_17_R = [];
    
    async function getData13() {
        const res = await fetch(API_13, {
            method: "GET",
        });
        try {
            const data = await res.json();
            datos_13_R = prepareData13(data);
            loadCombinedChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }
    
    async function getData17() {
        const res = await fetch(API_17, {
            method: "GET",
        });
        try {
            const data = await res.json();
            datos_17_R = prepareData17(data);
            loadCombinedChart();
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }
    
    function prepareData13(data) {
        let preparedData = {
            labels: ['Población', 'Hombres', 'Mujeres', 'Menores de 16 años', 'De 16 a 64 años', 'Mayores de 65 años'],
            datasets: [{
                label: 'Granada',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                data: []
            }]
        };
        let granadaData = data.find(d => d.territory === "Granada");
        
        if (granadaData) {
            preparedData.datasets[0].data = [
                granadaData.total_population,
                granadaData.man,
                granadaData.woman,
                granadaData.under_sixteen_years,
                granadaData.from_sixteen_to_sixty_four_years,
                granadaData.sixty_five_and_over
            ];
        }
        
        return preparedData;
    }
    
    function prepareData17(data) {
        let preparedData = {
            labels: ['Población', 'Caminata', 'Bicicleta', 'Porcentaje motorizado'],
            datasets: [{
                label: 'Sevilla',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                data: []
            }]
        };
        let sevillaData = data.find(d => d.province === "Sevilla");
        
        if (sevillaData) {
            preparedData.datasets[0].data = [
                sevillaData.population,
                sevillaData.walking,
                sevillaData.bicycle,
                sevillaData.motorized_percentage
            ];
        }
        
        return preparedData;
    }
    
    function loadCombinedChart() {
        if (datos_13_R.labels.length > 0 && datos_17_R.labels.length > 0) {
            var ctx = document.getElementById('chart').getContext('2d');
            var data = {
                labels: datos_13_R.labels,
                datasets: [datos_13_R.datasets[0], datos_17_R.datasets[0]]
            };
            var options = {
                scale: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            };
            var chart = new Chart(ctx, {
                type: 'radar',
                data: data,
                options: options
            });
        }
    }
    
    onMount(async () => {
        await Promise.all([getData13(), getData17()]);
    })
</script>

<style>
    #chart {
        width: 500px;
        height: 400px;
        margin: 0 auto;
    }
</style>

<main>
    <h1 align="center">Comparación de Propiedades</h1>
    <br>
    <br>
    <div id="chart-container">
        <canvas id="chart"></canvas>
    </div>
</main>

