<script context="module">
  export function preload({ params, query }) {
    console.log('Start fetching projects...')
    return this.fetch(`projects.json`)
      .then(r => r.json())
      .then(result => {
        // console.log(result);
        let projects = result.projects.filter(project => {
          return project.page == "1";
        });
        console.log('Stop fetching projects...')
        return { projects, page: 1, totalPages: result.totalPages };
      });
  }
</script>

<script>
  export let projects;
  export let page;
  export let totalPages;
  import {lang} from '../../components/stores.js';
  import { toLocale } from '../../_plugins/date.js';
  import colorsys from 'colorsys';

  function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
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
    var vv = parseInt(encoded.substring(6, 8), 16) / 255 * 0.5 + 0.5;

    return colorsys.stringify(colorsys.hsvToRgb({h: hh, s: ss * 100, v: vv * 100}));
  }
</script>

<style>

  .content {
    max-width: 90em;
    margin: 4em auto 4em auto;
  }
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .pagination-previous {
    float: left;
  }

  #highlight-heading {
    font-size: 36px;
  }

  .pagination-next {
    float: right;
  }

  .content h1 {
    text-align: center;
    margin: 0 auto;
    font-size: 1.6em;
    font-family: "Lora";
  }



  @media screen and (max-width:600px) {
    ul {
      list-style-type: none;
      padding-left: 0;
    }
     
  }


  @media screen and (min-width: 1024px) {
    ul {
      max-width: 80em;
      margin: 0 auto;
    }
    li {
      width: 18em;
      padding: 0.5em 1em;
      margin-top: 0;
    }
  }

  @media only screen and (max-width: 600px) {
    ul {
      width: 100%;
      margin: 0 auto;
    }
    li {
      padding: 0;
      margin-top: 0;
    }
  }
  ul{
    display: flex;
    width: 100%;
    list-style-type: none;
    justify-content: space-evenly;
    align-content: flex-start;
    margin: 0 auto;
    padding-left: 0;
    flex-wrap: wrap;
  }

  

  li p {
    font-size: 0.7em;
    text-align: justify;
    word-break: normal;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    margin: 0.5em 0;
    color: gray;
  }

  li>p:first-child {
    text-align: center;
    word-break: normal;
  }

  li>:first-child, li>:first-child a {
    font-size: 22px;
    font-family: Arial;
    text-align: center;
  }

  li a {
    font-family: Arial;
    text-decoration: none;
  }

  li a:hover{
    text-decoration: underline;
  }

  li :nth-child(n+2) {
    font-family: Arial;
  }

  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tag {
    margin: 0.1em 0.3em;
    padding: 0.3em 0.5em;
    border-radius: 5px;
    color: white;
    word-wrap: normal;   
  }

</style>

<svelte:head>
  <title>{$lang == 'cn' ? '唐曲-项目' : "Qu Tang - Projects"}</title>
</svelte:head>


<div class='content'>
  <h1 id="highlight-heading">
    <strong>{$lang == "cn" ? "项目" : "Projects."}</strong>
  </h1>

  <ul>
    {#each projects as project}
      <!-- we're using the non-standard `rel=prefetch` attribute to
          tell Sapper to load the data for the page as soon as
          the user hovers over the link or taps it, instead of
          waiting for the 'click' event -->
      <li> 
      <p><a rel="prefetch" href="/projects/{project.repo}">{project.name}</a></p>
      <p class='tags'>
        {#each project.tags as tag}
          <span class='tag' style={`background: ${randomColor(tag)};`}>{tag}</span>
        {/each}
      </p>
       <p>{project.desc}</p>
      </li>
    {/each}
  </ul>

  <p class='pagination'>
  {#if page > 1}
    <a href="/projects/page/{page - 1}" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
  {:else if page == 2}
  <a href="/projects/" class='pagination-previous'>{$lang == 'cn' ? "上一页" : "Previous page"}</a>
  {/if}

  {#if page < totalPages}
    <a href="/projects/page/{page + 1}" class='pagination-next'>{$lang == 'cn' ? "下一页" : "Next page"}</a>
  {/if}
  </p>
  
</div>

