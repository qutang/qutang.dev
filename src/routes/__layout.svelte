<script>
	import { lang } from "$lib/stores";
	import Nav from '$lib/Nav/index.svelte';
	import Footer from '$lib/Footer/index.svelte';
	import { navigating, page } from '$app/stores';
	import '$lib/app.css';
	import '$lib/medium.css';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import "../../node_modules/katex/dist/katex.min.css";
  	import "../../node_modules/highlight.js/styles/darcula.css";

	onMount(async () => {
		console.log("client-side app has started");
		var oldHref = document.location.href;
		var oldLang = document.querySelector(".language").textContent;

		var bodyList = document.querySelector("body"),
		observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
			console.log(document.location.href);
			if (oldHref !== document.location.href) {
				console.log("page changes end...");
				oldHref = document.location.href;
			}
			if (oldLang != document.querySelector(".language").textContent) {
				oldLang = document.querySelector(".language").textContent;
			}
			});
		});

		var config = {
		childList: true,
		subtree: true,
		};

		observer.observe(bodyList, config);

		[...document.querySelectorAll('a[href^="#"]')].map(
		x => (x.href = document.location + new URL(x.href).hash)
		)
	});

	beforeUpdate(() => {
		const sysLang = window.userLanguage || window.navigator.language;
		const value = sysLang.includes('zh') ? 'cn' : 'en';

		if($lang == "") {
			lang.update(() => value);
		}
	});

	afterUpdate(async () => {
		if ($navigating) {
			console.log($navigating.from.path + ' -> ' + $navigating.to.path + " @ " + $page.path);
		}
	});
</script>

<Nav />

<main>
	<slot />
</main>

<Footer />
