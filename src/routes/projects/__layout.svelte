<script>
  import { lang } from "$lib/stores";
  import { onMount } from 'svelte';
  import "../../../node_modules/katex/dist/katex.min.css";
  import "../../../node_modules/highlight.js/styles/darcula.css";

  onMount(async () => {
		const sysLang = window.userLanguage || window.navigator.language;
    const value = sysLang.includes('zh') ? 'cn' : 'en';

    if($lang == "") {
      lang.update(() => value);
    }

    [...document.querySelectorAll('a[href^="#"]')].map(
      x => (x.href = document.location + new URL(x.href).hash)
    )
  });

</script>

<slot />


