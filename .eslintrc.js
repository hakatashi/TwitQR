module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
	},
	env: {
		browser: true,
		node: true,
	},
	extends: ['@hakatashi'],
	plugins: ['prettier'],
	rules: {
		'node/no-unsupported-features': 'off',
		'node/no-unsupported-features/es-syntax': 'off',
		'private-props/no-use-outside': 'off',
		'max-params': 'off',
		'no-underscore-dangle': 'off',
		quotes: ['error', 'single', {avoidEscape: true}],
	},
	globals: {},
}
