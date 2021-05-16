<script context="module">
	export const prerender = true;
</script>

<script>
	import coverUrl from "$lib/Home/index_cover.png";
	import { lang, navName } from "$lib/stores";
	import Home from "$lib/Home/index.svelte";
	import { beforeUpdate } from 'svelte';

	navName.update(() => "");

	beforeUpdate(() => {
		
	});
</script>

<svelte:head>
	<title>
		{$lang == 'cn' ? "唐曲 - 数据，机器学习，移动健康": "Qu Tang - share about data science, machine learning, mobile health"}
	</title>
	<script
		defer
		type="text/javascript"
		src="https://identity.netlify.com/v1/netlify-identity-widget.js">
	</script>
</svelte:head>

<div class="content">
	<pre id="slogan">
		<img src="{coverUrl}" alt="">
	</pre>
	<p id="highlight-heading">
		<strong>{$lang == "cn" ? "重点项目" : "Highlights."}</strong>
	</p>
	<Home />
</div>

<style>
  
#slogan {
	background: none;
	display: flex;
	width: 100%;
	margin: 0 auto;
	max-height: inherit;
}

#slogan img {
	max-width: 600px;
	height: auto;
	box-shadow: none;
	display: block;
	margin: 0 auto;
}

#highlight-heading {
	font-size: 36px;
}

p {
	text-align: center;
	margin: 0 auto;
	font-size: 1.6em;
}

.content {
	margin: 5em auto;
}

@media only screen and (max-width: 600px) {
	#slogan img {
	max-width: 100%;
	}
}

</style>