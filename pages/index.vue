<template>
	<div class="container" :style="{maxWidth: '640px'}">
		<div class="titles">
			<h1 class="title">{{$t('twitqr')}}</h1>
			<h2 class="subtitle">{{$t('subtitle')}}</h2>
		</div>
		<div class="field">
			<label class="label">{{$t('text')}}</label>
			<div class="control">
				<input
					v-model="text"
					class="input is-success"
					type="text"
					placeholder="Text input"
					value="bulma"
				>
			</div>
			<p v-if="error" class="help is-danger">{{error}}</p>
		</div>
		<div class="field">
			<label class="label">{{$t('qrcode')}}</label>
			<div class="control">
				<textarea
					v-model="qrCode"
					class="textarea has-fixed-size qrcode"
					placeholder="Textarea"
					rows="11"
					readonly
				/>
			</div>
		</div>
	</div>
</template>

<script>
import QRCode from 'qrcode';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import zip from 'lodash/zip';

/*
Capabilities
L: 152bits
M: 128bits
Q: 104bits
H: 72bits
*/
const codelCharacters = {
	'0000': ' ',
	1000: '▘',
	'0100': '▝',
	1100: '▀',
	'0010': '▖',
	1010: '▌',
	'0110': '▞',
	1110: '▛',
	'0001': '▗',
	1001: '▚',
	'0101': '▐',
	1101: '▜',
	'0011': '▄',
	1011: '▙',
	'0111': '▟',
	1111: '█',
};

export default {
	components: {},
	data() {
		return {
			text: '',
			qrCode: '',
			error: '',
		};
	},
	watch: {
		text(newText) {
			this.error = '';

			if (newText === '') {
				this.qrCode = '';
				return;
			}

			let tempData = null;
			try {
				tempData = QRCode.create(newText, {
					version: 1,
				});
			} catch (error) {
				this.error = error.message;
				this.qrCode = '';
				return;
			}

			const data = tempData;
			const rows = chunk(data.modules.data, 21).map((row) => [...row, 0]);
			const codelRows = chunk(rows.map((row) => chunk(row, 2)), 2).map((pairRows) => zip(...pairRows));
			const codelCharacterRows = codelRows.map((row) => (
				row.map((rawCodel) => {
					const codelData = flatten(Object.assign([[0], [0]], rawCodel).map((codelRow) => (
						Object.assign([0, 0], codelRow)
					)));
					return codelCharacters[codelData.join('')];
				})
			));
			this.qrCode = codelCharacterRows.map((row) => row.join('')).join('\n');
		},
	},
};
</script>

<style>
.titles {
	text-align: center;
}

.titles .title {
	font-size: 5rem;
}

.qrcode {
	font-size: 2rem;
	line-height: 1em;
	font-family: monospace;
}
</style>
