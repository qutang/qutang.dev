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

  let edit_text = undefined;
  let license_text = undefined;
  let on_colab = post.src.includes('colab');
  let edit_where = on_colab ? "Colab" : "Github";
  if ($lang == 'cn') {
    edit_text = "在" + edit_where + "编辑本文";
  } else {
    edit_text = "Edit this page on " + edit_where;
  }
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

  .license {
    padding: 0.5em;
    background: coral;
    filter: brightness(150%);
    border-radius: 5px;
    color: black;
    font-weight: normal;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>


<div class="content">
<h1>{post.title}</h1>

<p><span class='series'><a href="/blog/series/{post.series}">{series[post.series][$lang]}</a></span> {moment(post.date).locale($lang == 'cn' ? 'zh-cn' : 'en').format("LL")} <a href={post.src} rel='noopener' target="_blank" style='float:right; margin-top: 0'>{edit_text}</a></p>

<p class='license'>
  {#if $lang == 'cn'}
  <a rel="license" target='_blank' href="http://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a> 本作品采用<a rel="license" target='_blank' href="http://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可。
  {:else}
  <a rel="license" target='_blank' href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a> 
  This work is licensed under a <a rel="license" target='_blank' href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
  {/if}
</p>

  {@html post.html}
</div>
