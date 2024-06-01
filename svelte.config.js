import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// default options are shown. you don't need to specify these
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			trailingSlash: 'always'
		}),
		paths: {
			base: dev ? '' : '/webApp',
		}
	},
};

export default config;
