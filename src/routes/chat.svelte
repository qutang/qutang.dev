<script context="module">
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script>
	import i18n from "$lib/i18n";
	import { lang, navName } from '$lib/stores';
	import { browser } from "$app/env";
	if (browser) {
		lang.update(() => localStorage.getItem("lang"));
	}
	navName.update(() => 'chat');
</script>

<svelte:head>
	<title>{i18n['community'][$lang]} | qutang.dev</title>
</svelte:head>

<section>
    <h2>{i18n['community'][$lang]}</h2>
	<p>
		{$lang == 'cn' ? '欢迎一起分享知识和想法' : 'Hope to share thoughts and ideas with you all!'}
    </p>
	<div class="chat-container">
		<div class="chat-entry discord">
			<h3>For English chat, please join the discord server</h3>
			<div>
				<iframe
					title="discord server"
					src="https://discord.com/widget?id=845101357039616000&theme=dark"
					height="300"
					allowtransparency="true"
					frameborder="0"
					sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
				/>
			</div>
		</div>
		<div class="chat-entry qq">
			<h3>中文请加QQ群（825489524）</h3>
			<div>
				<a
					target="_blank"
					href="https://qm.qq.com/cgi-bin/qm/qr?k=vxOxATQ6vE8kEQk6PgFXpIgj26LSNBTN&jump_from=webapi"
					><img border="0" src="/qutang.dev_qqgroup.png" alt="qutang.dev" title="加入QQ群" /></a
				>
			</div>
		</div>
	</div>
</section>

<style>
	.chat-container {
		display: flex;
		align-content: center;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.chat-entry {
		margin: 0 auto;
		text-align: center;
		flex: 1;
	}

	.chat-entry img {
        margin-top: 10px;
		width: 75%;
		height: auto;
	}
</style>
