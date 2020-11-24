<script>
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
  footer {
    /* border-bottom: 1px solid rgba(255, 62, 0, 0.1); */
    font-weight: 300;
    padding: 0;
    bottom:0;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 1;
    background: none;
  }

  .right-column {
    align-self: flex-end;
    margin-right: 1em;
    font-family: Arial, Helvetica, sans-serif;
  }

  .right-column strong {
    font-weight: bold;
  }
</style>

<footer>
      <p class='right-column'>
        2019 - {new Date().getFullYear()} © <a href="https://qutang.dev"><strong>{$lang == 'cn' ? "唐曲":"Qu Tang"}</strong></a>
      </p>
</footer>
