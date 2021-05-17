
<script>
    export let el;
    import { ArrowDownIcon } from "svelte-feather-icons";
</script>

<div id="scrolldown" on:click={() => el.scrollBy(0, 100)}><span><ArrowDownIcon size="24" /></span></div>

<style>
    #scrolldown {
        overflow: hidden;
        margin: 0 auto;
        text-align: center;
    }

    #scrolldown span {
        display: inline-block;
        cursor: pointer;
        animation: flash 0.75s infinite;
        position: relative;
    }

    @keyframes flash {
        from {transform: scale(1);}
        to {transform: scale(1.2);}
    }
</style>