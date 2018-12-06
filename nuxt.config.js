const pkg = require('./package');

module.exports = {
	mode: 'universal',

	head: {
		title: pkg.name,
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: pkg.description},
		],
		link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
	},

	loading: {color: '#fff'},

	css: [],

	plugins: [
		'~/plugins/vue-clipboard2.js',
	],

	modules: [
		'@nuxtjs/bulma',
		'nuxt-fontawesome',
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
						copy: 'Copy to clipboard',
						tweet: 'Tweet',
						toolong: 'Too long',
						hint: 'Hint',
						makeUpperCase: 'Make Uppercase',
					},
					ja: {
						text: 'テキスト',
						qrcode: 'QRコード',
						twitqr: 'TwitQR',
						subtitle: '1ツイートに収まるQRコード生成機',
						copy: 'コピーする',
						tweet: 'ツイートする',
						toolong: '長すぎます',
						hint: 'ヒント',
						makeUpperCase: '大文字にする',
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
