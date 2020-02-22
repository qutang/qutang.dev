<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog/rss.xml`).then(() => {
      return this.fetch("sitemap.xml");
    });
  }
</script>

<script>
  import { lang } from "../components/stores.js";
  import Home from "../../contents/pages/index.md";
  import HomeCN from "../../contents/pages/index.cn.md";
</script>

<style>
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
    font-size: 3.8em;
  }

  #highlight-heading {
    font-size: 36px;
  }

  p {
    text-align: center;
    margin: 0 auto;
    font-size: 1.6em;
  }

  .content {
    margin: 5em auto;
  }

  @media only screen and (max-width: 600px) {
    #slogan code {
      font-size: 2em;
      margin: 0 auto;
    }
    #slogan-core {
      font-size: 3em;
    }
  }
</style>

<svelte:head>
  <title>
    {$lang == 'cn' ? "唐曲 - 数据，机器学习，移动健康": "Qu Tang - share about data science, machine learning, mobile health"}
  </title>
  <script
    type="text/javascript"
    src="https://identity.netlify.com/v1/netlify-identity-widget.js">

  </script>
</svelte:head>

<div class="content">
  <pre id="slogan">
    <code class="language-python">
      <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
  <span id="slogan-core">🏃</span>🌫️🌫️🌫️
    </code>
  </pre>

  <p id="highlight-heading">
    <strong>{$lang == "cn" ? "重点项目" : "Highlights."}</strong>
  </p>

  {#if $lang == 'cn'}
    <HomeCN />
  {:else}
    <Home />
  {/if}
</div>
