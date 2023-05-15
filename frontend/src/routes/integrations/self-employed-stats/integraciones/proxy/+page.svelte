<svelte:head>

</svelte:head>

<script>
    import {onMount} from "svelte"

    onMount(async () => {
        apiExtProxy();
    });

    async function apiExtProxy(){
        const url = 'http://localhost:8080/proxyjgo';
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
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<main>

</main>