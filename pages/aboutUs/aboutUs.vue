<template>
	<view>
		<view class="header">
			<view class="image"><image src="../../static/images/logo.png"></image></view>
			<view class="text1"><text>海隆掌上医院</text></view>
			<view class="text2"><text>版本V1.0</text></view>
			<view class="bottom">
				<text :decode="true" style="text-indent: 50rpx;">昆山海隆软件开发有限公司&nbsp;&nbsp;&nbsp;&nbsp;版权所有</text>
				<text>Copyright © 2020 Hyron. All Rights Reserved</text>
			</view>
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
			
		}
	}
</script>

<style>
.header {
	display: flex;
	padding-top: 50rpx;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
}
.header .image{
	display: flex;
	justify-content: center;
	align-items: center;
}
.header .image image{
	width:700rpx;
	height:400rpx;
	margin-right: 100rpx;
}
.header .text1{
	margin-left: 220rpx;
	width:100%;
	color: #444242;
	height:70rpx;
	font-size: 35rpx;
	letter-spacing: 15rpx;
	line-height: 50rpx;
}
.header .text2{
	margin-left: 280rpx;
	width:100%;
	color: #444242;
	height:70rpx;
	font-size: 25rpx;
	letter-spacing: 15rpx;
	line-height: 20rpx;
}
.bottom{
	display: flex;
	flex-direction: column;
	position: relative;
	top:500rpx;
}
.bottom text{
	line-height: 50rpx;
	font-size: 25rpx;
	color: #686363;
}
</style>
