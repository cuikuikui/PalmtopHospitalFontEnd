<template>
	<view>
		<!-- 信息部分开始 -->
		<form @submit="formSubmit" :report-submit="true">
			<view class="info">
				<!-- 姓名部分 -->
				<view class="item">
					<text>姓名</text>
					<view class="right">
						<input type="text" name="name" :placeholder="name" :focus="focus" />
					</view>
				</view>

				<!-- 性别 -->
				<view class="item">
					<radio-group class="radio-group" name="gender" @change="radioChange">
						<label class="radio">
							男
							<radio :value="1" checked />
						</label>
						<label class="radio">
							女
							<radio :value="0" />
						</label>
					</radio-group>
				</view>

				<!-- 身份证号 -->
				<view class="item">
					<text>身份证号</text>
					<view class="right">
						<input name="idCard" type="text" :placeholder="idCard" :focus="focus" />
					</view>
				</view>

				<!-- 电话部分 -->
				<view class="item">
					<text>手机号</text>
					<view class="right">
						<input name="tel" type="number" :placeholder="tel" :focus="focus" />
					</view>
				</view>
			</view>
			<!-- 信息部分结束 -->
			<button class="save" formType="submit">保存</button>
		</form>
	</view>
</template>

<script>
	import {
		AskerServlet
	} from '../common/api.js'
	import common from '../common/common.js'
	import api from '../common/request.js'
	import {randomNum} from '../common/utils.js'
	export default {
		data() {
			return {
				name: "请填写您的姓名",
				gender: "男",
				tel: "请填写您的联系方式",
				idCard: "请输入您的身份证号"
			}
		},
		methods: {
			radioChange: function(e) {
				if (e.detail.value == 0) {
					this.gender = "女"
				} else {
					this.gender = "男"
				}
			},
			showWarn: function(warn) {
				uni.showToast({
					title: warn,
					icon: 'none',
					duration: 2000 //持续的时间
				})
			},
			formSubmit: function(e) {
				var openid = uni.getStorageSync('openid')
				var that = this
				var warn = "";
				var flag = false;
				if (e.detail.value.name == "") {
					warn = "请填写您的姓名！";
					this.showWarn(warn)
				} else if (e.detail.value.tel == "") {
					warn = "请填写您的手机号！";
					this.showWarn(warn)
				} else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
					warn = "手机号格式不正确";
					this.showWarn(warn)
				} else if (e.detail.value.idCard == "") {
					warn = "请填写您的身份证号";
					this.showWarn(warn)
				} else if (common.isCardID(e.detail.value.idCard) == false) {
					warn = "身份证号格式不正确";
					this.showWarn(warn)
				} else {
					console.log("======",randomNum("a",6))
					var data = {
						//从全局变量data中获取数据
						aId:randomNum("a",6),
						aName: e.detail.value.name,
						aSex: this.gender,
						aPhone: e.detail.value.tel,
						aIDCard: e.detail.value.idCard,
						openId: openid,
						FLAG:"C"
					}
					api.post(AskerServlet, data).then(res => {
						//成功时回调函数
						// wx.removeStorageSync('address_list')
						uni.redirectTo({
							url: '../family/listFamily'
						})
						//授权成功后，跳转进入小程序首页
					}).catch(err => {
						//失败时回调函数
					})
				}
			},
		}
	}
</script>

<style>
	page {
		display: block;
		min-height: 100%;
		background-color: #f6f6f6;
		font-family: "微软雅黑";
		font-size: 30rpx;
		color: #353535;
		position: relative;
	}

	.info {
		background-color: #fff;
	}

	.item {
		height: 90rpx;
		align-items: center;
		display: flex;
		margin-left: 30rpx;
		border-bottom: 1rpx solid #eee;
	}

	input placeholder {
		color: red;
	}

	.area {
		width: 150rpx;
		border: 1rpx solid #939393;
	}

	.remind {
		padding-top: 6rpx;
		color: #e64340;
		font-size: 20rpx;
	}

	.save {
		width: 92%;
		margin-top: 30rpx;
		background-color: #FFC800;
		color: #fff;
	}

	.right {
		padding-left: 30rpx;
		width: 75%;
		display: flex;
	}

	.item .center {
		width: 450rpx;
		height: 100%;
		margin-left: 35rpx;
		/* background-color: #e64340 */
	}

	.text1 {
		font-size: 30rpx;
	}

	.image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
	}

	input {
		width: 100%;
	}

	radio-group {
		display: flex;
		align-items: center;
	}

	radio-group .radio {
		margin-left: 20rpx;
	}

	radio-group radio {
		margin-left: 10rpx;
	}
</style>
