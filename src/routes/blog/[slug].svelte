<script context="module">
	export async function load({ page, fetch, session, context }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const url = `/blog/${page.params.slug}.json`;
		const res = await fetch(url);
		const data = await res.json();
		if (res.ok) {
			return {
				props: {
					post: data.post
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}
	}

	export const prerender = true;
</script>

<script>
	export let post;

	import series from '$lib/Blog/_series';
	import { lang, navName } from '$lib/stores';
	import { toLocale } from '$lib/api/date';
	import { onMount } from 'svelte';
	import { browser } from "$app/env";

	let on_colab = post.src.includes('colab');
	let on_yuque = post.src.includes('yuque');
	let edit_where = on_colab ? 'Colab' : 'Github';
	edit_where = on_yuque ? '语雀' : edit_where;
	const edit_text_cn = '在' + edit_where + '查看或编辑本文';
	const edit_text_en = 'View/edit this page on ' + edit_where;

	onMount(async () => {
		[...document.querySelectorAll('a[href^="#"]')].map(
			(x) => (x.href = '/blog/' + post.slug + new URL(x.href).hash)
		);
	});

	navName.update(() => 'blog');
	if (browser) {
		lang.update(() => localStorage.getItem("lang"));
	}
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<article class="container">
	<h2>{post.title}</h2>

	<section class="meta">
		<span class="button series"
			><a href="/blog/series/{post.series}">{series[post.series][$lang]}</a></span
		>
		<time class="date button" datetime={post.date}>{toLocale(post.date, $lang)}</time>
		<span class="button edit"
			><a
				href={post.src + '?translate=' + ($lang == 'cn' ? 'zh' : 'en')}
				rel="noopener"
				target="_blank"
				style="margin-top: 0">{$lang == 'cn' ? edit_text_cn : edit_text_en}</a
			></span
		>
	</section>

	<section class="license box">
		{#if $lang == 'cn'}
			本作品采用<a
				rel="license"
				target="_blank"
				href="http://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
				>知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a
			>进行许可。
		{:else}
			This work is licensed under a
			<a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
				>Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a
			>.
		{/if}
	</section>
	<article class="article">
		{@html post.html}
	</article>
</article>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	article.container {
		max-width: 600px;
		margin: 120px auto;
	}

	.container section {
		height: inherit;
		display: block;
	}

	.meta {
		line-height: 2.5em;
	}

	.button a {
		color: white;
		text-decoration: none;
	}

	.series {
		background: var(--focus);
		font-weight: bold;
	}

	.edit {
		background: var(--links);
	}

	@media screen and (max-width: 700px) {
		article.container {
			max-width: 90%;
			margin: 0 auto;
		}

		.container section {
			width: inherit;
		}
	}
</style>
