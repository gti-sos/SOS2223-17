<script>
    import Header from "./Header.svelte";
</script>

<main>
    <Header />
    <hr />
    <slot />
    <hr />
</main>

<style>
    main {
        width: 100% !important;
        max-width: 100% !important;
    }
</style>
