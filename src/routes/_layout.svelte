<script>
  import { lang } from "../components/stores.js";
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  import { onMount } from 'svelte';
  import "../../node_modules/katex/dist/katex.min.css";
  import "../../node_modules/highlight.js/styles/darcula.css";
  export let segment;

  onMount(async () => {
		const sysLang = window.userLanguage || window.navigator.language;
    const value = sysLang.includes('zh') ? 'cn' : 'en';

    if($lang == "") {
      lang.update(() => value);
    }

    [...document.querySelectorAll('a[href^="#"]')].map(
      x => (x.href = document.location + new URL(x.href).hash)
    )
	});
  
</script>

<svelte:head>
<link href="https://unpkg.com/sanitize.css" rel="stylesheet" />
<link rel="preload" href="highlight.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="highlight.css"></noscript>
<link rel="icon" type="image/png" href="favicon.png" />
<link rel="preload" href="medium.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="medium.css"></noscript>
</svelte:head>

<style>

  main {

    max-width: 90%;
    padding: 2em;
    position: relative;
    background-color: white;
    margin: 0em auto;
    box-sizing: border-box;
  }

  @media only screen and (max-width: 600px) {
  main {
    max-width: 100%;
    padding: 1em;
  }
}

@media only screen and (min-width: 1024px) {
  main {
    max-width: 90%;
    padding: 2em;
  }
}
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
