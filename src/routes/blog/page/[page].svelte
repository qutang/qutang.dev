<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    console.log(params.page);
    const res = await this.fetch(`blog/page/${params.page}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return {
        posts: data.posts,
        totalPages: data.totalPages,
        page: parseInt(params.page)
      };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let posts;
  export let page;
  export let totalPages;
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
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li>
      <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ul>

{#if page > 2}
  <a href="/blog/page/{page - 1}">Newer posts</a>
{:else if page == 2}
  <a href="/blog/">Newer posts</a>
{/if}

{#if page < totalPages}
  <a href="/blog/page/{page + 1}">Older posts</a>
{/if}
