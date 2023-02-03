<template>
	<view class="content">
<!-- 		<text>{{guideTitle}}</text>
		<text>发表于：{{guideTime}}</text> -->
		<text>急诊流程</text>
		<text>发表于：2021-05-27 10:09:01</text>
		<image v-if="type=='1'" :src="guideContent" mode=""></image>
		<text v-else>{{guideContent}}</text>
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
		display: flex;
		flex-direction: column;
		padding: 10px;
		justify-content: center;
		align-items: center;
		/* margin: auto; */
	}
	.content text{
		line-height: 40px;
	}
	.content image {
		margin-top: 20px;
	}
</style>