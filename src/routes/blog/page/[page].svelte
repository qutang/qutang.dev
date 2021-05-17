<script context="module">
  export async function load({ page, fetch, session, context }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    // console.log(params.page);
    const url = `/blog/page/${page.params.page}.json`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      return {
        props: {
          posts: data.posts,
          totalPages: data.totalPages,
          page: parseInt(page.params.page)
        }
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    }
  }

  export const prerender = true;
</script>

<script>
  export let posts;
  export let page;
  export let totalPages;
  import {lang, navName} from '$lib/stores';
  import series from '$lib/Blog/_series';
  import { toLocale } from '$lib/api/date';
  import Footer from "$lib/Footer/index.svelte";
  import ScrollUp from "$lib/ScrollUpButton/index.svelte";

  navName.update(() => 'blog');

  let el;
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
  .inner {
    max-width: 56em;
    margin: 5em auto;
  }
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .pagination-previous {
    float: left;
  }

  .pagination-next {
    float: right;
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

  @media screen and (max-width:600px) {
    ul {
      list-style-type: none;
      padding-left: 0;
    }

    #slogan code {
    font-size: 2em;
  }

  #slogan-core {
    font-size: 2em;
  }
  }
</style>

<svelte:head>
  <title>{$lang == 'cn' ? '唐曲的博客' : "Qu Tang's Blog"}</title>
</svelte:head>


<div class='content' bind:this={el}>
<div class='inner'>
  <pre id="slogan">
    <code class="language-python">
    <span class="hljs-keyword">while</span> free:
    <span id='slogan-core'>📝</span>...
    </code>
  </pre>
  
  <ul>
    {#each posts as post}
      <li><span style='font-family: Arial;color:gray;'>{toLocale(post.date, $lang == 'cn' ? "zh-cn" : 'en')}</span> <a sveltekit:prefetch href="/blog/{post.slug}">{post.title}</a> <span class='series'><a href="/blog/series/{post.series}">{series[post.series][$lang]}</a></span> 
        </li>
    {/each}
  </ul>
  
  <p class='pagination'>
  {#if page > 2}
    <a href="/blog/page/{page - 1}" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
  {:else if page == 2}
    <a href="/blog" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
  {/if}
  
  {#if page < totalPages}
    <a href="/blog/page/{page + 1}" class='pagination-next'>{$lang == 'cn' ? "下一页" : "Next page"}</a>
  {/if}
  </p>
</div>
<Footer />
</div>

