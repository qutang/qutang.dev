<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

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