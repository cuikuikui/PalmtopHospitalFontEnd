<template>
	<view class="container">
		<view class="header">
			预约信息
		</view>
		<view class="item">
			<text>预约医院：{{guaHao.h_Name}}</text>
			<view class="orderNum">
				<view>预约单号：{{guaHao.g_Order}}</view>
				<view class="copy" @click="copyBtn">复制</view>
			</view>
			<text>预约时间：{{guaHao.g_Time}}</text>
			<text>预约病因：{{guaHao.g_Introduce}}</text>
			<text>预约资费：{{guaHao.d_Fee}}</text>
		</view>

		<!-- 就诊人信息 -->
		<view class="header">就诊信息</view>
		<view class="item">
			<text>姓名：{{guaHao.a_Name}}</text>
			<text>性别：{{guaHao.a_Sex}}</text>
			<text>手机号：{{guaHao.a_Phone}}</text>
			<text>身份证号：{{guaHao.a_IDCard}}</text>
		</view>

		<!-- body3:医生信息 -->
		<view class="header">医生信息</view>
		<view class="center1">
			<image :src="guaHao.d_Img"></image>
			<view class="right">
				<text><text style="color:#080808">{{guaHao.d_Name}}</text> {{guaHao.d_Role}}</text>
				<text>{{guaHao.h_Name}} | {{guaHao.room_Name}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		GetGuaHaoInfoByOpenId,
		GuaHaoServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	export default {
		data() {
			return {
				guaHao:''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.gid=options.gid
			this.gorder=options.gorder
			this.GetGuaHaoInfoByOpenId()
		},
		methods: {
			GetGuaHaoInfoByOpenId: function() {
				var data = {
					FLAG:'R',
					openId: uni.getStorageSync('openid')
				}
				api.post(GuaHaoServlet, data).then(res => {
					console.log("显示挂号信息",res)
					let arrGuaHao = []
					if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
						for (let i = 0; i < res.length - 1; i++) {
							// console.log("======dddd=========", res[i])
							arrGuaHao.push(res[i])
						}
						var guaHaos = arrGuaHao
						for (var i = 0; i < guaHaos.length; i++) {
							if (this.gid == guaHaos[i].g_Id) {
								this.guaHao=guaHaos[i]
							}
						}
					} else {
						uni.showToast({
							title: res[res.length - 1].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
				}).catch(err => {
					//失败时回调函数 
				})
			},
			// 复制订单号
			copyBtn: function() {
				var that = this;
				uni.setClipboardData({
					data: that.gorder,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					}
				});
			},
		}
	}
</script>

<style>
	.container,
	.scrollview {
		width: 100%;
		height: 100%;
		/*background-color: rgb(215, 250, 221);*/
	}

	.header {
		line-height: 70rpx;
		font-size: 30rpx;
		padding-left: 30rpx;
		color: #5D5959;
		background-color: #EFE9E9
	}

	.item {
		font-size: 30rpx;
		color: #333333;
		/* border-bottom: 2rpx solid #f1f0f0;*/
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		line-height: 60rpx;
		padding-left: 30rpx;
	}

	/*预约信息*/
	.orderNum {
		display: flex;
		flex-direction: row;
		/*justify-content: center;*/
		align-items: center;
	}

	.copy {
		width: 100rpx;
		height: 40rpx;
		background-color: #EAE6E6;
		margin-left: 50rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-top: 2rpx solid #D5D3D3;
	}

	/*医生信息*/
	.center1 {
		display: flex;
		padding-left: 20rpx;
		padding-top: 20rpx;
	}

	.center1 image {
		width: 150rpx;
		height: 150rpx;
	}

	.center1 .right {
		padding-left: 25rpx;
		display: flex;
		flex-direction: column;
		line-height: 75rpx;
		color: ;
	}
</style>
