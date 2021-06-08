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
	import { toLocale, toHumanReadable, getDaysAgo } from '$lib/api/date';
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
				<span class="time">{toLocale(post.create_date, $lang)}</span>
				<h3><a sveltekit:prefetch href="/blog/{post.slug}">{post.title}</a></h3>
				{#if getDaysAgo(post.update_date) <= 31}
					<span class='time update'><sup>{$lang == "cn" ? toHumanReadable(post.update_date, $lang) + "更新" : "Updated " + toHumanReadable(post.update_date, $lang)}</sup></span>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	li {
		margin: 1em 0;
		line-height: 2em;
	}

	h3 {
		display: inline;
		font-size: 1em;
	}

	h3 > a {
		color: var(--text-main);
	}

	h3 > a:hover {
		color: var(--text-bright);
		text-decoration: none;
	}

	.time {
		color: var(--text-muted);
	}

	@media screen and (max-width: 700px) {
		ul {
			list-style-type: none;
			padding-left: 0;
		}
	}
</style>
