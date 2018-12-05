const pkg = require('./package');

module.exports = {
	mode: 'universal',

	/*
  ** Headers of the page
  */
	head: {
		title: pkg.name,
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: pkg.description},
		],
		link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
	},

	/*
  ** Customize the progress-bar color
  */
	loading: {color: '#fff'},

	/*
  ** Global CSS
  */
	css: [],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [],

	/*
  ** Nuxt.js modules
  */
	modules: [
		'@nuxtjs/bulma',
		['nuxt-i18n', {
			locales: [
				{
					code: 'en',
					iso: 'en-US',
				},
				{
					code: 'ja',
					iso: 'ja-JP',
				},
			],
			defaultLocale: 'ja',
			vueI18n: {
				fallbackLocale: 'ja',
				messages: {
					en: {
						text: 'Text',
						qrcode: 'QR Code',
						twitqr: 'TwitQR',
						subtitle: 'Influence your QR Code with only one tweet!',
					},
					ja: {
						text: 'テキスト',
						qrcode: 'QRコード',
						twitqr: 'TwitQR',
						subtitle: '1ツイートに収まるQRコード生成機',
					},
				},
			},
			detectBrowserLanguage: {
				useCookie: true,
			},
		}],
	],

	/*
  ** Build configuration
  */
	build: {
		postcss: {
			preset: {
				features: {
					customProperties: false,
				},
			},
		},

		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient && false) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
				});
			}
		},
	},
};
