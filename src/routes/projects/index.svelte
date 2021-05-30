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
	import colorsys from 'colorsys';
  import { browser } from "$app/env";
	function toHex(str) {
		var result = '';
		for (var i = 0; i < str.length; i++) {
			result += str.charCodeAt(i).toString(16);
		}
		return result;
	}

	function randomColor(data) {
		var encoded = toHex(data);
		if (encoded.length < 10) {
			encoded = encoded.repeat(5);
		}
		var hh = parseInt(encoded.substring(1, 3), 16);
		var ss = parseInt(encoded.substring(4, 6), 16) / 255;
		var vv = (parseInt(encoded.substring(6, 8), 16) / 255) * 0.5 + 0.5;
		return colorsys.stringify(colorsys.hsv2Rgb({ h: hh, s: ss * 100, v: vv * 100 }));
	}

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
      <hr>
      <article>
        <h3>
          <a sveltekit:prefetch href="/projects/{project.repo}"
            >{project.name[$lang]}</a
          >
        </h3>
        <section class="tags">
          {#each $lang == 'cn' ? project.tags.cn : project.tags.en as tag}
            <span class="tag" style={`background: ${randomColor(tag)};`}>{tag}</span>
          {/each}
        </section>
        <p>{project.desc[$lang]}</p>
      </article>

    {/each}
</section>

<style>

  .container {
    margin: 120px auto;
    max-width: 600px;
    height: inherit;
    display: block;
  }

  h2 {
    text-align: center;
    margin-bottom: 2em;
  }

  h3 {
    margin-bottom: 0;
  }

  .tags {
    height: inherit;
    display: block;
    line-height: 1.5em;
    text-align: left;
  }

  .tag {
    color: white;
    margin-left: 0;
    padding: 0.05em 0.2em;
    margin: 0.05em 0.15em;
    border-radius: 3px;
    font-size: 0.9em;
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
