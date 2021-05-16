<script>
    import content from "$lib/PythonWheels/_content.json";
</script>

<svelte:head>
    <title>Python Wheels | qutang.dev</title>
</svelte:head>

<p><a href="/">Back to qutang.dev</a></p>

<h1>Python binary wheels for Windows</h1>
<p>A partial linkable list of python wheels for Windows, migrated from <a href="https://www.lfd.uci.edu/~gohlke/pythonlibs/">https://www.lfd.uci.edu/~gohlke/pythonlibs/</a>.</p>

<h2>Usage</h2>
<p>Use <code>-f</code> option in <code>pip</code> command.</p>
<pre>
    <code class="hljs language-bash">
        > pip install -f https://qutang.dev/python-wheels package-name
    </code>
</pre>

{#each content as pack}
    <h2>{pack.title}</h2>
    <ul>
        {#each pack.wheels as wheel}
            <li><a ref="external" href="{wheel.url}">{wheel.name}</a></li>
        {/each}
    </ul>
{/each}