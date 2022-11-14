<template>
	<view style="padding:10rpx 15rpx;">
		<view class="content" v-for="(item,index) in disClaimers" :key="key">
			<text>{{item.text}}</text>
		</view>
	</view>
</template>

<script>
	var data = require('../common/data.js')
	export default {
		data() {
			return {
				disClaimers:data.disClaimers
			}
		},
		onLoad() {
			// console.log()
		},
		methods: {
			
		}
	}
</script>

<style>
.content{
	padding: 10rpx;
}
.content text{
	font-size: 30rpx;
}
</style>
