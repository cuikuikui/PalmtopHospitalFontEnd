<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				url:''
			}
		},
		onLoad(options) {
			this.index=options.index
			if (this.index == 7) {
				this.url="http://www.360changshi.com/"
			}
			if (this.index == 9) {
				this.url="https://www.xyeyy.com/655/660/691/index.htm"
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
