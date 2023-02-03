<template>
	<view class="content">
		<view class="item" v-if="type=='1'">
			<text>急诊流程</text>
			<text>发表于：2021-05-27 10:09:01</text>
			<image :src="guideContent" mode=""></image>
		</view>
		<view class="item" v-else>
		<!-- 	<text>急诊流程</text>
			<text>发表于：2021-05-27 10:09:01</text>
			<view class="pdf">
				<text>挂号-收费指南</text> 
			</view> -->
			<web-view :src="guideContent">指南</web-view>
		</view>

	</view>
</template>
<script>
	export default {
		data(){
			return {
				guideTitle: '',
				guideTime: '',
				guideContent: '',
				type:''
			}
		},
		onLoad(options) {
			console.log("dsdsdsd",options.guideContent)
			this.guideTitle = options.guideTitle
			this.guideTime = options.guideTime
			this.guideContent = options.guideContent
			this.type = options.type
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.content {
		padding: 10px;
	}
	.item {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
	}
	.content text{
		line-height: 40px;
	}
	.content image {
		margin-top: 20px;
	}
	.pdf {
		padding: 10px;
		border: 1rpx solid #bfbfbf;
	}
</style>