<script>
	import { lang } from '$lib/stores';
	import i18n from '$lib/i18n';
</script>

<footer>
	<p>
		2019 - {new Date().getFullYear()} © <a href="https://qutang.dev">{i18n['owner'][$lang]}</a>
	</p>
</footer>

<style>
	footer {
		padding: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: var(--background-alt);
		margin: 0 auto;
		border: none;
	}

	p {
		text-align: center;
	}
</style>
