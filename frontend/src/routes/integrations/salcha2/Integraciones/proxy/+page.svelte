<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";

    let API_17 = "https://sos2223-17.appspot.com/proxyscc";
    let API_R = "https://sos2223-17.appspot.com/api/v2/andalusian-bicycle-plans";

    let datos_17_R = [];

    async function getData17() {
        const res = await fetch(API_17, {
            method: "GET",
        });
        try {
            const data = await res.json();
            datos_17_R = prepareData(data);
            getDataR(datos_17_R);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }

    async function getDataR(datos_17_R) {
        const res = await fetch(API_R, {
            method: "GET",
        });
        try {
            const data = await res.json();
            datos_17_R = addMissingData(data, datos_17_R);
            loadGC_17_R(datos_17_R);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
    }

    function prepareData(data) {
        let preparedData = [['Provincia y año', 'Población', 'Turistas']];
        for (let i = 0; i < data.length; i++) {
            let id = `${data[i]["province"]}\n${data[i]["year"]}`;
            preparedData.push([id, data[i]["population"], data[i]["tourist"]]);
        }
        return preparedData;
    }

    function addMissingData(data, datos_17_R) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]["province"] != "Andalucía") {
                let id = `${data[i]["province"]}\n${data[i]["year"]}`;
                datos_17_R.push([id, data[i]["population"], null]);
            }
        }
        return datos_17_R;
    }

    function loadGC_17_R(datos_17_R) {
        var ctx = document.getElementById('chart').getContext('2d');
        var data = {
            labels: datos_17_R.slice(1).map(d => d[0]),
            datasets: [{
                label: 'Población',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: datos_17_R.slice(1).map(d => d[1])
            }, {
                label: 'Turistas',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: datos_17_R.slice(1).map(d => d[2])
            }]
        };
        var options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        var chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }

    onMount(async () => {
        getData17();
    })

</script>

<main>
    <h1 align="center">Integración con Proxy</h1>
    <br>
    <br>
    <canvas id="chart" style="width: 1200px; height: 600px; margin-left: 50px; margin-bottom:150px;"></canvas>
</main>
