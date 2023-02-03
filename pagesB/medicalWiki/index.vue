<template>
	<view class="wiki">
		<view class="item" v-for="(item,index) in wikis" :key="index" @click="toDetail(item.id)">
			<div class="iconfont"><span class="iconfont" :class="item.style"></span></div>
			<text style="margin-left: 10px;">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				wikis:[
					{id:'201',title:'BMI计算器',style:'icon-jisuanqi'},
					{id:'202',title:'宝宝血型',style:'icon-xuexing'},
					// {id:'203',title:'乙肝自测',style:'icon-yiganzice'}
					// {id:'204',title:'检查单解读',style:'icon-jiedu'},
					
				]
			}
		},
		methods:{
			toDetail(id){
				if(id=='201'){
					uni.navigateTo({
						url:'./calculate/index'
					})
				}else if(id=='202'){
					uni.navigateTo({
						url:'./blood/index'
					})
				}else {
					
				}
			
			}
		}
	}
</script>

<style scoped>
	.wiki {
		margin: 5px;
	}
	.item {
		padding: 7px;
		display: flex;
		border-bottom: 1rpx solid #cdcdcd;
	}
	.iconfont {
		border-radius: 50%;
		width: 25px;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #3dbfc5;
	}
</style>