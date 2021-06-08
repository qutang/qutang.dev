<script context="module">
	export async function load({ page, fetch, session, context }) {
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
		};
	}

	export const prerender = true;
</script>

<script>
	export let posts;
	export let page;
	export let totalPages;
	import { lang, navName } from '$lib/stores';
	import series from '$lib/Blog/_series';
	import { toLocale, toHumanReadable, getDaysAgo } from '$lib/api/date';
	import i18n from '$lib/i18n';
	import IoIosArrowForward from 'svelte-icons/io/IoIosArrowForward.svelte';
	import IoIosArrowBack from 'svelte-icons/io/IoIosArrowBack.svelte';
	navName.update(() => 'blog');
</script>

<svelte:head>
	<title>{i18n['blog'][$lang]} | qutang.dev</title>
</svelte:head>

<section class="container">
	<h2>{i18n['article_list'][$lang]}</h2>
	<ul>
		{#each posts as post}
			<li>
				<span class="time">{toLocale(post.create_date, $lang)}</span>
				<h3><a sveltekit:prefetch href="/blog/{post.slug}">{post.title}</a></h3>
				{#if getDaysAgo(post.update_date) <= 31}
					<span class='time update'><sup>{$lang == "cn" ? toHumanReadable(post.update_date, $lang) + "更新" : "Updated " + toHumanReadable(post.update_date, $lang)}</sup></span>
				{/if}
				<span class="button">
					<a href="/blog/series/{post.series}">
						{series[post.series][$lang]}
					</a>
				</span>
			</li>
		{/each}
	</ul>
	<section class="pagination">
		{#if page > 2}
			<a href="/blog/page/{page - 1}" class="pagination-previous"
				><span class="icon"><IoIosArrowBack /></span></a
			>
		{:else if page == 2}
			<a href="/blog" class="pagination-previous"><span class="icon"><IoIosArrowBack /></span></a>
		{/if}

		{#if page < totalPages}
			<a href="/blog/page/{page + 1}" class="pagination-next"
				><span class="icon"><IoIosArrowForward /></span></a
			>
		{/if}
	</section>
</section>

<style>
	.container {
		align-content: center;
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

	h2 {
		font-weight: normal;
	}

	li {
		margin: 1em 0;
		line-height: 2em;
	}

	.time {
		color: var(--text-muted);
	}

	.button {
		background: var(--background-alt);
		font-weight: normal;
	}

	.button:hover {
		background: var(--background);
	}

	.button a {
		color: var(--code);
		text-decoration: none;
	}

	.pagination {
		height: 20px;
		display: block;
		text-align: center;
	}

	.icon {
		color: var(--text-muted);
	}

	.icon:hover {
		color: var(--text-main);
	}

	@media screen and (max-width: 700px) {
		ul {
			list-style-type: none;
			padding-left: 0;
		}
		.pagination {
			z-index: 1;
			height: inherit;
			display: block;
			position: fixed;
			bottom: 16px;
		}

		.pagination-next {
			float: right;
			margin-right: 0px;
		}

		.pagination-previous {
			float: left;
			margin-left: 0px;
		}
	}
</style>