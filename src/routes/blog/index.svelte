<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(blog => {
        let posts = blog.posts.filter(post => {
          return post.page == "1";
        });
        return { posts, page: 1, totalPages: blog.totalPages };
      });
  }
</script>

<script>
  export let posts;
  export let page;
  export let totalPages;
  import {lang} from '../../components/stores.js';
  import { toLocale } from '../../_plugins/date.js';
  import series from './_series.js';
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

  #slogan code {
    font-size: 3em;
    margin: 0 auto;
  }

  #slogan-core {
    font-size: 3.8em;
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
     #slogan code {
    font-size: 2em;
  }

  #slogan-core {
    font-size: 2em;
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
  <!-- <pre id="slogan">
    <code class="language-python">
    <span class="hljs-keyword">while</span> free:
    <span id='slogan-core'>📝</span>...
    </code>
  </pre> -->
  <pre id="slogan">
    <img src="/media/uploads/blog_cover.png" alt="">
  </pre>

  <ul>
    {#each posts as post}
      <!-- we're using the non-standard `rel=prefetch` attribute to
          tell Sapper to load the data for the page as soon as
          the user hovers over the link or taps it, instead of
          waiting for the 'click' event -->
      <li><span style='font-family: Arial;color:gray;'>{toLocale(post.date, $lang == 'cn'? 'zh-cn' : 'en')}</span> <a rel="prefetch" href="blog/{post.slug}">{post.title}</a> <span class='series'><a href="/blog/series/{post.series}">{series[post.series][$lang]}</a></span> 
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

