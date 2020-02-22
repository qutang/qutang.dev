<script>
  import { lang } from "../components/stores.js";
  import Nav from "../components/Nav.svelte";
  import { onMount } from 'svelte';

  export let segment;

  onMount(async () => {
		const sysLang = window.userLanguage || window.navigator.language;
    const value = sysLang.includes('zh') ? 'cn' : 'en';

    if($lang == "") {
      lang.update(() => value);
    }
	});
  
</script>

<svelte:head>
<link href="https://unpkg.com/sanitize.css" rel="stylesheet" />
<link rel="stylesheet" href="highlight.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.css"
      integrity="sha384-bsHo4/LA+lkZv61JspMDQB9QP1TtO4IgOf2yYS+J6VdAYLVyx1c3XKcsHh0Vy8Ws"
      crossorigin="anonymous"
    />
    <link rel="icon" type="image/png" href="favicon.png" />
    <link rel="stylesheet" href="medium.css" />

    <script src="https://unpkg.com/mermaid@8.4.7/dist/mermaid.min.js"></script>
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
