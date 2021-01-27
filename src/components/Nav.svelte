<script>
  export let segment;
  import { GithubIcon, LogInIcon } from 'svelte-feather-icons'
  import { lang } from './stores.js';

  function switchLang() {
    lang.update(value => {
      if (value == 'en') {
        value = 'cn'
      } else {
        value = 'en'
      }
      return value;
    });
  }
</script>

<style>
  nav {
    /* border-bottom: 1px solid rgba(255, 62, 0, 0.1); */
    font-weight: 300;
    padding: 0;
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    z-index: 1;
    background: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul.main-nav {
    align-self: flex-start;
    background: white;
    border-radius: 5px;
  }

  ul.extra-nav {
    align-self: flex-end;
    margin-right: 1em;
    background: white;
    border-radius: 5px;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    /* clear: both; */
  }

  li {
    float: left;
    display: block;
    margin-top: 0em;
  }

  .bold {
    font-weight: bold;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 3px;
    background-color: #32aaee;
    display: block;
    bottom: -1px;
  }

  a, span {
    margin-top: 0em;
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    font-family: Arial;
    text-transform: capitalize;
  }

  a > img {
    width: 26px;
    height: auto;
  }
  
  .subscribe {
    background: lightcoral;
    padding: 0.2em 0.4em;
    margin: 1.05em 0.3em;
    border-radius: 5px;
    font-size: 0.9em;
    color: white;
  }

  .subscribe:hover{
    filter: brightness(120%);
  }

  span.language {
    background: lightblue;
    font-weight:bolder;
    margin:1em 0.5em;
    padding: 0em 0.3em;
    padding-top: 0.1em;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  span.language:hover {
    filter: contrast(105%);
  }

  @media screen and (max-width: 600px) {
    nav {
      background: white;
    }
    li, a {
      font-size: 17px;
    }
    .extra-nav li {
      display: none;
    }
    .extra-nav li:first-child {
      display: inline-block;
    }
  }
</style>

<nav id='nav'>
  <ul class='main-nav {$lang == 'cn' ? "bold": "normal"}'>
    <li>
      <a sapper:prefetch class:selected={segment === undefined} href=".">{$lang == 'cn' ? "首页":"home"}</a>
    </li>
    
    <li>
      <a sapper:prefetch class:selected={segment === 'blog'} href="blog">{$lang == 'cn' ? "博客":"blog"}</a>
    </li>
    <li>
      <a sapper:prefetch class:selected={segment === 'about'} href="about">{$lang == 'cn' ? "关于我":"about"}</a>
    </li>
    <li>
      <a class='subscribe' href='http://eepurl.com/gEVgL9' rel="noopener" target='_blank'>{$lang == 'cn' ? "邮件订阅":"subscribe"}</a>
    </li>
  </ul>



  <ul class='extra-nav'>
    <li>
      {#if $lang == "en"}
        <span class='language' style="font-weight: bold" on:click={switchLang}>中</span>
      {:else}
        <span class='language' style="font-weight: bolder" on:click={switchLang}>EN</span>
      {/if}
    </li>
    <li class='extra-github'>
      <a href="https://github.com/qutang" target="_blank" rel="noopener" style="display: inline-block;">
      <GithubIcon size="24" />
      </a>
    </li>
    <li>
      <a href="https://www.yuque.com/qutang" target='_blank' rel="noopener" style="display: inline-block;">
        <img src="yuque.svg" alt="Yuque" />
      </a>
    </li>
    <li>
      <span onclick="window.open('/admin/')" style="cursor:pointer;display: inline-block;">
      <LogInIcon size="24" />
      </span>
    </li>
  </ul>
</nav>
