<template>
	<view class="more">
		<view class="logo">
			<image src="../../static/images/logo.png" mode=""></image>
			<text style="margin-top: 5px;">掌上医院系统</text>
			<text style="margin-top: 5px;">版本号:1.0.0</text>
		</view>
		<view class="item" v-for="item in moreList" @click="toMore(item.id)">
			<text>{{item.title}}</text>
			<span class="iconfont icon-arrow-right"></span>
		</view>
		
		<view class="bottom">
			<text :decode="true" style="text-indent: 50rpx;">苏州苏苏软件开发有限公司&nbsp;&nbsp;&nbsp;&nbsp;版权所有</text>
			<text>Copyright © 2020 SuSu. All Rights Reserved</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				moreList:[
					{id:'1',title:'联系客服'},
					{id:'2',title:'关于我们'},
					{id:'3',title:'负责声明'}
				]
			}
		},
		methods:{
			toMore(id){
				console.log("id==1: ",id=='1');
				console.log("id==2: ",id=='2');
				console.log("id==3: ",id=='3');
				if(id=='1'){
					uni.showModal({
						title: "联系客服",
						content: '86-021-33851886<\br>客服工作时间:周一至周日<\br>7:30-19:30',
						success: function(res) {
							if (res.confirm) {
								uni.makePhoneCall({
									phoneNumber: '86-021-33851886'
								})
							}
						}
					})
				}else if(id=='2'){
					uni.navigateTo({
						url:'/pagesC/more/aboutUs'
					})
				}else if(id=='3'){
					uni.navigateTo({
						url:'/pagesC/more/disClaimer'
					})
				}else {
					
				}
			}
		}
	}
</script>

<style scoped>
	.more {
		margin: 10px;
	}
	.logo {
		display: flex;
		padding: 40px 0;
		flex-direction: column;
		align-items: center;
		color: dimgray;
	}
	.logo image {
		width: 100px;
		height: 100px;
	}
	.item {
		border-bottom: 1px solid gainsboro;
		padding: 5px;
		font-size: 15px;
		display: flex;
		color: dimgray;
		justify-content: space-between;
		align-items: center;
	}
	.bottom{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		top:170px;
	}
	.bottom text{
		line-height: 50rpx;
		font-size: 25rpx;
		color: #686363;
	}
</style>