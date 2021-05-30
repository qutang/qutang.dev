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
		};
	}

	export const prerender = true;
</script>

<script>
	export let posts;
	export let series;
	import parseSeries from '$lib/Blog/_series';
	import { toLocale } from '$lib/api/date';
	import { lang, navName } from '$lib/stores';
	import i18n from '$lib/i18n';
	navName.update(() => 'blog');
</script>

<svelte:head>
	<title>{i18n['blog'][$lang] + ': ' + parseSeries[series][$lang]} | qutang.dev</title>
</svelte:head>

<section>
  <h2>{parseSeries[series][$lang]}</h2>
	<ul>
		{#each posts as post}
			<li>
				<span>{toLocale(post.date, $lang)}</span>
				<a sveltekit:prefetch href="/blog/{post.slug}">{post.title}</a>
			</li>
		{/each}
	</ul>
</section>

<style>
  li {
    margin: 1em 0;
    line-height: 2em;
  }

	@media screen and (max-width: 700px) {
    ul {
			list-style-type: none;
			padding-left: 0;
		}
	}
</style>
