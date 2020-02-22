<script>
  import Content from "../../contents/about.md";
  import "../../node_modules/highlight.js/styles/arta.css";
</script>

<svelte:head>

  <title>About</title>
</svelte:head>

<style>
.content {
  margin: 5em auto;
}

#slogan {
    background: none;
    display: flex;
    width: 100%;
    margin: 0 auto;
    max-height: inherit;
  }

  #slogan code {
    font-size: 3em;
    margin: 0 auto;
  }

  #slogan-core {
    font-size: 2.8em;
  }

  .about {
    width: 56em;
    margin: 0 auto;
  }

</style>

<div class='content'>
<pre id="slogan">
  <code class="language-python">
  me <span class="hljs-keyword">=</span> (
  <span class='hljs-string'>"</span><span id='slogan-core'>😄</span><span class='hljs-string'>"</span>, <span class='hljs-string'>"</span><span id='slogan-core'>💻</span><span class='hljs-string'>"</span>, <span id='slogan-core'>🎓</span><span class='hljs-string'>"</span>)
  </code>
</pre>
<div class='about'>
<Content />
</div>

</div>

