<template>
	<view class="content">
		<!-- 分享弹窗-->
		<view class="share-pro">
			<view class="share-pro-mask" v-if="deliveryFlag"></view>
			<view class="share-pro-dialog" :class="deliveryFlag?'open':'close'">
				<view class="close-btn" @tap="closeShareEvn">
					<span class="font_family">&#xe81d;</span>
				</view>
				<view class="share-pro-title">分享</view>
				<view class="share-pro-body">
					<view class="share-item">
						<button open-type="share">
							<view class="font_family share-icon">&#xe786;</view>
							<view>分享给好友</view>
						</button>
					</view>
					<view class="share-item" @tap="handleShowPoster">
						<view class="font_family share-icon">&#xe600;</view>
						<view>生成分享图片</view>
					</view>
				</view>

			</view>
		</view>
		<uniPoster ref="uniPoster" @cancel="canvasCancel" :simpleFlag="simpleFlag" :posterBgFlag="posterBgFlag" />
		<!-- 头像 -->
		<view class="item" @click="chooseImage">
			<view class="item-left">
				<text>头像</text>
			</view>
			<view class="item-right" v-if="u_Img==''">
				<image :src="WeChatUserInfo.u_Img" mode=""></image>
				<text>></text>
			</view>
			<view class="item-right" v-else>
				<image :src="u_Img" mode=""></image>
				<text>></text>
			</view>
		</view>
		<view class="item" style="padding: 10rpx 30rpx;margin-top: 3rpx;" @click="shareEvn">
			<view class="item-left">
				<text>二维码名片</text>
			</view>
			<view class="item-right" style="width:200rpx;margin-left: 400rpx;">
				<image src="../../static/images/erweima.png" style="width:70rpx;height: 70rpx;margin-right: 30rpx;" mode=""></image>
				<text>></text>
			</view>
		</view>
		<!-- 用户名 -->
		<view class="item" style="border-top: 1rpx solid #F1F1F1;" @click="modify(1)">
			<view class="item-left" style="width: 250rpx;">
				<text>用户名</text>
			</view>
			<view style="width:500rpx;display: flex;flex-direction: row;justify-content: flex-end;">
				<view style="width:350rpx;display: flex;justify-content: flex-end;color:#C8C7CC" v-if="u_Name==''">{{WeChatUserInfo.u_Name}}</view>
				<view style="width:350rpx;display: flex;justify-content: flex-end;color:#C8C7CC" v-else>{{u_Name}}</view>
				<text style="margin-left: 50rpx;color:#C8C7CC">></text>
			</view>
		</view>
		<!-- 账号绑定 -->
		<text style="line-height:70rpx;font-size: 20rpx;padding-left: 30rpx;">账号绑定</text>
		<view class="item" @click="modify(2)">
			<view class="item-left" style="width:450rpx">
				<image src="../../static/images/my11.png" mode="" style="width:50rpx;height:50rpx;margin-left: -10rpx;"></image>
				<text>手机</text>
			</view>
			<view style="width:500rpx;display: flex;flex-direction: row;justify-content: flex-end;">
				<view style="width:350rpx;display: flex;justify-content: flex-end;color:#C8C7CC" v-if="u_Phone==''">{{WeChatUserInfo.u_Phone}}</view>
				<view style="width:350rpx;display: flex;justify-content: flex-end;color:#C8C7CC" v-else>{{u_Phone}}</view>
				<text style="margin-left: 50rpx;color:#C8C7CC">></text>
			</view>
		</view>
		<!-- 安全设置 -->
		<text style="line-height:70rpx;font-size: 20rpx;padding-left: 30rpx;">安全设置</text>
<!-- 		<view class="item" style="border-top: 1rpx solid #F1F1F1;" @click="modify(3)">
			<view class="item-left">
				<text>修改密码</text>
			</view>
			<view class="item-right" style="width:400rpx">
				<view style="margin-left:140rpx;color:#C8C7CC">
					<text>></text>
				</view>
			</view>
		</view> -->

		<view class="exitLogin" @click="exitLogin">退出登录</view>

	</view>
</template>

<script>
	import {
		// WechatUserUpdate,
		// WechatUserQuery
		userServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	import uniPoster from "../../components/uni-poster/uni-poster.vue"
	export default {
		data() {
			return {
				u_Name: '',
				u_Img: '',
				u_Phone:'',
				deliveryFlag: false,
				posterBgFlag: true, //是否展示海报背景图
				simpleFlag: false, //是否展示简单版海报
				WeChatUserInfo:''
			}
		},
		components: {
			uniPoster
		},
		onLoad(options) {
			this.u_Name = options.u_Name
			this.u_Img = options.u_Img
			this.u_Phone=options.u_Phone
			// this.
			console.log(uni.getStorageSync('WeChatUserInfo'))
		},
		onShow() {
			this.WeChatUserInfo=uni.getStorageSync('WeChatUserInfo')
		},
		methods: {
			// 文件上传
			// uploadImage:function(){
				
			// },
			// 更改头像
		chooseImage: function() {
			  this.active=false
			  var that=this;
			  uni.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'],
			    sourceType: ['album', 'camera'],
			    success(res) {
			      var tempFilePaths = res.tempFilePaths[0]
			      that.u_Img=tempFilePaths
			      uni.uploadFile({
					url:getApp().globalData.host+'/uploadFiles',
			        filePath: that.u_Img,
			        name: 'file',
			        formData: {
			          user: 'test'
			        },
			        success(res) {
			          var data = res.data
			          that.u_Img=data
					  var inforType = 'uImage'
					  var inforMation = that.u_Img
					  var message = "头像修改成功"
					  that.updateUser(inforType, inforMation, message)
					  that.queryUsreInfo()

			        }
			      })
			    }
			  })
			},
			updateUser: function(inforType, inforMation, message) {
				var data = {
					openId: uni.getStorageSync('openid'),
					inforType: inforType,
					inforMation: inforMation,
					FLAG:"U"
				}
				api.post(userServlet, data).then(res => {
					uni.showToast({
						title: message,
						duration: 2000
					})
					// this.queryUsreInfo()
					// uni.navigateTo({
					// 	url:'../userInfor'
					// })
				}).catch(err => {
					//失败时回调函数
					console.log(err)
				})
			},
			//获取用户信息的接口
			queryUsreInfo: function() {
				var uEnvirn = 'MP-WEIXIN'
				// #ifdef APP-PLUS
				var uEnvirn = 'APP-PLUS'
				// #endif
				console.log(uni.getStorageSync('openid'))
				var data2 = {
					openId: uni.getStorageSync('openid'),
					uEnvirn: uEnvirn,
					FLAG:"R"
					// session_key:uni.getStorageSync('session_key'),
				}
				api.post(userServlet, data2).then(res => {
					uni.removeStorageSync('WeChatUserInfo')
					//成功时回调函数
					uni.setStorageSync('WeChatUserInfo', res)
					// uni.setStorageSync('LoginIndex', 1)
					uni.redirectTo({
						url: '../userInfor',
					})
				}).catch(err => {
					//失败时回调函数
					// 
				})
			},
			// 更改用户名
			modify:function(e){
				var infor=''
				if(e==1){
					infor=this.WeChatUserInfo.open_Id
				}else if(e==2){
					infor=this.WeChatUserInfo.u_Phone
				}else{
					infor=this.WeChatUserInfo.u_Password
				}
				uni.navigateTo({
					url:'modifyUser/modifyUser?modifyFlag='+e+'&infor='+infor
				})
			},
			// 退出登录
			exitLogin: function(e) {
				uni.showModal({
					title: "提示",
					content: "确定要退出登录吗?",
					success: function(res) {
						if (res.confirm) {
							uni.removeStorageSync('WeChatUserInfo')
							uni.removeStorageSync('LoginIndex')
							uni.removeStorageSync('openid')
							uni.switchTab({
								url: "../index/index"
							})
						}
					}
				})
			},
			/**
			 * @description: 生成海报
			 * @param {type} 
			 * @return {type} 
			 * @author: hch
			 */
			handleShowPoster() {
				// this.canvasFlag = false
				this.$refs.uniPoster.posterShow()
				this.deliveryFlag = false
			},
			/**
			 * @description: 分享弹窗
			 * @param {type} 
			 * @return {type} 
			 * @author: hch
			 */
			shareEvn() {
				this.simpleFlag = false
				this.deliveryFlag = true
			},
			/**
			 * @description: 关闭分享弹窗
			 * @param {type} 
			 * @return {type} 
			 * @author: hch
			 */
			closeShareEvn() {
				this.deliveryFlag = false
			},
			/**
			 * @description: 取消海报
			 * @param {type} 
			 * @return {type} 
			 * @author: hch
			 */
			canvasCancel(val) {
				// this.canvasFlag = val
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 1200rpx;
		background-color: #F1F1F1
	}

	.item {
		/* margin-top: 20rpx; */
		display: flex;
		padding: 20rpx 30rpx;
		background-color: white;
		align-items: center;
		flex-direction: row;
		background-color: white;
		/* border-bottom: 1rpx solid #CCCCCC; */
	}

	.item .item-left {
		display: flex;
		width: 400rpx;
		font-weight: bold;
		flex-direction: row;
	}

	.item .item-right {
		margin-left: 400rpx;
		color: #C8C7CC;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item .item-right image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	/* 退出登录 */
	.exitLogin {
		margin-top: 50rpx;
		background-color: white;
		display: flex;
		padding: 20rpx 0rpx;
		justify-content: center;
		align-items: center;
		color: red;
		font-weight: bold;
	}

	.erweima {
		display: flex;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 17rpx;
		border-bottom: 1rpx solid rgb(192, 192, 180)
	}

	.erweima text {
		font-size: 26rpx;
	}

	.erweima image {
		width: 50rpx;
		height: 50rpx
	}

	/*每个页面公共css 放app.vue页面的 */
	@font-face {
		font-family: 'font_family';
		/* project id 1991769 */
		src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot');
		src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff') format('woff'),
			url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.svg#iconfont') format('svg');
	}

	.font_family {
		font-family: "font_family" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	/* 按钮去掉边框 */
	button::after {
		border: none;
	}

	button {
		margin-left: 0;
		margin-right: 0;
		padding-left: 0;
		padding-right: 0;
		line-height: 1;
		color: #1c1c1c;
		font-size: 28rpx;
		background: none;
	}

	.button-hover {
		color: #1c1c1c;
		background: none;
	}

	.poster-img {
		width: 40%;
	}

	/*每个页面公共css */
	// .content {
	// 	text-align: center;
	// 	height: 100%;
	// }

	.share-btn {
		padding: 30rpx 60rpx;
		background-color: $uni-btn-color;
		color: $uni-text-color-inverse;
	}

	.share-pro {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		z-index: 5;
		line-height: 1;
		box-sizing: border-box;

		.share-pro-mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.5);
		}

		.share-pro-dialog {
			width: 750rpx;
			height: 310rpx;
			overflow: hidden;
			background-color: #fff;
			border-radius: 24rpx 24rpx 0px 0px;
			position: relative;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;

			.close-btn {
				padding: 20rpx 15rpx;
				position: absolute;
				top: 0rpx;
				right: 29rpx;
			}

			.share-pro-title {
				font-size: 28rpx;
				color: #1c1c1c;
				padding: 28rpx 41rpx;
				background-color: #f7f7f7;
			}

			.share-pro-body {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				font-size: 28rpx;
				color: #1c1c1c;

				.share-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					justify-content: space-around;

					.share-icon {
						text-align: center;
						font-size: 70rpx;
						margin-top: 39rpx;
						margin-bottom: 16rpx;
						color: #42ae3c;
					}

					&:nth-child(2) {
						.share-icon {
							color: #ff5f33;
						}
					}
				}
			}
		}

		/* 显示或关闭内容时动画 */

		.open {
			transition: all 0.3s ease-out;
			transform: translateY(0);
		}

		.close {
			transition: all 0.3s ease-out;
			transform: translateY(310rpx);
		}
	}

	.canvas {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		display: block !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 10;
	}
</style>
