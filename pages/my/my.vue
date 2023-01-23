<template>
	<view class="container">

		<view class="userinfo" style="background-color: #FD0517">
			<view class="userinfoLeft">
				<image class="userinfo-avatar" @click="userInfor(WeChatUserInfo.u_Name,WeChatUserInfo.u_Img,WeChatUserInfo.u_Phone)" :src="WeChatUserInfo.u_Img" background-size="cover"></image>
			</view>

			<view class="userinfoRight">
				<text class="userinfo-nickname">{{WeChatUserInfo.u_Name}}</text>
			</view>
		</view>

		<view class="info_list">
			<view class="weui_cell" @click="addFamily">
				<view class="weui_cell_hd">
					<span class="iconfont icon-juzhenren"></span>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p"> 就诊人 </view>
				</view>
				<view class="with_arrow">
					<span style="color:#131212" class="iconfont icon-arrow-right1"></span>
				</view>
			</view>

			<view class="weui_cell" @click="addAttention">
				<view class="weui_cell_hd">
					<span class="iconfont icon-star-attention"></span>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p"> 我的关注 </view>
				</view>
				<view class="with_arrow">
					<span style="color:#131212" class="iconfont icon-arrow-right1"></span>
				</view>
			</view>

			<view class="weui_cell" @click="Common_Problems">
				<view class="weui_cell_hd">
					<span class="iconfont icon-tiwenquestion"></span>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p"> 常见问题 </view>
				</view>
				<view class="with_arrow">
					<span style="color:#131212" class="iconfont icon-arrow-right1"></span>
				</view>
			</view>

			<view class="weui_cell" @click="disClaimer">
				<view class="weui_cell_hd">
					<span class="iconfont icon-declare"></span>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p">免责声明 </view>
				</view>
				<view class="with_arrow">
					<span style="color:#131212" class="iconfont icon-arrow-right1"></span>
				</view>
			</view>

			<view class="weui_cell" @click="aboutUs">
				<view class="weui_cell_hd">
					<span class="iconfont icon-cuowutishi-copy"></span>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p">关于我们 </view>
				</view>
				<view class="with_arrow">
					<span style="color:#131212" class="iconfont icon-arrow-right1"></span>
				</view>
			</view>

			<!-- APP端时的分享 -->
			<!--#ifdef APP-PLUS-->
			<!-- 分享弹窗 -->
			<uni-popup ref="sharepopup" type="bottom">
				<share-btn :sharedataTemp="sharedata"></share-btn>
			</uni-popup>
			<view class="weui_cell" @click="share">
				<view class="weui_cell_hd">
					<image src="../../static/images/card.png"></image>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p">分享好友 </view>
				</view>
				<!-- <view v-if="item.isunread" class="badge">{{item.unreadNum}}</view> -->
				<view class="with_arrow">
					<span style="color:#131212" class="iconfont icon-arrow-right1"></span>
				</view>
			</view>
			<!--  #endif -->

			<!-- 微信端时的分享 -->
<!-- 			<view class="share" :class="shareFlag=='showShare'?'show':''">
				<view class="shareStyle">
					<button class="wx" open-type='share'>
							<image src="../../static/images/weixin.png" alt="" class="shareimg">
						<text :decode="true">\n微信</text>
					</button>
					<button class="wx" open-type='share'>
							<image src="../../static/images/pengyouquan.png" alt="" class="shareimg">
						<text :decode="true">\n朋友圈</text>
					</button>
				</view>
			</view>
			<view class="weui_cell" @click="openShare" data-share="showShare">
				<view class="weui_cell_hd">
					<image src="../../static/images/card.png"></image>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p">分享好友 </view>
				</view>
				<view class="with_arrow">
					<image src="../../static/images/arrow.png"></image>
				</view>
			</view> -->

			<view class="weui_cell" @click="upDate">
				<view class="weui_cell_hd">
					<span class="iconfont icon-update"></span>
				</view>
				<view class="weui_cell_bd">
					<view class="weui_cell_bd_p"> 检查更新 </view>
				</view>
				<view class="with_arrow">
					<span style="color:#131212" class="iconfont icon-arrow-right1"></span>
				</view>
			</view>

			<view style="width:100%;height:50rpx;background-color:#cab1b13d;"></view>

			<view class="tel-view" @click="makePhone">
				<text style="font-size:27rpx;color:orange;letter-spacing: 3rpx;">客服电话: 86-021-33851886</text>
			</view>

			<view style="width:100%;height:360rpx;background-color:#cab1b13d;">
				<view class="serviceTime">服务时间:9:00-23:00</view>
			</view>

		</view>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				WeChatUserInfo: '',
				sharedata: {
					type: 1,
					// strShareUrl: "http://www.baidu.com",
					strShareTitle: "欢迎体验海隆掌上医院App",
					strShareSummary: "App体验",
					strShareImageUrl: "../../static/images/logo.png",
					strShareMiniProgram: {
						id: 'gh_be891d41ed50',
						path: 'pages/index/index',
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
				},
				// shareFlag: 'showShare',
			}
		},
		onLoad: function() {

		},
		onShow() {
			this.WeChatUserInfo = uni.getStorageSync('WeChatUserInfo')
			console.log('----------------my-WeChatUserInfo-------------------')
			console.log(this.WeChatUserInfo)
			console.log(uni.getStorageSync('LoginIndex'))
			console.log('-----------------my-WeChatUserInfo------------------')
			if (uni.getStorageSync('LoginIndex') == '') {
				uni.redirectTo({
					url: "/pagesA/login/login"
				})
			}
		},
		components: {
			uniPopup
		},
		methods: {
			userInfor: function(u_Name, u_Img,u_Phone) {
				uni.navigateTo({
					url: '/pagesC/userInfor/userInfor?u_Name=' + u_Name + '&u_Img=' + u_Img+'&u_Phone='+u_Phone
				})
			},
			// 家庭成员
			addFamily: function(e) {
				uni.navigateTo({
					url: "/pagesC/family/listFamily"
				})
			},
			// 我的关注
			addAttention: function(e) {
				uni.navigateTo({
					url: "/pagesC/attentions/attentions"
				})
			},
			// 常见问题
			Common_Problems: function(e) {
				uni.navigateTo({
				  url: "/pagesC/Common_Problems/Common_Problems"
				})
			},
			// 免责声明
			disClaimer: function() {
				uni.navigateTo({
					url: '/pagesC/disClaimer/disClaimer'
				})
			},
			bindViewTap: function(e) {
				uni.navigateTo({
					url: '/pagesC/register/register'
				})
			},
			// 关于我们
			aboutUs: function() {
				uni.navigateTo({
					url: "/pagesC/aboutUs/aboutUs"
				})
			},
			// 检查更新
			upDate: function() {
				// uni.navigateTo({
				//   url: "/pages/link/link"
				// })
				uni.showToast({
					title: '待开发中.............',
					icon: 'loading',
					duration: 2000 //持续的时间
				})
			},
			makePhone: function(e) {
				let that = this
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
			}
		}
	}
</script>

<style>
	/**index.uniss**/
	.info_list {
		background-color: white;
	}

	.container {
		height: 100%;
		background-color: #F2f2f2;
	}

	.userinfo {
		display: flex;
		width: 100%;
		height: 170rpx;
		padding-bottom: 70rpx;
		padding-top: 20rpx;
		flex-direction: column;
		/* padding: 50rpx 0; */
		align-items: center;
		/* background-color: #ff0000; */
	}

	.userinfoLeft {
		width: 100%;
		height: 130rpx;
		display: flex;
		justify-content: center;
	}

	.userinfoRight {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 40rpx;
	}

	.userinfo-avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}

	.userinfo-nickname {
		margin-top: 80rpx;
		color: rgba(8, 8, 7, 0.479);
		font-size: 40rpx;
		font-weight: bolder;
		font-family: 'Times New Roman'
	}

	.weui_cell {
		position: relative;
		display: flex;
		padding: 10px;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border-bottom: 1px solid #dadada;
	}

	.weui_cell_hd {
		display: inline-block;
		width: 20px;
		margin-right: 5px;
	}

	.weui_cell_hd image {
		width: 20px;
		height: 20px;
		vertical-align: -2px;
	}

	.weui_cell_bd {
		display: inline-block;
		margin-left: 20rpx;
	}

	.weui_cell_bd_p {
		font-size: 15px;
		color: #3f3c3c;
	}

	.badge {
		position: absolute;
		top: 18px;
		right: 40px;
		width: 15px;
		height: 15px;
		line-height: 15px;
		background: #ff0000;
		color: #fff;
		border-radius: 50%;
		text-align: center;
		font-size: 8px;
	}

	.with_arrow {
		position: absolute;
		color: #d8cccc;
		font-weight: bold;
		font-size: 30px;
		top: 2px;
		right: 20px;
		width: 30px;
		height: 30px;
	}

	.with_arrow image {
		width: 50rpx;
		height: 50rpx;
	}

	.tel-view {
		width: 100%;
		height: 60rpx;
		text-align: center
	}

	.serviceTime {
		padding-top: 20rpx;
		display: flex;
		justify-content: center;
		font-size: 24rpx;
		color: #686060
	}

	/* 分享样式 */
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	/* 自定义微信分享 */

	.share {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.shareStyle {
		width: 700rpx;
		height: 200rpx;
		border-radius: 20rpx;
		position: relative;
		color:#000000;
		top: 900rpx;
		left: 30rpx;
		background-color:white;
		display: flex;
	}

	.wx {
		width: 200rpx;
		height: 200rpx;
		background-color: white;
		border: none;
	}
	.wx::after {
		border: none;
	}
	.wx text{
		font-size: 30rpx;
	}
	.shareimg {
		width: 80rpx;
		height: 80rpx;
		position: relative;
		top:30rpx;
		/* margin-top: 30rpx; */
	}

	.share.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
</style>
