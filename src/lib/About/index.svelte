<script>
    import content from "$lib/About/_content.json";
    import { lang } from "$lib/stores";
</script>


{#each content as section}
    <h2 id="{section.anchor}"><b>{$lang == 'cn' ? section.title.cn : section.title.en}</b></h2>
    <div>
        {@html $lang == 'cn' ? section.content.cn : section.content.en}
    </div>
{/each}

<style>
    h2 {
        text-align: center;
        font-size: 36px;
        font-family: "Lora", sans-serif;
        margin: 1em auto;
    }
</style>