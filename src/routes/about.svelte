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
    font-size: 2.5em;
    margin: 0 auto;
  }

  #slogan-core {
    font-size: 2em;
    margin: 0 auto;
  }

  .about {
    max-width: 56em;
    margin: 0 auto;
  }

  @media screen and (min-width: 1024px) {

    #slogan code {
    font-size: 3em;
  }

  #slogan-core {
    font-size: 2.5em;
  }
  }

  @media screen and (max-width: 600px) {
    .about {
      width: 95%;

    }
    #slogan code {
    font-size: 1.6em;
  }

  #slogan-core {
    font-size: 1.2em;
  }
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

