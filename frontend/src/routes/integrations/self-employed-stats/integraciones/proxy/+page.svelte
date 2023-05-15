<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import {onMount} from "svelte"

    let dato1=[];
    let dato2=[];
    
    onMount(async () => {
        loadAll();
    });

    async function loadAll(){
        dato1 = apiPropia();
        dato2 = apiSOSProxy();
        loadHChart(gdata1, gdata2);
    }

    async function apiPropia(){
        let gdata1 = []
        const url = 'http://localhost:8080/api/v2/self-employed-stats';//url compañero
        const options = {
            method: 'GET'
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            gdata1=result.filter(obj=>obj.territory==="Sevilla"); 
        } catch (error) {
            console.error(error);
        }
        return gdata1.map((objeto) => { return objeto.value; });
    }

    async function apiSOSProxy(){
        let gdata2 = [];
        const url = 'http://localhost:8080/proxyjgo';//url compañero
        const options = {
            method: 'GET'
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            gdata2 = result.filter(obj=>obj.province==="Sevilla");
        } catch (error) {
            console.error(error);
        }
        return gdata2.map((objeto) => { return objeto.minimun_temperature; });
    }

    async function loadHChart(gdata1, gdata2){
        Highcharts.chart('container', {
        chart: {
            type: 'area'
        },
        accessibility: {
            description: 'Area de la provincia de sevilla'
        },
        title: {
            text: 'Fuente: JSCHARTING'
        },
        subtitle: {
            text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
                'target="_blank">FAS</a>'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            },
            accessibility: {
                rangeDescription: 'Range: 1940 to 2017.'
            }
        },
        yAxis: {
            title: {
                text: 'Valor/Tª'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Sevilla-autonomos',
            data: gdata1
        }, {
            name: 'Sevilla-agroclima',
            data: gdata2
        }]
    });

    }
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Datos de sevilla
        </p>
    </figure>
</main>