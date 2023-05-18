<script>
    // @ts-nocheck
    import Router,{location,link } from "svelte-spa-router";
    import sanpinand from "./integrations/sanpinand/+page.svelte";
    import spa_graph from "./graph/spa_graph/+page.svelte";
    import usosTextual from "./integrations/sanpinand/usosTextual/+page.svelte";
    import widgets from "./integrations/sanpinand/widgets/+page.svelte";
</script>
    // Importa los demás componentes de página según sea necesario
<div>
    <Router>
        <Route path="/integrations/sanpinand/widgets" component={widgets} />
        <Route
            path="/integrations/sanpinand"
            component={sanpinand}
        />
        <Route
            path="/graph/spa_graph"
            component={spa_graph}
        />
        <Route path="/integrations/sanpinand/usosTextual" component={usosTextual} />
    </Router>
</div>