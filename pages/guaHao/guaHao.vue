<template>
	<view class="container">
		<scroll-view :scroll-y="true">
			<view class="item" v-for="(item,index) in guaHao" :key="item.g_Id" :data-gid="item.g_Id"
				:data-gorder="item.g_Order" @click="guaHaoDetail">
				<view class="top">
					<text>预约详情</text>
					<text style="color:#676565" v-if="item.g_PayStatus=='3'">挂号已取消</text>
					<text style="color:#676565" v-if="item.g_PayStatus=='1'">预约成功</text>
					<count-down v-if = "item.g_PayStatus =='0' || item.g_PayStatus =='2'" :gTime = "item.time_Period" :orderEndTime="item.orderEndTime" :gWeek="item.g_Time" :gId= "item.g_Id" :dId = "item.d_Id" :payStatus = "item.g_PayStatus" />
					<!-- <count-down v-if = "item.g_PayStatus =='0' || item.g_PayStatus =='2'" @updatePay="payUpdate" :gTime = "item.time_Period" :orderEndTime="item.orderEndTime" :gWeek="item.g_Time" :gId= "item.g_Id" :dId = "item.d_Id" :payStatus = "item.g_PayStatus" /> -->
				</view>									
				<view class="center1">
					<image :src="item.d_Img"></image>
					<view class="right">
						<text><text style="color:#080808">{{item.d_Name}}</text> {{item.d_Role}}</text>
						<text>{{item.h_Name}} | {{item.room_Name}}</text>
					</view>
				</view>
				<view class="center2">
					<text>病情：{{item.g_Introduce}}</text>
					<text>就诊时间：{{item.g_Time}}</text>
					<text>门诊费用：￥{{item.d_Fee}}</text>
					<text v-if="item.g_PayStatus=='0'">支付状态：未支付</text>
					<text v-else-if="item.g_PayStatus=='1'">支付状态：已支付</text>
					<text v-else-if="item.g_PayStatus=='2'">支付状态：支付失败</text>
					<text v-else></text>
					
				</view>
				<view class="bottom">

					<view class="cancel" v-if="item.g_PayStatus=='0'" :data-did="item.d_Id" :data-gweek="item.g_Time"
						:data-gtime="item.time_Period" :data-gid="item.g_Id" @click.stop="cancelGuaHao">取消挂号</view>

					<view class="pay" v-if="item.g_PayStatus=='0'" :data-pDid="item.d_Id" :data-pGweek="item.g_Time"
						:data-pGtime="item.time_Period" :data-pGid="item.g_Id" @click.stop="PayGuaHao">支付</view>
					<view class="payFinish" v-if="item.g_PayStatus=='1' || item.g_PayStatus=='2' || item.g_PayStatus =='3'" :data-dGid="item.g_Id" @click.stop="DeleteGuaHao">删除订单</view>
					<view class="payFinish" v-if="item.g_PayStatus=='2'">支付失败</view>
					<view class="payFinish" v-if="item.g_PayStatus=='1'">支付完成</view>
					
					<view v-else></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		GetGuaHaoInfoByOpenId,
		AddScheduleNum,
		PayGuaHaoOK,
		GuaHaoServlet,
	} from '../common/api.js'
	import api from '../common/request.js'
	import countDown from '@/components/uni-countDown/uni-countDown.vue'//引入路径，可更改
	export default {
		components: {
			 countDown
		},
		data() {
			return {
				guaHao: [],
			}
		},
		onShow() {
			console.log("show is called");
			if (uni.getStorageSync('LoginIndex') == '') {
				uni.redirectTo({
					url: "../login/login"
				})
			}
			this.getGuaHao()
			
		},
		methods: {
			getGuaHao: function() {
				// 显示挂号信息
				var data = {
					FLAG: 'R',
					openId: uni.getStorageSync('openid')
				}
				api.post(GuaHaoServlet, data).then(res => {
					//成功时回调函数
					console.log("显示挂号信息",res)
					let arrGuaHao = []
					if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
						for (let i = 0; i < res.length - 1; i++) {
							arrGuaHao.push(res[i])
						}
						this.guaHao = arrGuaHao
					} else {
						uni.showToast({
							title: res[res.length - 1].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
				}).catch(err => {
					//失败时回调函数
					console.log(err)
				})
			},
			// 点击支付
			PayGuaHao: function(e) {
				if (this.countdownStr == '') {
					this.showPrompt()
					return
				}
				var that = this
				var did = e.currentTarget.dataset.pdid //医生ID
				var gid = e.currentTarget.dataset.pgid
				var gtime = e.currentTarget.dataset.pgtime
				var gweek = parseInt(this.convertWeek((e.currentTarget.dataset.pgweek).trim().split(" ")[3]))
				var data = {
					FLAG: "U",
					payFlag:'UA',
					dId: did,
					period: gtime,
					dayOfWeek: gweek,
					gId: gid,
					gPayStatus:'1',
				}
				console.log("支付提交数据", data);
				uni.showModal({
					title: '你确定要支付本次挂号预约？',
					content: e.currentTarget.dataset.pgweek,
					success: function(res) {
						if (res.confirm) { //这里是点击了确定以后
							api.post(GuaHaoServlet, data).then(res => {
								if (res[0].SYS_HEAD.ReturnCode = '000000') {
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
									that.getGuaHao()
									clearInterval(getApp().globalData.timer)
								} else {
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
								}
							}).catch(err => {
								//失败时回调函数
								uni.showToast({
									title: err,
									icon: 'none',
									duration: 2000
								});
							})
						} else { //这里是点击了取消以后
							uni.showToast({
								title: '取消支付',
								icon: 'success',
								duration: 2000 //持续的时间
							})
						}
					}
				})
			},
			convertWeek: function(gweek) {
				if (gweek == "周日") {
					gweek = '7'
				} else if (gweek == "周一") {
					gweek = '1'
				} else if (gweek == "周二") {
					gweek = '2'
				} else if (gweek == "周三") {
					gweek = '3'
				} else if (gweek == "周四") {
					gweek = '4'
				} else if (gweek == "周五") {
					gweek = '5'
				} else {
					gweek = '6'
				}
				return gweek
			},
			// 取消挂号
			cancelGuaHao: function(e) {
				console.log("=eeeee====", e.currentTarget.dataset);
				var that = this
				var did = e.currentTarget.dataset.did //医生ID
				var gid = e.currentTarget.dataset.gid
				var gtime = e.currentTarget.dataset.gtime
				// console.log("=ddd====",e.currentTarget.dataset.gweek);
				// console.log("=dddccc====",(e.currentTarget.dataset.gweek).trim().split(" ")[3]);
				// // console.log("=ddd====",e.currentTarget.dataset.gweek);
				var gweek = parseInt(this.convertWeek((e.currentTarget.dataset.gweek).trim().split(" ")[3]))
				var data = {
					FLAG: "U",
					payFlag:'UC',
					dId: did,
					period: gtime,
					dayOfWeek: gweek,
					gPayStatus:'3',
					gId: gid
				}
				console.log('====duysdgsyg====', data);
				uni.showModal({
					title: '你确定要取消本次预约？',
					content: e.currentTarget.dataset.gweek,
					success: function(res) {
						if (res.confirm) { //这里是点击了确定以后
							api.post(GuaHaoServlet, data).then(res => {
								if (res[0].SYS_HEAD.ReturnCode = '000000') {
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
									clearInterval(getApp().globalData.timer)
									that.getGuaHao()
								} else {
									that.guaHao = []
									// that.getGuaHao()
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
								}
							}).catch(err => {
								//失败时回调函数
								// console.log(err)
								uni.showToast({
									title: '取消失败',
									icon: 'success',
									duration: 2000 //持续的时间
								})
							})
						} else if (res.cancel) { //这里是点击了取消以后
							uni.showToast({
								title: '取消操作',
								icon: 'success',
								duration: 2000 //持续的时间
							})
						} else {
							// 
						}
					}
				})
			},
			// 挂号详系信息页面
			guaHaoDetail: function(e) {
				// console.log('-------------------------------------')
				uni.navigateTo({
					url: '../guaHaoDetail/guaHaoDetail?gid=' + e.currentTarget.dataset.gid + '&gorder=' + e
						.currentTarget.dataset.gorder
				})
			},
			// 删除订单
			DeleteGuaHao(e){
				let that = this
				console.log("=eeeee====", e.currentTarget.dataset);
				let gId = e.currentTarget.dataset.dgid
				var data = {
					FLAG: "D",
					gId: gId
				}
				console.log('====删除订单====', data);
				uni.showModal({
					title: '你确定要删除该订单',
					// content: e.currentTarget.dataset.gweek,
					success: function(res) {
						if (res.confirm) { //这里是点击了确定以后
							api.post(GuaHaoServlet, data).then(res => {
								if (res[0].SYS_HEAD.ReturnCode = '000000') {
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
									// clearInterval(getApp().globalData.timer)
									that.getGuaHao()
								} else {
									that.guaHao = []
									// that.getGuaHao()
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
								}
							}).catch(err => {
								//失败时回调函数
								console.log(err)
								uni.showToast({
									title: '取消失败',
									icon: 'success',
									duration: 2000 //持续的时间
								})
							})
						} else if (res.cancel) { //这里是点击了取消以后
							uni.showToast({
								title: '取消操作',
								icon: 'success',
								duration: 2000 //持续的时间
							})
						} else {
							// 
						}
					}
				})
				
			}
		}
	}
</script>

<style>
	.container {
		height: 100%;
		padding: 20rpx;
		/* background-color: #FD0517; */
		/* padding-bottom: 550rpx; */
		box-sizing: border-box;
	}

	.item {
		width: 100%;
		/*height:350rpx;*/
		padding: 15rpx;
		font-size: 35rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		/*background-color: #22DEE5;*/
		border: 1rpx solid #FD0517;
		margin-bottom: 20rpx;
	}

	.item .top {
		display: flex;
		justify-content: space-between;
	}

	.item .top1 {
		display: flex;
		justify-content: space-between;
	}

	.item .center1 {
		display: flex;
		padding-top: 20rpx;
	}

	.item .center1 image {
		width: 150rpx;
		height: 150rpx;
	}

	.item .center1 .right {
		padding-left: 25rpx;
		display: flex;
		flex-direction: column;
		line-height: 75rpx;
		color: ;
	}

	.item .center2 {
		display: flex;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.bottom {
		display: flex;
		justify-content: flex-end;
		padding-right: 30rpx;
	}

	.bottom .cancel {
		width: 130rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #04D8F7;
		margin-right: 40rpx;
		border: 1rpx solid #04D8F7;
	}

	.bottom .pay {
		width: 130rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #04D8F7;
		border: 1rpx solid #04D8F7;
	}

	.bottom .payFinish {
		width: 130rpx;
		height: 60rpx;
		display: flex;
		margin: 0 5px;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #505050;
		border: 1rpx solid #535555;
	}
</style>
