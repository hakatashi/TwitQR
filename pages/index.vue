<template>
	<div class="container" :style="{maxWidth: '640px'}">
		<div class="field">
			<label class="label">Text</label>
			<div class="control has-icons-left has-icons-right">
				<input
					v-model="text"
					class="input is-success"
					type="text"
					placeholder="Text input"
					value="bulma"
				>
				<span class="icon is-small is-right">
					<i class="fas fa-check"/>
				</span>
			</div>
			<p v-if="error" class="help is-danger">{{error}}</p>
		</div>
		<div class="field">
			<label class="label">Message</label>
			<div class="control">
				<textarea
					v-model="qrCode"
					class="textarea has-fixed-size"
					placeholder="Textarea"
					rows="21"
					readonly
				/>
			</div>
		</div>
	</div>
</template>

<script>
import QRCode from 'qrcode';
import chunk from 'lodash/chunk';

/*
Capabilities
L: 152bits
M: 128bits
Q: 104bits
H: 72bits
*/

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
			try {
				const data = QRCode.create(newText, {
					version: 1,
				});
				this.qrCode = chunk(data.modules.data, 21).map((l) => l.join('')).join('\n');
			} catch (error) {
				this.error = error.message;
				this.qrCode = '';
			}
		},
	},
};
</script>

<style>
</style>
