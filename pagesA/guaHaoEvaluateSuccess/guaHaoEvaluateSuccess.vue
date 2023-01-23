<template>
	<view>
		<view @click="goToIndex">
			<image src="../../static/images/evaluateSuccess.png" style="width:100%;height:1700rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goToIndex: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},
		}
	}
</script>

<style>

</style>
