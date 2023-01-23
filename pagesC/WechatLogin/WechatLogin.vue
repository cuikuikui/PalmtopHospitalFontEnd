<template>
	<view>
		<view v-if="canIUse">
			<view class='header'>
				<span class='iconfont icon-weixin1'></span>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>
			<button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="getuserinfo"
				withCredentials="true">
				授权登录
			</button>
		</view>
		<view v-else>请升级微信版本</view>
	</view>
</template>

<script>
	import {
		userServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	import {
		getClientNowSystemTime
	} from '@/pages/common/utils.js'
	export default {
		data() {
			return {
				WeChatUserInfo: '',
				showInfor: false,
				//判断小程序的API，回调，参数，组件等是否在当前版本可用。
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				appFlag: ''
			}
		},

		onLoad() {
			var that = this
			//查看是否授权,如果已授权则从数据库里取用户数据，反之则点击微信授权按钮。
			uni.getSetting({
				success: function(res) {
					if (res.authSetting['scope.userInfo']) {
						//用户已经授权过 从数据库获取用户信息
						that.queryUsreInfo();
					}
				}
			})
		},
		methods: {
			// 插入数据
			getuserinfo: function(e) {
				var uEnvirn = 'MP-WEIXIN'
				var uFlag = 'weiixin'
				if (e.detail.userInfo) {
					uni.navigateTo({
						url: '/pagesC/WechatLogin/bindPhone/bindPhone?nickName=' + e.detail.userInfo.nickName +
							'&avatarUrl=' + e.detail.userInfo.avatarUrl
					})
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
			//获取用户信息的接口
			queryUsreInfo: function() {
				// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
				// console.log('----------------queryUsreInfo---WeChatUserInfo-------------------')
				// console.log(uni.getStorageSync('openid'))
				// console.log('-----------------queryUsreInfo---WeChatUserInfo------------------')
				var uEnvirn = 'MP-WEIXIN'
				var data2 = {
					FLAG: "R",
					openId: uni.getStorageSync('openid'),
					uEnvirn: uEnvirn
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

	.show {
		opacity: 1;
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.infor {
		width: 620rpx;
		height: 610rpx;
		position: absolute;
		top: 200rpx;
		margin-left: 70rpx;
		border-radius: 20rpx;
		transition: all 2s ease-in-out;
		border: 1rpx solid #686363;
		transition: all 2s ease-in-out;
		background-color: white;
	}

	.top {
		/* border-radius: 20rpx; */
		font-weight: bolder;
		padding: 20rpx 0rpx;
		border-bottom: 1rpx solid rgb(192, 192, 180);
	}

	.awart {
		width: 100rpx;
		height: 100rpx;
		padding-top: 30rpx;
		border-radius: 10rpx;
	}

	.infor .text1 {
		margin-left: 35rpx;
		font-size: 30rpx;
		font-weight: bolder;
	}

	.infor .text2 {
		margin-top: 40rpx;
		font-size: 25rpx;
		color: #767676;

		/* font-weight: bolder;
		 */
	}

	.btn {
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 110rpx;

	}

	.yes {
		/* border-radius: 20rpx; */
		width: 50%;
		padding-top: 40rpx;
		padding-bottom: 20rpx;
		border-top: 1rpx solid #E7E6E6;
		border-right: 1rpx solid #E7E6E6;
		/* background-color: #007AFF; */
	}

	.no {
		/* border-radius: 20rpx; */
		width: 50%;
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
	/* 	width: 650rpx;
		height: 300rpx; */
		/* line-height: 450rpx; */
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
