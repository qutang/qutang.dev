<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let post;
  
  import series from './_series.js';
  import { lang } from '../../components/stores.js';
  import moment from 'moment';
  import zh from 'moment/locale/zh-cn';
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .content {
    max-width: 56em;
    margin: 5em auto;
  }

  .series {
    background: lightgreen;
    padding: 0.2em 0.5em;
    border-radius: 2px;
    font-weight: bold;
  }

  .series a{
    text-decoration: none;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>


<div class="content">
<h1>{post.title}</h1>

<p><span class='series'><a href="/blog/series/{post.series}">{series[post.series][$lang]}</a></span> {moment(post.date).locale($lang == 'cn' ? 'zh-cn' : 'en').format("LL")} <a href={post.src} rel='noopener' target="_blank" style='float:right; margin-top: 0'>{$lang == 'cn' ? "编辑本文" : "Edit this page"}</a></p>

  {@html post.html}
</div>
