<template>
	<view>
		<!--#ifdef APP-PLUS-->
		<view class="authorie" :class="showInfor?'show':''" v-if="appFlag==''">
			<view class="infor">
				<view class="top">微信授权</view>
				<image src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKpico5f2F8eR68Mhat3rftlrUJ44Kmxqeybz5um7kzibibgjWLGgQm5jwNhQLu1neT9BPHRVr5TIwAQ/132" 
				   class="awart"></image>
				<view class="text1"><text :decode="true">彪悍的人生无须解释 &nbsp;&nbsp;&nbsp;申请获得以下权限</text></view>
				<view class="text2"><text :decode="true">获得你的公开信息 &nbsp;&nbsp;&nbsp;(昵称、头像、地区及姓别)</text></view>
				<view class="btn">
					<view class="no" @click.stop="no">拒绝</view>
					<view class="yes" @click.stop="yes">允许</view>
				</view>
			</view>
		</view>
		<!--#endif-->
		<view v-if="canIUse">
			<view class='header'>
				<image src='../../static/images/wx_login.png'></image>
			</view>

			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>
			<!--#ifdef APP-PLUS-->
			<!-- <view class='bottom'  @click="getuserinfo"> -->
			<view class='bottom'  @click="showUserinfo">
				授权登录
			</view>
			<!--#endif-->
			
			<!--#ifdef MP-WEIXIN-->
			<button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="getuserinfo" withCredentials="true">
				授权登录
			</button>
			<!--#endif-->
		</view>

		<view v-else>请升级微信版本</view>
	</view>
</template>

<script>
	import {
		// WechatUserInsert,
		// WechatUserQuery
		userServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	var util = require('../common/util.js');
	export default {
		data() {
			return {
				WeChatUserInfo:'',
				showInfor:false,
				//判断小程序的API，回调，参数，组件等是否在当前版本可用。
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				appFlag:''
			}
		},
	
		 onLoad() {
			 var that = this
			 // #ifdef APP-PLUS
			 that.appFlag=uni.getStorageSync('wflag')
			 that.WeChatUserInfo=uni.getStorageSync('WeChatUserInfo')
			 if(that.appFlag=='APPPLUS'){
			 	that.queryUsreInfo()
			 }
			 // #endif
			 
			 // #ifdef MP-WEIXIN
			 //查看是否授权,如果已授权则从数据库里取用户数据，反之则点击微信授权按钮。
			 uni.getSetting({
			 	success: function(res) {
			 		if (res.authSetting['scope.userInfo']) {
			 			//用户已经授权过 从数据库获取用户信息
			 			that.queryUsreInfo();								
			 		}
			 	}
			 })
			 //#endif
			// this.openid=options.openid
			// console.log('----------------queryUsreInfo---WeChatUserInfo-------------------')
			// console.log(options.openid)
			// console.log('-----------------queryUsreInfo---WeChatUserInfo------------------')
		},
		
		onShow() {
	
		},
		methods: {
			// #ifdef APP-PLUS
			yes:function(){
				// console.log('yes is called')
				this.showInfor=false
				this.getuserinfo()
			},
			no:function(){
				this.showInfor=true
			},
			showUserinfo:function(){
				// console.log('33333333333333')
				this.showInfor=true
			},
			// 微信授权,获取用户信息,并插入数据库中
			getuserinfo:function(){
				// console.log('--------------')
				// console.log('getuserinfo is called')
				// console.log(this.WeChatUserInfo)
				// console.log(uni.getStorageSync('openid'))
				// console.log('--------------')
				
				// if (uni.getStorageSync('WeChatUserInfo')) {
					var registerTime = util.formatTime(new Date());
					var uEnvirn='APP-PLUS'
					var uFlag='wexin'
					var data1 = {
						FLAG:"C",
						openId: uni.getStorageSync('openid'),
						// session_key:getApp().globalData.session_key,
						u_Name: this.WeChatUserInfo.nickName,
						u_Img: this.WeChatUserInfo.avatarUrl,
						uRegisterTime: registerTime,
						uEnvirn:uEnvirn,
						uFlag:uFlag
					}
					// console.log('--------------')
					// console.log('getuserinfo is called')
					// console.log(uni.getStorageSync('openid'))
					// console.log(data1)
					// console.log('--------------')
					uni.setStorageSync('WeChatUserInfo', data1)
					//插入登录的用户的相关信息到数据库
					api.post(userServlet, data1).then(res => {
						console.log(res)
						var APP='APPPLUS'
						uni.setStorageSync('wflag',APP)
						//成功时回调函数
						uni.switchTab({
							url: '../index/index',
						})
						//授权成功后，跳转进入小程序首页
					}).catch(err => {
						console.log(err)
						//失败时回调函数
						// 
					})
				// } else {
				// 	uni.removeStorageSync('LoginIndex')
				// 	//用户按了拒绝按钮
				// 	uni.showModal({
				// 		title: '警告',
				// 		content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
				// 		showCancel: false,
				// 		confirmText: '返回授权',
				// 		success: function(res) {
				// 			if (res.confirm) {
				// 				uni.redirectTo({
				// 					url: '../WechatLogin/WechatLogin',
				// 				})
				// 			}
				// 		}
				// 	})
				// }
			},
			// #endif
			
			// #ifdef MP-WEIXIN
			// 插入数据
			getuserinfo:function(e){
				var uEnvirn='MP-WEIXIN'
				var uFlag='weiixin'
				// uni.setStorageSync('LoginIndex', 1)
				if (e.detail.userInfo) {
					uni.navigateTo({
						url:'./bindPhone/bindPhone?nickName='+e.detail.userInfo.nickName+'&avatarUrl='+e.detail.userInfo.avatarUrl
					})
					// var registerTime = util.formatTime(new Date());
					// var data1 = {
					// 	openId: uni.getStorageSync('openid'),
					// 	u_Password:'xxxx',
					// 	// session_key:getApp().globalData.session_key,
					// 	u_Name: e.detail.userInfo.nickName,
					// 	u_Img: e.detail.userInfo.avatarUrl,
					// 	uRegisterTime: registerTime,
					// 	uEnvirn:uEnvirn,
					// 	uFlag:uFlag
					// }
					// uni.setStorageSync('WeChatUserInfo', data1)
					// //插入登录的用户的相关信息到数据库
					// api.post(WechatUserInsert, data1).then(res => {
					// 	//成功时回调函数
					// 	uni.setStorageSync('LoginIndex', 1)
					// 	uni.switchTab({
					// 		url: '../index/index',
					// 	})
					// 	//授权成功后，跳转进入小程序首页
					// }).catch(err => {
					// 	//失败时回调函数
					// 	// 
					// })
				} else {
					uni.removeStorageSync('LoginIndex')
					//用户按了拒绝按钮
					uni.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
						showCancel: false,
						confirmText: '返回授权',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '../WechatLogin/WechatLogin',
								})
							}
						}
					})
				}
			},
			// #endif
			//获取用户信息的接口
			queryUsreInfo: function() {
				// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
				// console.log('----------------queryUsreInfo---WeChatUserInfo-------------------')
				// console.log(uni.getStorageSync('openid'))
				// console.log('-----------------queryUsreInfo---WeChatUserInfo------------------')
				var uEnvirn='MP-WEIXIN'
				// #ifdef APP-PLUS
				var uEnvirn='APP-PLUS'
				// #endif
				var data2 = {
					FLAG:"R",
					openId: uni.getStorageSync('openid'),
					uEnvirn:uEnvirn
					// session_key:uni.getStorageSync('session_key'),
				}
				api.post(userServlet, data2).then(res => {
				//	uni.removeStorageSync('WeChatUserInfo')
					//成功时回调函数
					uni.setStorageSync('WeChatUserInfo', res)
					uni.setStorageSync('LoginIndex', 1)
					uni.switchTab({
						url: '../index/index',
					})
				}).catch(err => {
					//失败时回调函数
					// 
				})
			}
		}
	}
</script>

<style>
	.authorie {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-webkit-transform: scale(1.185);
		transform: scale(1.185);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-perspective: 2000rpx;
		perspective: 2000rpx;
		background: rgba(0, 0, 0, 0.6);
		-webkit-transition: all 0.3s ease-in-out 0s;
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}
	.show{
		opacity: 1;
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	.infor{
		width: 620rpx;
		height: 610rpx;
		position: absolute;
		top: 200rpx;
		margin-left: 70rpx;
		border-radius: 20rpx;
		transition: all 2s ease-in-out;
		border: 1rpx solid #686363;
		transition: all 2s ease-in-out;
		background-color:white;
	}
	.top{
		/* border-radius: 20rpx; */
		font-weight: bolder;
		padding: 20rpx 0rpx;
		border-bottom: 1rpx solid rgb(192, 192, 180);
	}
	.awart{
		width: 100rpx;
		height: 100rpx;
		padding-top: 30rpx;
		border-radius: 10rpx;
	}
	.infor .text1{
		margin-left: 35rpx;
		font-size: 30rpx;
		font-weight: bolder;
	}
	.infor .text2{
		margin-top: 40rpx;
		font-size: 25rpx;
		color:#767676;
		
		/* font-weight: bolder;
		 */
	}
	.btn{
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 110rpx;
		
	}
	.yes{
		/* border-radius: 20rpx; */
		width:50%;
		padding-top: 40rpx;
		padding-bottom: 20rpx;
		border-top: 1rpx solid #E7E6E6;
		border-right: 1rpx solid #E7E6E6;
		/* background-color: #007AFF; */
	}
	.no{
		/* border-radius: 20rpx; */
		width:50%;
		padding-top: 40rpx;
		padding-bottom: 20rpx;
		border-left: 1rpx solid #E7E6E6;
		border-top: 1rpx solid #E7E6E6;
		/* background-color: #00FFFF; */
	}
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}
	/*  #ifdef APP-PLUS */
	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
		padding: 20rpx;
		text-align: center;
		background-color: #007AFF;
	}
	/*  #endif */
	/*  #ifdef MP-WEIXIN */
	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
	/*  #endif */
</style>
