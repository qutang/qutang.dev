<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    console.log(params.series);
    const res = await this.fetch(`blog/series/${params.series}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return {
        posts: data.posts,
        series: params.series
      };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let posts;
  export let series;
  import parseSeries from '../_series.js';
  import moment from 'moment';
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
    width: 56em;
    margin: 5em auto;
  }
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>


<div class='content'>

 <pre id="slogan">
  <code class="language-python">
  <span class="hljs-keyword">yield from</span> <span id='slogan-core'>{parseSeries[series]['emoji']}</span>...
  </code>
</pre>

<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li><span style='font-family: Arial;color:gray;'>{moment(post.date).format('YYYY-MM-DD')}</span> <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
      </li>
  {/each}
</ul>
</div>

