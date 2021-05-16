<script>
  import { lang } from "$lib/stores";
  import "./index.css";
  import content from "$lib/Home/_content.json";
</script>

<ul>
  {#each content as item}
	<li>
		<h2 class="{$lang == "cn" ? "smaller-font": ""}">
      {#if item.url != null}
        <a href="{item.url}" class="{$lang == "cn" ? "smaller-font": ""}">{$lang == 'cn' ? item.title.cn: item.title.en}</a> {item.icon}
      {:else}
        {$lang == 'cn' ? item.title.cn: item.title.en} {item.icon}
      {/if}
    </h2>
		<p>
			{@html $lang == 'cn' ? item.description.cn: item.description.en}
		</p>
	</li>
  {/each}
</ul>
