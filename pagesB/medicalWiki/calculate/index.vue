<template>
	<view class="detail">
		<view class="weight">
			<view class="content">
				<view class="top">
					<text>BMI = 体重kg ÷ 身高㎡。是世界卫生组织认定的胖瘦判断以及是否健康的标准，适用于成年男女</text>
				</view>
				<view class="center">
					<text>填写基本信息</text>
				</view>
				<view class="bottom">
					<input  type="text" v-model="height"  placeholder="身高(cm)"  />
					<input  type="text" v-model="weight"  placeholder="体重(kg)"  />
				</view>
				
				<view class="button" @click="toResult">
					查看结果
				</view>
			</view>	
				
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				height:'',
				weight:''
			}
		},
		methods:{
			toResult(){ 
				let curWeight = parseInt(this.weight)*10000
				let curHeight = parseInt(this.height)*parseInt(this.height)
				let res = Math.round(curWeight/curHeight)	
				if(res<15){
					uni.showToast({
						title: '您输入的数值有误!!',
						icon:'error',
						duration: 2000
					})
				}else {
					uni.navigateTo({
						url:'./result?result='+res +'&height='+this.height+'&weight='+this.weight
					})
				}
				// console.log("===xxxxx===",res)
				
			}
		}
	}
</script>

<style scoped>
	/* 体重计算器样式 */
	.detail {
		width: 100%;
		height: 100%;
		background-color: aliceblue;
	}
	.content {
		display: flex;
		padding: 10px;
		color: darkgrey;
		flex-direction: column;
		background-color: white;
		margin: 10px;
		
	}
	.content .top {
		display: flex;
		flex-direction: column;
		line-height: 30px;
		font-size: 14px;
	}
	.content .center {
		margin-top: 20px;
		color: black;
	}
	.content .bottom {
		margin-top: 20px;
	}
	.content .bottom input {
		font-size: 14px;
		padding: 10px 0;
		border-bottom: 1rpx solid #cdcdcd;
	}
	.content .button {
		padding: 10px;
		text-align: center;
		border-radius: 10px;
		background-color: #3fa1f5;
		color: white;
		margin-top: 20px;
	}
	
</style>