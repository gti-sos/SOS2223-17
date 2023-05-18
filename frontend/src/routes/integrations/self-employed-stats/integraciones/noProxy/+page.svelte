<svelte:head>
    <script src="https://code.jscharting.com/latest/jscharting.js"></script>
</svelte:head>

<script>
    import {onMount} from 'svelte'

    onMount(async () => {
        apiExtCovid();
    });

    async function apiExtCovid(){
        const url = 'https://covid-193.p.rapidapi.com/statistics';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5f45d8c93amshfd6951d838d1a5cp1aca8cjsn06486abb7d37',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();

            let graphData = JSON.parse(result);
            console.log(graphData);
            console.log(graphData.results);
            let res = [];
            for (var i = 1; i < 21; i++){
                if (graphData.response[i].cases.active > 0){
                    let subLista = [graphData.response[i].country, parseInt(graphData.response[i].cases.active)];
                    res.push(subLista);
                }
            }
            console.log(res);
            loadAreaGraph(res);
            //console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadAreaGraph(gdata1){
        var colors = JSC.getPalette('default');
        var colorText = function(txt, colorIndex) {
            return '<span style="color:' + colors[colorIndex] + '"><b>' + txt + '</b></span>';
        };
        var titleText = 'Por país' + colorText('Covid19', 0);

        var chart = JSC.chart('chartDiv', {
            debug: true,
            type: 'area',
            title_label_text: titleText,
            legend_visible: false,
            yAxis: { formatString: '' },

            xAxis: { crosshair_enabled: true, scale: { type: 'auto' } },

            defaultSeries: {
            shape_opacity: 0.3,
            defaultPoint_marker: {
                fill: 'white',
                type: 'circle',
                outline: { width: 2 }
            }
            },

            series: [
            {
                name: 'Covid',

                points: gdata1
            }
            ]
        });
    }
        
</script>

<main>
    <h2 style="text-align:center">USOS: Gráfico de area</h2>
    <h4 style="text-align:center">Casos activos por país del covid-19, época de pandemia</h4>
    <div id="chartDiv" style="max-width: 740px;height: 400px;margin: 0px auto;"></div>
</main>