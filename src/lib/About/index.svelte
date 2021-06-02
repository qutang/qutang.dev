<script>
    import content from "$lib/About/_content.json";
    import { lang } from "$lib/stores";
</script>


{#each content as section}
    <h2 id="{section.anchor}">{section.title[$lang]}</h2>
    <div>
        {@html section.content[$lang]}
    </div>
{/each}