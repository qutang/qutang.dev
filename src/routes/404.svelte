<script context="module">
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>Page not found | qutang.dev</title>
</svelte:head>

<div>
    <h1>404</h1>
</div>


<style>
    h1 {
        text-align: center;
        margin: 0 auto;
        margin-top: 100px;
        font-size: 10em;
        font-family: 'Lora';
    }
</style>