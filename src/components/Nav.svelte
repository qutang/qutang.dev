<script>
  export let segment;
  import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
  import FaRegUserCircle from 'svelte-icons/fa/FaRegUserCircle.svelte'
</script>

<style>
  nav {
    /* border-bottom: 1px solid rgba(255, 62, 0, 0.1); */
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    z-index: 1;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul.main-nav {
    align-self: flex-start;
  }

  ul.extra-nav {
    align-self: flex-end;
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

  .extra-nav a, .extra-nav span {
    display: inline-block;
    height: 3.5em;
    width: 3.5em;
  }
</style>

<nav>
  <ul class='main-nav'>
    <li>
      <a class:selected={segment === undefined} href=".">home</a>
    </li>
    
    <li>
      <a rel="prefetch" class:selected={segment === 'blog'} href="blog">blog</a>
    </li>
    <li>
      <a class:selected={segment === 'about'} href="about">about</a>
    </li>
  </ul>

  <ul class='extra-nav'>
    <li class='extra-github'>
      <a href="https://github.com/qutang">
      <FaGithub />
      </a>
    </li>
    <li>
      <span onclick="window.open('/admin/')" style="cursor:pointer;">
      <FaRegUserCircle />
      </span>
    </li>
  </ul>
</nav>
