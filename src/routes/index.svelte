<script context="module">
	export async function load({ page, fetch, session, context }) {
		const filePath = '/badges/rubbing_palms.csv';
		const imageUrl = '/badges/rubbing_palms.png';
		const data = await fetch(filePath);
		const content = await data.text();
		return {
			props: {
				data: content,
				image: imageUrl
			}
		};
	}
	export const prerender = true;
</script>

<script>
	export let data;
	export let image;
	import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte'
	import IoMdArrowRoundUp from 'svelte-icons/io/IoMdArrowRoundUp.svelte'
	import Badge from '$lib/SignalBadge/index.svelte';
	import { lang, navName } from '$lib/stores';
	import { browser } from "$app/env";
	import Home from '$lib/Home/index.svelte';
	import i18n from "$lib/i18n";
	navName.update(() => '');
	if (browser) {
		lang.update(() => localStorage.getItem("lang"));
	}
</script>

<svelte:head>
	<title>
		{i18n["home_title"][$lang]} | qutang.dev
	</title>
</svelte:head>

<section id="showcase">
	<pre><span class='blue'>Wash</span><span class='gold'>&#8201;hands</span> regularly:</pre>
	<Badge {data} {image} />
	<h2 class="slogan">
		{i18n['home_slogan'][$lang]}
	</h2>
	<div class="control">
		<a href="/#highlight" class="icon"><IoMdArrowRoundDown /></a>
	</div>
</section>
<section id="highlight">
	<h2>
		{i18n['home_highlight_title'][$lang]}
	</h2>
	<Home />
	<div class="control">
		<a href="/#showcase" class="icon"><IoMdArrowRoundUp /></a>
	</div>
</section>


<style>

	#showcase, #highlight {
		scroll-snap-type: y mandatory;
	}

	h2 {
		margin: 0 auto;
		max-width: 600px;
		text-align: center;
	}

	h2.slogan {
		font-weight: 300;
	}

	#showcase h2 {
		margin-top: 50px;
	}

	.control {
		text-align: center;
		position: absolute;
		bottom: 60px;
		width: 100%;
	}

	pre {
        margin: 0 0;
		padding: 0;
		color: forestgreen;
		font-size: 1.8em;
		position: relative;
		left: -200px;
    }

    .blue {
        color: steelblue;
    }

    .gold {
        color: goldenrod;
    }

	@media screen and (max-width: 700px) {

		pre {
			left: 0;
			position: static;
			align-self: flex-start;
		}

		.control {
			display: none;
		}
	}

	
</style>
