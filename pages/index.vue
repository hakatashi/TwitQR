<template>
	<div class="container qrcode-container">
		<div class="titles">
			<h1 class="title">{{$t('twitqr')}}</h1>
			<h2 class="subtitle">{{$t('subtitle')}}</h2>
		</div>
		<div class="field">
			<label class="label" for="qrcode-input">{{$t('text')}}</label>
			<div class="control">
				<input
					id="qrcode-input"
					v-model="text"
					class="input"
					:class="error ? 'is-danger' : 'is-success'"
					type="text"
					placeholder="Text input"
				>
			</div>
			<p v-if="error" class="help is-danger">
				{{$t('toolong')}}
				<span v-if="isUpperCasable">
					({{$t('hint')}}: <a @click="makeUpperCase">{{$t('makeUpperCase')}}</a>)
				</span>
			</p>
		</div>
		<div class="field">
			<label class="label" for="qrcode-output">{{$t('qrcode')}}</label>
			<a
				v-clipboard:copy="qrCode"
				class="button"
				target="_blank"
				rel="noopener"
				:disabled="qrCode === ''"
			>
				<span>{{$t('copy')}}</span>
			</a>
			<a
				class="button is-info"
				:href="qrCode !== '' && tweetUrl"
				target="_blank"
				rel="noopener"
				:disabled="qrCode === ''"
			>
				<span class="icon">
					<font-awesome-icon :icon="faTwitter"/>
				</span>
				<span>{{$t('tweet')}}</span>
			</a>
			<div class="control">
				<textarea
					id="qrcode-output"
					v-model="qrCode"
					class="textarea has-fixed-size qrcode"
					rows="11"
					readonly
					:disabled="qrCode === ''"
					@click="$event.target.select()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import QRCode from 'qrcode';
import chunk from 'lodash/chunk';
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import flatten from 'lodash/flatten';
import inRange from 'lodash/inRange';
import qs from 'querystring';
import toSJIS from 'qrcode/helper/to-sjis';
import zip from 'lodash/zip';

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

const isFinderArea = (x, y) => (
	(inRange(x, 0, 8) && inRange(y, 0, 8)) ||
	(inRange(x, 13, 21) && inRange(y, 0, 8)) ||
	(inRange(x, 0, 8) && inRange(y, 13, 21))
);

export default {
	components: {},
	data() {
		return {
			text: 'TWITQR: TWEET QR!',
			qrCode: '',
			error: '',
		};
	},
	computed: {
		faTwitter() {
			return faTwitter;
		},
		tweetUrl() {
			return `https://twitter.com/intent/tweet?${qs.encode({
				text: `${this.qrCode}\nhttps://hakatashi.github.io/TwitQR/`,
			})}`;
		},
		isUpperCasable() {
			return this.text.match(/^[0-9a-zA-Z $%*+-./:]+$/) && this.text.match(/[a-z]/);
		},
	},
	watch: {
		text(newText) {
			this.onTextChange(newText);
		},
	},
	created() {
		this.onTextChange(this.text);
	},
	methods: {
		onTextChange(newText) {
			this.error = '';

			if (newText === '') {
				this.qrCode = '';
				return;
			}

			let tempData = null;
			try {
				tempData = QRCode.create(newText, {
					version: 1,
					toSJISFunc: toSJIS,
				});
			} catch (error) {
				this.error = error.message;
				this.qrCode = '';
				return;
			}

			const data = tempData;
			const rows = chunk(data.modules.data, 21).map((row) => [...row, 0]);
			const codelRows = chunk(rows.map((row) => chunk(row, 2)), 2).map((pairRows) => zip(...pairRows));
			const codelCharacterRows = codelRows.map((row, rawCodelY) => (
				row.map((rawCodel, rawCodelX) => {
					const codelData = flatten(Object.assign([[0], [0]], rawCodel).map((codelRow) => (
						Object.assign([0, 0], codelRow)
					)));

					if (codelData.join('') === '0000' && rawCodelX !== row.length - 1) {
						const fillIndex = codelData.findIndex((codel, index) => {
							const x = rawCodelX * 2 + index % 2;
							const y = rawCodelY * 2 + Math.floor(index / 2);
							return !isFinderArea(x, y);
						});
						if (fillIndex !== -1) {
							codelData[fillIndex] = 1;
						}
					}

					return codelCharacters[codelData.join('')];
				})
			));

			this.qrCode = codelCharacterRows.map((row) => row.join('')).join('\n');
		},
		makeUpperCase() {
			this.text = this.text.toUpperCase();
		},
	},
	head() {
		return {
			title: `${this.$t('twitqr')}: ${this.$t('subtitle')}`,
		};
	},
};
</script>

<style>
.qrcode-container {
	max-width: 500px;
}

.titles {
	text-align: center;
}

.titles .title {
	font-size: 5rem;
}

.qrcode {
	font-size: 2.5rem;
	line-height: 1em;
	letter-spacing: -1px;
	font-family: TwitQR;
	color: #000;
	margin-top: 0.5rem;
}

@media (max-width: 530px) {
	.qrcode {
		font-size: 7vw;
	}
}
</style>
