<script context="module">
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script>
	import coverUrl from '$lib/About/about_cover.png';
	import Footer from "$lib/Footer/index.svelte"
	import ScrollUpButton from "$lib/ScrollUpButton/index.svelte";
	import { lang, navName } from '$lib/stores';
	import About from '$lib/About/index.svelte';
	import Readme from '../../README.md';
	import ReadmeCN from '../../README.cn.md';
	import { beforeUpdate } from 'svelte';

	navName.update(() => "about");

	beforeUpdate(() => {
		
	});
	let parallax;
</script>

<svelte:head>
	<title>{$lang == 'cn' ? '关于我' : "About"} 
	| qutang.dev</title>
</svelte:head>

<div class='content' bind:this={parallax}>
	<div class='inner'>
		<pre id="slogan">
			<img src="{coverUrl}" alt="">
		  </pre>
		  <div class='about'>
			  <About />
			  {#if $lang == 'cn'}
			  <ReadmeCN />
			  {:else}
			  <Readme />
			  {/if}
		  </div>
	</div>
	<ScrollUpButton el={parallax} />
	<Footer />
</div>

<style>

.inner {
	margin: 5em auto;
	max-width: 56em;
}

#slogan img {
	max-width: 600px;
	height: auto;
	box-shadow: none;
	display: block;
	margin: 0 auto;
}

#slogan {
	background: none;
	display: flex;
	width: 100%;
	margin: 0 auto;
	max-height: inherit;
	}

	.about {
	margin: 0 auto;
	}

	@media screen and (max-width: 600px) {
		.about {
			width: 95%;

		}
		
		#slogan img {
			max-width: 100%;
		}
	}
</style>
