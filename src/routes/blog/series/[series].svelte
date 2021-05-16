<script context="module">
  export async function load({ page, fetch, session, context }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    // console.log(params.series);
    const url = `/blog/series/${page.params.series}.json`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      return {
        props: {
          posts: data.posts,
          series: page.params.series
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
  export let series;
  import parseSeries from '$lib/Blog/_series';
  import { toLocale } from '$lib/api/date';
  import { lang, navName } from '$lib/stores';

  navName.update(() => "blog");
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

  #slogan img {
    max-width: 600px;
    height: auto;
    box-shadow: none;
    display: block;
    margin: 0 auto;
  }

  .content {
    max-width: 56em;
    margin: 5em auto;
  }
  ul {
    margin: 0 auto;
    line-height: 1.5;
  }

   @media screen and (max-width:600px) {
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    #slogan img {
      max-width: 100%;
    }
  }
</style>

<svelte:head>
  <title>{($lang == 'cn' ? '唐曲的博客：': "Qu Tang's Blog: ") + parseSeries[series][$lang]}</title>
</svelte:head>


<div class='content'>

<pre id="slogan">
  <img src="{parseSeries[series]['url']}" alt="">
</pre>

<ul>
  {#each posts as post}
    <li><span style='font-family: Arial;color:gray;'>{toLocale(post.date, $lang == 'cn' ? 'zh-cn' : 'en')}</span> <a sveltekit:prefetch href="/blog/{post.slug}">{post.title}</a>
      </li>
  {/each}
</ul>
</div>

