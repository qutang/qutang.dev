<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    // console.log(params.page);
    const res = await this.fetch(`projects/page/${params.page}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return {
        projects: data.projects,
        totalPages: data.totalPages,
        page: parseInt(params.page)
      };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let projects;
  export let page;
  export let totalPages;
  import {lang} from '../../../components/stores.js';
  import { toLocale } from '../../../_plugins/date.js';
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
  }
</style>

<svelte:head>
  <title>{$lang == 'cn' ? '唐曲-项目' : "Qu Tang - Projects"}</title>
</svelte:head>


<div class='content'>

 <pre id="slogan">
  <code class="language-python">
  <span class="hljs-keyword">while</span> free:
  <span id='slogan-core'>📝</span>...
  </code>
</pre>

<ul>
  {#each projects as project}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li><a rel="prefetch" href="projects/{project.repo}">{project.name}</a> 
      </li>
  {/each}
</ul>

<p class='pagination'>
{#if page > 2}
  <a href="/projects/page/{page - 1}" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
{:else if page == 2}
  <a href="/projects/" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
{/if}

{#if page < totalPages}
  <a href="/projects/page/{page + 1}" class='pagination-next'>{$lang == 'cn' ? "下一页" : "Next page"}</a>
{/if}
</p>
</div>

