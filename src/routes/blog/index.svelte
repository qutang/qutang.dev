<script context="module">
  export async function load({ page, fetch, session, context }) {
    const url = `/blog.json`;
    const res = await fetch(url);
    const blog = await res.json();
    const posts = blog.posts.filter(post => {
          return post.page == "1";
    });
    const totalPages = blog.totalPages;
    if (res.ok) {
      return {
        props: {
          posts: posts,
          page: 1,
          totalPages: totalPages
        }
      }
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
  import { lang, navName } from '$lib/stores';
  import { toLocale } from '$lib/api/date';
  import series from '$lib/Blog/_series';
  import coverUrl from '$lib/Blog/blog_cover.png';
  navName.update(() => "blog");
</script>

<style>
#slogan {
    background: none;
    display: flex;
    width: 100%;
    margin: 0 auto;
    max-height: inherit;
  }

  #slogan img {
    max-width: 500px;
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

    #slogan img {
      max-width: 100%;
    }
  }
</style>

<svelte:head>
  <title>{$lang == 'cn' ? '唐曲的博客' : "Qu Tang's Blog"}</title>
</svelte:head>


<div class='content'>
  <pre id="slogan">
    <img src="{coverUrl}" alt="">
  </pre>

  <ul>
    {#each posts as post}
      <li><span style='font-family: Arial;color:gray;'>{toLocale(post.date, $lang == 'cn'? 'zh-cn' : 'en')}</span> <a sveltekit:prefetch href="/blog/{post.slug}">{post.title}</a> <span class='series'><a href="/blog/series/{post.series}">{series[post.series][$lang]}</a></span> 
      </li>
    {/each}
  </ul>

  <p class='pagination'>
  {#if page > 1}
    <a href="/blog/page/{page - 1}" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
  {:else if page == 2}
  <a href="/blog/" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
  {/if}

  {#if page < totalPages}
    <a href="/blog/page/{page + 1}" class='pagination-next'>{$lang == 'cn' ? "下一页" : "Next page"}</a>
  {/if}
  </p>
  
</div>

