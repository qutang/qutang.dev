<script>
  import { lang } from "$lib/stores";
  import content from "$lib/Home/_content.json";
</script>

<ul>
  {#each content as item}
	<li>
		<h3>
      {#if item.url != null}
        <a href="{item.url}">{item.title[$lang]}</a> <span>{item.icon}</span>
      {:else}
        <span>{item.title[$lang]}</span> <span>{item.icon}</span>
      {/if}
    </h3>
		<p>
			{@html item.description[$lang]}
		</p>
	</li>
  {/each}
</ul>

<style>
  h3 {
    font-weight: normal;
    color: var(--text-main);
  }

  h3 > a {
    color: var(--text-main);
  }

  h3 > a:hover {
    color: var(--text-bright);
    text-decoration: none;
  }

  p {
    color: var(--text-muted);
  }
</style>