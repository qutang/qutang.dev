
<script>
    export let el;
    import { ArrowUpIcon } from "svelte-feather-icons";
</script>

<div id="scrollup" on:click={() => el.scrollTo(0, 0)}><span><ArrowUpIcon size="24" /></span></div>

<style>
    #scrollup {
        overflow: hidden;
        margin: 0 auto;
        text-align: center;
    }

    #scrollup span {
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