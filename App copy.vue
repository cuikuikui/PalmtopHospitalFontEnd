<template>
	<view id="app">
		<router-view v-if="isRouterAlive"></router-view>
	</view>
</template>

<script>
	export default {
		name:'app',
		provide(){
			return {
				reload:this.reload
			}
		},
		data(){
			return {
				isRouterAlive:true
			}
		},
		methods:{
			reload(){
				this.isRouterAlive = false;
				this.$nextTick(function(){
					this.isRouterAlive = true
				})
			}
		},
		globalData:{
			    hospitals:null,
			    WeChatUserInfo:null,
			    guHaoInfor:null,
			    family:null,
			    successFlag:false,
			    imgNew:'',
			    imgOld:'',
			    testImg:'',
			    appkey:"db071422252a8acc",
				// 远程服务器电脑
			    // host:'http://47.102.124.213/Hospital',
				// 公司电脑
				host:'http://localhost:8080/PalmtopHospitalBackEnd',
				// macBook电脑
				// host:'http://localhost:8088/Hospital/',
			    location: "",
			    LoginIndex:'',
				globalJumpFlag:false,
		},
		onLaunch: function() {
			// uni.clearStorage()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import '././static/style/weui.wxss';

	/*每个页面公共css */
</style>
