<script context="module">
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script>
	import { lang, navName } from '$lib/stores';
	import About from '$lib/About/index.svelte';
	import Readme from '../../README.md';
	import ReadmeCN from '../../README.cn.md';
	import i18n from "$lib/i18n";
	import { browser } from "$app/env";
	navName.update(() => 'about');
	if (browser) {
		lang.update(() => localStorage.getItem("lang"));
	}
</script>

<svelte:head>
	<title
		>{i18n['about'][$lang]}
		| qutang.dev</title
	>
</svelte:head>

<article>
	<About />
	{#if $lang == 'cn'}
		<ReadmeCN />
	{:else}
		<Readme />
	{/if}
</article>

<style>
	article {
		max-width: 600px;
		margin: 120px auto;
	}

	@media screen and (max-width: 700px) {
		article {
			max-width: 90%;
			margin: 0 auto;
		}
	}
</style>
