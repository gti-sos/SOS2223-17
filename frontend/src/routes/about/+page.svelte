<script>

    import { Button } from "sveltestrap";

    async function videoJose(){
        window.location.href = "https://drive.google.com/file/d/1jXUB8qD3PH6aOxbU1eybUwhl3-U9qQ1o/view?usp=share_link";
    }

    async function videoSalim(){
        window.location.href = "https://www.youtube.com/watch?v=uaC3tvBkrcg";
    }

    async function videoSanti(){
        window.location.href = "https://youtu.be/JiIXF10oxWw";
    }

</script>

<main>
    <h1>VIDEO JOSE</h1>
    <Button color="dark" on:click={videoJose}>Ver vídeo</Button>
    <h1>VIDEO SALIM</h1>
    <Button color="dark" on:click={videoSalim}>Ver vídeo</Button>
    <h1>VIDEO SANTIAGO</h1>
    <Button color="dark" on:click={videoSanti}>Ver vídeo</Button>
</main>
