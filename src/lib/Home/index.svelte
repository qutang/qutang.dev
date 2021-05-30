<script>
  import { lang } from "$lib/stores";
  import content from "$lib/Home/_content.json";
</script>

<ul>
  {#each content as item}
	<li>
		<h3>
      {#if item.url != null}
        <a href="{item.url}">{item.title[$lang]}</a> {item.icon}
      {:else}
        {item.title[$lang]} {item.icon}
      {/if}
    </h3>
		<p>
			{@html item.description[$lang]}
		</p>
	</li>
  {/each}
</ul>
