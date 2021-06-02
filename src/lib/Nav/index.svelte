<script>
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
    import TiMessages from 'svelte-icons/ti/TiMessages.svelte';
    import IoMdMoon from 'svelte-icons/io/IoMdMoon.svelte';
    import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte';
	import { lang, navName, scheme } from '$lib/stores';
	import i18n from '$lib/i18n';

	function switchLang() {
        var value = localStorage.getItem("lang");
        if (value == 'en') {
            localStorage.setItem("lang", "cn");
            lang.update(() => "cn");
        } else {
            localStorage.setItem("lang", "en");
            lang.update(() => "en");
        }
	}

    function switchScheme() {
        var value = localStorage.getItem("scheme");
        if (value === "dark") {
            localStorage.setItem("scheme", "light");
            scheme.update(() => "light");
        } else {
            localStorage.setItem("scheme", "dark");
            scheme.update(() => "dark");
        }
    }
</script>

<header>
	<nav>
		<ul class="left-nav">
            <li>
                <h1>{i18n['owner']['en']}</h1>
            </li>
			<li>
                <a class="website-name" sveltekit:prefetch class:selected={$navName === ''} href="/"> @qutang.dev</a>
			</li>

			<li>
				<a sveltekit:prefetch class:selected={$navName === 'blog'} href="/blog"
					>{i18n['blog'][$lang]}</a
				>
			</li>
			<li>
				<a sveltekit:prefetch class:selected={$navName === 'about'} href="/about"
					>{i18n['about'][$lang]}</a
				>
			</li>
			<li>
                <a class="button subscribe" href="http://eepurl.com/gEVgL9" rel="noopener" target="_blank">
                    {i18n['mailing_list'][$lang]}
                </a>
			</li>
		</ul>

		<ul class="right-nav">
            <li>
                <span class="scheme" on:click={switchScheme}>
                    {#if $scheme === "dark"} 
                    <span class="icon" title={i18n['light_scheme_alt_text'][$lang]}><IoMdSunny /></span>
                    {:else}
                    <span class="icon" title={i18n['dark_scheme_alt_text'][$lang]}><IoMdMoon /></span>
                    {/if} 
                </span>
			</li>
			<li>
                <span class="button language" on:click={switchLang}>{i18n["lang_button_text"][$lang]}</span>
			</li>
			<li class="extra-github">
				<a href="https://github.com/qutang" target="_blank" rel="noopener">
					<span class="icon"><FaGithub /></span>
				</a>
			</li>
			<li class="extra-chat">
				<a href="/chat" target="_blank" rel="noopener" title={i18n['chat_alt_text'][$lang]}>
					<span class="icon"><TiMessages /></span>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>

    header {
        width: 100%;
        position: fixed;
        top: 0;
        font-size: 1.2rem;
        z-index: 1;
    }

	nav {
		display: flex;
		justify-content: space-between;
        background: var(--background-alt);
        margin: 0;
        padding: 10px 20px;
	}
 
	ul {
		margin: 0;
		padding: 0;
        display: flex;
        align-content: center;
	}

    li {
        align-self: center;
		display: block;
		margin: 0 0.5em;
        padding: 0;
        font-weight: normal;
	}

    a, .icon {
        color: var(--text-muted);
        text-transform: capitalize;
    }

    a:hover, .icon:hover {
        color: var(--text-bright);
        text-decoration: none;
    }

    .website-name {
        text-transform: none;
    }

    h1 {
        display: inline-block;
        font-size: 2.5em;
        font-family: "Shopping Script";
        margin: 0;
        padding: 0;
        font-weight: bold;
    }

    .button {
        color: white;
    }

    .button:hover {
        color: white;
    }

    .subscribe {
		background: rgb(233, 85, 75);
	}

    .language {
		background: var(--focus);
	}

	.language:hover {
		filter: contrast(110%);
	}

    .scheme .icon {
        color: var(--scheme-color);
    }

	.selected {
		color: var(--text-main);
	}

    @media screen and (max-width: 1024px) {
        header {
            font-size: 1rem;
        }
    }
	

	@media screen and (max-width: 700px) {
        header {
            font-size: 0.85rem;
        }
		.right-nav li {
			display: none;
		}
		.right-nav li:first-child {
			display: block;
		}

        .right-nav li:nth-child(2) {
			display: block;
		}
	}

    @media screen and (max-width: 610px) {
        nav {
            padding: 20px 20px;
        }
        .left-nav li:first-child {
            display: none;
        }
    }

    @media screen and (max-width: 400px) {
        header {
            font-size: 0.75rem;
        }
        nav {
            padding: 20px 5px;
        }
        
    }

    @media screen and (max-width: 340px) {
        header {
            font-size: 0.65rem;
        }
        nav {
            padding: 20px 5px;
        }
        
    }
</style>
