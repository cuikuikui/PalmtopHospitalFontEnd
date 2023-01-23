<template>
	<div class="container">
		<view class="top" v-for="(item,index) in appoints" :key="index">
			<view class="left">
				<text style="font-size: 14px;">核酸检测(DDJY)</text>
				<text style="font-size: 13px;color: darkgrey;">费用总额:<text
						style="color: red;">¥{{item.payFee}}</text></text>
				<text style="font-size: 13px;color: darkgrey;">就诊时间:{{item.payDate}}</text>
			</view>
			<view class="right">
				<button size="mini" style="background-color: dodgerblue;border-radius:30px;" type="primary"
					@click="toPay(item.payFee,item.appNo)">去支付</button>
			</view>
		</view>

		<view class="bottom">
			<view class="bottom-bt">
				<text>总计:</text>
				<text style="color: red;font-size: 20px;">¥{{totalFee}}</text>
			</view>
		</view>
	</div>
</template>

<script>
	import {
		AppointServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				appoints: [],
				totalFee: ''
			}
		},
		created() {
			this.getAppoints()
		},
		methods: {
			toPay(payFee,appNo) {
				uni.login({
					provider: 'weixin',
					success(code) {
						console.log('code:', code.code)
						//2:获得微信openid
						uniCloud.callFunction({
							name: 'getOpenid',
							data: {
								code: code.code
							}
						}).then(openid => {
							console.log('openid:', openid)
							//3:統一下單
							uniCloud.callFunction({
								name: 'getOrderInfo',
								data: {
									openid: openid.result.openid,
									name: '测试',
									out_trade: appNo, // 订单号
									suiji: Math.floor(Math.random() * 100000000),
									// pric:parseFloat(payFee) 
									pric: Number(payFee) * 100
								},
							}).then(odr => {
								console.log('OrderInfo:', odr)
								uni.hideLoading(); //隐藏loding...
								uni.requestPayment({
									// #ifdef MP-WEIXIN
									...odr.result.orderInfo,
									// #endif                                   
									success() {
										uni.showModal({
											title: '支付成功',
											content: '请和顾问联系执行订单即可!'
										})
									},
									fail() {},
									complete() {
										// 支付完成后重新加载该页面
										console.log('完成')
									}
								})
							})

						})
					},
					fail(err) {
						reject(new Error('微信登录失败'))
					}
				})
				// 支付结束
			},
			getAppoints() {
				var openid = uni.getStorageSync('openid')
				var data = {
					//从全局变量data中获取数据
					openId: openid,
					FLAG: "R"
				}
				api.post(AppointServlet, data).then(res => {
					//成功时回调函数
					this.appoints = res
					this.appoints = this.appoints.filter((item) => {
						return item.appStatus == '1'
					})
					this.totalFee = this.appoints.reduce(function(prevalue, item) {
						return prevalue + parseFloat(item.payFee)
					}, 0).toFixed(2)
					console.log("====this.appoints====", this.appoints);
					//授权成功后，跳转进入小程序首页
				}).catch(err => {
					//失败时回调函数
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 10px;
		height: 100%;

	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		border-bottom: 1px solid gainsboro;
		padding-bottom: 10px;
	}

	.left {
		display: flex;
		flex-direction: column;
	}

	.right {
		font-size: 2px;
		height: 30px;
		border-radius: 5px;
	}

	.bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		/* margin-right: 200px; */
		/* padding-righ: 10px; */

	}

	.bottom-bt {
		display: flex;
		justify-content: space-between;
		padding: 10px 15px;
	}
</style>
