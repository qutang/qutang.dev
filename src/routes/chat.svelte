<script context="module">
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script>
	import Footer from "$lib/Footer/index.svelte"
	import { lang, navName } from '$lib/stores';

	navName.update(() => "chat");
	let parallax;
</script>

<svelte:head>
	<title>{$lang == 'cn' ? '加入群组讨论' : "Join a group chat"} | qutang.dev</title>
</svelte:head>

<div class='content' bind:this={parallax}>
	<div class='inner'>
        <p>{$lang == "cn" ? "欢迎一起分享知识和想法": "Hope to share thoughts and ideas with you all!"}</p>
		  <div class='chat'>
            <div class='discord'>
                <h2>
                    For English chat, please join the discord server
                </h2>
                <div>
                    <iframe title="discord server" src="https://discord.com/widget?id=845101357039616000&theme=dark" height="300" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
            </div>
            <div class='qq'>
                <h2>
                    中文请加QQ群（825489524）
                </h2>
                <div>
                    <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=vxOxATQ6vE8kEQk6PgFXpIgj26LSNBTN&jump_from=webapi"><img border="0" src="/qutang.dev_qqgroup.png" alt="qutang.dev" title="加入QQ群"></a>
                </div>
            </div>
            
		  </div>
	</div>
	<Footer />
</div>

<style>

.inner {
	margin: 100px auto;
	width: 70%;
}

.chat {
    margin-top: 50px;
    display: flex;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
    
}

@media screen and (max-width: 600px) {
    .inner {
        margin: 0 auto;
        width: 95%;
    }
    .chat>div {
        width: 100%;
    }
    .chat {
        display: block;
        margin-top: 30px;
    }
}

.inner > p {
    text-align: center;
    margin-top: 100px;
}

.chat h2 {
    text-align: center;
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.chat div {
    margin: 0 auto;
    text-align: center;
    flex: 1;
}

.chat iframe {
    margin: 20px;
}

.chat div img {
    margin: 0;
    width: 50%;
    height: auto;
    box-shadow: none;
    display: inline;
}
</style>
