<svelte:head>
    <script src="https://code.jscharting.com/latest/jscharting.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte"
    import {Table} from "sveltestrap"
    
    onMount(async () => {
        datosExt1();
        datosExt2();
    });

    let datos0=[];
    let datos1="";
    let temp2=[]
    let datos2=[];

    let updated="";
    let alias="";
    let taxId="";
    let founded="";

    async function datosExt1(){
        const url = 'https://consulta-cnpj-gratis.p.rapidapi.com/office/37335118000180?simples=false';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5f45d8c93amshfd6951d838d1a5cp1aca8cjsn06486abb7d37',
                'X-RapidAPI-Host': 'consulta-cnpj-gratis.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
	        const result = await response.text();
            console.log(result);
            datos0=JSON.parse(result);
            updated = String(datos0["updated"]);
            alias = String(datos0["alias"]);
            taxId = String(datos0["taxId"]);
            founded = String(datos0["founded"]);
            console.log(updated);
        } catch (error) {
            console.error(error);
        }
    }

    async function datosExt2(){
        const url = 'https://kotak7.p.rapidapi.com/toplist/33/tracks?country=id&lang=id&index=0&num=50';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5f45d8c93amshfd6951d838d1a5cp1aca8cjsn06486abb7d37',
                'X-RapidAPI-Host': 'kotak7.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            datos1=JSON.parse(result);
            console.log(datos1.tracks);
            console.log(datos1.tracks.items);

            for (var i = 0; i < 19; i++) {
                temp2.push(datos1.tracks.items[i].album_name);
                temp2.push(parseInt(datos1.tracks.items[i].play_duration));
            }
            console.log(temp2);
            datos2 = temp2.reduce((acc, val, i) => {
            if (i % 2 === 0) {
                acc.push({name: val, y: temp2[i + 1]});
            }
            return acc;
            }, []);
            console.log(datos2);

            loadChart(datos2);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadChart(gdata){
        var chart = JSC.chart('chartDiv', {
        debug: true,
        defaultSeries_type: 'column',
        title_label_text: 'Duracion de discos musicales de Indonesia',
        yAxis: {
          defaultTick_enabled: false,
          scale_range_padding: 0.15
        },
        legend_visible: false,
        toolbar_visible: false,
        series: [
          {
            name: 'Duracion de discos musicales de Indonesia',
            color: 'turquoise',
            defaultPoint: {
              marker: {
                visible: false,
                size: 40,
                outline_width: 0
              },
              label: { text: '%valuemin' }
            },

            points: gdata
          }
        ]
      });
    }
</script>

<main>
    <h1 style="text-align:center">USOS</h1>
    <h4 style="text-align:center">Tabla CNPJA</h4>
    <h6 style="text-align:center">Solo permiten 3 peticiones/minuto por si apriori no se ven los resultados</h6>
    <Table>
        <thead>
            <tr>
                <th>Catastro de Brasil</th>
                <th>Actualizado en</th>
                <th>Identificador</th>
                <th>Dato Recabado en</th>
            </tr>
        </thead>
        <tbody>
            <!--{#each datos1 as dato}-->
                <tr>
                    <td>{alias}</td>
                    <td>{updated}</td>
                    <td>{taxId}</td>
                    <td>{founded}</td>
                </tr>
            <!--{/each}-->
        </tbody>
    </Table>

    <h4 style="text-align:center">Grafico de Barras</h4>
    <div id="chartDiv" style="max-width: 740px;height: 400px;margin: 0px auto;"></div>
</main>