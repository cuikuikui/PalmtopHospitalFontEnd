<template>
	<view class="container">
		<view class="flex" @click="saoyisao">
			<span class="iconfont icon-saoyisao"></span>
			<!-- <image src="../../../static/images/index/saoyisao.png" mode="" ></image> -->
			<text>扫一扫</text>
		</view>
		<view class="center flex">
			徐州中医医院
		</view>
		<view class="flex" @click="erweima">
			<span class="iconfont icon-erweima"></span>
			<!-- <image src="../../../static/images/index/erweima.png" mode=""></image> -->
			<text>二维码</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'Scan',
		methods:{
			saoyisao: function() {
				var that = this;
				uni.scanCode({
					onlyFromCamera: true, // 只允许从相机扫码
					success(res) {
						console.log("扫码成功：" + JSON.stringify(res))
						// 扫码成功后  在此处理接下来的逻辑
						that.scanCode = res.result
						console.log("======扫一扫输出结果=======",that.scanCode)
					}
				})
			},
			erweima: function() {
				uni.showToast({
					title: '待开发中.............',
					icon: 'loading',
					duration: 2000 //持续的时间
				})
			},
		}
	}
</script>
<style scoped>
	.container {
		display: flex;
		padding: 10rpx 20rpx;
		justify-content: space-between;
		font-size: 25rpx;
		background-color: white;
		color: #007AFF;
		box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
	}
	.flex {
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 20px;
	}
	 .center {
		 font-size: 40rpx;
		 justify-content: center;
	}	
</style>
