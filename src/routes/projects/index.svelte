<script context="module">
	export async function load({ page, fetch, session, context }) {
		console.log('Start fetching projects...');
		const url = `/projects.json`;
		const res = await fetch(url);
		const data = await res.json();
		const projects = data.projects.filter((project) => {
			return project.page == '1';
		});
		console.log('Stop fetching projects...');
		if (res.ok) {
			return {
				props: {
					projects: projects,
					page: 1,
					totalPages: data.totalPages
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
	export let projects;
	import { lang, navName } from '$lib/stores';
  import i18n from "$lib/i18n";
  import { browser } from "$app/env";

	navName.update(() => 'project');
  if (browser) {
		lang.update(() => localStorage.getItem("lang"));
	}
</script>

<svelte:head>
	<title>{i18n['projects'][$lang]} | qutang.dev</title>
</svelte:head>

<section class="container">
		<h2>
			{i18n['projects'][$lang]}
		</h2>
    {#each projects as project}
      <article class="project">
        <a sveltekit:prefetch href="/projects/{project.repo}">
          <h3>
            {project.name[$lang]}
          </h3>
          <section class="tags">
            {#each $lang == 'cn' ? project.tags.cn : project.tags.en as tag}
              <span class="tag button">{tag}</span>
            {/each}
          </section>
          <p>{project.desc[$lang]}</p>
        </a>
      </article>

    {/each}
</section>

<style>

  .container {
    margin: 200px auto;
    max-width: 600px;
    height: inherit;
    display: block;
  }


  .project {
    padding: 0.5em 1em;
    border-radius: 15px;
  }

  .project:hover {
    background: var(--background-alt);
    cursor: pointer;
    transition: background 0.1s ease-in-out;
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5em;
  }

  h3 {
    margin-bottom: 0;
    margin-top: 0.5em;
    color: var(--text-muted);
  }

  a {
    color: var(--text-main);
  }

  a:hover {
    text-decoration: none;
  }

  a:hover h3, a:hover p {
    color: var(--text-main);
    transition: color var(--transition-duration) 0.1s;
  }

  .tags {
    height: inherit;
    display: block;
    line-height: 2em;
    text-align: left;
    margin: 0.5em auto;
  }

  .tag {
    color: var(--code);
    filter: contrast(90%);
    background: var(--background-alt);
    margin-left: 0;
    font-size: 0.9em;
  }

  p {
    color: var(--text-muted);
    margin-bottom: 0.5em;
    font-size: 0.95em;
  }

  @media screen and (max-width: 700px) {
    .container {
      margin: 0 auto;
      max-width: 90%;
      height: inherit;
      display: block;
    }

    .tags {
      width: 100%;
      word-wrap: normal;
    }
  }
</style>
