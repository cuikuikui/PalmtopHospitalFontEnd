<template>
	<div>
		<view class="success">
			<image src="../../static/images/color-success.png" mode=""></image>
			<text>预约成功</text>
		</view>

		<view class="submit">
			<button type="primary" @click="toPay">去支付</button>
			<button style="margin-top: 20px;" type="primary" @click="toRecord">查看预约记录</button>
		</view>
	</div>
</template>

<script>
	import {
		getNowFormatDate,
		getNowFormatTime
	} from '../common/utils.js'
	import {
		AppointServlet
	} from '../../pages/common/api.js'
	import api from '../../pages/common/request.js'
	export default {
		data() {
			return {
				appNo: '',
				appType:'',
				payDate: '',
				payTime: ''
			}
		},
		onLoad(options) {
			this.appNo = options.appNo
			this.appType = options.appType
			this.payDate = getNowFormatDate()
			this.payTime = getNowFormatTime()
			console.log("===this.payDate===", this.payDate);
			console.log("===this.payTime===", this.payTime);
		},
		methods: {
			toPay() {
				var openid = uni.getStorageSync('openid')
				var data = {
					//从全局变量data中获取数据
					openId: openid,
					appNo: this.appNo,
					payFee:this.appType=='1' ? '16.00' : '4.00',
					payDate:this.payDate+" "+this.payTime,
					type: 'pay',
					FLAG: "U"
				}
				console.log("====data====", data);
				api.post(AppointServlet, data).then(res => {
					//成功时回调函数
					console.log("====res====", res);
					let code = res.split(',')[0]
					let message = res.split(',')[1]
					//成功时回调函数
					if (code == "200") {
						uni.showLoading({
							title: '加载中'
						});
						setTimeout(function() {
							uni.hideLoading();
							uni.showToast({
								title: message,
								icon: 'none',
								duration: 2000
							});
							uni.navigateTo({
								url:'../nucleicAcid/pay1'
							})
						}, 2000);

					} else {
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						});
					}
					//授权成功后，跳转进入小程序首页
				}).catch(err => {
					//失败时回调函数
				})

			},
			toRecord() {
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
					uni.navigateTo({
						url: '../nucleicAcid/record'
					})
				}, 2000);
			}
		}
	}
</script>

<style scoped>
	.success {
		display: flex;
		width: 100%;
		height: 200px;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	image {
		width: 60px;
		height: 60px;
		margin-bottom: 10px;
	}

	.submit {
		width: 92%;
		margin-top: 30rpx;
		margin-left: 30rpx;
		color: #fff;
		border-radius: 10px;
	}
</style>
