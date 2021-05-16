<script context="module">
    export const prerender = true;
    
    export async function load({ page, fetch, session, context }) {
        const filePath = '/badges/rubbing_palms.csv';
        const imageUrl = '/badges/rubbing_palms.png';
        const data = await fetch(filePath);
        const content = await data.text();
        return {
            props: {
                data: content,
                image: imageUrl
            }
        }
    }
</script>

<script>
    export let data;
    export let image;
    import Badge from "$lib/SignalBadge/index.svelte";
</script>

<div id='badge'>
    <Badge data={data} image={image} />
</div>

<style>
    #badge {
        width: 600px;
        margin: 0 auto;
        margin-top: 100px;
    }
</style>
