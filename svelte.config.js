import adapter from "@sveltejs/adapter-static"
import markdown from 'svelte-preprocess-markdown';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	kit: {
		adapter: adapter(
			{
				pages: 'build',
				assets: 'build'
			}
		),
		hydrate: true,
		prerender: {
			crawl: true,
			enabled: true,
			force: true,
			pages: ['*']
		},
		router: false,
		ssr: true,
		trailingSlash: 'never',
		vite: () => ({})
	},
	preprocess: markdown.markdown()
};

export default config;
