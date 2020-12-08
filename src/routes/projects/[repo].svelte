<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`projects/${params.repo}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { project: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let project;
  
  import { lang } from '../../components/stores.js';
  import { toLocale } from '../../_plugins/date.js';
  import { onMount } from 'svelte';

  let edit_text = undefined;
  let license_text = undefined;
  const edit_text_cn = "在GitHub查看本项目";
  const edit_text_en = "View on GitHub";

  onMount(async () => {
		const sysLang = window.userLanguage || window.navigator.language;
    const value = sysLang.includes('zh') ? 'cn' : 'en';

    if($lang == "") {
      lang.update(() => value);
    }

    [...document.querySelectorAll('a[href^="#"]')].map(
      x => (x.href = '/projects/' + project.repo + new URL(x.href).hash)
    )
	});
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

  .content {
    max-width: 56em;
    margin: 5em auto;
  }

  .license {
    margin: 0.2em;
    padding: 0.2em 0.5em;
    background: lightsalmon;
    border-radius: 5px;
  }

  .meta {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }

  .edit {
    margin: 0.2em;
    padding: 0.2em 0.5em;
    text-align: center;
    background: lightgray;
    border-radius: 5px;
  }

  .edit a,
  .license a {
    text-decoration: none;
    color: white;
  }

  @media screen and (max-width:600px) {
    .edit, .date {
      width: 100%;
    }
  }

  @media screen and (max-width:1024px) and (min-width:600px) {
    .edit {
      width: 100%;
      flex: auto;
    }
  }
</style>

<svelte:head>
  <title>{project.name}</title>
  <link rel="preload prefetch stylesheet" href="project_repo.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="project_repo.css" as="style"></noscript>
</svelte:head>


<div class="content">

<p class='breadcumb'>
<a href="/">qutang.dev</a> | <a href="/projects">Other projects</a> | <a href={project.official || project.src} rel='noopener' target="_blank" >{project.official != null ? "Official site" : "GitHub Repo"}</a>
</p>

  {@html project.html}


<p class='meta'>
  <span class='edit'><a href={project.src} rel='noopener' target="_blank" style='margin-top: 0'>{$lang == 'cn' ? edit_text_cn : edit_text_en}</a></span>
  <span class='license'><a href={`https://github.com/${project.owner}/${project.repo}/blob/master/LICENSE`} rel='noopener' target="_blank" title='LICENSE'>{project.license}</a></span>
</p>



</div>
