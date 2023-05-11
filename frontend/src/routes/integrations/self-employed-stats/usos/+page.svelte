<script>
    // @ts-nocheck
    import axios, {formToJSON} from "axios"
    import {onMount} from "svelte"
    import {Table} from "sveltestrap"

    onMount(async () => {
        datosExt1();
    });

    let datos1 = "";

    async function datosExt1(){
        const options = await fetch("https://burgers1.p.rapidapi.com/burgers", {
            method: "GET",
            headers: {
                "content-type": "application/octet-stream",
                'X-RapidAPI-Key': '5f45d8c93amshfd6951d838d1a5cp1aca8cjsn06486abb7d37',
                'X-RapidAPI-Host': 'burgers1.p.rapidapi.com',
            },
        });

        try {
            const response = await options.json();
            datos = response;
        } catch (error) {
            console.error(error);
        }
    }
</script>

<main>
    <Table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Restaurante</th>
                <th>Web</th>
                <th>Descripción</th>
            </tr>
        </thead>
        <tbody>
            {#each datos1 as dato}
                <tr>
                    <td>{dato.name}</td>
                    <td>{dato.restaurant}</td>
                    <td>{null}</td>
                    <td>{null}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>