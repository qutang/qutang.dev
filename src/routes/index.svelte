<script context="module">
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
	export const prerender = true;
</script>

<script>
	export let data;
	export let image;
	import ScrollUp from '$lib/ScrollUpButton/index.svelte'
	import ScrollDown from '$lib/ScrollDownButton/index.svelte'
	import Footer from '$lib/Footer/index.svelte'
	// import coverUrl from "$lib/Home/index_cover.png";
	import Badge from "$lib/SignalBadge/index.svelte";
	import { lang, navName } from "$lib/stores";
	import Home from "$lib/Home/index.svelte";
import { onMount } from 'svelte';
	// import { Parallax, ParallaxLayer } from 'svelte-parallax';
	// import { onMount } from 'svelte';
	// import { beforeUpdate } from 'svelte';
	let parallax;
	navName.update(() => "");
	let id;
	onMount(() => {
		id = setTimeout(() => {
			console.log('fire');
			parallax.scrollBy(0, 100);
		}, 2000);

		window.ontouchstart = () => {
			clearTimeout(id);
		};
	});
	
</script>

<svelte:head>
	<title>
		{$lang == 'cn' ? "唐曲 - 数据，机器学习，移动健康": "Qu Tang - share about data science, machine learning, mobile health"}
	</title>
</svelte:head>

<div class="content" bind:this={parallax} on:mousemove={() => clearTimeout(id)} >
	<!-- <Parallax sections={2} config={{stiffness: 0.2, damping: 0.3}} bind:this={parallax}> -->
		<!-- <ParallaxLayer rate={0} offset={0}> -->
		<div class='section'>
			<div id="slogan">
				<Badge data={data} image={image} />
				<h2>
					{
						$lang == 'cn' ? "热衷于探索移动、物联、可穿戴技术，以及人工智能在医疗、健康、生活方式上带来的变革。" : "Researcher, developer, and enthusiast in mobile technologies, health, and artificial intelligence."
					}
					
				</h2>
			</div>
			<div class='control'>
				<ScrollDown el={parallax} />
			</div>
			
		</div>
			
		<!-- </ParallaxLayer> -->
		<!-- <ParallaxLayer rate={0} offset={1}> -->
		<div class='section'>
			<div id="highlight">
				<p id="highlight-heading">
					<strong>{$lang == "cn" ? "重点项目" : "Highlights."}</strong>
				</p>
				<Home />
			</div>
			<div class='control'>
				<ScrollUp el={parallax} />
			<Footer />
			</div>
			
		</div>
			
		<!-- </ParallaxLayer> -->
	<!-- </Parallax> -->
	<!-- <div class="section" id="section-slogan">
		<img src="{coverUrl}" alt="">
		
	</div> -->
	
	<!-- <div class="section" id="section-highlight">
		
	</div> -->
</div>

<style>

#slogan h2 {
	margin: 0 auto;
	margin-top: 50px;
	font-family: "Lora";
	font-size: 20px;
	width: 70%;
}

 #slogan {
	width: 600px;
	margin: 0 auto;
}

#highlight {
	margin: 0 auto;
	position: relative;
} 

.control {
	position: absolute;
	bottom: 20px;
	margin-bottom: 10px;
	width: 100%;
}


/* 
#slogan img {
	max-width: 600px;
	height: auto;
	box-shadow: none;
	display: block;
	margin: 0 auto;
} */

#highlight-heading {
	font-size: 36px;
}

p {
	text-align: center;
	margin: 0 auto;
	font-size: 1.6em;
}

@media only screen and (max-width: 600px) {
	/* #slogan img {
	max-width: 100%;
	} */
}

</style>