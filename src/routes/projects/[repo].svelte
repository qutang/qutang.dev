<script context="module">
	export async function load({ page, fetch, session, context }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const url = `/projects/${page.params.repo}.json`;
		const res = await fetch(url);
		const data = await res.json();

		if (res.ok) {
			return {
				props: {
					project: data
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
	export let project;

	import { lang, navName } from '$lib/stores';
	import { onMount } from 'svelte';
	import { browser } from "$app/env";

	const edit_text_cn = '在GitHub查看本项目';
	const edit_text_en = 'View on GitHub';

	onMount(async () => {
		const sysLang = window.userLanguage || window.navigator.language;
		const value = sysLang.includes('zh') ? 'cn' : 'en';

		if ($lang == '') {
			lang.update(() => value);
		}

		[...document.querySelectorAll('a[href^="#"]')].map(
			(x) => (x.href = '/projects/' + project.repo + new URL(x.href).hash)
		);
	});

	navName.update(() => 'project');
	if (browser) {
		lang.update(() => localStorage.getItem("lang"));
	}
</script>

<svelte:head>
	<title>{$lang == 'cn' ? project.name.cn : project.name.en} | qutang.dev</title>
</svelte:head>

<article class="container">
	<section class="breadcumb">
		<a href="/">qutang.dev</a> |
		<a href="/projects">{$lang == 'cn' ? '其他项目' : 'Other projects'}</a>
		|
		<a href={project.official || project.src} rel="noopener" target="_blank">
			{#if $lang == 'cn'}
				{project.official != null ? '官方网站' : 'GitHub仓库'}
			{:else}
				{project.official != null ? 'Official site' : 'GitHub Repo'}
			{/if}
		</a>
	</section>
	<article class="article">
		{@html project.html}
	</article>

	<footer class="meta">
		<span class="edit button"
			><a href={project.src} rel="noopener" target="_blank" style="margin-top: 0"
				>{$lang == 'cn' ? edit_text_cn : edit_text_en}</a
			></span
		>
		<span class="license button"
			><a
				href={`https://github.com/${project.owner}/${project.repo}/blob/master/LICENSE`}
				rel="noopener"
				target="_blank"
				title="LICENSE">{project.license}</a
			></span
		>
	</footer>
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

	.container {
		margin: 120px auto;
		max-width: 600px;
	}

	.breadcumb {
		height: inherit;
		display: block;
	}

	.license {
		background: var(--background-alt);
	}

	.license a {
		color: var(--code);
	}

	.edit {
		background: var(--links);
	}

	.edit a {
		color: white;
	}

	.button a {
		text-decoration: none;
	}

	.meta {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
	}

	@media screen and (max-width: 700px) {
		.container {
			margin-top: 0;
			max-width: 90%;
			margin-bottom: 0;
		}
	}
</style>
