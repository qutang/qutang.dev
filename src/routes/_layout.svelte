<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
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
    position: relative;
    max-width: 90%;
    background-color: white;
    padding: 2em;
    margin: 0em auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
