<script>
  import { lang } from '../components/stores.js';
  import Content from "../../contents/pages/about.md";
  import ContentCN from "../../contents/pages/about.cn.md";
  import About from "../../README.md";
  import AboutCN from "../../README.cn.md";
</script>

<svelte:head>

  <title>{$lang == 'cn' ? '关于我' : "About"}</title>
</svelte:head>

<style>
.content {
  margin: 5em auto;
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

  #slogan img {
      max-width: 100%;
    }
  }

</style>

<div class='content'>
<!-- <pre id="slogan">
  <code class="language-python">
  me <span class="hljs-keyword">=</span> (
  <span class='hljs-string'>"</span><span id='slogan-core'>😄</span><span class='hljs-string'>"</span>, <span class='hljs-string'>"</span><span id='slogan-core'>💻</span><span class='hljs-string'>"</span>, <span id='slogan-core'>🎓</span><span class='hljs-string'>"</span>)
  </code>
</pre> -->
<pre id="slogan">
  <img src="/media/uploads/about_cover.png" alt="">
</pre>
<div class='about'>
{#if $lang == 'cn'}
  <ContentCN />
  <AboutCN />
{:else}
  <Content />
  <About />
{/if}

</div>



</div>

